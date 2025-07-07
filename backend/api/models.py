from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model): #Dados Tecnicos do User, Altura, Peso, Idade, etc.. Métodos para calcular IMC, GEB!
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    calories_goal = models.IntegerField(blank=True, null=True)
    cm_height = models.FloatField(blank=True, null=True)
    kg_weight = models.FloatField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    sex = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])

    def __str__(self):
        return self.user.username

    def calculate_IMC(self):
        return self.kg_weight / ((self.cm_height/ 100) ** 2)

    def calculate_GEB(self):
        if self.sex == "M":
            return (13.75 * self.kg_weight) + (5 * self.cm_height) - (6.76 * self.age) + 66.5
        if self.sex == "F":
            return (9.56 * self.kg_weight) + (1.85 * self.cm_height) - (4.68 * self.age) + 665.0

class TemplateMeal(models.Model): #Refeição padrão do usuário, como Café da manhã, Janta, etc...  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(blank=True, null=True, max_length=255)

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class Food(models.Model): #A classificação dos alimentos, todos são registrados aqui.
    name = models.CharField(blank=True, null=True, max_length=255)
    unit = models.CharField(max_length=10, choices=[('g', 'Gram'), ('ml', 'Milliliter'), ('un', 'Unit')])
    calories_per_unit = models.FloatField(blank=True, null=True)
    default_quantity = models.IntegerField(blank=True, null=True)

    is_global = models.BooleanField(default=False)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name

"""     def calculate_default_quantity(self):
        if self.unit == "g" or self.unit == "ml":
            self.default_quantity = 100
        else:
            self.default_quantity = 1
        
    def save(self, *args, **kwargs):
        if not default_quantity:
            self.calculate_default_quantity()
        super().save(*args, **kwargs) """

class TemplateFood(models.Model): #Alimentos que são de costume do User, consumir nessa refeição.
    template_meal = models.ForeignKey(TemplateMeal, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)

class FoodLog(models.Model): #Cada Alimento e quantidade que o user consumiu, mantém o controle de data!
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meal = models.ForeignKey(TemplateMeal, on_delete=models.SET_NULL, null=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    quantity = models.FloatField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def calculate_calories(self):
        if self.food and self.food.calories_per_unit and self.quantity:
            return self.food.calories_per_unit * self.quantity

    def __str__(self):
        return f"{self.user.username} - {self.food.name} = {self.quantity} {self.food.unit}"


