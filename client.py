import pystray
from PIL import Image, ImageDraw
import time
import json

import threading
import requests
import os
import multiprocessing

import uuid
import socket
import configparser

from log import sysLogs
from processes import processList
from t_cap import run as tcap_run

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

id = ""
hostname = ""
modules = {name: False for name in ["network", "logs", "program", "actions"]}


def start_tray():
    def quit_action(icon, item):
        icon.stop()

    icon_path = os.path.join(BASE_DIR, "app.ico")
    image = Image.open(icon_path)

    menu = (pystray.MenuItem("Quit", quit_action),)
    icon = pystray.Icon("Legionnaire", image, "Legionnaire", menu)
    icon.run()


def create_config():
    global id, hostname
    id = str(uuid.uuid1())
    hostname = socket.gethostname()

    config = configparser.ConfigParser()
    config["IDENTIFIERS"] = {"uuid": str(id), "hostname": str(hostname)}
    config["MODULES"] = {
        "network": str(False),
        "logs": str(False),
        "program": str(False),
        "actions": str(False),
    }

    with open("config.ini", "w") as configfile:
        config.write(configfile)


def read_config():
    global id, hostname
    try:

        config = configparser.ConfigParser()
        with open("config.ini", "r") as configfile:
            config.read_file(configfile)
        id = config["IDENTIFIERS"]["uuid"]
        hostname = config["IDENTIFIERS"]["hostname"]
        for module in config["MODULES"]:
            modules[module] = config["MODULES"].getboolean(module)

    except FileNotFoundError:
        return False


def register_with_control():
    global id, hostname
    print(f"Registering with control server: {hostname} {id}")
    response = requests.post(
        "http://localhost:5000/register", json={"hostname": hostname, "id": str(id)}
    )


def logs_worker(interval=60, id=""):
    while True:
        try:
            sysLogs(id)
        except Exception as e:
            print("logs_worker error:", e)
        time.sleep(interval)


def processes_worker(interval=300, id=""):
    while True:
        try:
            processList(id)
        except Exception as e:
            print("processes_worker error:", e)
        time.sleep(interval)


def tcap_worker(id=""):
    try:
        tcap_run(id)
    except Exception as e:
        print("tcap_worker error:", e)


def run_as_user(target_func):
    """
    Wrapper to drop root privileges and run a function as the original user.
    """
    try:
        uid = int(os.environ.get("SUDO_UID"))
        gid = int(os.environ.get("SUDO_GID"))

        os.setgid(gid)
        os.setuid(uid)

        target_func()
    except (KeyError, TypeError):
        target_func()


def main():
    if not read_config():
        create_config()
    register_with_control()

    processes = []

    tray_process = multiprocessing.Process(target=run_as_user, args=(start_tray,))
    processes.append(tray_process)

    processes.append(
        threading.Thread(
            target=logs_worker,
            args=(
                60,
                id,
            ),
        )
    )
    processes.append(
        threading.Thread(
            target=processes_worker,
            args=(
                300,
                id,
            ),
        )
    )
    processes.append(threading.Thread(target=tcap_worker, args=(id,)))

    for p in processes:
        p.start()

    for p in processes:
        p.join()


if __name__ == "__main__":
    main()
