from xgboost import XGBClassifier
import xgboost as xgb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.utils import compute_class_weight
from sklearn.preprocessing import RobustScaler as rs
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, ConfusionMatrixDisplay, classification_report

TARGET = 'Label'
MODEL_FP = 'model/models/run9_bi.ubj'

print("Reading...")
data = pd.read_csv('model/data/processed/processed.csv')
df = pd.DataFrame(data)
print("Data read:", df.size)

X = df.drop(columns=[TARGET])
y = df[TARGET]

scalar = rs()
X_scaled = scalar.fit_transform(X)

print(X_scaled)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# For validation data
# X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.2, stratify=y)
# X_test, X_val, y_test, y_val = train_test_split(X, y, test_size=0.5, stratify=y)

print("Original distribution:")
print(y.value_counts(normalize=True))
print("\nTraining distribution:")
print(y_train.value_counts(normalize=True))
print("\nTest distribution:")
print(y_test.value_counts(normalize=True))

xgb_params = {
    "objective": "binary:logistic", 
    "eval_metric": "logloss",
    "max_depth": 6,
    "learning_rate": 0.01,
    "n_estimators": 1000,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "reg_alpha": 0.1,  # L1
    "reg_lambda": 1.0,  # L2
}

class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
scale_pos_weight = class_weights[1] / class_weights[0]

model = XGBClassifier(tree_method='hist' , device='cuda', **xgb_params, scale_pos_weight=scale_pos_weight)
# model = XGBClassifier(eval_metric='mlogloss', **xgb_params) # cpu

print("Training...")
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)
model.fit(
    X_train,
    y_train,
    sample_weight=np.where(y_train == 1, scale_pos_weight, 1),
    eval_set=[(X_train, y_train), (X_test, y_test)],
    verbose=False
)

print("Predicting...")
y_pred = model.predict(X_test)

ConfusionMatrixDisplay.from_predictions(
        y_test, y_pred, display_labels=['BENIGN', 'Attack'],
        cmap="Blues", normalize='true'
    )
plt.show()

acc = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred, average='weighted')
print(20*"-")
print("Accuracy score:", acc)
print("F1 score:", f1)
print(20*"-")

y_proba = model.predict_proba(X_test)[:, 1]
attack_probs = y_proba[y_test == 1]
print("Attack prediction probabilities (first 10):", attack_probs[:10])
print("Max attack score:", attack_probs.max())
print("Min attack score:", attack_probs.min())

print(classification_report(y_test, y_pred, digits=4))

print("Saving...")
model.save_model(MODEL_FP)
