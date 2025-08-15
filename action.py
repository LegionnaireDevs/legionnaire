import platform
import os

# utilise f string to create netsh rules for windows and iptables for linux

# Program will need to be run as administrator
# iptables rules will work for nftables too
# Currently just works on tcp


def CreateFirewallRule(direction, source, dest, action, port, protocol):
    userOS = platform.system()

    # Can be expanded for other operating systems.
    if userOS == "Linux":
        VerifyIptables(direction, action, protocol)
        rule = f"iptables -t filter -A {direction} -s {source} -d {dest} -p {protocol} --dport {port} -j {action}"
    elif userOS == "Windows":
        VerifyNetsh(direction, action, protocol)
        name = action + "_" + dest
        rule = (
            f"netsh advfirewall firewall add rule name={name}"
            f"dir={direction} action={action} protocol={protocol} localip={source} remoteip={dest}"
        )

    os.system(rule)


def VerifyIptables(direction, action, protocol):
    if direction != "INPUT" and direction != "OUTPUT":
        InvalidMessage("direction", {direction})
    if action != "ACCEPT" and action != "DROP":
        InvalidMessage("action", {action})
    if protocol != "tcp" and protocol != "udp":
        InvalidMessage("protocol", {protocol})


def VerifyNetsh(direction, action, port, protocol):
    if direction != "in" and direction != "out":
        InvalidMessage("direction", {direction})
    if action != "allow" and action != "block":
        InvalidMessage("action", {action})
    if protocol != "tcp" and protocol != "udp":
        InvalidMessage("protocol", {protocol})


def InvalidMessage(errType, received):
    print(f"Invalid {errType}. Received {received}")
