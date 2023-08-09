from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class UserForm(UserCreationForm):
    """
    UserCreationForm은 username(id), password1, password2만 들어있음
    다른 정보를 받기 원한다면 추가 필요 ==> 새로운 클래스 작성
    """

    # email은 상속으로 하면 nullable함
    email = forms.EmailField(label="이메일")

    class Meta:
        model = User
        fields = ["username", "email"]