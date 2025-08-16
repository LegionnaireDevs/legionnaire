# api.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pathlib import Path
from werkzeug.utils import secure_filename
import json
from pathlib import Path
import pandas as pd
import os, threading, time
from datetime import datetime
import model.model_predict as mp

MALWARE_RESULTS = []
SUS_LOGS = []
ALLOWED_EXTENSIONS = {"csv"}
REGISTERED_CLIENTS = {}
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
CONVERTED_DIR = UPLOAD_DIR / "converted"
CONVERTED_DIR.mkdir(exist_ok=True)

_converter_started = False

app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/flow")
def receive_csv():
    saved = []

    if request.files:
        sender_id = (request.headers.get("ID") or "").strip()
        for field_name, storage in request.files.items():
            orig = storage.filename or field_name
            if not allowed_file(orig):
                continue
            target = unique_target(orig, sender_id)
            storage.save(target)
            convert_csv(target, sender_id)
            saved.append(target.name)

    else:
        body = request.get_data()
        sender_id = (request.headers.get("ID") or "").strip()
        xname = (request.headers.get("X-Filename") or "").strip()
        if body and xname and allowed_file(xname):
            target = unique_target(xname, sender_id)
            with target.open("wb") as f:
                f.write(body)
            saved.append(target.name)
            convert_csv(target, sender_id)

    if not saved:
        return jsonify({"ok": False, "error": "No CSV received"}), 400
    return jsonify({"ok": True, "saved": saved}), 201


@app.get("/api/uploads")
def list_uploads():
    """Lists all uploaded CSV files from all sender directories."""
    files = sorted(str(p.relative_to(UPLOAD_DIR)) for p in UPLOAD_DIR.rglob("*.csv"))
    return jsonify({"files": files})


@app.get("/api/uploads/<path:name>")
def download_upload(name):
    return send_from_directory(UPLOAD_DIR, name, as_attachment=True)


@app.get("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask API, my name is Sean"})


@app.post("/api/add")
def add():
    data = request.get_json(force=True) or {}
    return jsonify({"result": data.get("a", 0) + data.get("b", 0)})


@app.get("/api/site-info")
def site_info():
    return jsonify(
        {
            "name": "Legionnaire Control Panel",
            "version": "0.1.0",
            "environment": "development",
            "backend": "Flask",
        }
    )


@app.post("/api/hash-report")
def hash_report():
    global UPLOAD_DIR
    payload = request.get_json(silent=True) or {}
    if not payload:
        return jsonify({"ok": False, "error": "no data"}), 400

    out = UPLOAD_DIR / "hash_reports.jsonl"
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("a", encoding="utf-8") as f:
        f.write(json.dumps(payload) + "\n")

    return jsonify({"ok": True})


@app.post("/api/malware-result")
def malware_result():
    try:
        payload = request.get_json(force=True) or {}
    except Exception:
        return jsonify({"ok": False, "error": "bad json"}), 400

    item = {
        "hash": payload.get("hash") or "",
        "results": payload.get("results") or {},
        "received_at": datetime.utcnow().isoformat() + "Z",
        "id": payload.get("id") or "",
    }
    MALWARE_RESULTS.append(item)
    app.logger.info(f"Saved malware result for {item['hash']}")
    return jsonify({"ok": True}), 201


@app.get("/api/malware-results")
def malware_results():
    return jsonify(MALWARE_RESULTS)


@app.post("/api/logs")
def create_sus_log():
    msg = None

    if request.is_json:
        payload = request.get_json(silent=True)
        if isinstance(payload, dict):
            val = payload.get("sus_log")
            id = payload.get("id") or ""
            if isinstance(val, str):
                msg = val.strip()

    if not msg:
        return jsonify({"ok": False, "error": "sus_log string required"}), 400

    SUS_LOGS.append(msg)
    with (UPLOAD_DIR / "sus_logs.txt").open("a", encoding="utf-8") as f:
        f.write(msg + "\n")

    return jsonify({"ok": True}), 201


@app.get("/api/logs")
def list_sus_logs():
    return jsonify({"sus_logs": SUS_LOGS})


@app.post("/api/register")
def register_client():
    """
    Register (or refresh) a client.

    Expected JSON body:
      {
        "id": "<uuid-or-unique-id>",
        "hostname": "<machine-hostname>"
      }

    Returns:
      201 on first registration, 200 on subsequent refreshes.
    """
    payload = request.get_json(silent=True) or {}
    client_id = (payload.get("id") or "").strip()
    host = (payload.get("hostname") or "").strip()
    ip = request.remote_addr

    if not client_id or not host:
        return jsonify({"ok": False, "error": "id and hostname required"}), 400

    is_new = client_id not in REGISTERED_CLIENTS
    REGISTERED_CLIENTS[client_id] = {"id": client_id, "hostname": host, "ip": ip}

    try:
        _save_registered_snapshot()
    except Exception as exc:
        app.logger.warning("Could not write registered snapshot: %s", exc)

    status_code = 201 if is_new else 200
    return (
        jsonify(
            {
                "ok": True,
                "already": not is_new,
                "client": REGISTERED_CLIENTS[client_id],
            }
        ),
        status_code,
    )


