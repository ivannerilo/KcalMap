from api import models
from rest_framework import serializers

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Food
        fields = '__all__'

class FoodForLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Food
        fields = ['id', 'name', 'calories_per_unit', 'unit']
