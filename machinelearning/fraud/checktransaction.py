from sklearn.neighbors import LocalOutlierFactor
import datetime, pandas as pd, sys, json, numpy as np


def fraudcheck(df, tocheck):

    #groups data by recipient
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _, group in g]
    anomaly = False
    #loops through recipients
    for i in dfs:
        # checks if the recipient is the same as the transaction to check
        recipient = i["recipient"].iloc[0]
        if tocheck['recipient'].values[0] == recipient:
            # checks if it is the only transaction from the recipient
            if len(i.index) > 1:
                # get the amounts from the transactions and reshape the array
                amounts = i["amount"].values
                array = np.array(amounts)
                array = array.reshape(array.shape[0], -1)
                # fit the machine learning
                cls = LocalOutlierFactor(n_neighbors=2, novelty=True)
                cls.fit(array)
                # return machine learning value and convert to decimal
                isoutlier = cls.decision_function([[tocheck['amount'].values[0]]])
                realnum = isoutlier / -10000000000
                # check if the value is within a specified local outlier factor (this is half the distance)
                if realnum > 75:
                    anomaly = True
            else:
                anomaly = True
            break
    return anomaly


def start(d):
    #create a data frame from data and get the transaction to check
    df = pd.DataFrame(d['transactions'])
    tocheck = df.tail(1)
    #pass to check transaction
    result = fraudcheck(df, tocheck)
    #output to Node
    return(str(result))