import platform
import os
import subprocess
import psutil
import shutil
from flask import Flask, request, jsonify
from flask_cors import CORS
import ipaddress


app = Flask(__name__)
CORS(app)


@app.route("/killprocess", methods=["POST"])
def ApiKillProcess():
    data = request.get_json()
    processName = data.get("processName")
    response = KillProcess(processName)
    return jsonify({"response": response})


def KillProcess(processName):
    """
    Kills a process based on name.
    """
    try:
        killed = False
        for proc in psutil.process_iter(['name']):
            if proc.info['name'] == processName:
                proc.kill()
                killed = True
        if killed:
            return f"Successfully killed process: {processName}"
        else:
            return f"No process named '{processName}' found."
    except Exception as e:
        return f"Error killing process '{processName}': {e}"


@app.route("/deletefile", methods=["POST"])
def ApiDeleteFile():
    data = request.get_json()
    location = data.get("location")
    recurse = data.get("recurse")
    response = DeleteFile(location, recurse)
    return jsonify({"response": response})


def DeleteFile(location, recurse):
    """
    Deletes a file or directory at location.
    """
    if not os.path.exists(location):
        return InvalidMessage("path file", location)
    try:
        if recurse and os.path.isdir(location):
            shutil.rmtree(location)
        else:
            os.remove(location)
        return f"Successfully deleted: {location}"
    except Exception as e:
        return f"Error deleting '{location}': {e}"


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


def VerifyIP(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except Exception:
        return False


def VerifyPort(port):
    try:
        port = int(port)
        return 1 <= port <= 65535
    except Exception:
        return False


def NonEmpty(s):
    return isinstance(s, str) and bool(s.strip())


def CreateFirewallRule(direction, source, dest, action, port, protocol):
    """
    Allows the creation of firewall rules.
    """
    userOS = platform.system()
    if not (NonEmpty(direction) and
            NonEmpty(action) and
            NonEmpty(protocol) and
            VerifyIP(source) and
            VerifyIP(dest) and
            VerifyPort(port)):
        return "Invalid firewall rule parameters."
    try:
        if userOS == "Linux":
            if not VerifyIptables(direction, action, protocol):
                return "Invalid iptables parameters."
            cmd = [
                "iptables", "-t", "filter", "-A", direction,
                "-s", source, "-d", dest, "-p", protocol,
                "--dport", str(port), "-j", action
            ]
            subprocess.run(cmd, check=True)
        elif userOS == "Windows":
            if not VerifyNetsh(direction, action, protocol):
                return "Invalid netsh parameters."
            cmd = [
                "netsh", "advfirewall", "firewall", "add", "rule",
                f'name=Block-{dest}-{port}',
                f'dir={direction}',
                f'action={action}',
                f'protocol={protocol}',
                f'remoteip={dest}',
                f'localport={port}'
            ]
            subprocess.run(cmd, check=True)
        elif userOS == "Darwin":
            rule = f"{action} proto {protocol} from {source} to {dest} port {port}"
            with open("/tmp/pf_rule.conf", "w") as f:
                f.write(f"{rule}\n")
            subprocess.run(["sudo", "pfctl", "-f", "/tmp/pf_rule.conf"], check=True)
            subprocess.run(["sudo", "pfctl", "-e"], check=True)
        else:
            return f"Unsupported OS: {userOS}"
        return f"Firewall rule for {dest} successfully created."
    except Exception as e:
        return f"Error creating firewall rule: {e}"


@app.route("/deletefirewallrule", methods=["POST"])
def ApiDeleteFirewallRule():
    data = request.get_json()
    direction = data.get("direction")
    source = data.get("source")
    dest = data.get("dest")
    action = data.get("action")
    port = data.get("port")
    protocol = data.get("protocol")
    response = DeleteFirewallRule(direction, source, dest, action, port, protocol)
    return jsonify({"response": response})


def DeleteFirewallRule(direction, source, dest, action, port, protocol):
    """
    Deletes an existing firewall rule.
    """
    userOS = platform.system()
    if not (NonEmpty(direction) and
            NonEmpty(action) and
            NonEmpty(protocol) and
            VerifyIP(source) and
            VerifyIP(dest) and
            VerifyPort(port)):
        return "Invalid firewall rule parameters."
    try:
        if userOS == "Linux":
            if not VerifyIptables(direction, action, protocol):
                return "Invalid iptables parameters."
            cmd = [
                "iptables", "-t", "filter", "-D", direction,
                "-s", source, "-d", dest, "-p", protocol,
                "--dport", str(port), "-j", action
            ]
            subprocess.run(cmd, check=True)
        elif userOS == "Windows":
            if not VerifyNetsh(direction, action, protocol):
                return "Invalid netsh parameters."
            cmd = [
                "netsh", "advfirewall", "firewall", "delete", "rule",
                f'name=Block-{dest}-{port}'
            ]
            subprocess.run(cmd, check=True)
        elif userOS == "Darwin":
            with open("/tmp/pf_rule.conf", "w") as f:
                f.write("")
            subprocess.run(["sudo", "pfctl", "-f", "/tmp/pf_rule.conf"], check=True)
        else:
            return f"Unsupported OS: {userOS}"
        return f"Firewall rule for {dest} successfully deleted."
    except Exception as e:
        return f"Error deleting firewall rule: {e}"


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
    protocol:   "tcp" or "udp".
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


def start_action_server():
    app.run(host="0.0.0.0", port=5001)


if __name__ == "__main__":
    start_action_server()