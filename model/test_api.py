##################################
# Example usage of model for api #
##################################
import model_predict as mp

data = pd.read_csv('model/data/converted_data5.csv') # Read in csv as dataframe

predict = mp.predict(data) # Send dataframe to predict function

print(predict['Label'].unique()) # See if there was attack and/or benign

predict.to_csv("out", index=False) # Output as csv
