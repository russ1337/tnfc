from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from database.db import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
from resources.errors import errors

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
mail = Mail(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://admin:supersi1a@cluster0-quirc.mongodb.net/TNFC?retryWrites=true&w=majority'
}

initialize_db(app)
initialize_routes(api)

app.run(port=3500)
