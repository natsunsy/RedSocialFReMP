from flask import Flask
from flask_pymongo import pymongo
from app import app

CONNECTION_STRING = "mongodb+srv://admin:dIH5rHKYkESeqyKr@redsocial.627dc.mongodb.net/redsocial?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('redsocial')
usuario_collection = pymongo.collection.Collection(db, 'usuario_collection')