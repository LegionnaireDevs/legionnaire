import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder

TARGET = 'Label'

attack_encode = {'BENIGN': 0, 'DDoS': 1, 'PortScan': 2, 'Bot': 3, 'Infiltration': 4, 'WebAttackAttackBruteForce': 5,
                 'WebAttackXSS': 6, 'WebAttackSqlInjection': 7, 'FTP-Patator': 8, 'SSH-Patator': 9,
                 'DoSslowloris': 10, 'DoSSlowhttptest': 11, 'DoSHulk': 12, 'DoSGoldenEye': 13,
                 'Heartbleed': 14,}

data = []
data.append(pd.read_csv("model/data/Friday-WorkingHours-Afternoon-DDos.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Friday-WorkingHours-Morning.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Thursday-WorkingHours-Morning-WebAttacks.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Tuesday-WorkingHours.pcap_ISCX.csv"))
data.append(pd.read_csv("model/data/Wednesday-workingHours.pcap_ISCX.csv"))
[pd.DataFrame(i) for i in data]
df = pd.concat(data)

print(df[TARGET].unique())

df[TARGET] = df[TARGET].map(attack_encode)

for col in df:
    if df[col].dtype == 'object':
        print(col)

for col in df:
    nans = df[col].isna().sum()
    if nans > 0:
        print(col)
        print(nans)

null_counts = df.isnull().sum()

df.replace([np.inf, -np.inf], np.nan, inplace=True)

df.dropna(inplace=True)

print(np.isinf(df).sum().sum())

df.to_csv("model/data/processed/processed.csv")


# print(df.isnull().sum())

# df.replace(['inf', '-inf'], [np.inf, -np.inf], inplace=True)

# for col in df:
#     infs = np.isinf(df[col]).sum()
#     if infs > 0:
#         print(col)
        # print(nans)

