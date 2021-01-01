from flask import Flask, render_template, request, json
import db
app = Flask(__name__)

@app.route('/',methods=['POST','GET'])
def signIn():
    user = json.loads(request.data)
    existent_user = db.db.usuario_collection.find_one({"email":user["email"]})
    if not existent_user:
        return {"loggedIn":False,"message": "El correo no existe. Por favor, intente con otro correo.","classStyle":"alert alert-danger"}
    else:
        if user["password"] == existent_user["password"]:
            print({"status":"202 Ha ingresado con éxito."})
            return {"loggedIn":True}
        else:
            return {"loggedIn":False,"message": "Contraseña incorrecta.","classStyle":"alert alert-danger"}

@app.route('/sign-up',methods=["POST"])
def signUp():
    new_user = json.loads(request.data)
    if db.db.usuario_collection.find_one({"email":new_user["email"]}):
        return {"message": "Ya existe una cuenta con el correo que has usado. Por favor, intente con otro correo.","classStyle":"alert alert-danger"}
    else:
        db.db.usuario_collection.insert_one(new_user)
        return {"message": "¡Te has registrado con éxito! ","classStyle":"alert alert-success"}