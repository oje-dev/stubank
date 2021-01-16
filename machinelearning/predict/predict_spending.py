# import libraries
import dateutil
import datetime, pandas as pd, sys, json, numpy as np
from dateutil.relativedelta import relativedelta
from sklearn import linear_model
from pandas import DataFrame
import time



def getdata(df):
    # read in data from csv and sort by data
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values(by='date', ascending=False)
    # get first and last date
    firstdate = df["date"].iloc[-1]
    lastdate = df["date"].iloc[0]
    # generate array of dates and put it in a data frame
    dates = gendates(firstdate, lastdate)
    dates = DataFrame(dates, columns=['recipient', 'date', 'amount'])
    # group by recipient and flip order
    g = df.groupby(pd.Grouper(key='recipient'))
    dfs = [group for _, group in g]
    dfs = dfs[::-1]
    return dfs, dates


def gendates(startdate, enddate):
    # format start and end dates
    sd = [startdate.year, startdate.month, startdate.day]
    ed = [enddate.year, enddate.month, enddate.day]
    #  convert start and end dates to datetime
    dt = datetime.datetime(sd[0], sd[1], sd[2])
    end = datetime.datetime(ed[0], ed[1], ed[2])
    # making it so it makes a new date for every day
    step = datetime.timedelta(days=1)
    result = []
    # loop through dates and add empty amount and date
    while dt < end:
        result.append(["", dt.strftime('%Y-%m-%d'), 0.00])
        dt += step
    return (result)


def predict(transactions):
    # get dates and transactions
    df = getdata(transactions)
    dates = df[1]
    df = df[0]
    # convert dates to datetime format
    dates["date"] = pd.to_datetime(dates["date"])
    totals = []
    # loop through each recipient
    for i in df:
        # get recipient name
        recipient = i["recipient"].iloc[0]
        # combine dates and the original datafram
        frames = [i, dates]
        i = pd.concat(frames)
        # sort datafram by date
        i = i.sort_values(by='date', ascending=False)
        # group transactions by month
        subdf = DataFrame(i, columns=['recipient', 'date', 'amount'])
        g = subdf.groupby(pd.Grouper(key='date', freq="M"))
        dfs = [group for _, group in g]
        # initialise month totals
        monthtotals = []
        # loop through transactions in month and total them
        for j in dfs:
            monthtotals.append([j["date"].iloc[0], j['amount'].sum()])
        # create new data frame with months and their totals
        seperated = DataFrame(monthtotals, columns=['date', 'amount'])
        # set date as X
        X = pd.DataFrame(seperated['date'])
        X["date"] = pd.to_datetime(X["date"])
        # get the month to predict
        nextmonth = X["date"].iloc[-1] + relativedelta(months=+1)
        # convert dates to ordinal
        X["date"] = X["date"].map(datetime.datetime.toordinal)
        nextmonth = nextmonth.toordinal()
        # set y as amount spent
        y = pd.DataFrame(seperated['amount'])
        # initialise linear regression model and train it
        linear_regression = linear_model.LinearRegression()
        linear_regression.fit(X, y)
        # predict the spending in the next month
        predicted = linear_regression.predict([[nextmonth]])[-1][0]
        # check if it predicts a negative number, if it does set as 0
        if predicted < 0:
            predicted = 0
        # append to totals
        totals.append([recipient, predicted]) 
    # get total and return
    total = 0
    for i in totals:
        total += i[1]
    return total


def start(d):
    start = time.time()
    #get our data from Node
    #create a data frame and send to predict
    df = pd.DataFrame(d['transactions'])
    total=predict(df)
    #output to Node
    return("{:.2f}".format(total))
    end = time.time()
    #print(end - start)