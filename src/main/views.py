from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Profile, Connection
from .forms import ProfileModelForm
from django.views.generic import ListView

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

def invite_profile_list_view(request):
    user = request.user
    query_set = Profile.objects.get_all_unconnected_profiles(user)

    return render(request, 'main/toinvite_list.html', {
        'qs': query_set
    })


# def profile_list_view(request):
#     user = request.user
#     query_set = Profile.objects.get_all_profiles(user)

#     return render(request, 'main/profile_list.html', {
#         'qs': query_set
#     })

class ProfileListView(ListView):
    model = Profile
    template_name = 'main/profile_list.html'

    def get_queryset(self):
        query_set = Profile.objects.get_all_profiles(self.request.user)
        return query_set

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.get(username__iexact=self.request.user.username)
        profile = Profile.objects.get(user=user)
        con_reciever = Connection.objects.filter(sender=profile)
        con_sender = Connection.objects.filter(reciever=profile)
        con_r = []
        con_s = []
        for item in con_reciever:
            con_r.append(item.reciever.user)
        for item in con_sender:
            con_s.append(item.sender.user)
        
        context['con_r'] = con_r
        context['con_s'] = con_s

        context['is_empty'] = False

        if len(self.get_queryset()) == 0:
            context['is_empty'] = True
        return context


