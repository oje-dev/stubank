import datetime

from dateutil.relativedelta import relativedelta


def gendates(startdate, enddate):
    sd = startdate.split("/")
    ed = enddate.split("/")
    dt = datetime.datetime(int(sd[2]), int(sd[1]), int(sd[0]))
    end = datetime.datetime(int(ed[2]), int(ed[1]), int(ed[0]))
    step = datetime.timedelta(days=1)
    result = []
    while dt < end:
        # recipient, date , amount
        result.append(["", dt.strftime('%Y-%m-%d'), 0.00])
        dt += step
    print("successfully generated dates...")
    return (result)


def addtoarray(dates, date, freq, recipient, amount):
    # (M=monthy, W=weekly, D=Daily, WD=weekday, WE=weekend, OT=one time)
    sd = date.split("/")
    ed = dates[-1][1].split("-")
    dt = datetime.datetime(int(sd[2]), int(sd[1]), int(sd[0]))
    end = datetime.datetime(int(ed[0]), int(ed[1]), int(ed[2]))
    if dt > end:
        print("Error: Date not in range...")
    result = []
    if freq == "M":
        step = relativedelta(months=1)
    elif freq == "W":
        step = datetime.timedelta(weeks=1)
    elif freq == "D":
        step = datetime.timedelta(days=1)
    elif freq == "OT":
        step = datetime.timedelta(days=5000)
    while dt < end:
        # recipient, date , amount
        result.append([recipient, dt.strftime('%Y-%m-%d'), amount])
        dt += step

    # gen 21/06/2001 W 'Tesco' 100.00

    for i in result:
        for x in dates:
            if x[1]==i[1]:
                if x[0]=="":
                    dates[dates.index(x)]=i
                else:
                    dates.insert(dates.index(x),i)
                break

    print("Transactions Successfully generated")
    return dates
