# Author Thomas McPherson
# Gets all processes running on OS, hashes them, checks these hashes against our hash database API.
# Used ChatGPT to assist with MONGODB creation.

# Environmental variables used for username and password.
import programanalysis
import psutil
import hashlib
import os
from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()

user = quote_plus(os.getenv("MONGO_USER"))
password = quote_plus(os.getenv("MONGO_PASS"))

MONGO_URI = f"mongodb+srv://{user}:{password}@cluster0.r3irld0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["processes_db"]
collection = db["process_hashes"]
collection.create_index("sha256", unique=True)

# Optimised SHA-256 using 1MB chunks
def getfileHash(file_path, algo="sha256"):
    hashFunc = hashlib.new(algo)
    chunk_size = 1024 * 1024  # 1 MB
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(chunk_size), b""):
                hashFunc.update(chunk)
        return hashFunc.hexdigest()
    except (FileNotFoundError, PermissionError):
        return None

def processList():
    processInfo = []
    for proc in psutil.process_iter(['pid', 'name', 'exe', 'username']):
        try:
            exe = proc.info['exe']
            username = proc.info['username']

            # Skip system processes
            if username and username.startswith("_"):
                continue

            if exe and os.path.isfile(exe):
                file_hash = getfileHash(exe)
                if file_hash:
                    # Query DB for this hash
                    if not collection.find_one({"sha256": file_hash}):
                        # Insert hash if not already present
                        print(file_hash)
                        programanalysis.queryHash(file_hash)
                        collection.insert_one({"sha256": file_hash})

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    print("Process list checked successfully")
    return processInfo

if __name__ == "__main__":
    hashes = processList()
    for p in hashes:
        print(f"{p['pid']:5} {p['name']:<25} {p['username']} {p['sha256']}")