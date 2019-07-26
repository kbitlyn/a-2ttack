
import json

# read file
with open('oftenStressed.json', 'r') as myfile:
    data=myfile.read()

# parse file
obj = json.loads(data)

all = 0
sometimes = 0
rarely = 0
never = 0

for i in obj:
    if i["Event Category"] == "All the time":
        all += 1
    elif i["Event Category"] == "Sometimes":
        sometimes += 1
    elif i["Event Category"] == "Rarely":
        rarely += 1
    elif i["Event Category"] == "Never":
        never += 1

print(all)
