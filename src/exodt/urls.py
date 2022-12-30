from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('exodt_api.urls', namespace='exodt_api')),
    path('accounts/', include('allauth.urls')),
    path('main/', include('main.urls', namespace='main')),
    path('posts/', include('posts.urls', namespace='posts')),
    path('chat/', include('chat.urls', namespace='chat')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)