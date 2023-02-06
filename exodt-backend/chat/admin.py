from django.contrib import admin
from .models import Message, ChatMessage, Chats

admin.site.register(Message)
admin.site.register(ChatMessage)
admin.site.register(Chats)
