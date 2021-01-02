import matplotlib.pyplot as plt
import pandas as pd
from pandas import Series, DataFrame
from datehandler import gendates


def getdata():
    df = pd.read_csv('1.csv', parse_dates=['date'])
    #format="%d/%m/%Y"  dayfirst=True
    df = df.sort_values(by='date',ascending=False)
    lastdate=df["date"].iloc[0]
    firstdate=df["date"].iloc[-1]
    dates=gendates(firstdate,lastdate)
    dates= DataFrame (dates,columns=['recipient','date','amount'])
    for index, row in df.iterrows():
        if row['amount'] ==0:
            df.drop(index, inplace=True)
    #print(df)
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _,group in g]
    dfs = dfs[::-1]
    # for i in dfs:
    #     i.plot(x ='date', y='amount', kind ='line',marker='x',title=i["recipient"].iloc[0])
    #     plt.show()
    return dfs,dates