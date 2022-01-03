from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True, nullable=False)
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

    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True, nullable=False)
    movie_title = db.Column(db.String(150), nullable=True)
    movie_year = db.Column(db.Integer, nullable=True)
    movie_director = db.Column(db.Text, nullable=True)
    sound_director = db.Column(db.String(150), nullable=True)
    imdb = db.Column(db.Float)
    Netflix = db.Column(db.Boolean)
    Hulu = db.Column(db.Boolean)
    Prime = db.Column(db.Boolean)
    Disney = db.Column(db.Boolean)
    country = db.Column(db.String(150), nullable=True)
    Language = db.Column(db.String(150), nullable=True)
    runtime = db.Column(db.String(10), nullable=True)
    movie_age_rating = db.Column(db.String(10), nullable=True)
    poster_url = db.Column(db.String(200), nullable=True)
    like_count = db.Column(db.Integer, default=0)


class Songs(db.Model):
    __tablename__ = "Songs"

    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey(
        'Movies.id'), nullable=False)
    music_director = db.Column(db.String(150))
    album_name = db.Column(db.String(300))
    track_name = db.Column(db.String(300))
    preview_url = db.Column(db.String(300))
    popularity = db.Column(db.Integer)

    def __init__(self, movie_id, movie_director, album_name, track_name, preview_url, popularity):
        self.movie_id = movie_id
        self.movie_director = movie_director
        self.album_name = album_name
        self.track_name = track_name
        self.preview_url = preview_url
        self.popularity = popularity


class Features(db.Model):
  __tablename__ = "Features"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
  acousticness = db.Column(db.Float)
  danceability = db.Column(db.Float)
  energy = db.Column(db.Float)
  tempo = db.Column(db.Float)
  valence = db.Column(db.Float)
  instrumentalness = db.Column(db.Float)
  liveness = db.Column(db.Float)
  loudness = db.Column(db.Float)
  speechiness = db.Column(db.Float)

  def __init__(self, movie_id, acousticness, danceability, energy, tempo, valence, instrumentalness, liveness, loudness, speechiness):
    self.movie_id = movie_id
    self.acousticness = acousticness
    self.danceability = danceability
    self.energy = energy
    self.tempo = tempo
    self.valence = valence
    self.instrumentalness = instrumentalness
    self.liveness = liveness
    self.loudness = loudness
    self.speechiness = speechiness
  
  def get_feature(self, feature):
    if feature == 'danceability':
      return self.danceability
    elif feature == 'energy':
      return self.energy
    elif feature == 'tempo':
      return self.tempo
    elif feature == 'valence':
      return self.valence


class Favorites (db.Model):
    __tablename__ = "Favorites"

    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey(
        'Movies.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, user_id, movie_id):
        self.user_id = user_id
        self.movie_id = movie_id


class Genres(db.Model):
    __tablename__ = "Genres"

    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey(
        'Movies.id'), nullable=False)
    genre = db.Column(db.String(30), nullable=False)
    genre_id = db.Column(db.Integer, nullable=False)

    def __init__(self, movie_id, genre, genre_id):
        self.movie_id = movie_id
        self.genre = genre
        self.genre_id = genre_id


class User_features (db.Model):

  __tablename__ = "User_features"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
  movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
  acousticness = db.Column(db.Float)
  danceability = db.Column(db.Float)
  energy = db.Column(db.Float)
  tempo = db.Column(db.Float)
  valence = db.Column(db.Float)
  instrumentalness = db.Column(db.Float)
  liveness = db.Column(db.Float)
  loudness = db.Column(db.Float)
  speechiness = db.Column(db.Float)

  def __init__(self, user_id, movie_id, acousticness, danceability, energy, tempo, valence, instrumentalness, liveness, loudness, speechiness):
    self.user_id= user_id
    self.movie_id = movie_id
    self.acousticness = acousticness
    self.danceability = danceability
    self.energy = energy
    self.tempo = tempo
    self.valence = valence
    self.instrumentalness = instrumentalness
    self.liveness = liveness
    self.loudness = loudness
    self.speechiness = speechiness


# 여기는 아직은 옵셔널입니다

# class Comments (db.Model):
#   __tablename__ = "Comments"
#   id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
#   user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
#   movie_id = db.Column(db.Integer, db.ForeignKey('Movies.id'), nullable=False)
#   comment=db.Column(db.Text(), nullable=False)
#   created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

#   def __init__(self, user_id, movie_id, comment, time):
#       self.user_id = user_id
#       self.movie_id = movie_id
#       self.comment = comment
