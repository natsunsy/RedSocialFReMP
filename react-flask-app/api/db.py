from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://rlimachip:9FIjNT5EsVg854HW@redsocial.627dc.mongodb.net/test"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('redsocial')
usuario_collection = pymongo.collection.Collection(db, 'usuario_collection')
diario_collection = pymongo.collection.Collection(db,'diario_collection')
post_collection = pymongo.collection.Collection(db,'post_collection')