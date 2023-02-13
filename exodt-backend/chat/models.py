from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    pinned = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    online = models.BooleanField(default=False)

    def __str__(self):
        participants = [p.username for p in self.participants.all()]
        return f"Chat between {', '.join(participants)}"
    
    class Meta:
        ordering = ("-created_at",)

def get_message_file(instance, filename):
    return 'message_files/' + str(instance.pk) + '/' + filename

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    message = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=get_message_file, null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    document = models.FileField(null=True, upload_to=get_message_file, blank=True)
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} to {self.conversation}: {self.message}"
        