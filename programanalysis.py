# https://bazaar.abuse.ch/browse/
# API from Malware Bazaar
# Author: Thomas McPherson

import requests
import json

API_URL = "http://127.0.0.1:5000/api/malware-result"

def queryHash(hash):
    # Queries database using hash.
    url = "https://mb-api.abuse.ch/api/v1/"

    headers = {
        "Auth-Key": "dc1a5a3f7037735e8acd87137a879237a032bedb1f684aa7"
    }

    data = {
        "query": "get_info",
        "hash": hash
    }

    try:
        response = requests.post(url, headers=headers, data=data, timeout=10)
    except Exception as e:
        print(f"MalwareBazaar request failed: {e}")
        _post_to_api(hash, {"error": f"mb_request_failed: {e}"})
        return

    analyseResults(response, hash)

def analyseResults(response, sha256):
    # Analyses JSON result. Posts a dictionary to Flask whether found or not.
    try:
        results = response.json()
    except json.JSONDecodeError:
        print("Response is not valid JSON")
        _post_to_api(sha256, {"error": "invalid_json"})
        return
    
    if results.get("query_status") == "hash_not_found":
        print("Hash is either not in database, or safe.")
        _post_to_api(sha256, {"query_status": "hash_not_found"})
        return

    entry = results["data"][0]
    vendorIntel = entry.get("vendor_intel", {})
    resultData = {}

    vendors = {
        "ReversingLabs": "status",
        "FileScan-IO": "verdict",
        "Spamhaus HBL": "detection",
        "vxCube": "verdict",
        "ANY.RUN": "verdict"
    }

    for vendor, field in vendors.items():
        if vendor in vendorIntel:
            data = vendorIntel[vendor]
            if vendor == "ANY.RUN":  # list special-case
                resultData[vendor] = data[0].get(field) if data else None
            else:
                resultData[vendor if vendor != "FileScan-IO" else "FileScan"] = data.get(field)
            if vendor == "ReversingLabs":
                print("Potential Threat Name:", data.get("threat_name"))

    print(resultData)
    _post_to_api(sha256, resultData)

def _post_to_api(sha256, resultData):
    try:
        r = requests.post(
            API_URL,
            json={"hash": sha256, "results": resultData},
            timeout=5
        )
        print(f"Posted to API: {r.status_code} {r.text[:120]}")
    except Exception as e:
        print(f"Failed to send to API: {e}")

if __name__ == "__main__":
    # Only runs when you execute programanalysis.py directly
    test_hash = "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e"
    queryHash(test_hash)
