from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException

def add_log(data, user):
    try:
        if data['mealId']:
            meal = models.TemplateMeal.objects.get(pk=data['mealId'])
            food = models.Food.objects.get(pk=data['foodId'])
            same_food_log = get_same_food_log(meal, food, user)

            if same_food_log:
                same_food_log.quantity = int(same_food_log.quantity) + int(data['quantity'])
                same_food_log.save()
                return same_food_log
            else:
                log = models.FoodLog.objects.create(
                    user=user,
                    meal=meal,
                    food=food,
                    quantity=data['quantity']
                )
                log.save()

                return log
        else: 
            raise ServiceException("Failed to create this log. You must provide an meal ID!")
    except Exception:
        raise ServiceException("Failed to create this log!")
    
def delete_log(data, user):
    try:
        if data['mealId']:
            meal = models.TemplateMeal.objects.get(pk=data['mealId'])
            food = models.Food.objects.get(pk=data['foodId'])
            same_food_log = get_same_food_log(meal, food, user)
            same_food_log.delete()       
            return None
        raise ServiceException("Failed to delete this log. You must provide an meal ID!")
    except Exception:
        raise ServiceException("Failed to delete this log!")
    
def update_log(data, user):
    try:
        meal = models.TemplateMeal.objects.get(pk=data['mealId'])
        food = models.Food.objects.get(pk=data['foodId'])
        same_food_log = get_same_food_log(meal, food, user)
        quantity = int(data['quantity'])

        if quantity <= 0:
            same_food_log.delete()
            return None
        else:
            same_food_log.quantity = quantity
            same_food_log.save()

            return same_food_log
    except Exception:
        raise ServiceException("Failed to update this meal!")


# Indirect
    
def get_same_food_log(meal, food, user):
    try:
        return models.FoodLog.objects.filter(
            user=user,
            meal=meal,
            food=food,
            timestamp__date=datetime.now().date()
        ).first()
    except Exception:
        raise ServiceException("Failed to gather log data!")
