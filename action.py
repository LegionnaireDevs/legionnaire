import platform
import os
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/killprocess", methods=["POST"])
def ApiKillProcess():
    data = request.get_json()
    processName = data.get("processName")
    response = KillProcess(processName)
    return jsonify({"response": response})


def KillProcess(processName):
    """
    Kills a process based on name.

    processName: Name of process to kill.
    """
    userOS = platform.system()

    if userOS == "Linux":
        cmd = f"pkill {processName}"
        subprocess.run(cmd, shell=True)
    if userOS == "Windows":
        cmd = f"Stop-Process -Name {processName} -Force"
        subprocess.run(["powershell", "-Command", cmd])


@app.route("/deletefile", methods=["POST"])
def ApiDeleteFile():
    data = request.get_json()
    location = data.get("location")
    recurse = data.get("recurse")
    response = DeleteFile(location, recurse)
    return jsonify({"response": response})


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


@app.route("/createfirewallrule", methods=["POST"])
def ApiCreateFirewallRule():
    data = request.get_json()
    direction = data.get("direction")
    source = data.get("source")
    dest = data.get("dest")
    action = data.get("action")
    port = data.get("port")
    protocol = data.get("protocol")
    response = CreateFirewallRule(direction, source, dest, action, port, protocol)
    return jsonify({"response": response})


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

    userOS = platform.system()

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
    else:
        return "Unsupported OS"
    subprocess.run(cmd, shell=True)


def VerifyIptables(direction, action, protocol):
    """
    Verifies parameters for iptables.

    direction:  "INPUT" or "OUTPUT".
    action:     "ACCEPT" or "DROP".
    protocol:   "tcp" or "udp".
    """
    flag = True
    if direction != "INPUT" and direction != "OUTPUT":
        flag = InvalidMessage("direction", {direction})
    if action != "ACCEPT" and action != "DROP":
        flag = InvalidMessage("action", {action})
    if protocol != "tcp" and protocol != "udp":
        flag = InvalidMessage("protocol", {protocol})
    return flag


def VerifyNetsh(direction, action, protocol):
    """
    Verifies parameters for windows netsh.

    direction:  "in" or "out".
    action:     "allow" or "block".
    protocol:       "tcp" or "udp".
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

    errType:    Where the error originates from.
    received:   Incorrect value that was received.
    """
    print(f"Invalid {errType}. Received {received}")
    return False
