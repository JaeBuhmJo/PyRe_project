from django.shortcuts import get_object_or_404
from .models import CustomUser
from django.http import HttpResponse, JsonResponse
from jwttoken.token_utils import getPayload, getRefreshPayload
import json, datetime
from django.core.cache import cache
from jwttoken.decorators import jwt_required

def register(id):
    user = CustomUser()
    user.username = id
    user.save()
    return

@jwt_required
def logout(request):
    refresh_token = request.COOKIES.get('refresh_token')

    if refresh_token:
        # Redis 블랙리스트에 리프레시 토큰 추가
        now = datetime.datetime.now(datetime.timezone.utc).timestamp()
        redis_expiration_time = getRefreshPayload(request, "exp") - now

        if redis_expiration_time > 0:
            cache.set(refresh_token, 'blacklisted', redis_expiration_time)

    response = JsonResponse({})
    response.set_cookie('access_token', '', expires=0)
    response.set_cookie('refresh_token', '', expires=0)
    return response

@jwt_required
def nickname(request):
    if request.method == "GET":
        username = getPayload(request,'username')
        user = get_object_or_404(CustomUser, username=username)
        return HttpResponse(user.nickname)

    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_json = json.loads(body_unicode)
        nickname = body_json.get('nickname')
        
        same_nick = CustomUser.objects.filter(nickname=nickname)
        if same_nick.exists():
            return HttpResponse("duplicate")

        username = getPayload(request,'username')
        user = get_object_or_404(CustomUser, username=username)
        user.nickname = nickname
        user.save()
        return HttpResponse("Success")