from flask import Blueprint, json, request, session, jsonify
from models import Movies, db


bp = Blueprint('mypage', __name__, url_prefix='/')

#user_id는 get으로 받아온 값으로 추후에 query에 이용


@bp.route('/<int:movie_id>', methods=['GET'])
def showData(movie_id):

    movie=Movies.query.filter(Movies.id==movie_id).first()

    response = {
        'movie_id' : movie_id,
        'movie_title' : movie.movie_title,
        'movie_year' : movie.movie_year,
        'movie_director' : movie.movie_director,
        'sound_director' : movie.sound_director,
        'imdb' : movie.imdb,
        'Netflix' : movie.Netflix,
        'Hulu' : movie.Hulu,
        'Prime' : movie.Prime,
        'Disney' : movie.Disney,
        'country' : movie.country,
        'Language': movie.Language,
        'runtime' : movie.runtime,
        'movie_age_rating' : movie.movie_age_rating,
        'poster_url' : movie.poster_url,
        'like_count' : movie.like_count

    }

    return jsonify(response)
