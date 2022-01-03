import pymysql.cursors
import csv

# def utf_8_encoder(file):
#   for line in file:
#     yield line.encode('utf-8')

connection = pymysql.connect(
  host = 'localhost',
  user = 'root',
  password = 'ghwnsfl1',
  database = 'data_project',
  charset = 'utf8',
  cursorclass = pymysql.cursors.DictCursor
)

with connection:
  with connection.cursor() as cursor:
    sql = 'insert into `songs` (`movie_id`, `music_director`, `album_name`, `track_name`, `preview_url`, `popularity`) values (%s, %s, %s, %s, %s, %s)'

    with open('encode_song.csv', encoding='utf-8') as datas:
      records = csv.reader(datas, delimiter=',')
      next(records)
      for row in records:
        new_row = []
        for i in range(1, 8):
          if i == 2:
            continue
          new_row.append(row[i])
        # print(new_row)
        print(new_row)
        cursor.execute(sql, tuple(new_row))
      
  connection.commit()

