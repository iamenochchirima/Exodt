from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def get_message_file(instance, filename):
    return 'message_files/' + str(instance.pk) + '/' + filename

class Conversation(models.Model):
    sender = models.ForeignKey(User, related_name='message_sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='message_receiver', on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    media_file = models.FileField(upload_to=get_message_file, null=True, blank=True)
    media_caption = models.TextField(null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    link_caption = models.TextField(null=True, blank=True)
    document = models.FileField(null=True, upload_to=get_message_file, blank=True)
    doc_caption = models.TextField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
    pinned = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"message between {self.sender} and {self.receiver}"
    
    class Meta:
        ordering = ("-created_at",)