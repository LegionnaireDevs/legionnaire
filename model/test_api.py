import model_predict as mp

data = 'model/data/converted_data5.csv'

predict = mp.predict(data)

print(predict['Label'].unique())

predict.to_csv("out", index=False)
