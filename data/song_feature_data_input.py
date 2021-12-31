import pymysql.cursors
import csv

connection = pymysql.connect(
  host = 'localhost',
  user = 'root',
  password = 'root',
  database = 'data_project',
  charset = 'utf8',
  cursorclass = pymysql.cursors.DictCursor
)
# ID,acousticness,danceability,energy,tempo,valence,instrumentalness,liveness,loudness,speechiness
with connection:
  with connection.cursor() as cursor:
    sql = 'insert into `features` (`movie_id`, `acousticness`, `danceability`, `energy`, `tempo`, `valence`, `instrumentalness`, `liveness`, `loudness`, `speechiness`) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

    with open('final-song-feature.csv') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        
        cursor.execute(sql, tuple(row))
      
  connection.commit()

