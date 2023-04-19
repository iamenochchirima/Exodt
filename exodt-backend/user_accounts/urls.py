from django.urls import path
from .views import UserCreate

app_name = 'user_accounts'

urlpatterns = [
    path('create/', UserCreate.as_view(), name="create_user"),
]