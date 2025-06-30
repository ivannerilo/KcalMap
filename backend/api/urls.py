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

    # GET Routes
    path('api/calories/', views.get_calories, name='get-calories'),
    path('api/meals/', views.get_meals, name='get-meals'),

    #POST Routes
    path('api/register', views.register, name='register'),
]