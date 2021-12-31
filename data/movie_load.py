import pymysql.cursors
import csv


connection = pymysql.connect(
    user='root',
    passwd='root',
    host='127.0.0.1',
    db='data_project',
    charset='utf8',
    cursorclass = pymysql.cursors.DictCursor
)

movie_dict = {
#     ID,Title,Year,Age,IMDb,Netflix,Hulu,Prime Video,Disney+,Directors,Country,Language,Runtime,music_director,poster
    2: 'ID',
    3: 'Title',
    4: 'Year',
    5: 'Age',
    6: 'IMDb',
    7: 'Netflix',
    8: 'Hulu',
    9: 'Prime Video',
    10: 'Disney+',
    11: 'Directors',
    12: 'Country',
    13: 'Language',
    14: 'Runtime',
    15: 'music_director',
    16: 'poster',

}

with connection:
    with connection.cursor() as cursor:
        sql = "insert into `movies` (`id`, `movie_title`, `movie_year`, `movie_age_rating`, `imdb`, `Netflix`, `Hulu`, `Prime`, `Disney`, `movie_director`, `country`, `Language`, `runtime`, `sound_director`, `poster_url`) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

        with open('modified_movie.csv') as datas:
            records = csv.DictReader(datas)
            for row in records:
                new_row = []
                for i in range(2, len(row)):
                    # print(row)
                    # print(i)
                    # print(movie_dict[2])
                    # print(row['id'])
                    if row[movie_dict[i]] == 'True':
                        # print(movie_dict[f"{i}"])
                        new_row.append(True)
                    elif row[movie_dict[i]] == 'False':
                        new_row.append(False)
                    else:
                        new_row.append(row[movie_dict[i]])

                if new_row[4] == '':
                    new_row[4] = 0.0

                # print(new_row)
                cursor.execute(sql, tuple(new_row))
        #         break
        #         cursor.execute(sql, tuple(row))
        # row = ['1', 'Inception', '2010', '13', '8.8', True, False, False, False, 'Christopher Nolan', 'United States,United Kingdom', 'English,Japanese,French', '148.0', 'Hans Zimmer', 'https://www.soundtrack.net/img/movie/30396.jpg']
        # cursor.execute(sql, tuple(new_row))
    connection.commit()

