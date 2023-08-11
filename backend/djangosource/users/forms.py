from .models import CustomUser
from django import forms

class CustomUserForm(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ["nickname"]