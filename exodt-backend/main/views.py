from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from .models import UserProfile, Connection
from .forms import UserProfileModelForm
from django.views.generic import ListView, DetailView
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

@login_required
def profile_view(request):
    
    user_profile = UserProfile.objects.get(user=request.user)
    form = UserProfileModelForm(request.POST or None, request.FILES or None, instance=user_profile)
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

@login_required
def invites_recieved_view(request):
    user_profile = UserProfile.objects.get(user=request.user)
    query_set = Connection.objects.invitations_recieved(user_profile)
    result = list(map(lambda x: x.sender, query_set))
    is_empty = False
    if len(result) == 0:
        is_empty = True
    return render(request, 'main/invites.html', {
        'qs': result,
        'is_empty': is_empty
    })

@login_required
def accept_invitation(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        sender = UserProfile.objects.get(pk=pk)
        receiver = UserProfile.objects.get(user=request.user)
        con = get_object_or_404(Connection, sender=sender, receiver=receiver)

        if con.status == 'send':
            con.status = 'accepted'
            con.save()
    return redirect('main:invites')
    
@login_required
def decline_invitation(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        sender = UserProfile.objects.get(pk=pk)
        receiver = UserProfile.objects.get(user=request.user)
        con = get_object_or_404(Connection, sender=sender, receiver=receiver)
        con.delete()
    return redirect('main:invites')

@login_required
def invite_profile_list_view(request):
    user = request.user
    query_set = UserProfile.objects.get_all_unconnected_profiles(user)

    return render(request, 'main/toinvite_list.html', {
        'qs': query_set
    })

class ProfileDetailView(LoginRequiredMixin, DetailView):
    model = UserProfile
    template_name = 'main/profile_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.get(username__iexact=self.request.user.username)
        profile = UserProfile.objects.get(user=user)
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
        context['posts'] = self.get_object().get_all_authors_posts()
        context['len_posts'] = True if len(self.get_object().get_all_authors_posts()) > 0 else False
        return context



class ProfileListView(LoginRequiredMixin, ListView):
    model = UserProfile
    template_name = 'main/profile_list.html'

    def get_queryset(self):
        query_set = UserProfile.objects.get_all_profiles(self.request.user)
        return query_set

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.get(username__iexact=self.request.user.username)
        profile = UserProfile.objects.get(user=user)
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

@login_required
def send_invitation(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        user = request.user
        sender = UserProfile.objects.get(user=user)
        receiver = UserProfile.objects.get(pk=pk)

        con = Connection.objects.create(sender=sender, receiver=receiver, status='send')

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('main:profile_view')

@login_required
def remove_from_connections(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        user = request.user
        sender = UserProfile.objects.get(user=user)
        receiver = UserProfile.objects.get(pk=pk)

        con = Connection.objects.get(Q(sender=sender) & Q(receiver=receiver) | Q(sender=receiver) & Q(receiver=sender))

        con.delete()

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('main:profile_view')




