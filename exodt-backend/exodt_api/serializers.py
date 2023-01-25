from rest_framework import serializers
from posts.models import Post 
from main.models import UserProfile
from chat.models import Message, MessageAttachment

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class MessageAttachmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MessageAttachment
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField("get_sender_data")
    sender_id = serializers.IntegerField(write_only=True)
    receiver = serializers.SerializerMethodField("get_receiver_data")
    receiver_id = serializers.IntegerField(write_only=True)
    message_attachments = MessageAttachmentSerializer(
        read_only=True, many=True)

    class Meta: 
        model = Message
        fields = "__all__"

    def get_receiver_data(self, obj):
        return UserProfileSerializer(obj.receiver.user_profile).data

    def get_sender_data(self, obj):
        return UserProfileSerializer(obj.sender.user_profile).data