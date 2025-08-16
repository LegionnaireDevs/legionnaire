import pandas as pd
import xgboost as xg

model = xg.XGBClassifier()
model.load_model('model/models/run2')
data = pd.read_csv('model/data/converted_data.csv')
df = pd.DataFrame(data)

y = model.predict(df)

print(y)