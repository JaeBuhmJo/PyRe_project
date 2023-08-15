import jwt
from django.conf import settings
from django.http import HttpResponse

def jwt_required(view_func):
    def _wrapper(request):
        access_token = request.COOKIES.get("access_token")
        if access_token:
            try:
                payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])
                request.user = payload
                return view_func(request)
            except (jwt.ExpiredSignatureError, jwt.DecodeError):
                return HttpResponse(status=401)
        else:
            return HttpResponse(status=401)

    return _wrapper