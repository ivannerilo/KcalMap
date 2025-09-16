from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException
from django.db.models import Prefetch


def get_meal(data, user):
    try:
        today_logs_cte = models.FoodLog.objects.filter(
            timestamp__date=datetime.now().date()
        ).order_by('-timestamp')
        meals = models.TemplateMeal.objects.filter(user=user.pk)
        meals = meals.prefetch_related(
            'template_food',
            Prefetch('food_log', queryset=today_logs_cte)
        )
        return meals
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

        return None
    except Exception:
        return ServiceException("Failed to delete this meal!")