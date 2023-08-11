from django.shortcuts import get_object_or_404
from users.models import CustomUser
from django.conf import settings
import requests
from dotenv import load_dotenv
import os
from django.http import HttpResponse
from django.shortcuts import render

def get_token(code):
    load_dotenv()
    request_uri = "https://kauth.kakao.com/oauth/token"
    header = {
        "Content-type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "authorization_code",
        "client_id": settings.KAKAO_REST_API_KEY,
        "redirect_uri": settings.KAKAO_REDIRECT_URI,
        "code": code,
        "client_secret": os.environ.get("KAKAO_REST_CLIENT_SECRET"),
    }

    response = requests.post(request_uri, headers=header, data=data)
    return response

def verify_and_refresh_token(access_token, refresh_token):
    # verify token
    uri = "https://kapi.kakao.com/v1/user/access_token_info"
    header = {
        "Authorization": "Bearer " + access_token
    }
    response = requests.get(uri, headers=header)

    if response.status_code == 401:
        # refresh access token
        load_dotenv()
        uri = "https://kauth.kakao.com/oauth/token"
        header = {
            "Content-type": "application/x-www-form-urlencoded",
        }
        data = {
            "grant_type": "refresh_token",
            "client_id": settings.KAKAO_REST_API_KEY,
            "refresh_token": refresh_token,
            "client_secret": os.environ.get("KAKAO_REST_CLIENT_SECRET"),
        }
        response = requests.post(uri, headers=header, data=data)
        access_token = response.json()["access_token"]
    return access_token

def get_user_info(access_token):
    user_info_request_uri = "https://kapi.kakao.com/v2/user/me"
    user_info_header = {
        "Authorization": "Bearer " + access_token,
    }

    response = requests.get(user_info_request_uri, headers=user_info_header)
    return response

def authenticate(id):
    id = "kakao_" + str(id)
    user = CustomUser.objects.filter(id=id)
    if user.exists():
        # 로그인 처리
        return HttpResponse("Login")
    else:
        # 회원가입 처리
        print("없음")
        # 닉네임 입력화면으로 연결되어야 하며, 그건 리액트에서 다시 요청을 보내야한다.
        return HttpResponse("Register")

def kakao_login(request):
    #요청으로부터 access code 획득
    code = request.GET.get("code")
    if not code:
        return HttpResponse("code is missing")

    token_response = get_token(code)

    if token_response.status_code == 200:
        access_token = token_response.json()["access_token"]
        user_info_response = get_user_info(access_token)

        if user_info_response.status_code != 200:
            # 사용자 정보 요청에 실패했다면 토큰 갱신 후 재요청
            refresh_token = token_response.json()["refresh_token"]
            access_token = verify_and_refresh_token(access_token, refresh_token)
            user_info_response = get_user_info(access_token)

        id = user_info_response.json()["id"]
        return authenticate(id)

    else:
        return HttpResponse("Fail to get access token")
