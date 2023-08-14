from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from users.models import CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        user_id = attrs['username']
        user = CustomUser.objects.get(username=user_id)

        if(user):
            data = {}
            refresh = self.get_token(user)

            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            return data

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.pop('access')
            refresh_token = response.data.pop('refresh')

            response.set_cookie('access_token', access_token, httponly=True, samesite='Lax', path='/')
            response.set_cookie('refresh_token', refresh_token, httponly=True, samesite='Lax', path='/')

        return response