import numpy as np
from fer import FER
import cv2
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
    emotions={'happy':"feliz", 'sad':"triste", 'disgust':"disgustado", 'angry':"molesto", 'fear':"aterrado", 'neutral':"neutral",'surprise':"sorprendido"}
    image_from_web = image_from_web.split(',')[1]
    cvimg = stringToImage(image_from_web)
    image = toRGB(cvimg)
    detector = FER(mtcnn=True)
    emotion, score = detector.top_emotion(image)
    return emotions[emotion]