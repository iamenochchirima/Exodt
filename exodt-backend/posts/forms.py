from django import forms 
from .models import Like, Comment, Post

class PostModelForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('content', 'image')

class CommentModelForm(forms.ModelForm):

    body = forms.CharField(label='test label', widget=forms.TextInput(attrs={'placeholder': 'Add a comment'}))

    class Meta:
        model = Comment
        fields = ('body',)
