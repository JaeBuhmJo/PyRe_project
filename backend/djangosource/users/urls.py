from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from django.contrib.auth import views
app_name = "users"

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", auth_views.LoginView.as_view(template_name="users/login.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path("password_change/", auth_views.PasswordChangeView.as_view(template_name = "users/password_change.html", success_url = reverse_lazy("users:login")), name="password_change"),
]