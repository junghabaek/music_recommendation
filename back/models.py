from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
  __tablename__ = "Users"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  email = db.Column(db.String(100), nullable=True)
  nickname = db.Column(db.String(50), nullable=True)
  password = db.Column(db.String(200), nullable=False)
  Netflix = db.Column(db.Boolean, nullable=False, default=False)
  Disney = db.Column(db.Boolean, nullable=False, default=False)
  Prime = db.Column(db.Boolean, nullable=False, default=False)
  Hulu = db.Column(db.Boolean, nullable=False, default=False)

  def __init__(self, email, nickname, password, Netflix, Disney, Prime, Hulu):
      self.email = email
      self.nickname = nickname
      self.password = password
      self.Netflix = Netflix
      self.Disney = Disney
      self.Prime = Prime
      self.Hulu = Hulu


class Movies(db.Model):
  __tablename__ = "Movies"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  movie_title = db.Column(db.String(150), nullable=True)
  movie_year = db.Column(db.Integer, nullable=True)
  movie_director = db.Column(db.String(150), nullable=True)
  sound_director = db.Column(db.String(150), nullable=True)
  imdb = db.Column(db.Float)
  Netflix = db.Column(db.Boolean)
  Hulu = db.Column(db.Boolean)
  Prime = db.Column(db.Boolean)
  Disney = db.Column(db.Boolean)
  country=db.Column(db.String(150), nullable=True)
  Language = db.Column(db.String(150), nullable=True)
  runtime= db.Column(db.String(10), nullable=True)
  movie_age_rating = db.Column(db.String(10), nullable=True)
  poster_url = db.Column(db.String(200), nullable=True)
  like_count = db.Column(db.Integer, default=0)



class Songs(db.Model):
  __tablename__ = "Songs"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  song_title = db.Column(db.String(150), nullable=False)
  movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
  artist = db.Column(db.String(150), nullable=False)


class Favorites (db.Model):
  __tablename__ = "Favorites"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
  movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

  def __init__(self, user_id, movie_id):
      self.user_id = user_id
      self.movie_id = movie_id


# 여기는 아직은 옵셔널입니다
'''
class Comments (db.Model):
  __tablename__ = "Comments"
  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
  movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
  comment=db.Column(db.Text(), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

  def __init__(self, user_id, movie_id, comment, time):
      self.user_id = user_id
      self.movie_id = movie_id
      self.comment = comment

'''
