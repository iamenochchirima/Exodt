from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter

app_name = 'exodt_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('post/<str:pk>/', views.PostDetail.as_view(), name='detailcreate'),
    path('search/', views.PostListDetailFilter.as_view(), name='postsearch'),
    path('', views.PostList.as_view(), name='listcreate'),
]