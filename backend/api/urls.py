from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    #JWT Routes
    path("api/token/refresh", TokenRefreshView.as_view(), name="token-refresh-view"),
    path("api/token", TokenObtainPairView.as_view(), name="token-authentication-view"),

    #Multi Mehtod Routes
    path('api/template', views.template_food, name='template_food'),

    # GET Routes
    path('api/calories', views.get_calories, name='get-calories'),
    path('api/meals', views.get_meals, name='get-meals'),
    path('api/global-food', views.get_global_foods, name='get_global_foods'),

    #POST Routes
    path('api/register', views.register, name='register'),
    path('api/create', views.create_meal, name='create_meal'),
    path('api/log', views.log, name='log'),

    #DELETE Routes
    path("api/delete", views.delete_meal, name='delete_meal'),
    path("api/log/delete", views.delete_log, name='delete_log')

]