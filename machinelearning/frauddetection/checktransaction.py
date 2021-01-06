import numpy as np
from sklearn.neighbors import LocalOutlierFactor
from getdata import getdata

df = getdata()
dates = df[1]
df = df[0]
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
            isoutlier2 = cls.decision_function(fraudinput[1])
            realnum = isoutlier2 / -10000000000
            if realnum > 100:
                anomaly=True
            print(realnum)
        else:
            anomaly=True

if anomaly==False:
    print("Valid Transaction")
else:
    print("Invalid Transaction suspected")