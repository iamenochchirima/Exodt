from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('api/', include('exodt_api.urls', namespace='exodt_api')),
    path('api/user/', include('users.urls', namespace='users')),
    path('api_auth', include('rest_framework.urls', namespace='rest_framework')),
    path('main/', include('main.urls', namespace='main')),
    path('posts/', include('posts.urls', namespace='posts')),
    path('chat/', include('chat.urls', namespace='chat')),
    path('docs/', include_docs_urls(title='ExodtAPI')),
    path('schema', get_schema_view(
        title="ExodtAPI",
        description="API for ExodtAPI",
        version="1.0.0"
    ), name='openapi-schema'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)