@app.get("/api/clients")
def list_clients():
    return jsonify(list(REGISTERED_CLIENTS.values()))


def allowed_file(name: str) -> bool:
    return "." in name and name.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def unique_target(name: str, sender_id: str) -> Path:
    """Creates a unique path for an upload, inside a sender-specific directory."""
    safe = secure_filename(name) or "upload.csv"
    sender_dir = UPLOAD_DIR / (sender_id or "_unknown_sender")
    sender_dir.mkdir(parents=True, exist_ok=True)

    target = sender_dir / safe
    if not target.exists():
        return target

    stem, suffix = target.stem, target.suffix
    i = 1
    while True:
        candidate = sender_dir / f"{stem}_{i}{suffix}"
        if not candidate.exists():
            return candidate
        i += 1


def convert_csv(csv_path: Path, sender_id: str):
    """Convert csv_path -> converted/<name>_converted.csv (once)."""
    try:
        sender_out_dir = CONVERTED_DIR / (sender_id or "_unknown_sender")
        sender_out_dir.mkdir(parents=True, exist_ok=True)

        out = sender_out_dir / f"{csv_path.stem}.csv"

        if out.exists():
            return
        convert_csv_format(str(csv_path), str(out))
        app.logger.info(f"Converted {csv_path.name} -> {out.name}")
    except Exception as e:
        app.logger.exception(f"Convert error for {csv_path}: {e}")


