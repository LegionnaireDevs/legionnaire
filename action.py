import platform
import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

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
    userOS = platform.system()
    try:
        if userOS == "Linux":
            cmd = f"pkill {processName}"
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Windows":
            cmd = f"Stop-Process -Name {processName} -Force"
            subprocess.run(["powershell", "-Command", cmd], check=True)
        elif userOS == "Darwin":
            cmd = f"pkill {processName}"
            subprocess.run(cmd, shell=True, check=True)
        else:
            return f"Unsupported OS: {userOS}"
        return f"Successfully sent kill command for process: {processName}"
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
    Deletes a file at location.
    """
    userOS = platform.system()
    if not os.path.exists(location):
        return InvalidMessage("path file", location)

    if recurse:
        cmd = f"rm -r {location}"
    else:
        cmd = f"rm {location}"

    try:
        if userOS in ["Linux", "Darwin"]:
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Windows":
            if recurse:
                ps_cmd = f"Remove-Item -Path '{location}' -Recurse -Force"
            else:
                ps_cmd = f"Remove-Item -Path '{location}' -Force"
            subprocess.run(["powershell", "-Command", ps_cmd], check=True)
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


def CreateFirewallRule(direction, source, dest, action, port, protocol):
    """
    Allows the creation of firewall rules.
    """
    userOS = platform.system()
    try:
        if userOS == "Linux":
            if not VerifyIptables(direction, action, protocol):
                return "Invalid iptables parameters."
            cmd = f"iptables -t filter -A {direction} -s {source} -d {dest} -p {protocol} --dport {port} -j {action}"
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Windows":
            if not VerifyNetsh(direction, action, protocol):
                return "Invalid netsh parameters."
            cmd = f'netsh advfirewall firewall add rule name="Block-{dest}-{port}" dir={direction} action={action} protocol={protocol} remoteip={dest} localport={port}'
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Darwin":
            rule = f"{action} proto {protocol} from {source} to {dest} port {port}"
            with open("/tmp/pf_rule.conf", "w") as f:
                f.write(f"{rule}\n")
            subprocess.run("sudo pfctl -f /tmp/pf_rule.conf", shell=True, check=True)
            subprocess.run("sudo pfctl -e", shell=True, check=True)
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
    try:
        if userOS == "Linux":
            if not VerifyIptables(direction, action, protocol):
                return "Invalid iptables parameters."
            cmd = f"iptables -t filter -D {direction} -s {source} -d {dest} -p {protocol} --dport {port} -j {action}"
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Windows":
            if not VerifyNetsh(direction, action, protocol):
                return "Invalid netsh parameters."
            cmd = f'netsh advfirewall firewall delete rule name="Block-{dest}-{port}"'
            subprocess.run(cmd, shell=True, check=True)
        elif userOS == "Darwin":
            with open("/tmp/pf_rule.conf", "w") as f:
                f.write("")
            subprocess.run("sudo pfctl -f /tmp/pf_rule.conf", shell=True, check=True)
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