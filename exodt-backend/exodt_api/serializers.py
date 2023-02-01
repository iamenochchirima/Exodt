from rest_framework import serializers
from posts.models import Post 
from main.models import UserProfile
from chat.models import Message, MessageAttachment
from users.views import CustomUserSerializer
from django.db.models import Q

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    message_count = serializers.SerializerMethodField("get_message_count")
    conversed_list = serializers.SerializerMethodField("get_conversation_list")

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_conversation_list(self, obj):

        try:
            user_id = self.context["request"].user.id
        except Exception as e:
            user_id = None

        conversation_list = UserProfile.objects.filter(
            Q(user__in=Message.objects.filter(sender=user_id).values("receiver")) | 
            Q(user__in=Message.objects.filter(receiver=user_id).values("sender"))
        ).distinct()

        return UserProfileSerializer(conversation_list, many=True).data

    def get_message_count(self, obj):
        try:
            user_id = self.context["request"].user.id
        except Exception as e:
            user_id = None

        message = Message.objects.filter(receiver=user_id, is_read=False).distinct() 

        return message.count()


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