from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# Models 
from django.contrib.auth.models import User
from . import models


calories_object = {
    "calories_goal": 3000
}

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
]

@api_view(['GET'])
def get_calories(request):
    return Response(calories_object)

@api_view(['GET'])
def get_meals(request):
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






