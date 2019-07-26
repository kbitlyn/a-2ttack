
import json

# read file
with open('oftenStressed.json', 'r') as myfile:
    stress=myfile.read()

# parse file
obj = json.loads(stress)

all = 0
sometimes = 0
rarely = 0
never = 0

##########################

other = 0
teachers = 0
college = 0
relationships = 0
friends = 0
parents = 0

for i in obj:
    if i["Event Category"] == "All the time":
        all += 1
    elif i["Event Category"] == "Sometimes":
        sometimes += 1
    elif i["Event Category"] == "Rarely":
        rarely += 1
    elif i["Event Category"] == "Never":
        never += 1

############################

with open('whatStress.json', 'r') as myfile:
    stress=myfile.read()

obj = json.loads(stress)

for i in obj:
    if i["Event Category"] == "Other":
        other += 1
    elif i["Event Category"] == "Teachers":
        teachers += 1
    elif i["Event Category"] == "College":
        college += 1
    elif i["Event Category"] == "Relationships":
        relationships += 1
    elif i["Event Category"] == "Friends":
        friends += 1
    elif i["Event Category"] == "Parents":
        parents += 1


print(all)
print(relationships)
