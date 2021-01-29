# import libraries
import dateutil
import datetime, pandas as pd, sys, json, numpy as np
from dateutil.relativedelta import relativedelta
from sklearn import linear_model
from pandas import DataFrame
import time



def getdata(df):
    # convert date from iso 8601
    df["date"] = pd.to_datetime(df["date"]).dt.tz_convert(None)
    df = df.sort_values(by='date', ascending=False)
    # get first and last date
    firstdate = df["date"].iloc[-1]
    lastdate = df["date"].iloc[0]
    # generate array of dates and send to data frame
    dates = gendates(firstdate, lastdate)
    dates = DataFrame(dates, columns=['sentTo', 'date', 'amount'])
    # group by recipient and flip order
    g = df.groupby(pd.Grouper(key='sentTo'))
    dfs = [group for _, group in g]
    dfs = dfs[::-1]
    return dfs, dates


def gendates(startdate, enddate):
    # get start and end dates and format correctly
    sd = [startdate.year, startdate.month, startdate.day]
    ed = [enddate.year, enddate.month, enddate.day]
    dt = datetime.datetime(sd[0], sd[1], sd[2])
    end = datetime.datetime(ed[0], ed[1], ed[2])
    # making it so it makes a new date for every day
    step = datetime.timedelta(days=1)
    result = []
    # loop through dates and add empty amount and date ( enables days where transaction wasn't purchases to be taken into account)
    while dt < end:
        result.append(["", dt.strftime('%Y-%m-%d'), 0.00])
        dt += step
    return (result)


def predict(transactions):
    df = getdata(transactions)
    dates = df[1]
    df = df[0]
    # convert dates to datetime format
    dates["date"] = pd.to_datetime(dates["date"])
    totals = []
    # loop through each recipient
    for i in df:
        # get recipient name
        sentTo = i["sentTo"].iloc[0]
        # combine dates and the original dataframe
        frames = [i, dates]
        i = pd.concat(frames)
        i = i.sort_values(by='date', ascending=False)
        # group transactions by month
        subdf = DataFrame(i, columns=['sentTo', 'date', 'amount'])
        g = subdf.groupby(pd.Grouper(key='date', freq="M"))
        dfs = [group for _, group in g]
        monthtotals = []
        # loop through transactions in month and total them
        for j in dfs:
            monthtotals.append([j["date"].iloc[0], j['amount'].sum()])
        # create new data frame with months and their totals then set as X
        seperated = DataFrame(monthtotals, columns=['date', 'amount'])
        X = pd.DataFrame(seperated['date'])
        X["date"] = pd.to_datetime(X["date"])
        # get the month to predict
        nextmonth = X["date"].iloc[-1] + relativedelta(months=+1)
        # convert dates to ordinal
        X["date"] = X["date"].map(datetime.datetime.toordinal)
        nextmonth = nextmonth.toordinal()
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
        totals.append([sentTo, predicted]) 
    # get total and return
    total = 0
    for i in totals:
        total += i[1]
    return total


def start(d):
    #convert our data from node to a dataframe
    df = pd.DataFrame(d)
    #pass this dataframe to predict
    total=predict(df)
    #output to Node
    return("{:.2f}".format(total))