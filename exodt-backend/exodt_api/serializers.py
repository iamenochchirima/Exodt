from rest_framework import serializers
from posts.models import Post 
from main.models import UserProfile

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id','title','content','image','liked','category','excerpt','slug','updated','created','status','author')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','first_name','last_name','email','user','bio','profile_picture','connections','country','fav_field_os','followers','following','slug','profile_type','updated','created')