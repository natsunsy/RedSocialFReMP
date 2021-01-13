import numpy as np
import cv2
from keras.models import load_model
import base64
from PIL import Image
from io import BytesIO

# Take in base64 string and return PIL image
def stringToImage(base64_string):
    imgdata = base64.b64decode(base64_string)
    return Image.open(BytesIO(imgdata))

# convert PIL Image to an RGB image( technically a numpy array ) that's compatible with opencv
def toRGB(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)


def predict_emotion(image_from_web):
    emotion_dict= {'Molesto': 0, 'Triste': 5, 'Neutral': 4, 'Disgustado': 1, 'Sorpendido': 6, 'Asustado': 2, 'Feliz': 3}
    image_from_web = image_from_web.split(',')[1]
    cvimg = stringToImage(image_from_web)
    face_image = toRGB(cvimg)
    cv2.imshow('foto',face_image)

    face_image = cv2.resize(face_image, (48,48))
    face_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
    face_image = np.reshape(face_image, [1, face_image.shape[0], face_image.shape[1], 1])

    model = load_model("static/model_v6_23.hdf5")

    predicted_class = np.argmax(model.predict(face_image))

    label_map = dict((v,k) for k,v in emotion_dict.items()) 
    predicted_label = label_map[predicted_class]

    return predicted_label
#TODO GET ONLY THE FACE IN ORDER TO DETECT THE REAL EMOTION