# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from dotenv import load_dotenv
from users.models import CustomUser
from django.conf import settings
import os, json, requests
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from users.views import register

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

"""
# 매 로그인 시도 시 access_token은 신규발급. 유효성 검사는 생략 가능
def verify_token(access_token):
    uri = "https://kapi.kakao.com/v1/user/access_token_info"
    header = {
        "Authorization": "Bearer " + access_token
    }
    response = requests.get(uri, headers=header)
    return response

def renew_token(refresh_token):
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
    return response
"""

def get_user_info(access_token):
    user_info_request_uri = "https://kapi.kakao.com/v2/user/me"
    user_info_header = {
        "Authorization": "Bearer " + access_token,
    }

    response = requests.get(user_info_request_uri, headers=user_info_header)
    return response

def authenticate(id):
    id = "kakao_" + str(id)
    user = CustomUser.objects.filter(username=id)
    
    # 비회원은 자동 회원가입 처리
    if not user.exists():
        register(id)
        user = CustomUser.objects.filter(username=id).first()

    return HttpResponse(id)

def kakao_login(request):
    #요청으로부터 access code 획득
    body_unicode = request.body.decode("utf-8")
    body_json = json.loads(body_unicode)
    code = body_json.get("code")
    if not code:
        return HttpResponse("요청에 인가 코드가 존재하지 않음")

    token_response = get_token(code)
    
    if token_response.status_code != 200:
        return HttpResponse("토큰 요청 실패")

    """
    # 매 로그인 시도 시 access_token은 신규발급. 유효성 검사는 생략 가능

    # access_token = token_response.json()["access_token"]
    # 토큰 유효성 검사를 먼저하고, 유효하지 않으면 갱신.
    # if verify_token(access_token).status_code != 200:
    #     refresh_token = token_response.json()["refresh_token"]
    #     renew_response = renew_token(refresh_token)
    #     access_token = renew_response.json()["access_token"]
    """

    access_token = token_response.json()["access_token"]
    user_info_response = get_user_info(access_token)
    
    if user_info_response.status_code != 200:
        return HttpResponse("유저 정보 요청 실패")
    
    id = user_info_response.json()["id"]
    
    return authenticate(id)
