import time
import requests
import os
import ifcfg
import json
import threading
from cicflowmeter.sniffer import create_sniffer

OUTPUT_DIR = "csv_output/"


def sniff(interface):
    """
    Starts a continuous network traffic analysis session on a given interface,
    periodically flushing the captured flow data to a CSV file.
    """
    print("Starting network traffic analysis...")

    sniffer, session = create_sniffer(
        input_file=None,
        input_interface=interface,
        output_mode="csv",
        output=OUTPUT_DIR + interface + ".csv",
        verbose=False,
    )

    sniffer.start()
    print("Sniffer started, analyzing packets...")

    try:
        while True:
            time.sleep(30)
            print("Flushing flows to file...")
            session.garbage_collect(time.time())
    except KeyboardInterrupt:
        print("\nStopping sniffer...")
        sniffer.stop()
    finally:
        print("Flushing remaining flows...")
        session.flush_flows()
        print(f"Analysis complete. Flows saved to {OUTPUT_DIR}{interface}.csv")


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
        send_files = [
            f
            for f in os.listdir(current_path + "/" + OUTPUT_DIR)
            if os.path.isfile(os.path.join(current_path + "/" + OUTPUT_DIR, f))
        ]
        for file in send_files:
            try:
                response = requests.post(
                    "http://127.0.0.1:5000",
                    data={
                        file: open(
                            os.path.join(current_path + "/" + OUTPUT_DIR, file), "rb"
                        )
                    },
                )
            except Exception as e:
                print(f"Error sending file {file}: {e}")
        time.sleep(5)


def main():
    threads = []
    interfaces = fetch_interfaces()
    for interface in interfaces:
        print(f"Sniffing on interface: {interface}")
        t = threading.Thread(target=sniff, args=(interface,))
        threads.append(t)

    t = threading.Thread(target=send_csvs, args=(60,))
    threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()


if __name__ == "__main__":
    main()
