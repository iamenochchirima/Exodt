from django.db import models
from django.core.validators import FileExtensionValidator
from main.models import UserProfile
from django.utils.translation import gettext_lazy as _

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class Post(models.Model):
    content = models.TextField()
    image = models.ImageField(_('Image'), upload_to=upload_to, blank=True, default='posts/default.jpg', validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    liked = models.ManyToManyField(UserProfile, default=None, related_name='liked', blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    
    objects = models.Manager()

    def __str__(self):
        return self.title

    def num_likes(self):
        return self.liked.all().count()
    
    def num_comments(self):
        return self.comment_set.all().count()
    
    class Meta:
        ordering = ('-created',)

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)

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