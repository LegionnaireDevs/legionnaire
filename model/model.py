from xgboost import XGBClassifier
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

TARGET = 'Label'

data = pd.read_csv('model/data/processed/test.csv')
df = pd.DataFrame(data)

X = df.drop(columns=[TARGET])
Y = df[TARGET]

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y)

model = XGBClassifier(eval_metric='mlogloss')

model.fit(X_train, Y_train)
Y_pred = model.predict(X_test)
ConfusionMatrixDisplay.from_predictions(
        Y_test, Y_pred, display_labels=['BENIGN', 'DoSslowloris', 'DoSSlowhttptest', 'DoSHulk', 'DoSGoldenEye', 'Heartbleed'],
        cmap="Blues", normalize='true'
    )
plt.show()

print(accuracy_score(Y_test, Y_pred))