from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('', views.main_post_view, name='main_post_view'),
    path('like_unlike_post', views.like_unlike_post, name='like_unlike_post')
]