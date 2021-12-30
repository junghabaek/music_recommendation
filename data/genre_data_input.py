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
    sql = 'insert into `genres` (`movie_id`, `genre`, `genre_id`) values (%s, %s, %s)'

    with open('genre_table_data.csv') as datas:
      records = csv.reader(datas, delimiter=',')
      for row in records:
        if row == []:
          continue
        cursor.execute(sql, tuple(row))
  
  connection.commit()

