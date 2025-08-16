# Author: Thomas McPherson
# Analysis of system logs for suspicious events.

import subprocess
import platform
import re
import socket

HOSTNAME = socket.gethostname()

# SYSTEM LOGS
# Mac system logs from the last hour
def macLogs():
    try:
        # Fetch last 50 system log entries
        result = subprocess.run(
            ["log", "show", "--predicate", "eventType == logEvent", "--last", "1hr", "--info"],
            capture_output=True,
            text=True
        )
        return result.stdout
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
    "core_dumped","failure","error","attack","bad","illegal","denied",
    "unauthorized","unauthorised","fatal","failed","segmentation fault",
    "corrupted","out of memory","no space left on device","file system full",
    "segfault","disk failure","scsi controller error","raid degraded","drive failed",
    "failed login","authentication failure","authentication failed","invalid password",
    "login failure","auth failure","auth internal failed","failed to authorize",
    "wrong password","login incorrect","failed to authenticate","illegal root login",
    "root login refused","root login","incorrect password attempt",
    "3 incorrect password attempts","user not in sudoers","status installed",
    "package installed","package removed","package purged","installed","updated","erased"
]

# Regex pattern that matches any keyword (case insensitive)
pattern = re.compile("|".join(re.escape(k) for k in suspicious_keywords), re.IGNORECASE)
# Filter suspicious logs using a data set of keywords.
# Will work for mac and linux
# These may give false positives regularly and cannot be marked as "accurate"
def filterSuspicious(logs):
    suspiciousLogs = []
    for entry in logs:
        if pattern.search(entry):
            suspiciousLogs.append(entry)
    return suspiciousLogs

def filterWinSuspicious(logs):
    print("do later.")


# Return system logs depending on platform.
def sysLogs():
    osName = platform.system()
    if osName == "Darwin":
        logs = macLogs()
        suspicious = filterSuspicious(logs.splitlines())
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
        suspicious = filterWinSuspicious(logs)
    else:
        print("Currently an unsupported OS.")
        return []


if __name__ == "__main__":
    logs = sysLogs()