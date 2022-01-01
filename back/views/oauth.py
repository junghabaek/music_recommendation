from flask import Blueprint, redirect, request, jsonify
from models import Users, db
import requests
import os

bp = Blueprint('oauth', __name__)

# 카카오 로그인
@bp.route('/kakao')
def kakao():
  client_id = os.environ['KAKAO_RESTAPI_KEY']
  redirect_uri = 'http://localhost:8000/callback/kakao'
  kakao_uri = f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
  
  return redirect(kakao_uri)

# 인증 후 콜백 uri
@bp.route('/callback/kakao')
def callback():
  # 인증 후 코드 추출
  code = request.args["code"]

  client_id = os.environ['KAKAO_RESTAPI_KEY']
  redirect_uri = "http://localhost:8000/callback/kakao"
  
  kakao_oauthurl = 'https://kauth.kakao.com/oauth/token'
  data = {
    'grant_type': 'authorization_code',
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    'code': code,
  }

  # 코드를 이용해 access_token 추출
  token_request = requests.post(kakao_oauthurl, data)
  token_json = token_request.json()
  # error가 발생한 경우
  if 'error' in token_json:
    response = {
        'result': 'kakao_login_error',
        'info': '로그인 도중 에러가 발생했습니다.'
      }
    return jsonify(response)
  # 토큰 추출
  access_token = token_json["access_token"]

  # 토큰을 이용해 사용자 정보 가져오기
  body = {
    "Authorization": f"Bearer {access_token}"
  }
  profile_request = requests.post('https://kapi.kakao.com/v2/user/me', headers=body)
  data = profile_request.json()

  nickname = data["properties"]['nickname']
  
  # db에 닉네임 저장
  Netflix, Disney, Prime, Hulu = [0, 0, 0, 0]
  email = 'kakao'
  password = 'kakao'
  new_user = Users(email, nickname,password, Netflix, Disney, Prime, Hulu)
  db.session.add(new_user)
  db.session.commit()

  # 유저 정보 전달하기
  user = Users.query.filter(Users.nickname == nickname).first()

  response = {
    'result': 'login_success',
    'user_id': user.user_id,
    'nickname': user.nickname,
    'ott': [0, 0, 0, 0]
  }

  return jsonify(response)




  

