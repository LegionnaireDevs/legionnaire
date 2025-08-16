# Author: Thomas McPherson
# Analysis of system logs for suspicious events.
# Reference from https://github.com/ossec/ossec-hids/blob/f6502012b7380208db81f82311ad4a1994d39905/etc/rules/syslog_rules.xml
# Used some ID and key words for matching suspicious logs.

import subprocess
import platform
import re
import socket

HOSTNAME = socket.gethostname()

# SYSTEM LOGS
# Mac system logs from the last hour
def macLogs():
    try:
        proc = subprocess.Popen(
            ["log", "show", "--predicate", "eventType == logEvent", "--last", "1m", "--info"],
            stdout=subprocess.PIPE,
            text=True
        )
        for line in proc.stdout:
            yield line.strip()
    except Exception as e:
        print(f"Error fetching logs: {e}")

# SYSTEM LOGS FROM LINUX
# Linux logs from the last 50 system log entries.
def linuxLogs():
    try:
        result = subprocess.run(
            ["journalctl", "-n", "50", "--no-pager"],
            capture_output=True,
            text=True
        )
        return result.stdout
    except Exception as e:
        print(f"Error fetching Linux logs: {e}")

## WINDOWS LOGS
# Windows logs from the last 50 system events
def windowLogs():
    try:
        # Fetch last 50 system events
        result = subprocess.run(
            ["wevtutil", "qe", "System", "/c:50", "/f:text"],
            capture_output=True,
            text=True
        )
        return result.stdout
    except Exception as e:
        print(f"Error fetching Windows logs: {e}")

# Compile once
suspicious_keywords = [
    "core_dumped","attack","illegal",
    "unauthorized","unauthorised","segmentation fault",
    "corrupted","out of memory","no space left on device","file system full",
    "segfault","disk failure","scsi controller error","raid degraded","drive failed",
    "failed login","authentication failure","authentication failed","invalid password",
    "login failure","auth failure","auth internal failed","failed to authorize",
    "wrong password","login incorrect","failed to authenticate","illegal root login",
    "root login refused","root login","incorrect password attempt",
    "3 incorrect password attempts","user not in sudoers","status installed",
    "package installed","package removed","package purged","failed login", "logon failure", "account lockout", "multiple failed logons", "special privileges assigned",
    "user added", "user removed", "group membership change", "administrator priveleges",
    "suspicious process", "unexpected executable", "cmd.exe", "wmic", "schtasks", "psexec",
    "rundll32", "remote desktop", "RDP", "mstsc", "remote connection", "winrm", "unexpected listening port",
    "inbound connection", "outbound connection", "registry modification", "service installed",
    "driver loaded", "scheduled task created", "WMI", "wmic", "Suspicious file", "unusual file created",
    "mimikatz", "credential dump", "suspicious script execution", "autorun", "startup modification",
    "suspicious login", "unauthorized access", "permission change", "privilege escalation",
    "account disabled", "account enabled", "password changed", "password reset", "user locked",
    "user removed", "user created", "group added", "group removed", "admin rights granted",
    "process terminated", "process started", "unexpected process", "malicious process",
    "cmd.exe", "powershell.exe", "wmic", "schtasks", "psexec", "rundll32", "explorer.exe",
    "remote desktop", "RDP", "mstsc", "remote connection", "vpn", "winrm", "port opened",
    "port closed", "inbound connection", "outbound connection", "firewall changed",
    "failed login", "logon failure", "account lockout", "multiple failed logons", "special privileges assigned",
    "user added", "user removed", "user created", "account enabled", "account disabled", "password changed",
    "password reset", "user locked", "group added", "group removed", "group membership change", "administrator privileges",
    "privilege escalation", "permission change", "unauthorized access", "suspicious login",
    "process started", "process terminated", "unexpected process", "malicious process",
    "cmd.exe", "powershell.exe", "wmic", "schtasks", "psexec", "rundll32", "explorer.exe",
    "remote desktop", "RDP", "mstsc", "remote connection", "vpn", "winrm",
    "port opened", "port closed", "inbound connection", "outbound connection", "firewall changed",
    "registry added", "registry removed", "registry modified",
    "service started", "service stopped", "service installed", "service removed",
    "driver installed", "driver removed", "scheduled task created", "scheduled task deleted",
    "autorun added", "autorun removed", "startup file modified", "suspicious file", "unusual file created",
    "malware detected", "mimikatz", "credential dump", "suspicious script executed",
    "powershell encodedcommand", "unusual network activity", "privilege assigned","failed login", "authentication failure", "login failure", "sudo command", "root access",
    "user added", "user removed", "admin privileges assigned", "permission change",
    "unauthorized access", "process started", "process terminated", "launchctl started",
    "launchctl stopped", "cron job created", "cron job removed", "startup item added",
    "startup item removed", "kernel extension loaded", "kernel extension unloaded",
    "network connection", "port opened", "port closed", "ssh login", "ssh failed login",
    "remote connection", "malware detected", "suspicious script executed", "plist modified",
    "configuration file changed", "application installed", "application removed", "package installed",
    "package removed", "package updated", "unusual file created", "autorun added", "startup modification",
    "failed login", "authentication failure", "login failure", "sudo command", "root login",
    "user added", "user removed", "group added", "group removed", "privilege escalation",
    "permission change", "unauthorized access", "process started", "process terminated",
    "cron job created", "cron job deleted", "systemd service started", "systemd service stopped",
    "package installed", "package removed", "package purged", "package updated",
    "ssh login", "ssh failed login", "remote connection", "iptables modified",
    "firewall changed", "network connection", "port opened", "port closed",
    "unusual file created", "suspicious file", "malware detected", "suspicious script executed",
    "startup modification", "autorun added", "kernel module loaded", "kernel module removed",
    "configuration file changed",
    "First time user logged in.","Kernel log daemon terminating"
]

suspicious_keywords = list(set(suspicious_keywords))

# Regex pattern that matches any keyword (case insensitive)
pattern = re.compile("|".join(re.escape(k) for k in suspicious_keywords), re.IGNORECASE)
# Filter suspicious logs using a data set of keywords.
# Will work for mac and linux
# These may give false positives regularly and cannot be marked as "accurate"
def filterSuspicious(logs):
    suspicious = []
    for entry in logs:
        low = entry.lower()
        if any(k in low for k in suspicious_keywords):
            suspicious.append(entry)
    return suspicious


# Return system logs depending on platform.
def sysLogs():
    osName = platform.system()
    if osName == "Darwin":
        logs = macLogs()
        suspicious = filterSuspicious(logs)
        if suspicious:
            for s in suspicious:
                print("Suspicious log found: ",s)
        else:
            print("No suspicious logs found in this batch.")
    elif osName == "Linux":
        logs = linuxLogs()
        suspicious = filterSuspicious(logs.splitlines())
        if suspicious:
            for s in suspicious:
                print("Suspicious logs found: ",s)
        else:
            print("No suspicious logs found in this batch.")
        
    elif osName == "Windows":
        logs = windowLogs()
        suspicious = filterSuspicious(logs)
        if suspicious:
            for s in suspicious: 
                print("Suspicious logs found: ",s)
        else:
            print("No suspicious logs found in this batch.")
    else:
        print("Currently an unsupported OS.")
        return []


if __name__ == "__main__":
    logs = sysLogs()