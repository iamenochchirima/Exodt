from django.db import models
from django.contrib.auth import get_user_model
from main.models import UserProfile

User = get_user_model()

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='message_sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='message_receiver', on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"message between {self.sender} and {self.receiver}"
    
    class Meta:
        ordering = ("-created_at",)

def get_messages_attachments_filepath(instance, filename):
    return 'messages_attachments/' + str(instance.message.pk) + '/' + filename

class MessageAttachment(models.Model):
    message = models.ForeignKey( Message, related_name="message_attachments", on_delete=models.CASCADE)
    attachment = models.FileField( upload_to=get_messages_attachments_filepath, blank=True)
    caption = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

class Chats(models.Model):
    sender = models.ForeignKey(UserProfile, related_name='chat_sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(UserProfile, related_name='chat_receiver', on_delete=models.CASCADE)
    messages = models.ManyToManyField(Message, through='ChatMessage')
    archived = models.BooleanField(default=False)
    pinned = models.BooleanField(default=False)

class ChatMessage(models.Model):
    chat = models.ForeignKey(Chats, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    latest_message = models.DateTimeField(auto_now_add=True)
    count = models.PositiveIntegerField(default=0)