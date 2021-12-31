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
    sql = 'insert into `songs` (`movie_id`, `music_director`, `album_name`, `track_name`, `preview_url`, `popularity`) values (%s, %s, %s, %s, %s, %s)'

    with open('final-song.csv', encoding='utf8') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        new_row = []
        for i in range(1, 8):
          if i == 2:
            continue
          new_row.append(row[i])
        # print(new_row)
        cursor.execute(sql, tuple(new_row))
      
  connection.commit()

