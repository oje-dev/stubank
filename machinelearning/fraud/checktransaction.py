from sklearn.neighbors import LocalOutlierFactor
import datetime, pandas as pd, sys, json, numpy as np


def fraudcheck(amounts, tocheck):

    #groups data by recipient

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
    realnum = isoutlier / -10000000000
    # check if the value is within a specified local outlier factor (this is half the distance)
    if realnum > 75:
        anomaly = True
    return anomaly


def start(d):
    #create a data frame from data and get the transaction to check
    df = pd.DataFrame(d['transactions'])
    tocheck = df.tail(1)
    df=df.drop(df.tail(1).index)
    #pass to check transaction
    result = fraudcheck(df, tocheck)
    #output to Node
    return(str(result))