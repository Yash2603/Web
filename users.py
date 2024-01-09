from datetime import datetime
from flask import Flask, request
import pymongo
import bcrypt
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import ObjectId, PyMongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['cloggynotes']

def login(email_id, password):
    db_client = db.get_collection('users')   

    # find the data from the database
    email_id_found = db_client.find_one({'email_id': email_id})        
    print("email_id is ",email_id_found)
    email_id_val=""
    passwordcheck=""
    if email_id_found:
        email_id_val = email_id_found['email_id']
        passwordcheck = email_id_found['password']
        user_id = email_id_found['_id']
    else:
        return {"status": 401,
                    "data": "Email id or Password Error"}

    # decodes the password and check       
    if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):        
        
        db_client = db['notes']
        temp_user_id=str(user_id).strip('"')
        # find the user_id and active_flag:True from the notes collection in database
        notes_found = db_client.find({'user_id':temp_user_id, 'active_flag':True})
        print("user_id is",user_id)                                     
        print("Notes found",notes_found)
        notes=[]
        for i in notes_found:
            notes.append(i)
            print("notes found",i)

        temp = []
        for i in notes:
            key_values = i.items()
            temp.append({str(key): str(value) for key, value in key_values})
            
        return {'status': 200, 
                    'data': 'login success', 'notes':temp,'user_id':str(user_id)}
    else:
        return {"status": 401,
                    "data": "Email id or Password Error"}


def register(user, email_id, password):
    db_client = db.get_collection('users')

    user_found = db_client.find_one({"name": user})
    email_id_found = db_client.find_one({"email_id": email_id})
    
    if email_id_found:
        message = 'There already is a user by that email'
        return {"status": 409,
                    "data": "User already exists"}
    
    else:
        # encode the password and stores in database
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())               
        user_input = {'name': user, 'email_id': email_id, 'password': hashed}
        
        # save the data in the database
        db_client.insert_one(user_input)                            

    return {'status': 200,
                    'data':'registered successfully'}
                    