from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    first_name = models.CharField(max_length=225, blank=True)
    last_name = models.CharField(max_length=225, blank=True)
    email = models.EmailField(max_length=200, blank=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default="No bio", max_length=300)
    profile_picture = models.ImageField(default="profile_pic.jpg", upload_to="profile_pictures/")
    friends = models.ManyToManyField(User, blank=True, related_name="friends")
    country = models.CharField(max_length=225, blank=False)
    fav_field_os = models.CharField(max_length=225, blank=True)
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    slug = models.SlugField(unique=True, blank=True)
    user_profile_type = models.CharField(max_length=200, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}-{self.created}"



