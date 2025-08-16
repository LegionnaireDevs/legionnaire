from flask import Flask, request, jsonify

# Create a Flask application instance
app = Flask(__name__)


# Define a route that accepts POST requests
@app.route("/", methods=["POST"])
def test_post_request():
    """
    This function handles POST requests to the /test endpoint.
    It inspects the incoming data and sends back a 200 OK response.
    """
    print("Received a POST request!")
    print(request)

    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()
        print("Received JSON data:")
        print(data)
    # Check if the request contains form data
    elif request.form:
        data = request.form.to_dict()
        print("Received form data:")
        print(data)
    # Otherwise, get the raw data
    else:
        data = request.get_data(as_text=True)
        print("Received raw data:")
        print(data)

    # Create a success response and send it back with a 200 status code
    response_data = {"status": "success", "message": "Data received successfully!"}

    # jsonify handles creating the correct Content-Type header (application/json)
    return jsonify(response_data), 200


# This block runs the server when the script is executed
if __name__ == "__main__":
    # host='0.0.0.0' makes the server accessible from other devices on your network
    # port=5000 is the default port Flask runs on
    app.run(host="0.0.0.0", port=5000, debug=True)
