import jwt
import datetime
from django.conf import settings
import jwt

def generate_access_token(user):
    access_token_payload = {
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
        'iat': datetime.datetime.utcnow(),
    }

    access_token = jwt.encode(
        access_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return access_token


def generate_refresh_token(user):
    refresh_token_payload = {
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
        'iat': datetime.datetime.utcnow(),
    }

    refresh_token = jwt.encode(
        refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

    return refresh_token

def getPayload(request, target):
    access_token = request.COOKIES.get("access_token")
    payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
    return payload[target]

def getRefreshPayload(request, target):
    refresh_token = request.COOKIES.get("refresh_token")
    payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
    return payload[target]

