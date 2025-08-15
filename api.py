from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
