from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException

def get_template_foods(user, meal):
    try:
        user_foods = models.TemplateFood.objects.filter(template_meal=meal.pk)
        foods_objects = []
        for food in user_foods:
            serialized_food_obj = serializers.FoodSerializer(instance=food.food)
            serialized_food_data = serialized_food_obj.data
            foods_objects.append(serialized_food_data)
    except Exception:
        raise ServiceException("Failed to create this meal!")
