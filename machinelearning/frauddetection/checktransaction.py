import numpy as np
from sklearn.neighbors import LocalOutlierFactor
import pandas as pd



def getdata():
    df = pd.read_csv('1.csv', parse_dates=['date'])
    df = df.sort_values(by='date',ascending=False)
    for index, row in df.iterrows():
        if row['amount'] ==0:
            df.drop(index, inplace=True)
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _,group in g]
    dfs = dfs[::-1]
    return dfs


df = getdata()
fraudinput = [["Tesco"],[[125]]]
anomaly=False
for i in df:
    recipient = i["recipient"].iloc[0]
    if fraudinput[0][0]==recipient:
        if len(i.index) > 1:
            i = i.drop(columns=['recipient'])
            amounts = i["amount"].values
            array = np.array(amounts)
            array = array.reshape(array.shape[0], -1)
            cls = LocalOutlierFactor(n_neighbors=2, novelty=True)
            cls.fit(array)
            isoutlier = cls.decision_function(fraudinput[1])
            realnum = isoutlier / -10000000000
            if realnum > 100:
                anomaly=True
            print(realnum)
        else:
            anomaly=True

if anomaly==False:
    print("Valid Transaction")
else:
    print("Invalid Transaction suspected")