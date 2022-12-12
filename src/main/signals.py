from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile, Connection

@receiver(post_save, sender=User)
def post_save_profile_create(sender, instance, created, **kwargs):

    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=Connection)
def post_save_add_connection(sender, instance, created, **kwargs):
     sender_ = instance.sender
     receiver_ = instance.reciever

     if instance.status == "accepted":
        sender_.connections.add(receiver_.user)
        receiver_.connections.add(sender_.user)
        sender_.save()
        receiver_.save()
