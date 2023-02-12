from django.contrib import admin
from users.models import UserAccount
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = UserAccount
    search_fields = ('email', 'first_name', 'last_name', 'username')
    list_filter = ('email', 'first_name', 'last_name', 'username', 'is_active', 'is_staff', 'is_verified', 'is_admin', 'is_superuser', 'date_joined', 'last_login')
    ordering = ('-start_date',)
    list_display = ('id','email', 'first_name','last_name', 'username',
                    'is_active', 'is_staff','is_verified', 'is_admin', 'is_superuser', 'date_joined', 'last_login')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name', 'username')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_verified', 'is_admin', 'is_superuser')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_verified', 'is_admin', 'is_superuser')}
         ),
    )


admin.site.register(UserAccount, UserAdminConfig)