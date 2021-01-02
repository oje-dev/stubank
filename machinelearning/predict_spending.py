import matplotlib.pyplot as plt
from pandas import DataFrame
from sklearn import linear_model
from sklearn.linear_model import LinearRegression

import datetime as dt

from sklearn.preprocessing import PolynomialFeatures

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
    #polynomial regression
    # poly_reg = PolynomialFeatures(degree=3)
    # X_poly = poly_reg.fit_transform(X)
    # pol_reg = LinearRegression()
    # pol_reg.fit(X_poly, y)
    # polyresult=pol_reg.predict(poly_reg.fit_transform([[nextmonth]]))[0][0]
    # polynomialgraph=seperated.append({'date' : nextmonth , 'amount' : zzz} , ignore_index=True)
    # polynomialgraph.plot(x ='date', y='amount', kind ='line',marker='x',title=recipient+" poly")
    predictiongraph=seperated.append({'date' : nextmonth , 'amount' : predicted} , ignore_index=True)
    predictiongraph.plot(x ='date', y='amount', kind ='line',marker='x',title=recipient+" linear")
    plt.show()
    totals.append([recipient,predicted])
    print(totals[-1])
total=0
for i in totals:
    total+=i[1]
print("Total expected spending is :"+str(total))
print("Total poly expected spending is :"+str(totalpoly))
