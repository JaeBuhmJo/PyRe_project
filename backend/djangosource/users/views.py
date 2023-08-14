from django.shortcuts import get_object_or_404
from .models import CustomUser
from django.http import HttpResponse
from api.decorators import jwt_required
from rest_framework_simplejwt.tokens import Token
import json

def register(id):
    user = CustomUser()
    user.username = id
    user.save()
    return

@jwt_required
def set_nickname(request):
    # print("here1")
    #     # 요청에서 토큰을 추출합니다.
    # auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    # print("here2")
    # if not auth_header:
    #     print("here3")
    #     return HttpResponse("Authorization header is missing")

    # # "Bearer" 문자를 제외하고 토큰을 얻습니다.
    # print("here4")
    # token_string = auth_header.split(" ")[1]

    # # 토큰을 디코드 합니다.
    # try:
    #     print("here5")
    #     token = Token(token_string)
    #     user_id = token['user_id']
    # except Exception as e:
    #     print("here6")
    #     return HttpResponse(f"Invalid token: {e}")
    # print(user_id)

    body_unicode = request.body.decode('utf-8')
    body_json = json.loads(body_unicode)
    nickname = body_json.get('nickname')
    
    same_nick = CustomUser.objects.filter(nickname=nickname)
    if same_nick.exists():
        return HttpResponse("duplicate")

    id = "kakao_2958464205" # jwt 아이디값 받아서
    user = get_object_or_404(CustomUser, username=id)
    user.nickname = nickname
    user.save()
    return HttpResponse("Success")

def get_nickname(request):
    pass