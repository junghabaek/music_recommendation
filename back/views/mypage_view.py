from flask import Blueprint, json, request, session, jsonify
#from models import Users, db


bp = Blueprint('mypage', __name__, url_prefix='/mypage')

#user_id는 get으로 받아온 값으로 추후에 query에 이용
@bp.route('/{user_id}', methods=['GET'])
def showData():
    
    response = {
        'id' : 'movie_id',
        'movie_title' : '통신완료 영화제목',
        'movie_director' : '통신완료 영화감독',
        'sound_director' : '통신완료 음향감독',
        'movie_description': '통신완료 영화 줄거리',
        'img_url': '통신완료 이미지 주소입니다.'

    }

    return jsonify(response)