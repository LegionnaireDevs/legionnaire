import pandas as pd
import xgboost as xg

MODEL_FP = "model/models/run9_bi.ubj

model = xg.XGBClassifier()
model.load_model(MODEL_FP)

def predict(df):
    return pd.DataFrame({"Label": model.predict(df)})
