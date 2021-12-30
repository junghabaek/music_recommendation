# 유저가 장르를 선택하고 최종 결과를 확인하는 라우터
from flask import Blueprint, json, request, session, jsonify

bp = Blueprint('service', __name__, url_prefix='/filter')

# service/music api
@bp.route('/genre')
def send_music_data():

  response = {
    'action': 'http://action',
    'romance': 'http://romance',
    'thriller': 'http://thriller',
    'comedy': 'http://comedy',
    'sf': 'http://sf',
  }

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