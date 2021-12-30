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

with connection:
  with connection.cursor() as cursor:
    sql = 'insert into `songs` (`movie_id`, `music_director`, `album_name`, `track_name`, `popularity`, `acousticness`, `danceability`, `energy`, `tempo`, `valence`) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

    with open('album_popularity.csv') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        new_row = []
        for i in range(1, len(row)):
          if i == 2:
            continue
          new_row.append(row[i])
        # print(new_row)
        cursor.execute(sql, tuple(new_row))
      
  connection.commit()

