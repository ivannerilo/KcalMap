from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException
from django.core.paginator import Paginator, EmptyPage


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
    
def get_foods(data, mealId):
    user_tf = models.TemplateFood.objects.filter(template_meal__pk=mealId)
    food_ids = user_tf.values_list('food__id', flat=True)

    template_foods = models.Food.objects.filter(id__in=food_ids)
    global_foods = models.Food.objects.exclude(id__in=food_ids).order_by('name')

    has_next_page = False
    if 'debounceSearch' in data:
        global_foods = global_foods.filter(name__icontains=data['debounceSearch'])
    elif 'page' in data:
        paginator = Paginator(global_foods, 10)
        try:
            page = paginator.get_page(int(data['page']))
            global_foods = page
            has_next_page = page.has_next()
        except EmptyPage as e:
            print(str(e))

    return {
        "template_foods": template_foods,
        "global_foods": global_foods,
        "has_next_page": has_next_page
    }

def get_global_foods(data):
    global_foods = models.Food.objects.order_by('name')

    has_next_page = False
    if 'debounceSearch' in data:
        global_foods = global_foods.filter(name__icontains=data['debounceSearch'])
    elif 'page' in data:
        paginator = Paginator(global_foods, 10)
        try:
            page = paginator.get_page(int(data['page']))
            global_foods = page
            has_next_page = page.has_next()
        except EmptyPage as e:
            print(str(e))
        
    return {
        "global_foods": global_foods,
        "has_next_page": has_next_page
    }


def create_food(data, user):
    try:
        name = data['name']
        calories_per_unit = data['calories']
        unit = data['unit']
        default_quantity = 1 if unit == "unit" else 100

        same_name_foods = models.Food.objects.filter(name=name)
        if same_name_foods:
            raise ServiceException("This food already exists!")

        if not name and not calories_per_unit and not unit and unit == "Select a option.":
            raise ServiceException("You must provide a name, calories, and unit!")

        food = models.Food.objects.create(
            name=name,
            calories_per_unit=calories_per_unit,
            unit=unit,
            creator=user,
            default_quantity=default_quantity
        )
        food.save()

        return food
    except Exception:
        raise ServiceException("Failed to create this meal!")

