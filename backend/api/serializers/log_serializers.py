from api import models
from rest_framework import serializers

from .food_serializers import FoodForLogSerializer

class FoodLogSerializer(serializers.ModelSerializer):
    food = FoodForLogSerializer(read_only=True)

    class Meta:
        model = models.FoodLog
        fields = ['id', 'food', 'quantity', 'timestamp']