import pandas as pandas
import pymongo as pymongo

df = pandas.read_table('../data/data.txt')
lst = [dict([(colname, row[i]) for i, colname in enumerate(df.columns)]) for row in df.values]
for i in range(3):
  print lst[i]

con = pymongo.Connection('localhost', port = 8000)
data1 = con.db.data1
data1.drop()
for i in lst:
  data1.save(i)