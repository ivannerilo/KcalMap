from api.models import TemplateFood
from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs): 
        template_foods = TemplateFood.objects.all()
        for food in template_foods:
            food.delete()

        self.stdout.write(self.style.SUCCESS('Finished deleting all the Template Foods.'))

