import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder

TARGET = 'Label'
OUTPUT_FP = 'model/data/processed/processed.csv'

attack_encode = {'BENIGN': 0, 'DDoS': 1, 'PortScan': 1, 'Bot': 1, 'Infiltration': 1, 'WebAttackBruteForce': 1,
                 'WebAttackXSS': 1, 'WebAttackSqlInjection': 1, 'FTP-Patator': 1, 'SSH-Patator': 1,
                 'DoSslowloris': 1, 'DoSSlowhttptest': 1, 'DoSHulk': 1, 'DoSGoldenEye': 1,
                 'Heartbleed': 1, 0: 0, 1: 1}

data = []
data.append(pd.read_csv("model/data/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Friday-WorkingHours-Morning.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Tuesday-WorkingHours.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Wednesday-workingHours.pcap_ISCX.csv"))

real_attack = pd.read_csv("model/data/attack_converted.csv")
real_attack['Label'] = 1
real_plain = pd.read_csv("model/data/plain_converted.csv")
real_plain['Label'] = 0

data.append(real_plain)
data.append(real_attack)
df = pd.concat(data)

print(df[TARGET].unique())

df[TARGET] = df[TARGET].map(attack_encode)

for col in df:
    if df[col].dtype == 'object':
        print("This column is object data:", col)

for col in df:
    nans = df[col].isna().sum()
    if nans > 0:
        print("This column has nans:", col)
        print("Total amount of nans in column:", nans)

null_counts = df.isnull().sum()

df.replace([np.inf, -np.inf], np.nan, inplace=True)

df.dropna(inplace=True)

print("Total inf in data:", np.isinf(df).sum().sum())

print("Unique values of target:", df[TARGET].unique())

print("Writing to file...")
df.to_csv(OUTPUT_FP, index=False)
print("Finished writing to file.")

