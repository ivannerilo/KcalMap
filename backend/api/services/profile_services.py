from datetime import datetime

# Models / Serializers
from django.contrib.auth.models import User
from api import models
from api import serializers
from api.exceptions import ServiceException

def get_profile(data, user):
    try:
        return models.Profile.objects.get(user=user)
    except Exception:
        raise ServiceException("Failed to get this profile!")

def create_profile(data, user):
    try:
        profile = models.Profile.objects.create(
            user=user,
            kg_weight=data['weight'],
            cm_height=data['height'],
            age=data['age'],
            sex=data['sex'],
            calories_goal=data['goal'],
        )
        profile.save()
        return profile
    except Exception:
        raise ServiceException("Failed to create this profile!")
    
def update_profile(data, user):
    try:
        num_updates = models.Profile.objects.filter(pk=user.pk).update(**data['values'])
        return models.Profile.objects.get(pk=user.pk)
    except Exception:
        raise ServiceException("Failed to update this profile!")

def update_profile_picture(data, user):
    try:
        profile = user.profile
        serializer = serializers.ProfilePictureSerializer(instance=profile, data=data)
        file_object = data.get("profile_picture")

        if serializer.is_valid() and file_object:
            profile.profile_picture = file_object
            profile.save()
        else:
            raise ServiceException("Null or invalid file type")

        return serializer
    except Exception:
        raise ServiceException("Failed to update this profile!")