from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()

app_name = 'exodt_api'

router.register(r'messages', views.CoversationView)
router.register(r'posts', views.PostsView)
router.register(r'profiles', views.UserProfileView)

urlpatterns = [
    path('', include(router.urls)),
    # path('search/', views.PostListDetailFilter.as_view(), name='postsearch'),
]