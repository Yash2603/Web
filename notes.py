from datetime import datetime
from flask import Flask, request
import pymongo
import bcrypt
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import ObjectId, PyMongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['cloggynotes']

def createNote(user_id, note_title, note_content):
    db_client = db.get_collection('notes')

    active_flag = True
    creation_date = datetime.now()
    mod_date = " "

    # save the data in the database
    db_client.insert_one({"user_id":user_id, "note_title":note_title,"note_content":note_content, "creation_date":creation_date,"mod_date":mod_date, "active_flag":active_flag})
    notes_found = db_client.find({'user_id':str(user_id), 'active_flag':True})
    print("user_id is",user_id)                                     
    print("Notes found",notes_found)

    notes=[]
    for i in notes_found:
        notes.append(i)
        print("notes found",i)
    print("notes",notes[0].items())
    temp = []
    for i in notes:
        key_values = i.items()
        temp.append({str(key): str(value) for key, value in key_values})
        
    return {'status': 200, 
                'data': 'note created successfully', 'notes':temp,'user_id':str(user_id)}
    


def updateNote(user_id,note_id, note_title, note_content):
    db_client = db.get_collection('notes')

    mod_date = datetime.now()
    temp_user_id=str(user_id).strip('"')

    # update the data in the database
    db_client.update_one({"_id":ObjectId(note_id)},{"$set":{'note_title':note_title,'note_content':note_content,'mod_date':mod_date}})
    notes_found = db_client.find({'user_id':temp_user_id,'active_flag': True })
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
                'data': 'note updated successfully', 'notes':temp,'user_id':str(user_id)}


def deleteNote(user_id,note_id):
    db_client = db.get_collection('notes')

    active_flag = False
    temp_user_id=str(user_id).strip('"')
    
    # update the active_flag as false, the note is in no use
    db_client.update_one({"_id":ObjectId(note_id)},{"$set":{'active_flag':active_flag,}})
    notes_found = db_client.find({'user_id':temp_user_id,'active_flag': True })
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
                'data': 'note deleted successfully', 'notes':temp,'user_id':str(user_id)}
   
