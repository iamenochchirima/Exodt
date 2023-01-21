from django.contrib import admin
from users.models import UserAccount
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = UserAccount
    search_fields = ('email', 'first_name', 'last_name', 'username')
    list_filter = ('email', 'first_name', 'last_name', 'username', 'is_active', 'is_staff', 'is_verified', 'is_superuser')
    ordering = ('-start_date',)
    list_display = ('email', 'first_name','last_name', 'username',
                    'is_active', 'is_staff','is_verified', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name', 'username')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_verified', 'is_superuser')}),
        ('Personal', {'fields': ('bio',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_verified', 'is_superuser')}
         ),
    )


admin.site.register(UserAccount, UserAdminConfig)