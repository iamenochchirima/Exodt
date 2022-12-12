from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile
def index(request):
    return render(request, "main/index.html")

def profile_view(request):
    
    user_profile = Profile.objects.get(user=request.user)

    return render(request, "main/profile.html", {
        "user_profile": user_profile,
    })
   
