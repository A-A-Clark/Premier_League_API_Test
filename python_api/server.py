import requests
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allowing all origins


# Get the API key from environment variable
API_KEY = os.getenv('FLASK_APP_API_KEY')

url = 'https://api.football-data.org/v4/competitions/PL/standings'

# Add your API key to the headers
headers = {
    'X-Auth-Token': API_KEY
}


# Table API route
@app.route("/table")
def table():
    # Make the request
    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()

        # Extract the standings from the response
        standings = data['standings'][0]['table']
        return jsonify(standings)
    else:
        return jsonify({"error": f"Failed to retrieve data: {response.status_code}"}), response.status_code


if __name__ == "__main__":
    app.run(debug=True)
