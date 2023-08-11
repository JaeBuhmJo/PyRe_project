# Generated by Django 4.2.4 on 2023-08-11 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False, verbose_name='아이디')),
                ('nickname', models.CharField(max_length=100, verbose_name='닉네임')),
                ('win', models.IntegerField(default=0)),
                ('win_streak', models.IntegerField(default=0)),
                ('lose', models.IntegerField(default=0)),
                ('registered_date', models.DateTimeField(auto_now_add=True, verbose_name='가입일자')),
            ],
        ),
    ]
