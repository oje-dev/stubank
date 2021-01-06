import matplotlib.pyplot as plt
from pandas import DataFrame
from sklearn import linear_model
import datetime as dt
from getdata import getdata
import pandas as pd


df = getdata()
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
    # Make predictions using the testing set
    linearregression=linear_model.LinearRegression()
    linearregression.fit(X,y)
    nextmonth=X["date"].iloc[-1]+30
    predicted = linearregression.predict([[nextmonth]])[-1][0]
    if predicted<0:
        predicted=0
    print(predicted)
    #polynomial regression
    # poly_reg = PolynomialFeatures(degree=5)
    # X_poly = poly_reg.fit_transform(X)
    # pol_reg = LinearRegression()
    # pol_reg.fit(X_poly, y)
    # polyresult=pol_reg.predict(poly_reg.fit_transform([[nextmonth]]))[0][0]
    # print("poly",polyresult)
    # print("linear",predicted)
    # polynomialgraph=seperated.append({'date' : nextmonth , 'amount' : polyresult} , ignore_index=True)
    # polynomialgraph.plot(x ='date', y='amount', kind ='line',marker='x',title=recipient+" poly")
    # plt.show()
    predictiongraph=seperated.append({'date' : nextmonth , 'amount' : predicted} , ignore_index=True)
    predictiongraph.plot(x ='date', y='amount', kind ='line',marker='x',title=recipient+" predicted")
    plt.show()
    totals.append([recipient,predicted])
total=0
for i in totals:
    total+=i[1]
print("Total expected spending is :"+str(total))