def convert_csv_format(input_filepath, output_filepath):
    """
    Reads a CSV file, renames and reorders its columns based on predefined
    mappings, and saves the result to a new CSV file.

    Args:
        input_filepath (str): The path to the source CSV file.
        output_filepath (str): The path where the converted CSV file will be saved.
    """
    header_mapping = {
        "dst_port": "DestinationPort",
        "flow_duration": "FlowDuration",
        "tot_fwd_pkts": "TotalFwdPackets",
        "tot_bwd_pkts": "TotalBackwardPackets",
        "totlen_fwd_pkts": "TotalLengthofFwdPackets",
        "totlen_bwd_pkts": "TotalLengthofBwdPackets",
        "fwd_pkt_len_max": "FwdPacketLengthMax",
        "fwd_pkt_len_min": "FwdPacketLengthMin",
        "fwd_pkt_len_mean": "FwdPacketLengthMean",
        "fwd_pkt_len_std": "FwdPacketLengthStd",
        "bwd_pkt_len_max": "BwdPacketLengthMax",
        "bwd_pkt_len_min": "BwdPacketLengthMin",
        "bwd_pkt_len_mean": "BwdPacketLengthMean",
        "bwd_pkt_len_std": "BwdPacketLengthStd",
        "flow_byts_s": "FlowBytes/s",
        "flow_pkts_s": "FlowPackets/s",
        "flow_iat_mean": "FlowIATMean",
        "flow_iat_std": "FlowIATStd",
        "flow_iat_max": "FlowIATMax",
        "flow_iat_min": "FlowIATMin",
        "fwd_iat_tot": "FwdIATTotal",
        "fwd_iat_mean": "FwdIATMean",
        "fwd_iat_std": "FwdIATStd",
        "fwd_iat_max": "FwdIATMax",
        "fwd_iat_min": "FwdIATMin",
        "bwd_iat_tot": "BwdIATTotal",
        "bwd_iat_mean": "BwdIATMean",
        "bwd_iat_std": "BwdIATStd",
        "bwd_iat_max": "BwdIATMax",
        "bwd_iat_min": "BwdIATMin",
        "fwd_psh_flags": "FwdPSHFlags",
        "bwd_psh_flags": "BwdPSHFlags",
        "fwd_urg_flags": "FwdURGFlags",
        "bwd_urg_flags": "BwdURGFlags",
        "fwd_header_len": "FwdHeaderLength",
        "bwd_header_len": "BwdHeaderLength",
        "fwd_pkts_s": "FwdPackets/s",
        "bwd_pkts_s": "BwdPackets/s",
        "pkt_len_min": "MinPacketLength",
        "pkt_len_max": "MaxPacketLength",
        "pkt_len_mean": "PacketLengthMean",
        "pkt_len_std": "PacketLengthStd",
        "pkt_len_var": "PacketLengthVariance",
        "fin_flag_cnt": "FINFlagCount",
        "syn_flag_cnt": "SYNFlagCount",
        "rst_flag_cnt": "RSTFlagCount",
        "psh_flag_cnt": "PSHFlagCount",
        "ack_flag_cnt": "ACKFlagCount",
        "urg_flag_cnt": "URGFlagCount",
        "cwr_flag_count": "CWEFlagCount",
        "ece_flag_cnt": "ECEFlagCount",
        "down_up_ratio": "Down/UpRatio",
        "pkt_size_avg": "AveragePacketSize",
        "fwd_seg_size_avg": "AvgFwdSegmentSize",
        "bwd_seg_size_avg": "AvgBwdSegmentSize",
        "fwd_byts_b_avg": "FwdAvgBytes/Bulk",
        "fwd_pkts_b_avg": "FwdAvgPackets/Bulk",
        "fwd_blk_rate_avg": "FwdAvgBulkRate",
        "bwd_byts_b_avg": "BwdAvgBytes/Bulk",
        "bwd_pkts_b_avg": "BwdAvgPackets/Bulk",
        "bwd_blk_rate_avg": "BwdAvgBulkRate",
        "subflow_fwd_pkts": "SubflowFwdPackets",
        "subflow_fwd_byts": "SubflowFwdBytes",
        "subflow_bwd_pkts": "SubflowBwdPackets",
        "subflow_bwd_byts": "SubflowBwdBytes",
        "init_fwd_win_byts": "Init_Win_bytes_forward",
        "init_bwd_win_byts": "Init_Win_bytes_backward",
        "fwd_act_data_pkts": "act_data_pkt_fwd",
        "fwd_seg_size_min": "min_seg_size_forward",
        "active_mean": "ActiveMean",
        "active_std": "ActiveStd",
        "active_max": "ActiveMax",
        "active_min": "ActiveMin",
        "idle_mean": "IdleMean",
        "idle_std": "IdleStd",
        "idle_max": "IdleMax",
        "idle_min": "IdleMin",
    }

    # This list defines the exact order of columns for the output file.
    new_column_order = [
        "DestinationPort",
        "FlowDuration",
        "TotalFwdPackets",
        "TotalBackwardPackets",
        "TotalLengthofFwdPackets",
        "TotalLengthofBwdPackets",
        "FwdPacketLengthMax",
        "FwdPacketLengthMin",
        "FwdPacketLengthMean",
        "FwdPacketLengthStd",
        "BwdPacketLengthMax",
        "BwdPacketLengthMin",
        "BwdPacketLengthMean",
        "BwdPacketLengthStd",
        "FlowBytes/s",
        "FlowPackets/s",
        "FlowIATMean",
        "FlowIATStd",
        "FlowIATMax",
        "FlowIATMin",
        "FwdIATTotal",
        "FwdIATMean",
        "FwdIATStd",
        "FwdIATMax",
        "FwdIATMin",
        "BwdIATTotal",
        "BwdIATMean",
        "BwdIATStd",
        "BwdIATMax",
        "BwdIATMin",
        "FwdPSHFlags",
        "BwdPSHFlags",
        "FwdURGFlags",
        "BwdURGFlags",
        "FwdHeaderLength",
        "BwdHeaderLength",
        "FwdPackets/s",
        "BwdPackets/s",
        "MinPacketLength",
        "MaxPacketLength",
        "PacketLengthMean",
        "PacketLengthStd",
        "PacketLengthVariance",
        "FINFlagCount",
        "SYNFlagCount",
        "RSTFlagCount",
        "PSHFlagCount",
        "ACKFlagCount",
        "URGFlagCount",
        "CWEFlagCount",
        "ECEFlagCount",
        "Down/UpRatio",
        "AveragePacketSize",
        "AvgFwdSegmentSize",
        "AvgBwdSegmentSize",
        "FwdHeaderLength",  # This is for 'FwdHeaderLength.1'
        "FwdAvgBytes/Bulk",
        "FwdAvgPackets/Bulk",
        "FwdAvgBulkRate",
        "BwdAvgBytes/Bulk",
        "BwdAvgPackets/Bulk",
        "BwdAvgBulkRate",
        "SubflowFwdPackets",
        "SubflowFwdBytes",
        "SubflowBwdPackets",
        "SubflowBwdBytes",
        "Init_Win_bytes_forward",
        "Init_Win_bytes_backward",
        "act_data_pkt_fwd",
        "min_seg_size_forward",
        "ActiveMean",
        "ActiveStd",
        "ActiveMax",
        "ActiveMin",
        "IdleMean",
        "IdleStd",
        "IdleMax",
        "IdleMin",
    ]

    try:
        df = pd.read_csv(input_filepath)
        df.rename(columns=header_mapping, inplace=True)
        df["FwdHeaderLength.1"] = df["FwdHeaderLength"]

        final_column_order = new_column_order[:]  # Make a copy
        final_column_order[final_column_order.index("FwdHeaderLength", 50)] = (
            "FwdHeaderLength.1"
        )

        df_converted = df[final_column_order]
        predicted = mp.predict(df_converted)

        df["Label"] = predicted["Label"]
        df.to_csv(input_filepath, index=False)

        print(f"Successfully converted '{input_filepath}' to '{output_filepath}'")
    except FileNotFoundError:
        print(f"Error: The file '{input_filepath}' was not found.")
    except KeyError as e:
        print(f"Error: A required column was not found in the input file: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


def _converter_loop():
    while True:
        try:
            for p in UPLOAD_DIR.glob("*.csv"):
                convert_csv(p)
        except Exception as e:
            app.logger.exception(f"Background converter loop error: {e}")
        time.sleep(5)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, threaded=True)
