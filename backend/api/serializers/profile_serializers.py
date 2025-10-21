from api import models
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['profile_picture']