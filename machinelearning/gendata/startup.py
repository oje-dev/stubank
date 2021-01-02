import datehandler


def gen():
    print("welcome to data generator... by josh mithoo")
    startdate = input("Please enter start date of test data dd/mm/yyyy")
    enddate = input("Please enter end date of test data dd/mm/yyyy")
    print("...")
    print("Generating dates...")
    result = datehandler.gendates(startdate, enddate)
    return result
