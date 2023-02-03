from rest_framework import serializers
from posts.models import Post 
from main.models import UserProfile
from chat.models import Message, MessageAttachment
from django.db.models import Q
from django.utils import timezone
import pytz

class PostSerializer(serializers.ModelSerializer):
    author_details = serializers.SerializerMethodField("get_author_details")
    created_formatted = serializers.SerializerMethodField("get_created_formatted")

    class Meta:
        model = Post
        fields = "__all__"

    def get_author_details(self, obj):
        author = obj.author
        user_profile_serializer = UserProfileSerializer(author)
        return user_profile_serializer.data
    
    def get_created_formatted(self, obj):
        time_zone = pytz.timezone('UTC')
        created = obj.created.astimezone(time_zone)
        now = timezone.now().astimezone(time_zone)

        delta = now - created
        if delta.days == 0:
            # less than 24 hours
            if delta.seconds <= 60:
                return "just now"
            if delta.seconds <= 3600:
                minutes = round(delta.seconds / 60)
                return f"{minutes} minutes ago"
            hours = round(delta.seconds / 3600)
            return f"{hours} hours ago"
        elif delta.days == 1:
            # less than 2 days
            return "yesterday"
        else:
            # more than 2 days
            return created.strftime("%B %d, %Y")

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