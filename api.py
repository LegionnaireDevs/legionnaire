from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask API"})

@app.post("/api/add")
def add():
    data = request.get_json()
    result = data.get("a", 0) + data.get("b", 0)
    return jsonify({"result": result})

@app.get("/api/control-panel")
def site_info():
    return jsonify({
        "name": "Legionnaire Control Panel",
        "version": "0.1.0",
        "environment": "development",
        "backend": "Flask"
    })

if __name__ == "__main__":
    app.run(debug=True)

