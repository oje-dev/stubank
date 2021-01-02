import datetime

from dateutil.relativedelta import relativedelta


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
