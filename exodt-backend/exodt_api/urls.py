from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()

app_name = 'exodt_api'

router.register(r'messages', views.MessageView)
router.register(r'conversations', views.ConversationView)
router.register(r'posts', views.PostsView)
router.register(r'profiles', views.UserProfileView)

urlpatterns = [
    path('', include(router.urls)),
    path('conversations_get/<int:user_id>/', views.ConversationView.as_view({'get': 'get_chats_list'})),
    path('messages_get/<int:conversation_id>/', views.MessageView.as_view({'get': 'get_conver_messages'})),
]