from django.db import models

class CustomUser(models.Model):
    username = models.CharField(max_length=200, verbose_name="아이디")
    nickname = models.CharField(max_length=50, verbose_name="닉네임", unique=True, null=True, blank=True)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name="가입일자")