from django.shortcuts import render, redirect 
from django.contrib.auth.models import User
from .models import Profile, Connection
from .forms import ProfileModelForm
from django.views.generic import ListView
from django.db.models import Q

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
        con_sender = Connection.objects.filter(receiver=profile)
        con_r = []
        con_s = []
        for item in con_reciever:
            con_r.append(item.receiver.user)
        for item in con_sender:
            con_s.append(item.sender.user)
        
        context['con_r'] = con_r
        context['con_s'] = con_s

        context['is_empty'] = False

        if len(self.get_queryset()) == 0:
            context['is_empty'] = True
        return context

def send_invitation(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        user = request.user
        sender = Profile.objects.get(user=user)
        receiver = Profile.objects.get(pk=pk)

        con = Connection.objects.create(sender=sender, receiver=receiver)

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('main:profile_view')

def remove_from_connections(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        user = request.user
        sender = Profile.objects.get(user=user)
        receiver = Profile.objects.get(pk=pk)

        con = Connection.objects.get(Q(sender=sender) & Q(receiver=receiver) | Q(sender=receiver) & Q(receiver=sender))

        con.delete()

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('main:profile_view')




