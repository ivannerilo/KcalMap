from django.contrib import admin
from . import models

# Register your models here.
# SU = ivan 123

admin.site.register(models.Profile)
admin.site.register(models.TemplateMeal)
admin.site.register(models.Food)
admin.site.register(models.TemplateFood)
admin.site.register(models.FoodLog)

