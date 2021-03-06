import pymysql.cursors
import csv

genre_dic = {
  'Drama': 1,
  'Comedy': 2,
  'Thriller': 3,
  'Romance': 4,
  'Action': 5,
  'Horror': 6,
  'Crime': 7,
  'Adventure': 8,
  'Family': 9,
  'Mystery': 10,
  'Documentary': 11,
  'Sci-Fi': 12,
  'Fantasy': 13,
  'Biography': 14,
  'History': 15,
  'Animation': 16,
  'War': 17,
  'Music': 18,
  'Sport': 19,
  'Western': 20,
  'Musical': 21,
  'Short': 22,
  'News': 23,
  'Film-Noir': 24,
  'Reality-TV': 25,
  'Talk-Show': 26,
  'Game-Show': 27,
}

data = []
count = 0
with open('genres.csv') as datas:
  readers = csv.reader(datas, delimiter=',')
  next(readers)
  for reader in readers:
    for i in range(2, len(reader)):
      if reader[i] != '':
        count += 1
        data.append([int(reader[1]), reader[i], genre_dic[reader[i]]])

# csv파일로 저장할 2차원 데이터
print(data)

f = open('genre_table_data.csv', 'w')
writer = csv.writer(f)
writer.writerows(data)
f.close()
    