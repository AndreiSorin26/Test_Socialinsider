from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime, pytz
import json

import requests

app = Flask(__name__)
CORS(app)


@app.route('/get-brands/', methods=['GET'])
def get_brands():
    url = "https://app.socialinsider.io/api"
    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "socialinsider_api.get_brands",
        "params": {
            "projectname": "API_test"
        }
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()


@app.route('/get-profiles-data/', methods=['GET'])
def get_profiles():
    profile_id = request.args.get("id")
    profile_type = request.args.get("profile_type")
    day = request.args.get("day")
    month = request.args.get("month")
    year = request.args.get("year")
    timezone = request.args.get("timezone")

    stime = f"{day}/{month}/{year}"
    today = datetime.datetime.strptime(stime, "%d/%m/%Y").replace(tzinfo=pytz.timezone(timezone))
    tomorrow = today + datetime.timedelta(days=1)

    url = "https://app.socialinsider.io/api"
    payload = json.dumps({
        "id": 1,
        "method": "socialinsider_api.get_profile_data",
        "params": {
            "id": profile_id,
            "profile_type": profile_type,
            "date": {
                "start": int(today.timestamp() * 1000),
                "end": int(tomorrow.timestamp() * 1000),
                "timezone": timezone
            }
        }
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY_TEST'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()


if __name__ == '__main__':
    app.run(debug=True, port=5000)
