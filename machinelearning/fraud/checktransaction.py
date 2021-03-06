from sklearn.neighbors import LocalOutlierFactor
import datetime, pandas as pd, sys, json, numpy as np


def fraudcheck(amounts, tocheck):
    anomaly = False
    # get the amounts from the transactions and reshape the array
    amounts = amounts["amount"].values
    array = np.array(amounts)
    array = array.reshape(array.shape[0], -1)
    # fit the machine learning
    cls = LocalOutlierFactor(n_neighbors=2, novelty=True)
    cls.fit(array)
    # return machine learning value and convert to decimal
    isoutlier = cls.decision_function(tocheck)
    # check if the value is within a specified local outlier factor (this is half the distance)
    if isoutlier < -20:
        anomaly = True
    return anomaly


def start(d):
    #create a data frame from data and get the transaction to check
    df = pd.DataFrame(d)
    del df['_id']
    print(len(df))
    #If 2 or less transactions to a certain recipient, return True
    if len(df)<3:
        return "True"
    else:
        #last element is transaction to check
        tocheck = df.tail(1)
        df=df.drop(df.tail(1).index)
        #pass to check transaction
        result = fraudcheck(df, tocheck)
        #output to Node
        return(str(result))