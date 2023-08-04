from django.db import models
from django.core.validators import FileExtensionValidator
from user_profiles.models import UserProfile
from django.utils.translation import gettext_lazy as _
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

def posts_images_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    runique_name = uuid.uuid4().hex
    return 'posts_images/exodtpost_{}.{}'.format(runique_name, ext)

class Post(models.Model):
    content = models.TextField(max_length=2000)
    image = models.ImageField(_('Image'), upload_to=posts_images_upload_path, blank=True, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    
    objects = models.Manager()

    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ('-created',)

LIKE_CHOICES = (
    ('Like', 'Like'),
    ('Unlike', 'Unlike')
)

class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, max_length=8)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}-{self.value}" 

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        ordering = ('-created',) 