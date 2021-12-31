from flask import Flask
from models import db
from views import user_view, main_service, mypage_view
from flask_cors import CORS
from flask_migrate import Migrate


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost:3306/data_project"
app.secret_key = "root"

app.register_blueprint(user_view.bp)
app.register_blueprint(main_service.bp)
app.register_blueprint(mypage_view.bp)
CORS(app)

db.init_app(app)
Migrate().init_app(app, db)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
