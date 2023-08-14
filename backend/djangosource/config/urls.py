from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("oauth/", include("oauth.urls")),
    path("users/", include("users.urls")),
    path("csrf/", include("csrf.urls")),
    path("vsomok/", include("vsomok.urls")),
    path("onetofifty/", include("onetofifty.urls")),
    path("api/", include("api.urls")),
]
