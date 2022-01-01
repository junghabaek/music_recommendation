from flask import Blueprint, json, request, session, jsonify
from models import Favorites, Movies, db

bp = Blueprint('result', __name__, url_prefix='/result')


@bp.route('/mypage', methods=['POST'])
def add_like_info():
    result = request.get_json()
    # 유저가 영화 선택 페이지에서 선택한 영화의 id
    user_selected_movie_id = result['user_selected_movie_id']
    #recommended_movie_id = result ['recommended_movie_id']
    movie_id = result['movie_id']  # 배열로 들어온다
    did_like = result['did_like']  # 배열로 들어온다

    # 좋아요가 눌리면, 좋아요 테이블에 어떤 유저가 좋아요를 눌렀는지 추가
    for i in range(len(movie_id)):
        if did_like[i] == 1:
            db.session.add(Favorites(session['login'], movie_id[i]))
            selected_movie = Movies.query.filter(
                Movies.id == movie_id[i]).first()
            selected_movie.like_count += 1
            db.session.commit()

    # mypage에서 필요한 정보들을 front에 보내줘야함

    # 유저가 좋아요 누른 영화의 리스트, 회원 메인페이지로 이동시에 사용될 로직입니다.
    favorite_movies_id = Favorites.query.filter(
        Favorites.user_id == session['login']).all()

    li = [x.movie_id for x in favorite_movies_id]

    favorite_movies = Movies.query.filter(
        Movies.id.in_(li)).all()

    #[{영화1}, {영화2},...]
    response = []
    for i in favorite_movies:
        response.append(
            {
                'favorite_movies_id': i.id,
                'favorite_movies_title': i.movie_title,
                'favorite_movies_poster_url': i.poster_url

            }
        )

    # 유저가 선택한 영화의 음악감독들이 참여한 영화를 보여주는 로직...
    # 빼야할것같은...
    # user_selected_sound_director = Movies.query.filter(
    #     Movies.id == user_selected_movie_id).first().sound_director
    # user_selected_sound_director_list = Movies.query.filter(
    #     Movies.sound_director == user_selected_sound_director).all()
    # for i in user_selected_sound_director_list:
    #     response.append(
    #         {
    #             'user_selected_movie_id': i.id,
    #             'user_selected_movies_title': i.movie_title,
    #             'user_selected_movies_poster_url': i.poster_url
    #         }
    #     )

    # 결과 페이지의 영화들의 음악감독들이 참여한 영화를 보여주는 로직
    # 빼야할것같은...
    # service_recommended_sound_director = Movies.query.filter(
    #     Movies.id.in_(movie_id)).all()

    # for i in service_recommended_sound_director:
    #     response.append(
    #         {
    #             'service_recommended_movie_id': i.id,
    #             'service_recommended_movie_title': i.movie_title,
    #             'service_recommended_movie_poster_url': i.poster_url
    #         }
    #     )

    return jsonify(response)
