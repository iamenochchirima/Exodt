from . import views
from django.urls import path

app_name = 'exodt_api'

urlpatterns = [
    path('', views.PostList.as_view(), name='listposts'),
    path('profiles/', views.ProfileList.as_view(), name='listprofiles'),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='detailview'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='detailcreate'),
    path('search/', views.PostListDetailFilter.as_view(), name='postsearch'),
    path('admin/create/', views.CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', views.AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', views.EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', views.DeletePost.as_view(), name='deletepost'),
]