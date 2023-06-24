from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('create/', views.CreatePostAPIView.as_view(), name='create-post'),
    path('get-posts/', views.PostListAPIView.as_view(), name='post-list'),
    path('<int:pk>/detail/', views.PostDetailAPIView.as_view(), name='post-detail'),
    path('<int:pk>/update/', views.PostUpdateAPIView.as_view(), name='post-update'),
    path('<int:pk>/delete/', views.PostDeleteAPIView.as_view(), name='post_delete'),
    # path('like_unlike_post', views.like_unlike_post, name='like_unlike_post'),
]
