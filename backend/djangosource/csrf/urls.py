from django.urls import path
from . import views
app_name = "csrf"

urlpatterns = [
        path("token", views.get_csrf_token, name="token"),
]