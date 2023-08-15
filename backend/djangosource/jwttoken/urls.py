from django.urls import path
from . import views
app_name = "jwt"

urlpatterns = [
    path("token", views.TokenObtainPairView, name="token_obtain_pair"),
    path("token/verify", views.TokenVerifyView, name="token_verify"),
    path("token/refresh", views.TokenRefreshView, name="token_refresh"),
]