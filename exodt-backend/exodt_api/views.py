from rest_framework import generics, viewsets
from posts.models import Post
from . serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class PostUserWritrPermission(BasePermission):

    message = 'Editing post is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author.user == request.user

class PostList(viewsets.ModelViewSet):
    permission_classes = [PostUserWritrPermission]
    serializer_class = PostSerializer

    def get_object(self):
        obj = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=obj)

    def get_queryset(self):
        return Post.objects.all()