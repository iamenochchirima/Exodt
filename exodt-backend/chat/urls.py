from django.urls import path
from . import views


app_name = 'chat'

urlpatterns = [
    path('', views.chat_view, name='chat_view'),
    path('<str:room_name>/', views.room, name='room'),
]
