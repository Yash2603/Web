from datetime import datetime
from flask import Flask, request
import pymongo
import bcrypt
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import ObjectId, PyMongo

import users
import notes

app = Flask(__name__)
CORS(app)

# connection with database
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['cloggynotes']

@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    req=request.get_json()
    res = users.login(req['email_id'], req['password'])  
    return jsonify (res)
    
@app.route("/register", methods=["POST"]) 
@cross_origin(supports_credentials=True)
def register():
    req=request.get_json()
    res = users.register(req['username'], req['email_id'], req['password']) 
    return jsonify(res)
    
@app.route("/create-note", methods=["POST"])
@cross_origin(supports_credentials=True)
def createNote():
    req=request.get_json()
    res = notes.createNote(req['user_id'], req['note_title'], req['note_content'])
    return jsonify(res)

@app.route("/update-note", methods=["POST"])
@cross_origin(supports_credentials=True)
def updateNote():
    req=request.get_json()
    res = notes.updateNote(req['user_id'], req['note_id'], req['note_title'], req['note_content'])
    return jsonify(res)

@app.route("/delete-note", methods=["POST"])
@cross_origin(supports_credentials=True)
def deleteNote():
    req=request.get_json()
    res = notes.deleteNote(req['user_id'], req['note_id'])
    return jsonify(res)
    
if __name__ == "__main__":
   app.run(debug = False)


