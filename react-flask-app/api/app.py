from flask import Flask, render_template, request, json
import db
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sign-in',methods=['POST'])
def signIn():
    user = request.data
    print(user) #VALIDACIÓN DE USUARIO
    return render_template("index.html")

@app.route('/sign-up')
def signUp():
    return render_template("index.html")

@app.route('/register',methods=["POST"])
def register():
    new_user = json.loads(request.data)
    db.db.usuario_collection.insert_one(new_user)
    return render_template("index.html")
