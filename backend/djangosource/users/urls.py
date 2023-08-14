from django.urls import path
from . import views
app_name = "users"

urlpatterns = [
        path("nickname", views.set_nickname, name="nickname"),
]