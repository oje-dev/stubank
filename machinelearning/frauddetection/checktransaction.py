from sklearn.neighbors import LocalOutlierFactor
import datetime, pandas as pd, sys, json, numpy as np


def getdata(df):
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values(by='amount', ascending=False)
    for index, row in df.iterrows():
        if row['amount'] == 0:
            df.drop(index, inplace=True)
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _, group in g]
    dfs = dfs[::-1]
    return dfs


def fraudcheck(df, tocheck):
    dfs = getdata(df)
    tocheck = tocheck.drop(columns=['date'])
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
                print(realnum)
                if realnum > 75:
                    anomaly = True
            else:
                anomaly = True

    if anomaly == False:
        return False
    else:
        return True


def main():
    # get our data from Node
    nodedata = sys.stdin.readlines()
    d = json.loads(nodedata[0])
    # create a data frame and send to predict
    df = pd.DataFrame(d['transactions'])
    # result=fraudcheck(df)
    tocheck = df.tail(1)
    result = fraudcheck(df, tocheck)
    # output to Node
    print(result)


if __name__ == '__main__':
    main()
