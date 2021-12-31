from flask import Blueprint, json, request, session, jsonify
from models import Users, db
from werkzeug.security import check_password_hash, generate_password_hash
import re

bp = Blueprint('users', __name__, url_prefix='/users')


def pwdValidation(pwd):
    special_char = ['!', '@', '#', '$', '%', '^', '&', '+', '=']

    if len(pwd) < 8:
        #('비밀번호는 최소 8자 이상이어야 합니다.')
        return False
    elif re.search('[0-9]+', pwd) is None:
        #('비밀번호는 최소 1개 이상의 숫자가 포함되어야 합니다.')
        return False
    elif re.search('[a-z]+', pwd) is None and re.search('[A-Z]+', pwd) is None:
        #('비밀번호는 최소 1개 이상의 영문자가 포함되어야 합니다.')
        return False
    elif not any(c in special_char for c in pwd):
        # (
        #     "비밀번호는 최소 1개 이상의 '!', '@', '#', '$', '%', '^', '&', '+', '=' 특수문자가 포함되어야 합니다.")
        return False
    return True


# 로그인 구현
@bp.route('/login', methods=["POST"])
def login():
  # try:
    # result에 받은 데이터를 저장합니다.
    result = request.get_json()
    email = result['email']
    password = result['password']

    # email을 통해 유저 정보 불러오기
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
        'user_id': user.id,
        'nickname': user.nickname,
        'ott': ott_list
      }
      session['login'] = user.id
    return jsonify(response)

  # except:
  #   return jsonify('에러에요~~')


# 로그아웃 구현하기
@bp.route('/logout')
def logout():
    session['login'] = None
    return jsonify('로그아웃 완료')


# 회원가입 구현
@bp.route('/signup', methods=["POST"])
def signup():
    # try:
    # result에 받은 데이터를 저장합니다.
    result = request.get_json()
    email = result['email']
    password = result['password']
    #password2 = result['password2']
    hash_pw = generate_password_hash(password)
    nickname = result['userName']
    ott = result['ott']

    # ott 정보넣기
    Netflix = 0
    Disney = 0
    Prime = 0
    Hulu = 0
    for arg in ott:
        if arg == 'Netflix':
            Netflix = 1
        elif arg == 'disney':
            Disney = 1
        elif arg == 'prime':
            Prime = 1
        else:
            Hulu = 1

    #Netflix = True if result['Netflix'] is not None else False
    print(result)
    # 이메일이 데이터베이스에 있다면 not None 반환,
    # 이메일이 데이터베이스에 없다면 None 반환

    already_existing_email = Users.query.filter(Users.email == email).first()

    # 이미 가입된 이메일이라면
    if already_existing_email is not None:
        response = {
            'result': 'existing_email',
            'info': '이미 가입된 이메일입니다.'
        }

    # 패스워드가 포맷에 맞지 않는다면

    elif not pwdValidation(password):
        response = {
            'result': 'pw_format_error',
            'info': '비밀번호 형식에 맞지 않습니다.'
        }

    # 모든 검사를 통과했다면

    else:

        # Users table에 회원 row 추가합니다.

        db.session.add(Users(email, nickname, hash_pw,
                       Netflix, Disney, Prime, Hulu))
        db.session.commit()

        response = {
            'result': 'sign_up_success',
            'info': '회원가입이 성공적으로 됐습니다.'
        }

    return jsonify(response)

    # except:
    #     return jsonify('에러에요~~')
