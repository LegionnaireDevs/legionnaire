import pandas as pd
import xgboost as xg
import matplotlib.pyplot as plt

model = xg.XGBClassifier()
model.load_model('model/models/run8_bi.ubj')

def predict(data_fp):
    data = pd.read_csv(data_fp)
    df = pd.DataFrame(data)
    # df = df.drop(columns=['BwdPacketLengthMax', 'BwdPacketLengthMin', 'PSHFlagCount',
    #                     'TotalLengthofBwdPackets', 'PacketLengthMean', 'BwdPacketLengthMean',
    #                     'SubflowBwdBytes', 'AvgBwdSegmentSize'])
    return pd.DataFrame({'Label': model.predict(df)})

# feature_importances = model.feature_importances_
# xg.plot_importance(model, importance_type='gain')
# plt.show()

# import seaborn as sns
# import matplotlib.pyplot as plt

# df = pd.DataFrame(pd.read_csv('model/data/processed/processed.csv'))
# # sns.boxplot(x='Label', y='BwdPacketLengthMax', data=df)
# # plt.show()
# X = df.drop(columns=['Label'])
# y = df['Label']
# from sklearn.feature_selection import mutual_info_classif

# mi_scores = mutual_info_classif(X, y)
# feature_scores = pd.Series(mi_scores, index=X.columns).sort_values(ascending=False)
# print(feature_scores.head(10))
