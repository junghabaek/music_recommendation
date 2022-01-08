from flask import Blueprint, json, request, session, jsonify
from models import Movies, db


bp = Blueprint('mypage', __name__, url_prefix='/back/result')

# user_id는 get으로 받아온 값으로 추후에 query에 이용


@bp.route('/mypage', methods=['POST'])
def showData():
    result = request.get_json()
    movie_id = result['movie_id']
    liked = result['liked']
    if liked==1:
        movie = Movies.query.filter(Movies.id == movie_id).first()
        movie.like_count += 1
        db.session.commit()
    else:
        movie = Movies.query.filter(Movies.id == movie_id).first()
        movie.like_count -= 1
        db.session.commit()

    response = {
        'like_now': movie.like_count

    }

    return jsonify(response)
