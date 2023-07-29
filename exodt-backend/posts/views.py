from django.shortcuts import redirect
from .models import Post, Like, Category, Comment
from rest_framework import generics
from rest_framework.views import APIView
from user_profiles.models import UserProfile
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.generic import UpdateView, DeleteView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib import messages
from rest_framework import serializers
from .serializers import CategorySerializer, PostSerializer, LikeSerializer, CommentSerializer


class CreatePostSerializer(serializers.ModelSerializer):
    content = serializers.CharField(max_length=1000)
    image = serializers.ImageField(allow_null=True, required=False)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Post
        fields = ('content', 'image', 'category')

    def validate_image(self, value):
        if value:
            # check if the uploaded file is an image
            if not value.content_type.startswith('image'):
                raise serializers.ValidationError('Invalid image format')
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        user_profile = user.user_profile
        post = Post(author=user_profile, **validated_data)
        post.save()
        return post


class CreatePostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        serializer = CreatePostSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostListAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class CategoryListAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class PostDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(post)
        return Response(serializer.data)


class PostDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if post.author != request.user:
            return Response(
                {'error': 'You do not have permission to delete this post.'},
                status=status.HTTP_403_FORBIDDEN
            )

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Check if the requesting user is the same as the post author
        if post.author != request.user:
            return Response(
                {'error': 'You do not have permission to update this post.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        user = request.user.user_profile
        if not post_id:
            return Response({'error': 'post_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        if Like.objects.filter(user=user, post=post).exists():
            return Response({'error': 'You have already liked this post.'}, status=status.HTTP_400_BAD_REQUEST)

        like = Like(user=user, post=post, value='Like')
        like.save()
        return Response({'success': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)


class UnlikeAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def delete(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        user = request.user.user_profile
        if not post_id:
            return Response({'error': 'post_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            like = Like.objects.get(user=user, post=post)
            like.delete()
            return Response({'success': 'Post unliked successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            return Response({'error': 'You have not liked this post.'}, status=status.HTTP_400_BAD_REQUEST)


class CommentCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post_id')
        body = request.data.get('body')
        user = request.user.user_profile

        if not post_id:
            return Response({'error': 'post_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        comment = Comment(user=user, post=post, body=body)
        comment.save()
        return Response({'success': 'Comment created successfully.'}, status=status.HTTP_201_CREATED)


class CommentDeleteAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()

    def delete(self, request, *args, **kwargs):
        comment_id = kwargs.get('pk')
        user = request.user.user_profile

        try:
            comment = Comment.objects.get(pk=comment_id, user=user)
            comment.delete()
            return Response({'success': 'Comment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)


class CommentUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def update(self, request, *args, **kwargs):
        comment_id = kwargs.get('pk')
        user = request.user.user_profile

        try:
            comment = Comment.objects.get(pk=comment_id, user=user)
            serializer = self.get_serializer(
                comment, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'Comment updated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

class CommentListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        try:
            post = Post.objects.get(pk=post_id)
            return Comment.objects.filter(post=post)
        except Post.DoesNotExist:
            return Comment.objects.none()
