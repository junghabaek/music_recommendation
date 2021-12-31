# 유저가 장르를 선택하고 최종 결과를 확인하는 라우터
from flask import Blueprint, json, request, session, jsonify
from models import Movies, Genres, Songs
from random import randint

bp = Blueprint('service', __name__, url_prefix='/filter')

# 장르에 따라 랜덤으로 한개의 영화 id와 genre제목을 추출해주는 함수
def select_movie_by_genre(genre_id):
  movie_lists = Genres.query.filter(Genres.genre_id == genre_id).all()

  # movie_lists에서 랜덤으로 한개를 뽑는다.
  random_index = randint(0, len(movie_lists)-1)
  selected_movie = movie_lists[random_index]

  return selected_movie.movie_id, selected_movie.genre



# 처음 유저가 서비스를 시작했을때 장르를 선택하게 하는 부분에 필요한 정보를 주는 api이다.
# 음원 주소, 음원 title, 영화 포스터 정보를 response에 담아서 주면 된다.
@bp.route('/genre')
def send_music_data():
  # 장르 테이블에서 5개의 장르를 고르고 리스트 형태로 받아온다.
  # Comedy(2)  Thriller(3)   Romance(4)  Action(5)   Sci-Fi(12) 선택  
  genre_ids = [2, 3, 4, 5, 12]
  
  # 데이터를 찾는 과정에서 음원이나 포스터데이터가 없으면 다시 반복한다.
  
  movie_ids = []  # 선택한 영화가 중복인지 체크하기 위한 리스트
  response = []   # 최종 보낼 데이터를 담을 리스트
  index = 0
  while index < len(genre_ids):
    data = {}  # 하나의 데이터 정보가 담길 예정  {'장르': 'Comedy', '트랙주소': 'preview_url', '포스터': 'poster_url', '트랙이름': 'track_name'} 의 형태

    # 각 장르 아이디를 이용해 영화 id와 장르를 가져온다.
    genre_id = genre_ids[index]
    movie_id, movie_genre = select_movie_by_genre(genre_id)

    # 만약 이미 선택한 아이디라면 다시 뽑는다.
    while movie_id in movie_ids:
      movie_id, movie_genre = select_movie_by_genre(genre_id)
    
    movie_ids.append(movie_id)
    
    # 찾은 movie_id를 통해 movies테이블에서 poster_url를 , songs테이블에서 preview_url와 track_name을 가져온다.
    # 이때 찾는 값들이 없다면 다시 처음으로 돌아가고 모든 값들이 있다면 index값을 1 증가 시킨다.
    movie = Movies.query.filter(Movies.id == movie_id).first()
    if movie.poster_url == '':
      continue

    song = Songs.query.filter(Songs.movie_id == movie_id).first()
    if song.preview_url == '' or song.track_name == '':
      continue

    # 빈 값이 없는것을 확인했다면 data객체에 추가해준다.
    data['장르'] = movie_genre
    data['트랙주소'] = song.preview_url
    data['포스터'] = movie.poster_url
    data['트랙이름'] = song.track_name

    # response에 추가해주고 index를 1 증가시킨다.
    response.append(data)
    index += 1

  return jsonify(response)


# service/movies
@bp.route('/movies')
def send_movies_list():

  # 유저가 선택한 후 12개의 영화 목록을 보내준다.
  # 유저가 선택한 장르 기반으로 보여준다.
  movie1 = {
    'id': 'movie_id',
    'movie_title': 'movie_title',
    'movie_director': 'movie_director',
    'sound_director': 'sound_director',
    'img_url': 'img_url',
  }

  response = [movie1] * 12
  return jsonify(response)