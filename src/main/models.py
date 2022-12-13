from django.contrib.auth.models import User
from django.db import models
from .utils import get_random_value
from django.template.defaultfilters import slugify

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

    def __str__(self):
        return f"{self.user.username}-{self.created}"
    
    def save(self, *args, **kwargs):
        available = False
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

    def get_connections(self):
        return self.connections.all()

    def get_connections_no(self):
        return self.connections.all().count()

STATUS_CHOICES = (
    ('send', 'Send'),
    ('accepted', 'Accepted')
)

class Connection(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sender")
    reciever = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="reciever")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} => {self.reciever}-{self.status}"







