from .serializers import CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from django.urls import path
app_name = "api"

urlpatterns = [
        path('token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
        path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]