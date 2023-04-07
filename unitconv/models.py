from django.db import models

# Create your models here.
class Conversion(models.Model):
        pound_to_troy = models.FloatField()
        pound_to_ton = models.FloatField()
        pound_to_gram = models.FloatField()
        pound_to_kilogram = models.FloatField()
        pound_to_ounce = models.FloatField()
