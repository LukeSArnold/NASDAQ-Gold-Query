# Generated by Django 4.1.2 on 2022-11-10 20:28

from django.db import migrations

def populate_db(apps,schema_editor):
    Conversion = apps.get_model('unitconv', 'Conversion')
    conversion = Conversion(
            pound_to_troy = 14.58333,
            pound_to_ton = 0.0005,
            pound_to_gram = 453.5929094356397,
            pound_to_kilogram = 0.45359290943563974,
            pound_to_ounce = 16,
            )
    conversion.save()


class Migration(migrations.Migration):

    dependencies = [
        ('unitconv', '0001_initial'),
    ]

    operations = [
            migrations.RunPython(populate_db),
    ]