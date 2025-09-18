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
            # Categoria: Novas Frutas e Vegetais
            {
                "name": "Abacate",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.60, # 160 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Morango",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.32, # 32 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Espinafre Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.23, # 23 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Couve Refogada",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.36, # 36 calorias / 100g (varia com óleo)
                "is_global": True,
            },
            {
                "name": "Uva Thompson",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.69, # 69 calorias / 100g
                "is_global": True,
            },

            # Categoria: Novas Fontes de Proteína
            {
                "name": "Filé de Tilápia Assado",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.28, # 128 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Lentilha Cozida",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.16, # 116 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Grão de Bico Cozido",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.39, # 139 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Ricota Fresca",
                "unit": "g",
                "default_quantity": 50,
                "calories_per_unit": 1.36, # 68 calorias / 50g
                "is_global": True,
            },

            # Categoria: Novos Carboidratos e Grãos
            {
                "name": "Quinoa Cozida",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 1.20, # 120 calorias / 100g
                "is_global": True,
            },
            {
                "name": "Pão Francês",
                "unit": "un",
                "default_quantity": 1,
                "calories_per_unit": 135.0,
                "is_global": True,
            },
            {
                "name": "Batata Inglesa Cozida",
                "unit": "g",
                "default_quantity": 100,
                "calories_per_unit": 0.77, # 77 calorias / 100g
                "is_global": True,
            },

            # Categoria: Lanches e Outros (Parte 2)
            {
                "name": "Amêndoas",
                "unit": "g",
                "default_quantity": 30,
                "calories_per_unit": 5.67, # 170 calorias / 30g
                "is_global": True,
            },
            {
                "name": "Nozes",
                "unit": "g",
                "default_quantity": 30,
                "calories_per_unit": 6.33, # 190 calorias / 30g
                "is_global": True,
            },
            {
                "name": "Chocolate ao Leite",
                "unit": "g",
                "default_quantity": 25,
                "calories_per_unit": 5.4, # 135 calorias / 25g
                "is_global": True,
            },
            {
                "name": "Mel de Abelha",
                "unit": "g",
                "default_quantity": 20,
                "calories_per_unit": 3.2, # 64 calorias / 20g
                "is_global": True,
            },

            # Categoria: Óleos e Bebidas
            {
                "name": "Manteiga com Sal",
                "unit": "g",
                "default_quantity": 10,
                "calories_per_unit": 7.2, # 72 calorias / 10g
                "is_global": True,
            },
            {
                "name": "Óleo de Soja",
                "unit": "ml",
                "default_quantity": 15,
                "calories_per_unit": 8.67, # 130 calorias / 15ml
                "is_global": True,
            },
            {
                "name": "Café Preto (sem açúcar)",
                "unit": "ml",
                "default_quantity": 200,
                "calories_per_unit": 0.01, # 2 calorias / 200ml
                "is_global": True,
            },
            {
                "name": "Refrigerante (Cola)",
                "unit": "ml",
                "default_quantity": 350,
                "calories_per_unit": 0.4, # 140 calorias / 350ml
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