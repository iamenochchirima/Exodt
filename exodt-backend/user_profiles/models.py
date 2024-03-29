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

def default_profile_image():
	return "default_image/default_profile_image.png"

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'Countries'

    def __str__(self):
        return self.name

class UserProfile(models.Model):

    gender_options = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('non-binary', 'Non-binary'),
        ('other', 'Other'),
    )

    first_name = models.CharField(max_length=225, blank=True)
    last_name = models.CharField(max_length=225, blank=True)
    email = models.EmailField(max_length=200, unique=True ,blank=True)
    username = models.CharField(max_length=50, unique=True)
    user = models.OneToOneField(User, related_name='user_profile', on_delete=models.CASCADE)
    about = models.TextField( max_length=1000,blank=True, null=True)
    profile_image = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True, default=default_profile_image)
    connections = models.ManyToManyField(User, blank=True, related_name="connections")
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=gender_options, null=True, blank=True)
    fav_field_os = models.CharField(max_length=225, blank=True)
    followers = models.CharField(max_length=225, blank=True)
    following = models.CharField(max_length=225, blank=True)
    profile_type = models.CharField(max_length=200, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    hide_email = models.BooleanField(default=True)

    objects = ProfileManager()

    def __str__(self):
        return f"{self.user}-{self.created}"

    def get_profile_image_filename(self):
        return str(self.profile_image)[str(self.profile_image).index('profile_images/' + str(self.pk) + "/"):]

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







