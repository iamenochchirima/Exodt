from rest_framework import serializers
from .models import Category, Post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_profile_image(self, obj):
        return obj.author.profile_image.url if obj.author.profile_image else None

    def get_username(self, obj):
        return obj.author.username

