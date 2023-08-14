from django.middleware.csrf import get_token
from django.http import JsonResponse, HttpResponse

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({"csrf_token": csrf_token})