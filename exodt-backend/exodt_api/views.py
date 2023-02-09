from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from posts.models import Post
from main.models import UserProfile
from chat.models import Message, MessageAttachment, Chats
from . serializers import PostSerializer, UserProfileSerializer, MessageSerializer, ChatMessageSerializer, ChatsSerializer
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

class MessageView(ModelViewSet):
    queryset = Message.objects.select_related("sender", "receiver").prefetch_related("message_attachments")
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticatedCustom]

    def get_queryset(self):
        data = self.request.query_params.dict()
        user_id = data.get("user_id", None)

        if user_id:
            active_user_id = self.request.user.id
            return self.queryset.filter(Q(sender_id=user_id, receiver_id=active_user_id) | Q(
                sender_id=active_user_id, receiver_id=user_id)).distinct()
        return self.queryset

    def create(self, request, *args, **kwargs):

        try:
            request.data._mutable = True
        except:
            pass
        attachments = request.data.pop("attachments", None)

        if str(request.user.id) != str(request.data.get("sender_id", None)):
            raise Exception("only sender can create a message")

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if attachments:
            MessageAttachment.objects.bulk_create([MessageAttachment(
                **attachment, message_id=serializer.data["id"]) for attachment in attachments])

            message_data = self.get_queryset().get(id=serializer.data["id"])
            return Response(self.serializer_class(message_data).data, status=201)

        handleRequest(serializer)

        return Response(serializer.data, status=201)

    def update(self, request, *args, **kwargs):

        try:
            request.data._mutable = True
        except:
            pass
        attachments = request.data.pop("attachments", None)
        instance = self.get_object()

        serializer = self.serializer_class(
            data=request.data, instance=instance, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        MessageAttachment.objects.filter(message_id=instance.id).delete()

        if attachments:
            MessageAttachment.objects.bulk_create([MessageAttachment(
                **attachment, message_id=instance.id) for attachment in attachments])

            message_data = self.get_object()
            return Response(self.serializer_class(message_data).data, status=200)

        handleRequest(serializer)

        return Response(serializer.data, status=200)

# class ChatsView(ModelViewSet):
#     permission_classes = [AllowAny]
#     serializer_class = ChatsSerializer
#     queryset = Chats.objects.all()
