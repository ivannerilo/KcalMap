from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException
from . import log_services


def get_meal(data, user):
    try:
        meals = models.TemplateMeal.objects
        meals = meals.prefetch_related("template_food__food", "food_log__food")
        meals = meals.filter(user=user.pk, food_log__food__timestamp__date=datetime.now().date())
        return meals

        # meals_objects = []
        # for meal in user_meals:

        #     serialized_meal_obj = serializers.TemplateMealSerializer(instance=meal)
        #     serialized_meal_data = serialized_meal_obj.data
            
        #     #TemplateFood Service
        #     user_foods = models.TemplateFood.objects.select_related('food').filter(template_meal=meal.pk)
        #     print(user_foods)
        #     foods_objects = []
        #     for food in user_foods:
        #         serialized_food_obj = serializers.FoodSerializer(instance=food.food)
        #         serialized_food_data = serialized_food_obj.data
        #         foods_objects.append(serialized_food_data)

        #     serialized_meal_data["itens"] = foods_objects
        #     meals_objects.append(serialized_meal_data)

        #     serialized_meal_data["logs"] = log_services.get_log(user, meal)['logs']
    except Exception:
        raise ServiceException("Fail to gather data!")

def create_meal(data, user):
    try:
        new_meal = models.TemplateMeal.objects.create(name=data['name'], user=user)
        new_meal.save()
    
        return new_meal
    except Exception:
        raise ServiceException("Failed to create this meal!")
    
def delete_meal(data, user):
    try:
        meal = models.TemplateMeal.objects.get(pk=data['id'], user=user)    
        meal.delete()

        return {"deletedMealId": meal.pk}
    except Exception:
        return ServiceException("Failed to delete this meal!")