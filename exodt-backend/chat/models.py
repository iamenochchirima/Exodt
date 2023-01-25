from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='message_sender', on_delete=models.CASCADE)
    reciever = models.ForeignKey(User, related_name='message_reciever', on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"message between {self.sender} and {self.reciever}"

def get_messages_attachments_filepath(instance, filename):
    return 'messages_attachments/' + str(instance.message.pk) + '/' + filename

class MessageAttachment(models.Model):
    message = models.ForeignKey( Message, related_name="message_attachments", on_delete=models.CASCADE)
    attachment = models.FileField( upload_to=get_messages_attachments_filepath)
    caption = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_at",)