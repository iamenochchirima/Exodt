from django.db import models
from .utils import get_random_value
from django.template.defaultfilters import slugify
from django.db.models import Q
from django.shortcuts import reverse
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileManager(models.Manager):

    def get_all_unconnected_profiles(self, sender):
        profiles = UserProfile.objects.all().exclude(user=sender)
        profile = UserProfile.objects.get(user=sender)
        query_set = Connection.objects.filter(Q(sender=profile) | Q(receiver=profile))
        
        accepted = set([])

        for rel in query_set:
            if rel.status == 'accepted':
                accepted.add(rel.receiver)
                accepted.add(rel.sender)

        available = [profile for profile in profiles if profile not in accepted]
        return available

    def get_all_profiles(self, me):
        profiles = UserProfile.objects.all().exclude(user=me)
        return profiles

def get_profile_image_filepath(self, filename):
	return 'profile_images/' + str(self.pk) + '/profile_image.png'

def get_default_profile_image():
	return "exodt/default_profile_image.png"

class UserProfile(models.Model):
    first_name = models.CharField(max_length=225, blank=True)
    last_name = models.CharField(max_length=225, blank=True)
    email = models.EmailField(max_length=200, unique=True ,blank=True)
    username = models.CharField(max_length=50, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default="No bio", max_length=300, blank = True)
    profile_image = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True, default=get_default_profile_image)
    connections = models.ManyToManyField(User, blank=True, related_name="connections")
    country = models.CharField(max_length=225, blank=True)
    fav_field_os = models.CharField(max_length=225, blank=True)
    followers = models.CharField(max_length=225, blank=True)
    following = models.CharField(max_length=225, blank=True)
    profile_type = models.CharField(max_length=200, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    hide_email = models.BooleanField(default=True)

    objects = ProfileManager()

    def __str__(self):
        return f"{self.user.first_name}-{self.created}"

    def get_absolute_url(self):
        return reverse("main:profile_detail", kwargs={"slug": self.slug})
    

    def get_connections(self):
        return self.connections.all()

    def get_connections_no(self):
        return self.connections.all().count()

    def get_posts_no(self):
        return self.posts.all().count()

    def get_all_authors_posts(self):
        return self.posts.all()

    def get_likes_given_no(self):
        likes = self.like_set.all()
        total_liked = 0
        for like in likes:
            if like.value == 'Like':
                total_liked += 1
        return total_liked

    def get_likes_recieved_no(self):
        posts = self.posts.all()
        total_likes = 0
        for item in posts:
                total_likes += item.liked.all().count()
        return total_likes

STATUS_CHOICES = (
    ('send', 'Send'),
    ('accepted', 'Accepted')

)

class ConnectionManager(models.Manager):
    def invitations_recieved(self, receiver):
        query_set = Connection.objects.filter(receiver=receiver, status='send')
        return query_set

class Connection(models.Model):
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="receiver")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    objects = ConnectionManager()

    def __str__(self):
        return f"{self.sender} => {self.receiver}-{self.status}"







