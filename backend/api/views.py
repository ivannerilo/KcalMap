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
""" 
meals_objects = [
    {
        "id": 1,
        "name": "Café da manhã!",
        "itens": [{"name": "Café", "calories": 100}, {"name": "Pão", "calories": 200}, {"name": "Manteiga", "calories": 300}]
    },
    {
        "id": 2,                        
        "name": "Almoço!",
        "itens": [{"name": "Arroz", "calories": 100}, {"name": "Feijão", "calories": 200}, {"name": "Carne", "calories": 300}]
    },
    {
        "id": 3,
        "name": "Janta!",
        "itens": [{"name": "Salada", "calories": 100}, {"name": "Fruta", "calories": 200}, {"name": "Pudim", "calories": 300}]
    }
] """

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






