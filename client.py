import pystray
from PIL import Image, ImageDraw
import time 
import json
from flask import Flask

import threading
import requests
import os

import uuid
import socket
import configparser

# === import the functions from your other scripts ===
from log import sysLogs                   # one-shot scan/print
from processes import processList         # one-shot pass
from t_cap import run as tcap_run         # long-running capture

id = ""
hostname = ""
modules = {name: False for name in ["network", "logs", "program", "actions"]}


def start_tray():
    def quit_action(icon, item):
        icon.stop()

    image = Image.open("app.ico")
    menu = (pystray.MenuItem("Quit", quit_action),)
    icon = pystray.Icon("Legionnaire", image, "Legionnaire", menu)
    icon.run()


def quit():
    os._exit(0)


def api():
    app = Flask(__name__)
    app.run(use_reloader=False, debug=True, port=5000)


def create_config():
    global id, hostname
    id = uuid.uuid1()
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


# def register_with_control():
#     global id, hostname
#     print(f"Registering with control server: {hostname} {id}")
#     response = requests.post(
#         "http://localhost:5000/register", json={"hostname": hostname, "id": str(id)}
#     )

# ---------- simple workers (no classes) ----------

def logs_worker(interval=60):
    while True:
        try:
            sysLogs()              # prints and/or posts if suspicious
        except Exception as e:
            print("logs_worker error:", e)
        time.sleep(interval)

def processes_worker(interval=300):
    while True:
        try:
            processList()          # does its one pass
        except Exception as e:
            print("processes_worker error:", e)
        time.sleep(interval)

def tcap_worker():
    try:
        tcap_run()                 # blocks forever internally
    except Exception as e:
        print("tcap_worker error:", e)

# -------------------------------------------------

def main():
    if not read_config():
        create_config()
    # register_with_control()

    threads = []
    threads.append(threading.Thread(target=start_tray))
    threads.append(threading.Thread(target=logs_worker))
    threads.append(threading.Thread(target=processes_worker))
    threads.append(threading.Thread(target=tcap_worker))

    # threads.append(threading.Thread(target=api))

    
    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    main()
