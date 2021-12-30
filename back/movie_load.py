import pymysql
import csv


db_connection = pymysql.connect(
    user='root',
    passwd='root',
    host='127.0.0.1',
    db='data_project',
    charset='utf8'
)

con = db_connection
cur = con.cursor(pymysql.cursors.DictCursor)

with open('modified_movie.csv', encoding='utf-8') as datas:
    records = csv.DictReader(datas)
    result = [(w['ID'], w['Title'], w['Year'], w['Directors'], w['music_director'],
               w['IMDb'], w['Netflix'], w['Hulu'], w['Prime Video'], w['Disney+'], w['Country'],  w['Language'], w['Runtime'], w['Age'], w['poster']) for w in records]

cur.executemany("insert into movies(ID, Title, Year, Age, IMDb, Netflix, Hulu, Prime Video, Disney+, Directors, Country, Language, Runtime, music_director) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", result)
con.commit()
con.close()
