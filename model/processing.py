import pandas as pd

data = pd.read_csv("model\\data\\Thursday-WorkingHours-Afternoon-Infilteration.pcap_ISCX.csv")
df = pd.DataFrame(data)

print(df['Label'].unique())