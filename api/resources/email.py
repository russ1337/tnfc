from flask import request, render_template
from flask_jwt_extended import create_access_token, decode_token
from database.models import User
from flask_restful import Resource
import datetime
from resources.errors import InternalServerError
from threading import Thread


class SendEmail(Resource):
    def post(self):
        try:
            body = request.get_json()


            return send_email('Password reset successful',
                              sender='atsuker91@gmail.com',
                              recipients='russ1337@gmail.com',
                              text_body='Password reset was successful',
                              html_body='<p>Password reset was successful</p>')


        except Exception as e:
            raise InternalServerError


def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except ConnectionRefusedError:
            raise InternalServerError("[MAIL SERVER] not working")


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    Thread(target=send_async_email, args=(app, msg)).start()
