# https://bazaar.abuse.ch/browse/
# API from Malware Bazaar
# Author: Thomas McPherson

import requests
import json

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

    response = requests.post(url, headers=headers, data=data)

    #print(response.text)
    analyseResults(response)

def analyseResults(response):
    # Analyses JSON result. Returns a dictionary if found in DB with associated risks.
    threatName = ""
    try:
        results = response.json()

    except json.JSONDecodeError:
        print("Response is not valid JSON")
        return {}
    
    if results.get("query_status") == "hash_not_found":
        print("Hash is either not in database, or safe.")
        return {}


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
            # Special case for ANY.RUN which is a list
            if vendor == "ANY.RUN":
                resultData[vendor] = data[0].get(field) if data else None
            else:
                resultData[vendor if vendor != "FileScan-IO" else "FileScan"] = data.get(field)
            
            if vendor == "ReversingLabs":
                print("Potential Threat Name:", data.get("threat_name"))


    print(resultData)


if __name__ == "__main__":
    # Only runs when you execute programanalysis.py directly
    test_hash = "e6b50dd767cc99afa4393cb1c93e87314cd415bdecb6b6f7ed6596411dd2f61e"
    queryHash(test_hash)

