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
            return {"loggedIn":True, "user":existent_user}
        else:
            return {"loggedIn":False,"message": "Contraseña incorrecta.","classStyle":"alert alert-danger"}

@app.route('/sign-up',methods=["POST"])
def sign_up():
    new_user = json.loads(request.data)
    if db.db.usuario_collection.find_one({"email":new_user["email"]}):
        if "token" in new_user:
            db.db.usuario_collection.update_one({"email":new_user["email"]},{"$set":{"token":new_user["token"]}})
            new_user = db.db.usuario_collection.find_one({"email":new_user["email"]})
            new_user =  JsonEncodeOne(new_user)
            return {"loggedIn":True, "user":new_user}
        else:
            return {"message": "Ya existe una cuenta con el correo que has usado. Por favor, intente con otro correo.","classStyle":"alert alert-danger"}
    else:
        db.db.usuario_collection.insert_one(new_user)
        if "token" in new_user:
            new_user = db.db.usuario_collection.find_one({"email":new_user["email"]})
            new_user =  JsonEncodeOne(new_user)
            return {"loggedIn":True, "user":new_user}
        return {"message": "¡Te has registrado con éxito! ","classStyle":"alert alert-success"}

@app.route('/photo',methods=["POST"])
def photo():
    data = json.loads(request.data)
    userId = objectid.ObjectId(data["userId"])
    image_from_web = data["photo"]
    if(image_from_web):
        feeling = predict_emotion(image_from_web)
        db.db.usuario_collection.update_one({"_id":userId},{"$set":{"feeling":feeling}})
        user = db.db.usuario_collection.find_one({"_id":userId})
        user = JsonEncodeOne(user)
        return {"loggedIn":True,"user":user}
    else:
        return None

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
    
@app.route('/inicio/posts/',methods=["POST"])
def add_post():
    new_post = json.loads(request.data)
    userId = objectid.ObjectId(new_post["userId"])
    new_post["userId"] = userId
    db.db.post_collection.insert_one(new_post)
    new_post = JsonEncodeOne(new_post)
    return {"post":new_post}

@app.route('/inicio/posts/<userId>/',methods=['GET'])
def get_posts(userId):
    userId = objectid.ObjectId(userId)
    posts = [post for post in db.db.post_collection.find({"userId":userId})]
    posts.reverse()                                                                                                                                
    posts = JsonEncoder(posts)
    return {"posts":posts}

@app.route('/inicio/posts/<userId>/<_id>',methods=['DELETE'])
def delete_post(userId,_id):
    userId = objectid.ObjectId(userId)
    _id = objectid.ObjectId(_id)
    db.db.post_collection.delete_one({"userId":userId,"_id":_id})
    return {"post":{}}

@app.route('/perfil/<userId>',methods=['GET'])
def get_user(userId):
    userId = objectid.ObjectId(userId)
    user = db.db.usuario_collection.find_one({"_id":userId})
    user = JsonEncodeOne(user)
    return {"user":user}