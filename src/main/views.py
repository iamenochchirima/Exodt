from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile
from .forms import ProfileModelForm

def index(request):
    return render(request, "main/index.html")

def profile_view(request):
    
    user_profile = Profile.objects.get(user=request.user)
    form = ProfileModelForm(request.POST or None, request.FILES or None, instance=user_profile)
    confirm = False

    if request.method == 'POST':
        if form.is_valid:
            form.save()
            confirm = True

    return render(request, "main/profile.html", {
        "user_profile": user_profile,
        "form": form,
        "confirm": confirm
    })
   
