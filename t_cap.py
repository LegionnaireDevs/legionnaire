import time
import requests
import os
import ifcfg
import json
import multiprocessing
import csv
from cicflowmeter.sniffer import create_sniffer

OUTPUT_DIR = "csv_output"
API_URL = "http://127.0.0.1:5000"
INTERVAL = 10


def sniff(interface):
    """
    Starts a network traffic analysis session on a given interface,
    stopping, flushing, and restarting every 30 seconds. Data is appended
    to a master CSV file for the interface.
    """
    print(f"Starting network traffic analysis on {interface}...")
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    master_file_path = os.path.join(OUTPUT_DIR, f"{interface}.csv")
    temp_file_path = os.path.join(OUTPUT_DIR, f"{interface}_temp.csv")

    try:
        while True:
            sniffer, session = create_sniffer(
                input_file=None,
                input_interface=interface,
                output_mode="csv",
                output=temp_file_path,
                verbose=False,
            )

            print(
                f"Sniffer started on {interface}, collecting packets for {INTERVAL} seconds..."
            )
            sniffer.start()
            time.sleep(INTERVAL)

            print(f"Stopping sniffer on {interface}...")
            sniffer.stop()
            sniffer.join()

            print(f"Flushing flows for {interface}...")
            session.flush_flows()
            print(f"Flows flushed to temporary file: {temp_file_path}")

            if os.path.exists(temp_file_path):
                write_header = (
                    not os.path.exists(master_file_path)
                    or os.path.getsize(master_file_path) == 0
                )

                with open(temp_file_path, "r", newline="") as t_file, open(
                    master_file_path, "a", newline=""
                ) as m_file:
                    reader = csv.reader(t_file)
                    writer = csv.writer(m_file)

                    header = next(reader, None)
                    if header and write_header:
                        writer.writerow(header)

                    for row in reader:
                        writer.writerow(row)

                os.remove(temp_file_path)
                print(
                    f"Appended data to {master_file_path} and removed temporary file."
                )

            print(f"Restarting sniffer on {interface}.")

    except KeyboardInterrupt:
        print(f"\nAnalysis manually stopped for interface {interface}.")
    except Exception as e:
        print(f"An error occurred on interface {interface}: {e}")
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


def fetch_interfaces():
    """
    Returns a list of active network interfaces.
    """
    result = []
    interfaces = ifcfg.interfaces()
    for interface in interfaces:
        if interfaces[interface].get("device") and interface != "lo":
            result.append(interface)
    return result


def send_csvs():
    """
    Every x amount of time, send the csvs to the server with raw data in the request body.
    """
    current_path = os.path.dirname(os.path.realpath(__file__))
    output_path = os.path.join(current_path, OUTPUT_DIR)
    while True:
        try:
            send_files = [
                f
                for f in os.listdir(output_path)
                if os.path.isfile(os.path.join(output_path, f))
                and not f.endswith("_temp.csv")
            ]
            for file in send_files:
                try:
                    file_path = os.path.join(output_path, file)
                    with open(file_path, "rb") as f:
                        file_body = f.read()

                    if not file_body:
                        print(f"Skipping empty file: {file}")
                        continue

                    headers = {"Content-Type": "text/csv", "X-Filename": file}
                    response = requests.post(API_URL, data=file_body, headers=headers)
                    response.raise_for_status()

                    print(f"Sent {file} to server: {response.status_code}")

                    os.remove(file_path)
                    print(f"Removed file {file} after sending.")
                except requests.exceptions.RequestException as e:
                    print(f"Error sending file {file}: {e}")
                except Exception as e:
                    print(f"An unexpected error occurred while sending {file}: {e}")
        except Exception as e:
            print(f"Error reading output directory: {e}")

        time.sleep(INTERVAL)


def run():
    processes = []
    interfaces = fetch_interfaces()
    if not interfaces:
        print("No active network interfaces found (excluding 'lo').")
        return

    for interface in interfaces:
        print(f"Creating process for interface: {interface}")
        p = multiprocessing.Process(target=sniff, args=(interface,))
        processes.append(p)

    print("Creating process for sending CSVs...")
    p_sender = multiprocessing.Process(target=send_csvs)
    processes.append(p_sender)

    for p in processes:
        p.start()

    try:
        for p in processes:
            p.join()
    except KeyboardInterrupt:
        print("\nMain process interrupted. Terminating child processes.")
        for p in processes:
            p.terminate()
            p.join()


if __name__ == "__main__":
    run()
