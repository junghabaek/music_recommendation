from flask import Blueprint, json, request, session, jsonify
from models import Users
from werkzeug.security import check_password_hash, generate_password_hash
import re

bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/login', methods=["POST"])
def login():
  try:
    # result에 받은 데이터를 저장합니다.
    result = request.get_json()
    email = result['email']
    password = result['password']

    # id가 이메일 형식이 아닌 경우
    if re.search('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9-.]{1,63}$', email) is None:
      response = {
        'result': 'email_form_error',
        'info': '이메일 형식이 아닙니다.'
      }
    else:
      user = Users.query.filter(Users.email == email).first()
      # id가 존재하지 않는 경우
      if not user:
        response = {
          'result': 'email_notfound_error',
          'info': '아이디가 틀렸습니다.'
        }
      # 비밀번호가 틀린 경우
      elif not check_password_hash(user.password, password):
        response = {
          'result': 'password_error',
          'info': '비밀번호가 틀렸습니다.'
        }
      # 로그인이 성공한 경우
      else:
        # ott_list에 유저의 ott가입정보 넣기
        # 가입된 상태라면 ott_list에 추가해준다.
        ott_list = []
        if user.Netflix:
          ott_list.append('NetFlix')
        if user.Disney:
          ott_list.append('Disney')
        if user.Prime:
          ott_list.append('Prime')
        if user.Hulu:
          ott_list.append('Hulu')
        
        response = {
          'result': 'login_success',
          'user_id': user.user_id,
          'nickname': user.nickname,
          'ott': ott_list
        }
    return jsonify(response)

  except:
    return jsonify('에러에요~~')
