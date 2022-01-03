from flask import Blueprint, request, jsonify, session
from models import Movies, Songs, User_features, Features
from cluster import get_nearest_movie
from movie_plot import return_synopsis

bp = Blueprint('recommend', __name__, url_prefix='/filter')

@bp.route('/recommend/<int:movie_id>', methods=["GET"])
def recommend(movie_id):
  movie_id1, movie_id2, movie_id3, movie_id4 = get_nearest_movie(movie_id)

  # 각 영화의 값으로는 movie_id, movie_title, movie_year, movie_director, sound_director, imdb, 
  # ott정보 리스트, country, Language, runtime, movie_age_rating, poster_url 정보를 준다.
  # songs테이블에서는 album_name, track_name, preview_url 값을 준다.

  movie1 = Movies.query.filter(Movies.id == movie_id1).first()
  movie1_song = Songs.query.filter(Songs.movie_id == movie_id1).first()
  movie2 = Movies.query.filter(Movies.id == movie_id2).first()
  movie2_song = Songs.query.filter(Songs.movie_id == movie_id2).first()
  movie3 = Movies.query.filter(Movies.id == movie_id3).first()
  movie3_song = Songs.query.filter(Songs.movie_id == movie_id3).first()
  movie4 = Movies.query.filter(Movies.id == movie_id4).first()
  movie4_song = Songs.query.filter(Songs.movie_id == movie_id4).first()

  response = []
  movies = [[movie1, movie1_song], [movie2, movie2_song], [movie3, movie3_song], [movie4, movie4_song]]
  
  for movie, song in movies:
    data = {}
    data['movie_id'] = movie.id
    data['movie_title'] = movie.movie_title
    data['movie_year'] = movie.movie_year
    data['movie_director'] = movie.movie_director
    data['sound_director'] = movie.sound_director
    data['imdb'] = movie.imdb
    ott = {}
    ott['Netflix'] = movie.Netflix
    ott['Hulu'] = movie.Hulu
    ott['Prime'] = movie.Prime
    ott['Disney'] = movie.Disney
    data['ott'] = ott
    data['country'] = movie.country
    data['Language'] = movie.Language
    data['runtime'] = movie.runtime
    data['movie_age_rating'] = movie.movie_age_rating
    data['poster_url'] = movie.poster_url
    data['movie_plot'] = return_synopsis(movie.id)
    data['album_name'] = song.album_name
    data['track_name'] = song.track_name
    data['preview_url'] = song.preview_url

    response.append(data)
  
  # 로그인 상태라면 첫번째 추천 영화 user_features 테이블에 저장하기
  if session['login']:
    user_id = session['login']
    feature = Features.query.filter(Features.movie_id == movie_id1).first()
    user_feature = User_features(movie_id1, user_id, feature.acouticness,)

  return jsonify(response)