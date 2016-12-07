from datetime import datetime
from collections import OrderedDict

phf = open("pH data.csv")
co2f = open("CO2data.csv")
tempf = open("Temperature data.csv")
salf = open("salinity data.csv")

phv = phf.read()
co2val = co2f.read()
tempval = tempf.read()
salfval = salf.read()

phf.close()
co2f.close()
tempf.close()
salf.close()

datei = 0
phi = 1
co2i = 2
tempi = 3
sali = 4

phl = []
for v in phv.split('\n'):
        l = v.split(',')
        l[0] = datetime.strptime(l[0], '%m/%d/%Y').date() 
        phl.append(l)

co2l = []
for v in co2val.split('\n'):
        l = v.split(',')
        l[0] = datetime.strptime(l[0], '%m/%d/%Y').date()
        co2l.append(l)

templ = []
for v in tempval.split('\n'):
        l = v.split(',')
        l[0] = datetime.strptime(l[0], '%m/%d/%Y').date()
        templ.append(l)

sall = []
for v in salfval.split('\n'):
        l = v.split(',')
        l[0] = datetime.strptime(l[0], '%m/%d/%Y').date()
        sall.append(l)

data = {}
for item in phl:
        data[item[0]] = [item[1]]

for item in co2l:
        if(item[0] in data.keys()):
                data[item[0]].append(item[1])
        else:
                data[item[0]] = ['null', item[1]]

for item in templ:
        if(item[0] in data.keys()):
                data[item[0]].append(item[1])
        else:
                data[item[0]] = ['null', 'null', str(item[1])]

for item in sall:
        if(item[0] in data.keys()):
                data[item[0]].append(item[1])
        else:
                data[item[0]] = ['null', 'null', 'null', str(item[1])]

keys = data.keys()
keys.sort()

newdata = []
for item in keys:
        a = [item.strftime('%m/%d/%Y')]
        a.extend(data[item])
        newdata.append(a)

sdata = []
for item in newdata:
        try:
                sdata.append(','.join(item))
        except Exception as e:
                print e
                print item
                exit(0)

ff = open('data.csv', 'w')
sstr = '\n'.join(sdata)
sstr = sstr.replace('\r', '')
ff.write(sstr)
ff.close()