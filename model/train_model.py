from xgboost import XGBClassifier
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

TARGET = 'Label'
MODEL_FP = 'model/models/run'

print("Reading...")
data = pd.read_csv('model/data/processed/processed.csv')
df = pd.DataFrame(data)
print("Data read:", df.size)

X = df.drop(columns=[TARGET])
y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# For validation data
# X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.2, stratify=y)
# X_test, X_val, y_test, y_val = train_test_split(X, y, test_size=0.5, stratify=y)

model = XGBClassifier(tree_method='hist' , device='cuda', eval_metric='mlogloss')
# model = XGBClassifier(eval_metric='mlogloss') # cpu

print("Training...")
model.fit(X_train, y_train)

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