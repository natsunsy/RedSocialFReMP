from flask import Flask, render_template, request, json, jsonify
from bson import json_util,objectid
import db
from emotion_recognition import predict_emotion
import datetime
app = Flask(__name__)

def JsonEncoder(mongoArray):
    for obj in mongoArray:
        for key in obj:
            if type(obj[key])==objectid.ObjectId:
                obj[key] = json_util.dumps(obj[key])[10:-2]
    return mongoArray

def JsonEncodeOne(mongoObj):
    for key in mongoObj:
            if type(mongoObj[key])==objectid.ObjectId:
                mongoObj[key] = json_util.dumps(mongoObj[key])[10:-2]
    return mongoObj

@app.route('/',methods=['POST'])
def sign_in():
    user = json.loads(request.data)
    existent_user = db.db.usuario_collection.find_one({"email":user["email"]})
    existent_user = JsonEncodeOne(existent_user)
    if not existent_user:
        return {"loggedIn":False,"message": "El correo no existe. Por favor, intente con otro correo.","classStyle":"alert alert-danger"}
    else:
        if user["password"] == existent_user["password"]:
            return jsonify({"loggedIn":True, "userId":existent_user["_id"]})
        else:
            return {"loggedIn":False,"message": "Contraseña incorrecta.","classStyle":"alert alert-danger"}

@app.route('/sign-up',methods=["POST"])
def sign_up():
    new_user = json.loads(request.data)
    if db.db.usuario_collection.find_one({"email":new_user["email"]}):
        return {"message": "Ya existe una cuenta con el correo que has usado. Por favor, intente con otro correo.","classStyle":"alert alert-danger"}
    else:
        db.db.usuario_collection.insert_one(new_user)
        return {"message": "¡Te has registrado con éxito! ","classStyle":"alert alert-success"}

@app.route('/photo',methods=["POST"])
def photo():
    image_from_web = json.loads(request.data)
    feeling = predict_emotion(image_from_web["photo"])
    return {"feeling":feeling}

@app.route('/diario/tareas/',methods=["POST"])
def add_task():
    new_task = json.loads(request.data)
    userId = objectid.ObjectId(new_task["userId"])
    new_task["userId"] = userId
    db.db.diario_collection.insert_one(new_task)
    new_task = JsonEncodeOne(new_task)
    return {"task":new_task}

@app.route('/diario/tareas/<userId>/<date>',methods=['GET'])
def get_tasks(userId,date):
    userId = objectid.ObjectId(userId)
    tasks = [task for task in db.db.diario_collection.find({"userId":userId,"date":date})]                                                                                                                                
    tasks = JsonEncoder(tasks)
    return {"tasks":tasks}

@app.route('/diario/tareas/<userId>/<_id>',methods=['DELETE'])
def delete_task(userId,_id):
    userId = objectid.ObjectId(userId)
    _id = objectid.ObjectId(_id)
    db.db.diario_collection.delete_one({"userId":userId,"_id":_id})
    return {"task":{}}

@app.route('/diario/tareas/<userId>/<_id>',methods=['PUT'])
def update_task(userId,_id):
    userId = objectid.ObjectId(userId)
    _id = objectid.ObjectId(_id)
    prevTask = db.db.diario_collection.find_one({"userId":userId,"_id":_id})
    state = not prevTask['done']
    db.db.diario_collection.update_one({"userId":userId,"_id":_id},{"$set":{"done":state}})
    newTask = db.db.diario_collection.find_one({"userId":userId,"_id":_id})
    newTask = JsonEncodeOne(newTask)
    return {"task":newTask}