from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from . import models
from . import serializers
from .exceptions import ServiceException



# Log Services

def create_log(data, user):
    try:
        result = {}
        if data['mealId']:
            meal = models.TemplateMeal.objects.get(pk=data['mealId'])
            food = models.Food.objects.get(pk=data['foodId'])
            same_food_logs = models.FoodLog.objects.filter(
                user=user,
                meal=meal,
                food=food,
                timestamp__date=datetime.now().date()
            )
            if same_food_logs:
                same_food_log = same_food_logs[0]
                same_food_log.quantity = int(same_food_log.quantity) + int(data['quantity'])
                same_food_log.save()

                serialized_log = serializers.FoodLogSerializer(instance=same_food_log)
                result = serialized_log.data
            else:
                log = models.FoodLog.objects.create(
                    user=user,
                    meal=meal,
                    food=food,
                    quantity=data['quantity']
                )
                log.save()

                serialized_log = serializers.FoodLogSerializer(instance=log)
                result = serialized_log.data
        else: 
            log = models.FoodLog.objects.create(
                user=user,
                food=food,
                quantity=data['quantity']
            )        
            log.save()

            serialized_log = serializers.FoodLogSerializer(instance=log)
            result = serialized_log.data

        return result
    except Exception:
        raise ServiceException("Failed to create this meal!")
    
def delete_log(data, user):
    try:
        if data['mealId']:
            result = {}
            meal = models.TemplateMeal.objects.get(pk=data['mealId'])
            food = models.Food.objects.get(pk=data['foodId'])
            same_food_logs = models.FoodLog.objects.filter(
                user=user,
                meal=meal,
                food=food,
                timestamp__date=datetime.now().date()
            )
            same_food_log = same_food_logs[0]
            same_food_log.delete()
            result = {"deletedFoodId": same_food_log.food.pk }       
            return result
        
        raise ServiceException("Failed to delete this meal!")
    except Exception:
        raise ServiceException("Failed to delete this meal!")
    

def update_log(data, user):
    print("data", data)
    if data['mealId']:
        result = {}
        meal = models.TemplateMeal.objects.get(pk=data['mealId'])
        food = models.Food.objects.get(pk=data['foodId'])
        same_food_logs = models.FoodLog.objects.filter(
            user=user,
            meal=meal,
            food=food,
            timestamp__date=datetime.now().date()
        )
        same_food_log = same_food_logs[0]
        quantity = int(data['quantity'])
        if quantity <= 0:
            same_food_log.delete()
            result = {"deletedFoodId": same_food_log.food.pk }
        else:
            same_food_log.quantity = quantity
            same_food_log.save()
            serialized_log = serializers.FoodLogSerializer(instance=same_food_log)
            result = serialized_log.data      
        return result
        
    # try:
    #     raise ServiceException("Failed to update this meal!")
    # except Exception:
    #     raise ServiceException("Failed to update this meal!")