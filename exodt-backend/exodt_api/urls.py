from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter

app_name = 'exodt_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('', views.PostList.as_view(), name='listpost'),
    path('post/<str:pk>/', views.PostDetail.as_view(), name='detailcreate'),
    path('search/', views.PostListDetailFilter.as_view(), name='postsearch'),
    path('admin/create/', views.CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', views.AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', views.EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', views.DeletePost.as_view(), name='deletepost'),
]