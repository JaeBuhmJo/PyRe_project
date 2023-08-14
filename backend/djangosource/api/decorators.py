from django.http import JsonResponse
from functools import wraps
import jwt

# Create your views here.
def jwt_required(f):
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        if 'HTTP_AUTHORIZATION' not in request.META:
            return JsonResponse({"message": "로그인이 필요한 작업입니다."}, status=401)
        
        try:
            jwt.decode(request.META['HTTP_AUTHORIZATION'], 'JWT_SECRET', algorithms=['HS256'])
        except Exception as e:
            return JsonResponse({"message": "유효하지 않은 토큰입니다."}, status=401)
        
        return f(request, *args, **kwargs)
    
    return decorated_function