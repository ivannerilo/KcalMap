from api import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers

from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")
        if email and password:
            try:
                user = User.objects.get(email=email)

                if not user.check_password(password):
                    raise serializers.ValidationError("Invalid credentials, check your email or password.")

                refresh = self.get_token(user)
                
                tokens = {}
                tokens["refresh"] = str(refresh)
                tokens["access"] = str(refresh.access_token)

                return (tokens)

            except User.DoesNotExist:
                  raise serializers.ValidationError("No user with this email was found.")
        else:
            raise serializers.ValidationError("Email and password are required")