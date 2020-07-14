from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_restful import Api
from resources.routes import initialize_routes
from resources.errors import errors
from database.db import initialize_db

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
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

app.run(host="0.0.0.0", port=3500)
