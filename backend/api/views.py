from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from . import models
from . import serializers


# APLICAR O PADRÃO NAS RESPONSES 
# SUCCESS TRUE & RESULT
# SUCCESS FALSE & MESSAGE

# OU TROCAR OS SUCCESS POR CÓDIGOS HTTP! ASSIM A REQUEST VEM OK OU NÃO!
# OU IMPLEMENTAR OS 2, FODA-SE!


@api_view(['GET'])
def get_calories(request):
    try:
        profile = models.Profile.objects.get(user=request.user)
        return Response({"success": True, "result": profile.calories_goal})
    except:
        return Response({"success": False, "message": "Profile not find!"})

@api_view(['GET'])
def get_meals(request):
    try:
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
        
        return Response({"success": True, "result": meals_objects})
    except:
        return Response({"success": False, "result": "Fail to gather data!"})



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
        
        return Response({"success": True, "result": "Profile created with success"})
    except:
        return Response({"success": False, "message": "Failed to create the user profile!"})


@api_view(['POST'])
def create_meal(request):
    try:
        data = request.data

        new_meal = models.TemplateMeal.objects.create(name=data['name'], user=request.user)
        new_meal.save()
        
        return Response({"success": True, "result": "Meal created with success!"})
    except Exception:
        return Response({"success": False, "message": "Failed to create this meal!"})
    
@api_view(['DELETE'])
def delete_meal(request):
    try:
        data = request.data

        meal = models.TemplateMeal.objects.get(pk=data['id'], user=request.user)    
        meal.delete()
        return Response({"success": True, "result": "Meal deleted with success!"})
    except Exception:
        return Response({"success": False, "message": "Failed to delete this meal!"})
    
@api_view(['POST'])
def template_food(request):
    try:
        data = request.data

        meal = models.TemplateMeal.objects.get(pk=data['mealId'])
        food = models.Food.objects.get(pk=data['foodId'])
        new_template_food = models.TemplateFood.objects.create(template_meal=meal, food=food)
        new_template_food.save()
        
        result = serializers.FoodSerializer(instance=new_template_food.food)
        return Response({"success": True, "result": result.data})
    except Exception:
        return Response({"success": False, "message": "Failed to create template food!"})
            
@api_view(['GET'])
def get_global_foods(request):
    try:
        global_foods_obj = models.Food.objects.filter(is_global=True)

        global_foods = []
        for food in global_foods_obj:
            serialized_food = serializers.FoodSerializer(instance=food)
            global_foods.append(serialized_food.data)

        return Response({"success": True, "foods": global_foods})
    except Exception:
        return Response({"success": False, "message": "Failed to get the global foods!"})
            
@api_view(['POST'])
def log(request):
    # try:
    data = request.data
    result = {}

    if data['mealId']:
        meal = models.TemplateMeal.objects.get(pk=data['mealId'])
        food = models.Food.objects.get(pk=data['foodId'])
        same_food_logs = models.FoodLog.objects.filter(
            user=request.user,
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
                user=request.user,
                meal=meal,
                food=food,
                quantity=data['quantity']
            )
            log.save()

            serialized_log = serializers.FoodLogSerializer(instance=log)
            result = serialized_log.data
    else: 
        log = models.FoodLog.objects.create(
            user=request.user,
            food=food,
            quantity=data['quantity']
        )        
        log.save()

        serialized_log = serializers.FoodLogSerializer(instance=log)
        result = serialized_log.data

    return Response({"success": True, "result": result})
    # except Exception:
    #     return Response({"success": False, "message": "Failed to create this meal!"})
    
@api_view(['DELETE'])
def delete_log(request):
    try:
        data = request.data
        if data['mealId']:
            result = {}
            meal = models.TemplateMeal.objects.get(pk=data['mealId'])
            food = models.Food.objects.get(pk=data['foodId'])
            same_food_logs = models.FoodLog.objects.filter(
                user=request.user,
                meal=meal,
                food=food,
                timestamp__date=datetime.now().date()
            )
            same_food_log = same_food_logs[0]
            quantity = int(same_food_log.quantity) - int(data['quantity'])
            if quantity <= 0:
                same_food_log.delete()
                result = {"deletedFoodId": same_food_log.food.pk }
            else:
                same_food_log.quantity = quantity
                same_food_log.save()
                serialized_log = serializers.FoodLogSerializer(instance=same_food_log)
                result = serialized_log.data      
                
            return Response({"success": True, "result": result})
        return Response({"success": False, "message": "Failed to delete this meal!"})
    except Exception:
        return Response({"success": False, "message": "Failed to delete this meal!"})
            

        
        






