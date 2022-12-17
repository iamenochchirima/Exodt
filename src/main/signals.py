from django.db.models.signals import post_save, pre_delete
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
     receiver_ = instance.receiver

     if instance.status == "accepted":
        sender_.connections.add(receiver_.user)
        receiver_.connections.add(sender_.user)
        sender_.save()
        receiver_.save()

@receiver(pre_delete, sender=Connection)
def pre_delete_remove_connections(sender, instance, **kwargs):
    sender = instance.sender
    receiver = instance.receiver
    sender.connections.remove(receiver.user)
    receiver.connections.remove(sender.user)
    sender.save()
    receiver.save( )