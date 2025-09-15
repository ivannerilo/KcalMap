from api import models
from rest_framework import serializers

from .food_serializers import FoodSerializer


class TemplateFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TemplateFood
        fields = '__all__'

class TemplateFoodForMealSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)

    class Meta:
        model = models.TemplateFood
        fields = ['id', 'food']