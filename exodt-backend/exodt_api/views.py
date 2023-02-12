from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from posts.models import Post
from main.models import UserProfile
from chat.models import Conversation, Message
from . serializers import PostSerializer, UserProfileSerializer, ConversationSerializer, MessageSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, AllowAny, BasePermission, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from exodt.custom_methods import IsAuthenticatedCustom, IsAuthenticatedOrReadCustom
from django.shortcuts import get_object_or_404
from rest_framework import filters, status
from rest_framework.response import Response
import re
from django.db.models import Q, Count, Subquery, OuterRef
import json
from exodt.settings import SOCKET_SERVER
import requests
from django.contrib.auth import get_user_model

User = get_user_model()

class PostUserWritrPermission(BasePermission):

    message = 'Editing post is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author.user == request.user

class PostsView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadCustom]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # filter_backends = [filters.SearchFilter]
    # search_fields = ['^slug']

class UserProfileView(ModelViewSet):
    permission_classes = [IsAuthenticatedCustom]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def get_profile(self, request, pk=None):
        user = get_object_or_404(UserProfile, pk=pk)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def get_search_query(self):
        if self.request.method.lower() != "get":
            return self.queryset

        data = self.request.query_params.dict()
        data.pop("page", None)
        keyword = data.pop("keyword", None)

        if keyword:
            search_fields = (
                "username", "first_name", "last_name", "email"
            )
            query = self.get_query(keyword, search_fields)
            try:
                return self.queryset.filter(query).filter(**data).exclude(
                    Q(user_id=self.request.user.id) |
                    Q(user__is_superuser=True)
                ).annotate(
                    fav_count=Count(self.user_fav_query(self.request.user))
                ).order_by("-fav_count")
            except Exception as e:
                raise Exception(e)

        result = self.queryset.filter(**data).exclude(
            Q(user_id=self.request.user.id) |
            Q(user__is_superuser=True)
        ).annotate(
            fav_count=Count(self.user_fav_query(self.request.user))
        ).order_by("-fav_count")
        return result

    @staticmethod
    def user_fav_query(user):
        try:
            return user.user_favorites.favorite.filter(id=OuterRef("user_id")).values("pk")
        except Exception:
            return []


    @staticmethod
    def get_query(query_string, search_fields):
        query = None  # Query to search for every search term
        terms = UserProfileView.normalize_query(query_string)
        for term in terms:
            or_query = None  # Query to search for a given term in each field
            for field_name in search_fields:
                q = Q(**{"%s__icontains" % field_name: term})
                if or_query is None:
                    or_query = q
                else:
                    or_query = or_query | q
            if query is None:
                query = or_query
            else:
                query = query & or_query
        return query

    @staticmethod
    def normalize_query(query_string, findterms=re.compile(r'"([^"]+)"|(\S+)').findall, normspace=re.compile(r'\s{2,}').sub):
        return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]



def handleRequest(serializerData):
    notification = {
        "message": serializerData.data.get("message"),
        "from": serializerData.data.get("sender"),
        "receiver": serializerData.data.get("receiver").get("id")
    }

    headers = {
        'Content-Type': 'application/json',
    }
    try:
        requests.post(settings.SOCKET_SERVER, json.dumps(
            notification), headers=headers)
    except Exception as e:
        pass
    return True

class ConversationView(ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):

        # Extract the user IDs from the request data
        user_ids = request.data.get('user_ids')
        print(request.data)
        # Make sure that user_ids is a list and contains at least two elements
        if not isinstance(user_ids, list) or len(user_ids) < 2:
            return Response({'error': 'user_ids must be a list containing at least two user IDs'}, status=400)
        # Get the User objects for the given user IDs
        users = User.objects.filter(id__in=user_ids)
        # Make sure that the User objects exist
        if users.count() != len(user_ids):
            return Response({'error': 'One or more of the user IDs are invalid'}, status=400)
        # Create a new Conversation instance with the given users
        conversation = Conversation.objects.create()
        conversation.participants.set(users)
        # Return the created Conversation instance
        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=201)
    
    def get_chats_list(self, request, user_id=None):
        user = get_object_or_404(User, pk=user_id)
        conversations = self.queryset.filter(participants=user)
        serializer = self.serializer_class(conversations, many=True, context={'current_user_id': user_id})
        return Response(serializer.data)


class MessageView(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def get_conver_messages(self, request, *args, **kwargs):
        conversation_id = self.kwargs.get('conversation_id')
        if conversation_id:
            self.queryset = self.queryset.filter(conversation__id=conversation_id)
        return super().list(request, *args, **kwargs)