from django.urls import path, reverse_lazy
from .views import kakao_login
app_name = "oauth"

urlpatterns = [
    path("kakao/token", kakao_login, name="token"),
]