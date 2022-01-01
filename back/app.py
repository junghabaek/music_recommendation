from flask import Flask
from models import db
from views import user_view, main_service, mypage_view, result_view, recommend_view
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://{os.environ.get('DB_USER')}:{os.environ.get('DB_PASSWORD')}@localhost:3306/{os.environ.get('DB_DATABASE')}"
app.secret_key = os.environ.get('SESSION_KEY')

app.register_blueprint(user_view.bp)
app.register_blueprint(main_service.bp)
app.register_blueprint(mypage_view.bp)
app.register_blueprint(result_view.bp)
app.register_blueprint(recommend_view.bp)
CORS(app)

db.init_app(app)
Migrate().init_app(app, db)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
