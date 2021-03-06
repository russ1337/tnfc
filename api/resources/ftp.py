import os

from flask import Flask, request, abort, Response, jsonify, send_from_directory
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

UPLOAD_DIRECTORY = "/mnt/c/Users/russ1/Desktop/tnfc/react-flask-app/api/ftp_files/"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

class ListFiles(Resource):
    """Endpoint to list files on the server."""

    def get(self):
        files = []
        for filename in os.listdir(UPLOAD_DIRECTORY):
            path = os.path.join(UPLOAD_DIRECTORY, filename)
            if os.path.isfile(path):
                files.append(filename)
        return jsonify(files)

class GetFile(Resource):
    def get(self, path):
        """Download a file."""
        return send_from_directory(UPLOAD_DIRECTORY, path, as_attachment=False)

class PostFile(Resource):
    @jwt_required
    def post(self, articleId, filename):
        """Upload a file."""
        NEW_UPLOAD_DIRECTORY = UPLOAD_DIRECTORY + articleId

        if not os.path.exists(NEW_UPLOAD_DIRECTORY):
            os.makedirs(NEW_UPLOAD_DIRECTORY)

        if "/" in filename:
            # Return 400 BAD REQUEST
            abort(400, "no subdirectories directories allowed")

        with open(os.path.join(NEW_UPLOAD_DIRECTORY, filename), "wb") as fp:
            fp.write(request.data)

        # Return 201 CREATED
        return {'url': 'http://localhost:3500/api/files/' + articleId + '/' + filename}, 200
