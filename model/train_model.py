from xgboost import XGBClassifier
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
from sklearn.utils import compute_class_weight
from sklearn.preprocessing import StandardScaler

TARGET = 'Label'
MODEL_FP = 'model/models/run4.ubj'

print("Reading...")
data = pd.read_csv('model/data/processed/processed.csv')
df = pd.DataFrame(data)
print("Data read:", df.size)

X = df.drop(columns=[TARGET])
y = df[TARGET]

scalar = StandardScaler()
X_scaled = scalar.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# For validation data
# X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.2, stratify=y)
# X_test, X_val, y_test, y_val = train_test_split(X, y, test_size=0.5, stratify=y)

model = XGBClassifier(tree_method='hist' , device='cuda', eval_metric='mlogloss', verbosity=2)
# model = XGBClassifier(eval_metric='mlogloss') # cpu

class_weights = compute_class_weight('balanced', classes=np.unique(y), y=y)
sample_weights = [class_weights[label] for label in y]

print("Training...")
model.fit(X_train, y_train, sample_weight=sample_weights)

print("Predicting...")
y_pred = model.predict(X_test)

ConfusionMatrixDisplay.from_predictions(
        y_test, y_pred, display_labels=['BENIGN', 'DDoS', 'PortScan', 'Bot', 'Infiltration', 'WebAttackBruteForce',
                                        'WebAttackXSS', 'WebAttackSqlInjection', 'FTP-Patator', 'SSH-Patator',
                                        'DoSslowloris', 'DoSSlowhttptest', 'DoSHulk', 'DoSGoldenEye', 'Heartbleed'],
        cmap="Blues", normalize='true'
    )
plt.show()

acc = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred, average='weighted')
print(20*"-")
print("Accuracy score:", acc)
print("F1 score:", f1)
print(20*"-")

print("Saving...")
model.save_model(MODEL_FP)
