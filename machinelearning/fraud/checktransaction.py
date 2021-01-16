from sklearn.neighbors import LocalOutlierFactor
import datetime, pandas as pd, sys, json, numpy as np



def groupdata(df):
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _, group in g]
    dfs = dfs[::-1]
    return dfs


def fraudcheck(df, tocheck):
    dfs = groupdata(df)
    anomaly = False
    for i in dfs:
        recipient = i["recipient"].iloc[0]
        if tocheck['recipient'].values[0] == recipient:
            if len(i.index) > 1:
                i = i.drop(columns=['recipient'])
                amounts = i["amount"].values
                array = np.array(amounts)
                array = array.reshape(array.shape[0], -1)
                cls = LocalOutlierFactor(n_neighbors=2, novelty=True)
                cls.fit(array)
                isoutlier = cls.decision_function([[tocheck['amount'].values[0]]])
                realnum = isoutlier / -10000000000
                # print(realnum)
                # this is half the distance
                if realnum > 75:
                    anomaly = True
            else:
                anomaly = True
            break
    return anomaly


def start(d):
    #get our data from Node
    #create a data frame and send to predict
    df = pd.DataFrame(d['transactions'])
    tocheck = df.tail(1)
    result = fraudcheck(df, tocheck)
    #output to Node
    return(str(result))
    #print(end - start)