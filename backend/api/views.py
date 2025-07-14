from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from . import models
from . import serializers


calories_object = {
    "calories_goal": 3000
}

@api_view(['GET'])
def get_calories(request):
    return Response(calories_object)

@api_view(['GET'])
def get_meals(request):
    user = request.user

    user_meals = models.TemplateMeal.objects.filter(user=user.pk)

    meals_objects = []
    for meal in user_meals:

        serialized_meal_obj = serializers.TemplateMealSerializer(instance=meal)
        serialized_meal_data = serialized_meal_obj.data
        
        user_foods = models.TemplateFood.objects.filter(template_meal=meal.pk)
        foods_objects = []
        for food in user_foods:
            serialized_food_obj = serializers.FoodSerializer(instance=food.food)
            serialized_food_data = serialized_food_obj.data
            foods_objects.append(serialized_food_data)

        serialized_meal_data["itens"] = foods_objects
        meals_objects.append(serialized_meal_data)

        user_logs = models.FoodLog.objects.filter(user=user.pk, timestamp__date=datetime.now().date(), meal=meal.pk)
        serialized_logs_obj = serializers.FoodLogSerializer(instance=user_logs, many=True)
        serialized_logs_data = serialized_logs_obj.data
        serialized_meal_data["logs"] = serialized_logs_data
    
    return Response({"meals": meals_objects})


@api_view(['POST'])
def register(request):
    # Getting the request body data.
    register_data = request.data # -> Dict

    # try:
    # Creating new user in the database.
    new_user = User.objects.create_user(register_data["name"], register_data["email"], register_data["password"])

    # Generating authentication tokens for the new user.
    token_pair = RefreshToken.for_user(new_user)

    # Returning users tokens.
    return Response({"message": "User registered with success!", "tokens": {
        "refresh": str(token_pair),
        "access": str(token_pair.access_token),
    }}, status=201)

    # except:
    #   return Response({"message": "User not registered! Invalid credentials."}, status=400)

@api_view(['POST'])
def create_meal(request):
    data = request.data

    print(f"Meal name: {data['name']} \nUserId {request.user.pk}")
    try:
        new_meal = models.TemplateMeal.objects.create(name=data['name'], user=request.user)
        new_meal.save()
        
        return Response({"success": True, "message": "Meal created with success!"})
    except Exception:
        return Response({"success": False, "message": "Failed to create this meal!"})
    
@api_view(['DELETE'])
def delete_meal(request):
    data = request.data

    try:
        meal = models.TemplateMeal.objects.get(pk=data['id'], user=request.user)    
        meal.delete()
        return Response({"success": True, "message": "Meal deleted with success!"})
    except Exception:
        return Response({"success": False, "message": "Failed to delete this meal!"})
    
@api_view(['POST'])
def template_food(request):
    data = request.data

    match request.method:
        case "POST":
            try:
                meal = models.TemplateMeal.objects.get(pk=data['mealId'], user=request.user)
                food = models.Food.objects.get(pk=data['foodId'])
                new_template_food = models.TemplateFood.objects.create(meal=meal, food=food)
                new_template_food.save()
                return Response({"success": True, "message": "Template food created with success!"})
            except Exception:
                return Response({"success": False, "message": "Failed to create template food!"})
            

        
        






