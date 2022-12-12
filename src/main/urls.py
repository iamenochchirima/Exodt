from django.urls import path
from .views import profile_view

from . import views

app_name = 'main'

urlpatterns = [
    path("", views.index, name='index'),
    path("profile_view", views.profile_view, name="profile_view")  
]