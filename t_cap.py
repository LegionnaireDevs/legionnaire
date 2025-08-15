import time
import requests
import os
import ifcfg
import json
import threading
from cicflowmeter.sniffer import create_sniffer

OUTPUT_DIR = "csv_output/"


def sniff(interface):
    """ """
    print("Starting network traffic analysis...")

    sniffer, session = create_sniffer(
        input_file=None,
        input_interface=interface,
        output_mode="csv",
        output=csv_output + interface + ".csv",
        verbose=False,
    )

    sniffer.start()

    print("Sniffer started, analyzing packets...")

    try:
        sniffer.join()
    except:
        print("Stopping sniffer...")
        sniffer.stop()
    finally:
        if sniffer.running:
            sniffer.join()
        session.flush_flows()
        print("Analysis complete. Flows saved to flows.csv")


def fetch_interfaces():
    """
    Returns a list of active network interfaces.
    """
    result = []

    interfaces = ifcfg.interfaces()
    for interface in interfaces:
        if interfaces[interface]["device"]:
            if interface != "lo":
                result.append(interface)

    return result


def send_csvs(interval=60):
    """
    Every x amount of time, send the csvs to the server.
    """
    current_path = os.path.dirname(os.path.realpath(__file__))
    while True:
        send_files = [f for f in listdir(current_path) if isfile(join(current_path, f))]
        for file in send_files:
            try:
                response = requests.post(url, data={"file": open(file, "rb")})
            except Exception as e:
                print(f"Error sending file {file}: {e}")
        sleep(interval)


def main():
    threads = []
    interfaces = fetch_interfaces()
    for interface in interfaces:
        print(f"Sniffing on interface: {interface}")
        t = threading.Thread(target=sniff, args=(interface,))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()


if __name__ == "__main__":
    main()
