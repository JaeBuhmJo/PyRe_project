from django.conf import settings
import requests
from dotenv import load_dotenv
import os
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def kakao_login(request):
    print(request)
    code = request.GET.get("code")

    if not code:
        return HttpResponse("code is missing")
    
    access_token_request_uri = "https://kauth.kakao.com/oauth/token"
    load_dotenv() 
    access_token_data = {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        "grant_type" : "authorization_code",
        "client_id": settings.KAKAO_REST_API_KEY,
        "redirect_uri": settings.KAKAO_REDIRECT_URI,
        "code": code,
        # "client_secret": os.environ.get("KAKAO_REST_CLIENT_SECRET")
    }

    response = requests.post(access_token_request_uri, data=access_token_data)

    if response.status_code == 200:
        print("응답") 
        print(response)
        access_token = response.json()["access_token"]
        # 아니야 여기서 액세스 토큰을 프론트에 쏘면 안되지
        # 여기서 로그인 처리하거나 회원가입 처리해야함
        return HttpResponse(f"Access token: {access_token}")
    else:
        return HttpResponse("Failed to get access token")