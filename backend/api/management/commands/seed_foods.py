from api.models import Food
from django.core.management.base import BaseCommand

# api/seed_data.py

class Command(BaseCommand):
    help = 'Populates the database with initial food data'

    def handle(self, *args, **kwargs):
        FOOD_SEED_DATA = [
            # Categoria: Café da Manhã
            {
                "name": "Ovo de Galinha Cozido",
                "unit": "un",
                "default_quantity": 1,
                "calories_per_unit": 78.0,
                "is_global": True,
            },
            {
                "name": "Pão de Forma Integral",
                "unit": "un",
                "default_quantity": 1,
                "calories_per_unit": 80.0,
                "is_global": True,
            },
            {
                "name": "Aveia em Flocos",
                "unit": "g",
                "default_quantity": 40,
                "calories_per_unit": 3.75, # 150 calorias / 40g
                "is_global": True,
            },
            {
                "name": "Banana Prata",
                "unit": "un",
                "default_quantity": 1,
                "calories_per_unit": 98.0,
                "is_global": True,
            },
            {
                "name": "Mamão Papaia",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.43, # 43 calorias / 100g
                "is_global": True,
            },

            # Categoria: Fontes de Proteína
            {
                "name": "Peito de Frango Grelhado",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.65, # 165 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Salmão Grelhado",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 2.08, # 208 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Carne Moída (Patinho)",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.85, # 185 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Tofu Firme",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.76, # 76 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Feijão Carioca Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.76, # 76 calorias / 100g
                "is_global": True,
            },

            # Categoria: Carboidratos e Grãos
            {
                "name": "Arroz Branco Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.30, # 130 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Batata Doce Cozida",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.86, # 86 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Macarrão Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.58, # 158 calorias / 100g
                "is_global": True,
            },

            # Categoria: Frutas e Vegetais
            {
                "name": "Maçã Fuji",
                "unit": "un",
                "default_quantity": 1,
                "calories_per_unit": 95.0,
                "is_global": True,
            },
            {
                "name": "Brócolis Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.35, # 35 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Alface Crespa",
                "unit": "g",
                "default_quantity": 50,
                "calories_per_unit": 0.15, # 15 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Tomate",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.18, # 18 calorias / 100g
                "is_global": True,
            },

            # Categoria: Laticínios e Bebidas
            {
                "name": "Leite Integral",
                "unit": "ml",
                "default_quantity": 200,
                "calories_per_unit": 0.61, # 122 calorias / 200ml
                "is_global": True,
            },
            {
                "name": "Iogurte Grego Natural",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.97, # 97 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Queijo Minas Frescal",
                "unit": "g",
                "default_quantity": 30,
                "calories_per_unit": 2.4, # 72 calorias / 30g
                "is_global": True,
            },
        ]

        for food in FOOD_SEED_DATA:

            food_name = food.pop('name')
            obj, created = Food.objects.get_or_create(name=food_name, defaults=food)

            if created:
                print(f"Alimento '{obj.name}' criado com sucesso.")
            else:
                print(f"Alimento '{obj.name}' já existia")

        self.stdout.write(self.style.SUCCESS('Finished seeding food data.'))