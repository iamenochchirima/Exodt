from rest_framework import serializers
from .models import Category, Post, Like, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    num_likes = serializers.SerializerMethodField()
    num_comments = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_profile_image(self, obj):
        return obj.author.profile_image.url if obj.author.profile_image else None

    def get_username(self, obj):
        return obj.author.username

    def get_num_likes(self, obj):
        return obj.like_set.count()

    def get_num_comments(self, obj):
        return obj.comment_set.count()

    def get_liked_by(self, obj):
        likers = obj.like_set.filter(
            value='Like').values_list('user__id', flat=True)
        return likers


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_profile_image(self, obj):
        return obj.user.profile_image.url if obj.user.profile_image else None

    def get_username(self, obj):
        return obj.user.username
