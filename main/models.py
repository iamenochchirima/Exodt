from django.contrib.auth.models import AbstractUser
from django.db import models


class Profile(models.Model):
    user = models.CharField( max_length=200)
