# Generated by Django 4.1.4 on 2023-05-02 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='is_email_verified',
            field=models.BooleanField(default=False),
        ),
    ]
