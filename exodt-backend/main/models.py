from django.db import models
from .utils import get_random_value
from django.template.defaultfilters import slugify
from django.db.models import Q
from django.shortcuts import reverse
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileManager(models.Manager):

    def get_all_unconnected_profiles(self, sender):
        profiles = Profile.objects.all().exclude(user=sender)
        profile = Profile.objects.get(user=sender)
        query_set = Connection.objects.filter(Q(sender=profile) | Q(receiver=profile))
        
        accepted = set([])

        for rel in query_set:
            if rel.status == 'accepted':
                accepted.add(rel.receiver)
                accepted.add(rel.sender)

        available = [profile for profile in profiles if profile not in accepted]
        return available

    def get_all_profiles(self, me):
        profiles = Profile.objects.all().exclude(user=me)
        return profiles

class Profile(models.Model):
    first_name = models.CharField(max_length=225, blank=True)
    last_name = models.CharField(max_length=225, blank=True)
    email = models.EmailField(max_length=200, blank=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default="No bio", max_length=300)
    profile_picture = models.ImageField(default="profile_pic.jpg", upload_to="profile_pictures/")
    connections = models.ManyToManyField(User, blank=True, related_name="friends")
    country = models.CharField(max_length=225, blank=False)
    fav_field_os = models.CharField(max_length=225, blank=True)
    followers = models.CharField(max_length=225, blank=True)
    following = models.CharField(max_length=225, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    user_profile_type = models.CharField(max_length=200, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

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

    __initial_first_name = None
    __initial_last_name = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__initial_first_name = self.first_name
        self.__initial_last_name = self.last_name


    def save(self, *args, **kwargs):
        available = False
        to_slug = self.slug
        if self.first_name != self.__initial_first_name or self.last_name != self.__initial_last_name or self.slug == None:
            if self.first_name and self.last_name:
                to_slug = slugify(str(self.first_name) + " " + str(self.last_name))
                available = Profile.objects.filter(slug=to_slug).exists()
                while available:
                    to_slug = slugify(to_slug + " " + str(get_random_value()))
                    available = Profile.objects.filter(slug=to_slug).exists()
        else:
            to_slug = str(self.user)
        self.slug = to_slug
        super().save(*args, **kwargs)

STATUS_CHOICES = (
    ('send', 'Send'),
    ('accepted', 'Accepted')

)

class ConnectionManager(models.Manager):
    def invitations_recieved(self, receiver):
        query_set = Connection.objects.filter(receiver=receiver, status='send')
        return query_set

class Connection(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="receiver")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    objects = ConnectionManager()

    def __str__(self):
        return f"{self.sender} => {self.receiver}-{self.status}"







