from rest_framework import serializers
from posts.models import Post 

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title','content', 'excerpt', 'image', 'liked', 'slug', 'category', 'updated', 'created', 'author', 'status')