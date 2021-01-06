from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
import datetime as dt

from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor

from getdata import getdata
import matplotlib.pyplot as plt

# https://scikit-learn.org/stable/auto_examples/miscellaneous/plot_anomaly_comparison.html#sphx-glr-auto-examples-miscellaneous-plot-anomaly-comparison-py


#  X = np.array([[1, 2], [1, 4], [1, 0],[10, 2], [10, 4], [10, 0]])
df = getdata()
dates = df[1]
df = df[0]
fraudinput = [["Tesco"],[24]]
anomaly=False
for i in df:
    recipient = i["recipient"].iloc[0]
    # i=i[i.columns[::-1]]
    if fraudinput[0][0]==recipient:
        if len(i.index) > 1:
            i = i.drop(columns=['recipient'])
            # i["date"] = pd.to_datetime(i["date"])
            # i["date"] = i["date"].map(dt.datetime.toordinal)
            # startdate = i["date"].iloc[-1]
            # for idx, row in i.iterrows():
            #     i.loc[idx, 'date'] = i.loc[idx, 'date'] - startdate

            # cols = i.columns.tolist()
            # cols = cols[-1:] + cols[:-1]
            # i = i[cols]
            # ff = kmeans.labels_
            # nextmonth = i["date"].iloc[0] + 30
            # i.insert(2, "kmeanff", ff, True)
            # i.plot(x='date', y='amount', c='kmeanff', kind='scatter', marker='x', title=recipient + " predicted", cmap='RdBu_r')
            # plt.show()
            # fit the model
            # clf = IsolationForest(max_samples=100)
            amounts = i["amount"].values
            array = np.array(amounts)
            array = array.reshape(array.shape[0], -1)
            # print(array)
            cls = LocalOutlierFactor(n_neighbors=2, novelty=True)
            cls.fit(array)
            # isoutlier=cls.predict(totest)
            # print(isoutlier)
            isoutlier2 = cls.decision_function(totest)
            realnum = isoutlier2 / -10000000000
            # print(realnum)
            # meandiff =(sum(array) / len(array))*0.25
            # meandiff=(max([meandiff,10]))
            # print(meandiff)
            if realnum > 100:
                anomaly=True
            print(array[0])
            # kmeans = KMeans(n_clusters=2).fit(array)
            # fff = kmeans.predict(array)
            # print("uwuuu",fff)
            # arrayindexed=[]
            # j=0
            # while j<len(arr):
            #     arrayindexed.append([j,arr[j]])
            #     j+=1
            # clf.fit(array)
            # y_past = clf.predict(array)
            # y_pred = clf.predict([[14000]])
            # print(y_pred)
            # arrayindexed2=[]
            # j=0
            # while j<len(arrayindexed):
            #     arrayindexed2.append([j,arr[j],y_past[j]])
            #     j+=1
            # print(y_past)
            # arrayindexed2=np.array(arrayindexed2)
            # x=arrayindexed2[:,0]
            # y=arrayindexed2[:,1]
            # z=arrayindexed2[:,2]
            # predictiongraph=i.append({'date' : nextmonth , 'amount' : 14000, 'anomoly' : y_pred} , ignore_index=True)
            # predictiongraph.plot(x='date', y='amount', c='anomoly', kind='scatter', marker='x', title=recipient + " predicted", cmap='RdBu_r')
            # plt.scatter(x, y, c=z)
            # plt.show()
        else:
            anomaly=True
