from api import models
from rest_framework import serializers

from .template_food_serializers import TemplateFoodForMealSerializer
from .log_serializers import FoodLogSerializer


class CompleteTemplateMealSerializer(serializers.ModelSerializer):
    template_food = TemplateFoodForMealSerializer(read_only=True, many=True)
    food_log = FoodLogSerializer(read_only=True, many=True)

    class Meta:
        model = models.TemplateMeal
        fields = ['id', 'name', 'template_food', 'food_log']

class TemplateMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TemplateMeal
        fields = '__all__'