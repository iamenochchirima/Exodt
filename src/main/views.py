from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile, Connection
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

def invites_recieved_view(request):
    user_profile = Profile.objects.get(user=request.user)
    query_set = Connection.objects.invitations_recieved(user_profile)

    return render(request, 'main/invites.html', {
        'qs': query_set
    })

def profile_list_view(request):
    user = request.user
    query_set = Profile.objects.get_all_profiles(user)

    return render(request, 'main/profile_list.html', {
        'qs': query_set
    })

def invite_profile_list_view(request):
    user = request.user
    query_set = Profile.objects.get_all_unconnected_profiles(user)

    return render(request, 'main/toinvite_list.html', {
        'qs': query_set
    })

