from rest_framework import serializers
from posts.models import Post 
from main.models import UserProfile
from chat.models import Message

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Message
        fields = "__all__"