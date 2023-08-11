from django.db import models

class CustomUser(models.Model):
    id = models.CharField(max_length=200, verbose_name="아이디", primary_key=True)
    nickname = models.CharField(max_length=100, verbose_name="닉네임")
    win = models.IntegerField(default=0)
    win_streak = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name="가입일자")