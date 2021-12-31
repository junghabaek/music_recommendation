from flask import Blueprint, json, request, session, jsonify
from models import Favorites, Movies, db

bp = Blueprint('result', __name__, url_prefix='/result')

@bp.route('/mypage', methods=['GET'])
def add_like_info():
    result = request.get_json()
    movie_id = result['movie_id']
    did_like = result['did_like']

    # 좋아요가 눌리면, 좋아요 테이블에 어떤 유저가 좋아요를 눌렀는지 추가
    if did_like == 1:
        db.session.add(Favorites(session['login'], movie_id))
        selected_movie = Movies.query.filter(Movies.id == movie_id).first()
        selected_movie.like_count += 1
        db.session.commit()

    # mypage에서 필요한 정보들을 front에 보내줘야함

    # 유저가 좋아요 누른 영화의 리스트
    favorite_movies_id = Favorites.query.filter(
        Favorites.user_id == session['login']).all()
    favorite_movies = Movies.query.filter(
        Movies.id.in_(favorite_movies_id)).all()

    response = {
        'favorite_movies_title': favorite_movies.movie_title,

        'thriller': 'http://thriller',
        'comedy': 'http://comedy',
        'sf': 'http://sf',
    }

    return jsonify(response)
