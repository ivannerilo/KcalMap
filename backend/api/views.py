from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from . import models
from . import serializers
from . import services
from .exceptions import ServiceException
from django.db.models import Prefetch
from django.core.paginator import Paginator

     
@api_view(['POST'])
def register(request):
    try:
        register_data = request.data
        new_user = User.objects.create_user(register_data["name"], register_data["email"], register_data["password"])
        token_pair = RefreshToken.for_user(new_user)
        return Response({"message": "User registered with success!", "tokens": {
            "refresh": str(token_pair),
            "access": str(token_pair.access_token),
        }}, status=201)

    except:
      return Response({"message": "User not registered! Invalid credentials."}, status=400)

@api_view(['GET', 'POST', 'DELETE'])
def meal(request):
    try:
        match request.method:

            case 'GET':
                meals = services.get_meal(request.data, request.user)
                serialized_meals = serializers.CompleteTemplateMealSerializer(instance=meals, many=True)
                return Response({"result": serialized_meals.data}, status=200)

            case 'POST':
                new_meal = services.create_meal(request.data, request.user)
                serialized_meal = serializers.CompleteTemplateMealSerializer(instance=new_meal)
                return Response({"result": serialized_meal.data}, status=201)

            case 'DELETE':
                deleted_meal = services.delete_meal(request.data, request.user)
                return Response({"result": request.data['id']}, status=200)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500)
    
@api_view(['POST', 'PUT', 'DELETE'])
def log(request):
    try:
        match request.method:

            case 'POST':
                log = services.add_log(request.data, request.user)
                serialized_log = serializers.FoodLogSerializer(instance=log)
                return Response({"result": serialized_log.data}, status=201)

            case 'PUT':
                log = services.update_log(request.data, request.user)
                if log == None:
                    return Response({"result": request.data['foodId']}, status=200)
                
                serialized_log = serializers.FoodLogSerializer(instance=log)
                return Response({"result": serialized_log.data}, status=201)

            case 'DELETE': 
                result = services.delete_log(request.data, request.user)
                return Response({"result": request.data['foodId']}, status=200)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500) 

@api_view(['GET', 'POST'])
def profile(request):
    try:
        match request.method:

            case "GET":
                profile = models.Profile.objects.get(user=request.user)
                serialized_profile = serializers.ProfileSerializer(instance=profile)
                return Response({"result": serialized_profile.data}, status=200)

            case "POST":
                profile = services.create_profile(request.data, request.user)
                serialized_profile = serializers.ProfileSerializer(instance=profile)
                return Response({"result": serialized_profile.data}, status=201)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500)
    
@api_view(['GET'])
def food(request):
    try:
        match request.method:

            case "GET":
                global_foods_obj = models.Food.objects.filter(is_global=True)

                global_foods = []
                for food in global_foods_obj:
                    serialized_food = serializers.FoodSerializer(instance=food)
                    global_foods.append(serialized_food.data)

                return Response({"result": global_foods}, status=200)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500)

@api_view(['POST'])
def template_food(request):
    try:
        match request.method:

            case "POST":
                data = request.data
                meal = models.TemplateMeal.objects.get(pk=data['mealId'])
                food = models.Food.objects.get(pk=data['foodId'])
                new_template_food = models.TemplateFood.objects.create(template_meal=meal, food=food)
                new_template_food.save()
                
                result = serializers.FoodSerializer(instance=new_template_food.food)
                return Response({"result": result.data}, status=201)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500)

@api_view(['GET', 'PUT', 'POST'])
def meal_template_food(request, mealId):
    try:
        match request.method:

            case "GET":
                user_tf = models.TemplateFood.objects.filter(template_meal__pk=mealId)
                food_ids = user_tf.values_list('food__id', flat=True)

                template_foods = models.Food.objects.filter(id__in=food_ids)
                global_foods = models.Food.objects.exclude(id__in=food_ids).order_by('name')[:10]

                serialized_template_foods = serializers.FoodSerializer(instance=template_foods, many=True)
                serialized_global_foods = serializers.FoodSerializer(instance=global_foods, many=True)

                return Response({"result": {
                    "template_foods": serialized_template_foods.data,
                    "global_foods": serialized_global_foods.data
                }}, status=200)

            case "POST":
                data = request.data
                user_tf = models.TemplateFood.objects.filter(template_meal__pk=mealId)
                food_ids = user_tf.values_list('food__id', flat=True)
                searched_foods = models.Food.objects.exclude(id__in=food_ids)


                if 'debounceSearch' in data:
                    searched_foods = searched_foods.filter(name__icontains=data['debounceSearch'])
                
                elif 'page' in data:
                    paginator = Paginator(searched_foods, 10)
                    try:
                        searched_foods = paginator.page(int(data['page']))
                    except EmptyPage:
                        return Response({"result": {
                            "searched_foods": {}
                        }}, status=200)

                serialized_searched_foods = serializers.FoodSerializer(instance=searched_foods, many=True)

                return Response({"result": {
                    "searched_foods": serialized_searched_foods.data
                }}, status=200)

            case "PUT":

                data = request.data

                user_tf = models.TemplateFood.objects.filter(template_meal__pk=mealId)
                food_ids = user_tf.values_list('food__id', flat=True)

                global_foods = models.Food.objects.exclude(id__in=food_ids)
                global_foods = global_foods.limit(request.data['page'] * 10).offset(request.data['page'] * 10)

                serialized_global_foods = serializers.FoodSerializer(instance=global_foods, many=True)

                return Response({"result": {
                    "global_foods": serialized_global_foods.data
                }}, status=200)

    except ServiceException as e:
        print(f"ServiceException: {str(e)}")
        return Response({"message": str(e)}, status=400)
    except Exception as e:
        return Response({"message": "Ocorreu um erro no servidor!"}, status=500)
            