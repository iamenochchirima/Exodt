from django.contrib import admin
from .models import UserProfile, Connection, Country

admin.site.register(UserProfile)
admin.site.register(Connection)
admin.site.register(Country)


