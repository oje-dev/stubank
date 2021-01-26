from startup import gen
from datehandler import addtoarray
import shlex
import csv

dates = gen()
leave = 0
print("Use /help for a list of commands")
while leave == 0:
    command = input("please enter a command...")
    commandsplit = shlex.split(command)
    if commandsplit[0] == "/help":
        print("Commands:\n \n")
        print("gen [generates payments]")
        print("    arguments: -d [date] (date of transaction (dd/mm/yyyy)")
        print("           -t [frequency] (M=monthy, W=weekly, D=Daily, OT=one time)")
        print("           -r [recipient] (string)")
        print("           -a [amount] (amount spent in £ (0.00))")
        print("    eg...      gen 01/01/2020 M 'Tesco' 100.00\n")
        print("export (filename) exports as a csv eg export johnSmith creates johnSmith.csv in gendata/out\n")
        print("exit [leaves program]")
    elif commandsplit[0] == "exit":
        print("Thankyou for using josh's bank data creator-inator!")
        leave = 1
    elif commandsplit[0] == "gen":
        date = commandsplit[1]
        freq = commandsplit[2]
        recipient = commandsplit[3]
        amount = commandsplit[4]
        dates = addtoarray(dates,date,freq,recipient,amount)
    elif commandsplit[0] == "export":
        filename="./out/"+commandsplit[1]+".csv"
        with open(filename, mode='w', newline='') as outputpath:
            spamWriter = csv.writer(outputpath, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            spamWriter.writerow(["recipient","date","amount"])
            for i in dates:
                spamWriter.writerow([i[0],i[1],i[2]])
            outputpath.close()
        print("Successfully exported!")
    else:
        print("invalid command, please use /help")
