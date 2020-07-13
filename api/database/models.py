from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime, date, time, timezone
import io
from flask import send_file
import base64
from tempfile import TemporaryFile

class BlogPost(db.Document):
    title = db.StringField(required=True, unique=True)
    subTitle = db.StringField()
    article = db.StringField(required=True)
    date_created = db.StringField()
    date_created_order = db.DateTimeField()
    added_by = db.ReferenceField('User')

    def save(self):
        if not self.date_created:
            self.date_created = (datetime.now(timezone.utc)).strftime("%A %d. %B %Y")
            self.date_created_order = datetime.now(timezone.utc)
        super(BlogPost, self).save()

class Staff(db.Document):
    name = db.StringField(required=True, unique=True)
    degree = db.StringField()
    title = db.StringField(required=True)
    description = db.StringField(required=True)
    photo = db.BinaryField()

    def staff_photo(self):
        tempFileObj = TemporaryFile(mode='w+b', suffix='jpg')
        tempFileObj.write(self.photo)
        tempFileObj.seek(0)

        return send_file(
            tempFileObj,
            as_attachment=False,
            attachment_filename='profile.jpg',
            mimetype='image/jpg'
        )

class Pages(db.Document):
    pageName = db.StringField(required=True, unique=True)
    pictures = db.ListField(db.StringField())
    body = db.StringField(required=True)

class VolunteerSignup(db.Document):
    firstName = db.StringField(required=True)
    lastName = db.StringField(required=True)
    address = db.StringField(required=True)
    address2 = db.StringField()
    city = db.StringField(required=True)
    state = db.StringField(required=True)
    zip = db.StringField(required=True)
    email = db.EmailField(required=True)
    phone = db.StringField(required=True)
    availability = db.StringField(required=True)
    interests = db.ListField(db.StringField(), required=True)

class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


class NewsletterEmail(db.Document):
    email = db.EmailField(required=True, unique=True)
