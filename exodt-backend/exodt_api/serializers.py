from rest_framework import serializers
from posts.models import Post 

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id','title','content','image','liked','category','excerpt','slug','updated','created','status','author')