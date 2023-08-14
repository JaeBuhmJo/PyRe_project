from django.urls import path
from . import views
app_name = "oauth"

urlpatterns = [
    path("kakao/token", views.kakao_login, name="token"),
]