from rest_framework import generics
from posts.models import Post
from . serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticatedOrReadOnly


class PostUserWritrPermission(BasePermission):

    message = 'Editing post is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author.user == request.user

class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritrPermission):
    permission_classes = [PostUserWritrPermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer