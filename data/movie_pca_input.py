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
    sql = 'insert into `Movie_pcas` (`movie_id`, `movie_title`, `x`, `y`) values (%s, %s, %s, %s)'

    with open('pca_with_id.csv') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        print(row)
        cursor.execute(sql, tuple(row))
      
  connection.commit()

