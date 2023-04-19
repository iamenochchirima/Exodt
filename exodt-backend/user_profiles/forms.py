from django import forms
from .models import UserProfile

class UserProfileModelForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'bio', 'profile_image', 'country', 'fav_field_os', )