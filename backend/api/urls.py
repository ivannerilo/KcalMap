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

    #POST Routes
    path('api/register', views.register, name='register'),

    #Multi Mehtod Routes
    path('api/template-food', views.template_food, name='template_food'),
    path('api/food', views.food, name='food'),
    path("api/log", views.log, name='log'),
    path("api/meal", views.meal, name='meal'),
    path('api/profile', views.profile, name='profile'),
    path('api/meal-template-food/<int:mealId>', views.meal_template_food, name='meal_template_food'),
]