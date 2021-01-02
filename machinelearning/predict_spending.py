import matplotlib.pyplot as plt
import numpy as np
from pandas import DataFrame
from sklearn import linear_model
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import KFold
import datetime as dt

import getdata
import pandas as pd


# Load the diabetes dataset
df = getdata.getdata()
dates=df[1]
df=df[0]
dates["date"]=pd.to_datetime(dates["date"])
totals=[]
for i in df:
    recipient=i["recipient"].iloc[0]
    frames=[i,dates]
    i=pd.concat(frames)
    i = i.sort_values(by='date',ascending=False)
    subdf = DataFrame (i,columns=['recipient','date','amount'])
    g = subdf.groupby(pd.Grouper(key='date',freq="M"))
    dfs = [group for _,group in g]
    monthtotals=[]
    for j in dfs:
        monthtotals.append([j["date"].iloc[0],j['amount'].sum()])
    seperated = DataFrame (monthtotals,columns=['date','amount'])
    X = pd.DataFrame(seperated['date'])
    X["date"]=pd.to_datetime(X["date"])
    X["date"]=X["date"].map(dt.datetime.toordinal)
    y = pd.DataFrame(seperated['amount'])
    # Split the data into training/testing sets
    X_train = X[:-5]
    X_test = X[-5:]
    # Split the targets into training/testing sets
    y_train = y[:-5]
    y_test = y[-5:]
    regr = linear_model.LinearRegression()
    # Train the model using the training sets
    regr.fit(X_train, y_train)
    # Make predictions using the testing set
    realthing=linear_model.LinearRegression()
    realthing.fit(X,y)
    nextmonth=X["date"].iloc[-1]+30
    Z=X_test.iloc[1:]
    Z = Z.append({'date' : nextmonth} , ignore_index=True)
    z_pred = realthing.predict(Z)
    predicted= z_pred[-1][0]
    if predicted<0:
        predicted=0

    predictiongraph=seperated.append({'date' : nextmonth , 'amount' : predicted} , ignore_index=True)
    # The coefficients
    # y_pred = regr.predict(X_test)
    #print('Coefficients: \n', regr.coef_)
    # The mean squared error
    #print('Mean squared error: %.2f'%mean_squared_error(y_test, y_pred))
    # The coefficient of determination: 1 is perfect prediction
    #print('Coefficient of determination: %.2f'%r2_score(y_test, y_pred))
    # plt.scatter(X_test, y_test,  color='black')
    # plt.plot(X_test, y_pred, color='blue', linewidth=3,label=subdf["recipient"].iloc[0])
    # plt.xticks(())
    # plt.yticks(())
    # plt.show()
    predictiongraph.plot(x ='date', y='amount', kind ='line',marker='x',title=recipient+" Predicted")
    plt.show()
    totals.append([recipient,predicted])
    print(totals[-1])
total=0
for i in totals:
    total+=i[1]
print("Total expected spending is :"+str(total))
