import pandas as pd
from pandas import DataFrame
import datetime


def getdata():
    df = pd.read_csv('1.csv', parse_dates=['date'])
    df = df.sort_values(by='date',ascending=False)
    lastdate=df["date"].iloc[0]
    firstdate=df["date"].iloc[-1]
    dates=gendates(firstdate,lastdate)
    dates= DataFrame (dates,columns=['recipient','date','amount'])
    for index, row in df.iterrows():
        if row['amount'] ==0:
            df.drop(index, inplace=True)
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _,group in g]
    dfs = dfs[::-1]
    # for i in dfs:
    #     i.plot(x ='date', y='amount', kind ='line',marker='x',title=i["recipient"].iloc[0])
    #     plt.show()
    return dfs,dates

def gendates(startdate, enddate):
    sd = [startdate.year,startdate.month,startdate.day]
    ed = [enddate.year,enddate.month,enddate.day]
    #year month day
    dt = datetime.datetime(sd[0],sd[1],sd[2])
    end = datetime.datetime(ed[0],ed[1],ed[2])
    step = datetime.timedelta(days=1)
    result = []
    while dt < end:
        # recipient, date , amount
        result.append(["", dt.strftime('%Y-%m-%d'), 0.00])
        dt += step
    print("successfully generated dates...")
    return (result)
