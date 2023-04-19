from rest_framework import serializers
from posts.models import Post 
from user_profiles.models import UserProfile
from chat.models import Conversation, Message
from django.db.models import Q
from django.utils import timezone
import pytz
from django.contrib.auth import get_user_model

User = get_user_model()

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
    # message_count = serializers.SerializerMethodField("get_message_count")

    class Meta:
        model = UserProfile
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    participant_profile = serializers.SerializerMethodField()
    latest_message = serializers.SerializerMethodField()
    created_formatted = serializers.SerializerMethodField("get_created_formatted")

    class Meta: 
        model = Conversation
        fields = "__all__"

    def create(self, validated_data):
        user_ids = validated_data.pop('user_ids')
        if len(user_ids) < 2:
            raise serializers.ValidationError("user_ids must be a list containing at least two user IDs")

        participants = User.objects.filter(id__in=user_ids)
        conversation = Conversation.objects.create(participants=participants, **validated_data)
        return conversation

    # def get_participants_profiles(self, obj):
    #     profiles = UserProfile.objects.filter(user__in=obj.participants.all())
    #     return UserProfileSerializer(profiles, many=True).data
    
    def get_participant_profile(self, obj):
        current_user_id = self.context['current_user_id']
        other_participant = obj.participants.exclude(id=current_user_id).first()
        other_participant_profile = UserProfile.objects.get(user=other_participant)
        return UserProfileSerializer(other_participant_profile).data

    def get_latest_message(self, obj):
        latest_message = Message.objects.filter(conversation=obj).last()
        if latest_message:
            return MessageSerializer(latest_message).data
        return None

    def get_created_formatted(self, obj):
        time_zone = pytz.timezone('UTC')
        created = obj.created_at.astimezone(time_zone)
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
            return f"today at {created.strftime('%H:%M')}"
        elif delta.days == 1:
            # less than 2 days
            return f"yesterday at {created.strftime('%H:%M')}"
        else:
            # more than 2 days
            return created.strftime("%B %d, %Y")

class MessageSerializer(serializers.ModelSerializer):
    timestamp_formatted = serializers.SerializerMethodField("get_timestamp_formatted")

    class Meta: 
        model = Message
        fields = "__all__"

    def get_timestamp_formatted(self, obj):
        time_zone = pytz.timezone('UTC')
        created = obj.timestamp.astimezone(time_zone)
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
            return f"today at {created.strftime('%H:%M')}"
        elif delta.days == 1:
            # less than 2 days
            return f"yesterday at {created.strftime('%H:%M')}"
        else:
            # more than 2 days
            return created.strftime("%B %d, %Y")
