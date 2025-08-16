import platform
import os
import subprocess

# Program will need to be run as administrator
# iptables rules will work for nftables too


def KillProcess(processName):
    """
    Kills a process based on name.
    """
    userOS = platform.system()

    if userOS == "Linux":
        cmd = f"pkill {processName}"
        subprocess.run(cmd, shell=True)
    if userOS == "Windows":
        cmd = f"Stop-Process -Name {processName} -Force"
        subprocess.run(["powershell", "-Command", cmd])


def DeleteFile(location, recurse):
    """
    Deletes a file at location.

    location:   Full path to file.
    recurse:    True or 1 to recursively delete.
    """
    userOS = platform.system()

    if not os.path.exists(location):
        InvalidMessage("path file", location)
        return

    if recurse:
        cmd = f"rm -r {location}"
    else:
        cmd = f"rm {location}"

    if userOS == "Linux":
        subprocess.run(cmd, shell=True)
    if userOS == "Windows":
        subprocess.run(["powershell", "-Command", cmd])


def CreateFirewallRule(direction, source, dest, action, port, protocol):
    """
    Allows the creation of firewall rules.

    direction:  "in" or "out" for Windows.
                "INPUT" or "OUTPUT" for Linux.
    source:     Host IP.
    dest:       Destination IP.
    action:     "allow" or "block" for Windows.
                "ACCEPT" or "DROP" for Linux.
    port:       "port to apply to."
    protocol:   "tcp" or "udp".
    """

    # Might need to add a way to delete firewall rules
    # May need to change name to just be dest
    userOS = platform.system()

    # Can be expanded for other operating systems.
    if userOS == "Linux":
        if VerifyIptables(direction, action, protocol):
            cmd = f"iptables -t filter -A {direction} -s {source} -d {dest} -p {protocol} --dport {port} -j {action}"
        else:
            return
    elif userOS == "Windows":
        if VerifyNetsh(direction, action, protocol):
            name = action + "_" + dest
            cmd = (
                f"netsh advfirewall firewall add rule name={name}"
                f"dir={direction} action={action} protocol={protocol} localip={source} remoteip={dest}"
            )
        else:
            return
    subprocess.run(cmd, shell=True)


def VerifyIptables(direction, action, protocol):
    """
    Verifies parameters for iptables.
    """
    flag = True
    if direction != "INPUT" and direction != "OUTPUT":
        flag = InvalidMessage("direction", {direction})
    if action != "ACCEPT" and action != "DROP":
        flag = InvalidMessage("action", {action})
    if protocol != "tcp" and protocol != "udp":
        flag = InvalidMessage("protocol", {protocol})
    return flag


def VerifyNetsh(direction, action, port, protocol):
    """
    Verifies parameters for windows netsh.
    """
    flag = True
    if direction != "in" and direction != "out":
        flag = InvalidMessage("direction", {direction})
    if action != "allow" and action != "block":
        flag = InvalidMessage("action", {action})
    if protocol != "tcp" and protocol != "udp":
        flag = InvalidMessage("protocol", {protocol})
    return flag


def InvalidMessage(errType, received):
    """
    Prints invalid message.
    """
    print(f"Invalid {errType}. Received {received}")
    return False
