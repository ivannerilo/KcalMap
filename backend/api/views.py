from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from . import models
from . import serializers
from .services import log_services, meal_services
from .exceptions import ServiceException

# APLICAR O PADRÃO NAS RESPONSES 
# SUCCESS TRUE & RESULT
# SUCCESS FALSE & MESSAGE

# OU TROCAR OS SUCCESS POR CÓDIGOS HTTP! ASSIM A REQUEST VEM OK OU NÃO!
# OU IMPLEMENTAR OS 2, FODA-SE!

@api_view(['GET'])
def get_calories(request):
    try:
        profile = models.Profile.objects.get(user=request.user)
        return Response({"result": profile.calories_goal}, status=200)
    except:
        return Response({"message": "Profile not find!"}, status=400)
     
@api_view(['POST'])
def register(request):
    try:
        # Getting the request body data.
        register_data = request.data # -> Dict]

        # Creating new user in the database.
        new_user = User.objects.create_user(register_data["name"], register_data["email"], register_data["password"])

        # Generating authentication tokens for the new user.
        token_pair = RefreshToken.for_user(new_user)

        # Returning users tokens.
        return Response({"message": "User registered with success!", "tokens": {
            "refresh": str(token_pair),
            "access": str(token_pair.access_token),
        }}, status=201)

    except:
      return Response({"message": "User not registered! Invalid credentials."}, status=400)

@api_view(['GET', 'POST', 'DELETE'])
def meal(request):
    meals = models.TemplateMeal.objects
    meals = meals.prefetch_related("template_food__food", "food_log__food")
    meals = meals.filter(user=request.user.pk, food_log__timestamp__date=datetime.now().date())
    serialized_meals = serializers.MealSerializer(instance=meals, many=True)
    serialized_data = serialized_meals.data
    print(serialized_data)
    return Response({"result": serialized_data})

    # try:
    #     match request.method:
    #         case 'GET':
    #             result = meal_services.get_meal(request.data, request.user)
    #             return Response(result, status=200)
    #         case 'POST':
    #             result = meal_services.create_meal(request.data, request.user)
    #             return Response(result, status=201)
    #         case 'DELETE':
    #             result = meal_services.delete_meal(request.data, request.user)
    #             return Response(result, status=200)
    # except ServiceException as e:
    #     print(str(e))
    #     return Response({"message": str(e)}, status=400)
    # except Exception:
    #     return Response({"message": "Ocorreu um erro no servidor!"}, status=500)
    
@api_view(['POST', 'DELETE', 'PUT'])
def log(request):
    result = {}
    try:
        match request.method:
            case 'POST':
                result = log_services.create_log(request.data, request.user)
                return Response(result, status=201)
            case 'DELETE': 
                result = log_services.delete_log(request.data, request.user)
                return Response(result, status=200)
            case 'PUT':
                result = log_services.update_log(request.data, request.user)
                return Response(result, status=200)
    except ServiceException as e:
        print(str(e))
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500) 

@api_view(['POST'])
def profile(request):
    try:
        data = request.data

        profile = models.Profile.objects.create(
            user=request.user,
            kg_weight=data['weight'],
            cm_height=data['height'],
            age=data['age'],
            sex=data['sex'],
            calories_goal=data['goal'],
        )
        profile.save()
        
        return Response({"result": "Profile created with success"}, status=201)
    except:
        return Response({"message": "Failed to create the user profile!"}, status=400)


    
@api_view(['POST'])
def template_food(request):
    try:
        data = request.data

        meal = models.TemplateMeal.objects.get(pk=data['mealId'])
        food = models.Food.objects.get(pk=data['foodId'])
        new_template_food = models.TemplateFood.objects.create(template_meal=meal, food=food)
        new_template_food.save()
        
        result = serializers.FoodSerializer(instance=new_template_food.food)
        return Response({"result": result.data}, status=201)
    except Exception:
        return Response({"message": "Failed to create template food!"}, status=400)
            
@api_view(['GET'])
def get_global_foods(request):
    try:
        global_foods_obj = models.Food.objects.filter(is_global=True)

        global_foods = []
        for food in global_foods_obj:
            serialized_food = serializers.FoodSerializer(instance=food)
            global_foods.append(serialized_food.data)

        return Response({"foods": global_foods}, status=200)
    except Exception:
        return Response({"message": "Failed to get the global foods!"}, status=400)
    

            

            

        
        






