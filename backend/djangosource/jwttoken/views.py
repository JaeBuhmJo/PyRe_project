from django.http import JsonResponse, HttpResponse
from .token_utils import generate_access_token, generate_refresh_token
from users.models import CustomUser
from django.conf import settings
import datetime, json, jwt
from django.shortcuts import get_object_or_404
from django.core.cache import cache

def TokenObtainPairView(request):
    body_unicode = request.body.decode("utf-8")
    body_json = json.loads(body_unicode)
    username = body_json.get("username")

    user = get_object_or_404(CustomUser, username=username)

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    response = JsonResponse({})

    response.set_cookie(
        key='access_token',
        value=access_token,
        expires=datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=5),
        secure=True,
        httponly=False,
        samesite='Lax',
        )

    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        expires=datetime.datetime.utcnow(
        ) + datetime.timedelta(days=30),
        secure=True,
        httponly=True,
        samesite='Lax')

    return response

def TokenVerifyView(request):
    access_token = request.COOKIES.get("access_token")

    if access_token:
        try:
            jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
            return HttpResponse(status=200)
        except :
            return HttpResponse(status=401)
    else:
        return HttpResponse(status=401)

def TokenRefreshView(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if refresh_token:
        blacklisted = cache.get(refresh_token)
        if blacklisted:
            return True
        else:
            try:
                payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
                user = get_object_or_404(CustomUser,username=payload['username'])

                if user:
                    response = JsonResponse({"success": True}, status=200)
                    access_token = generate_access_token(user)
                    response.set_cookie(
                        key='access_token',
                        value=access_token,
                        expires=datetime.datetime.utcnow(
                        ) + datetime.timedelta(minutes=5),
                        secure=True,
                        httponly=False,
                        samesite='Lax',
                    )

                    return response
                else:
                    return HttpResponse(status=401)
            except:
                return HttpResponse(status=401)
    else:
        return HttpResponse(status=401)