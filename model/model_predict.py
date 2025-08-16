import pandas as pd
import xgboost as xg

model = xg.XGBClassifier()
model.load_model("model/models/run9_bi.ubj")


def predict(df):
    return pd.DataFrame({"Label": model.predict(df)})
