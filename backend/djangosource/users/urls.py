from django.urls import path
from . import views
app_name = "users"

urlpatterns = [
        path("logout", views.logout, name="logout"),
        path("nickname", views.nickname, name="nickname"),
]