# api.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pathlib import Path
from werkzeug.utils import secure_filename
import json
from pathlib import Path

app = Flask(__name__)
CORS(app)

# --- config ---
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {"csv"}
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100 MB cap

def allowed_file(name: str) -> bool:
    return "." in name and name.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def unique_target(name: str) -> Path:
    """Preserve filename; if taken, append ' (n)' before extension."""
    safe = secure_filename(name) or "upload.csv"
    target = UPLOAD_DIR / safe
    if not target.exists():
        return target
    stem, suffix = target.stem, target.suffix
    i = 1
    while True:
        candidate = UPLOAD_DIR / f"{stem} ({i}){suffix}"
        if not candidate.exists():
            return candidate
        i += 1

# --- health check (for quick pings) ---
@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})

# --- receive CSVs from your t_cap sender (no changes required) ---
@app.post("/")
def receive_csv():
    saved = []

    # Case A: multipart/form-data (likely when requests sees a file-like in data)
    # Example: requests.post(..., data={ "eth0.csv": open("eth0.csv", "rb") })
    if request.files:
        for field_name, storage in request.files.items():
            # Prefer the real filename if present, else fall back to the field name
            orig = storage.filename or field_name
            if not allowed_file(orig):
                continue
            target = unique_target(orig)
            storage.save(target)
            saved.append(target.name)

    # Case B: urlencoded form (string body in request.form)
    elif request.form:
        charset = request.mimetype_params.get("charset", "utf-8")
        for field_name in request.form.keys():
            if not allowed_file(field_name):
                continue
            content_str = request.form.get(field_name, "")
            data_bytes = content_str.encode(charset, errors="ignore")
            target = unique_target(field_name)
            with target.open("wb") as f:
                f.write(data_bytes)
            saved.append(target.name)

    # Case C: raw body + header (fallback)
    else:
        body = request.get_data()
        xname = (request.headers.get("X-Filename") or "").strip()
        if body and xname and allowed_file(xname):
            target = unique_target(xname)
            with target.open("wb") as f:
                f.write(body)
            saved.append(target.name)

    if not saved:
        return jsonify({"ok": False, "error": "No CSV received"}), 400
    return jsonify({"ok": True, "saved": saved}), 201

# --- list / download helpers (optional) ---
@app.get("/api/uploads")
def list_uploads():
    files = sorted(p.name for p in UPLOAD_DIR.glob("*.csv"))
    return jsonify({"files": files})

@app.get("/api/uploads/<name>")
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
    return jsonify({
        "name": "Legionnaire Control Panel",
        "version": "0.1.0",
        "environment": "development",
        "backend": "Flask"
    })

@app.post("/api/hash-report")
def hash_report():
    payload = request.get_json(silent=True) or {}
    if not payload:
        return jsonify({"ok": False, "error": "no data"}), 400

    # (optional) persist so you can inspect later
    out = (UPLOAD_DIR / "hash_reports.jsonl")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("a", encoding="utf-8") as f:
        f.write(json.dumps(payload) + "\n")

    return jsonify({"ok": True})

# --- top-level (near other imports/vars)
from datetime import datetime
MALWARE_RESULTS = []   # in-memory store

# --- add these endpoints ---
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
    }
    MALWARE_RESULTS.append(item)
    app.logger.info(f"Saved malware result for {item['hash']}")
    return jsonify({"ok": True}), 201

@app.get("/api/malware-results")
def malware_results():
    return jsonify(MALWARE_RESULTS)


if __name__ == "__main__":
    # Keep localhost; change host to "0.0.0.0" if you need LAN access
    app.run(host="127.0.0.1", port=5000, debug=True, threaded=True)
