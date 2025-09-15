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
    path('api/template-food', views.template_food, name='template_food'),
    path("api/log", views.log, name='log'),
    path("api/meal", views.meal, name='meal'),


    # GET Routes
    path('api/calories', views.get_calories, name='get_calories'),
    path('api/global-food', views.get_global_foods, name='get_global_foods'),

    #POST Routes
    path('api/register', views.register, name='register'),
    path('api/profile', views.profile, name='profile'),

    #DELETE Routes

]