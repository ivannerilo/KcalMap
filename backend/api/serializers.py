from . import models
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
                print(tokens)

                return (tokens)

            except User.DoesNotExist:
                  raise serializers.ValidationError("No user with this email was found.")
        else:
            raise serializers.ValidationError("Email and password are required")

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'

class TemplateMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TemplateMeal
        fields = '__all__'

class TemplateFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TemplateFood
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Food
        fields = '__all__'

class FoodForLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Food
        fields = ['id', 'name', 'calories_per_unit', 'unit']

class FoodLogSerializer(serializers.ModelSerializer):
    food = FoodForLogSerializer(read_only=True)

    class Meta:
        model = models.FoodLog
        fields = ['food', 'quantity']

                        


    
