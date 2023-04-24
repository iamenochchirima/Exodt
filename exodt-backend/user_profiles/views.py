from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from .models import UserProfile, Connection
from .forms import UserProfileModelForm
from .serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.views.generic import ListView, DetailView
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin


class LoadUserProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.user_profile


class ProfileView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, username, format=None):
        try:
            profile = UserProfile.objects.get(username=username)
        except UserProfile.DoesNotExist:
            return Response({'error': f'Profile with username {username} does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


@login_required
def invites_recieved_view(request):
    user_profile = UserProfile.objects.get(user=request.user)
    query_set = Connection.objects.invitations_recieved(user_profile)
    result = list(map(lambda x: x.sender, query_set))
    is_empty = False
    if len(result) == 0:
        is_empty = True
    return render(request, 'user_profiles/invites.html', {
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
    return redirect('user_profiles:invites')


@login_required
def decline_invitation(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        sender = UserProfile.objects.get(pk=pk)
        receiver = UserProfile.objects.get(user=request.user)
        con = get_object_or_404(Connection, sender=sender, receiver=receiver)
        con.delete()
    return redirect('user_profiles:invites')


@login_required
def invite_profile_list_view(request):
    user = request.user
    query_set = UserProfile.objects.get_all_unconnected_profiles(user)

    return render(request, 'user_profiles/toinvite_list.html', {
        'qs': query_set
    })


class ProfileDetailView(LoginRequiredMixin, DetailView):
    model = UserProfile
    template_name = 'user_profiles/profile_detail.html'

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
        context['len_posts'] = True if len(
            self.get_object().get_all_authors_posts()) > 0 else False
        return context


class ProfileListView(LoginRequiredMixin, ListView):
    model = UserProfile
    template_name = 'user_profiles/profile_list.html'

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

        con = Connection.objects.create(
            sender=sender, receiver=receiver, status='send')

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('user_profiles:profile_view')


@login_required
def remove_from_connections(request):
    if request.method == 'POST':
        pk = request.POST.get('profile_pk')
        user = request.user
        sender = UserProfile.objects.get(user=user)
        receiver = UserProfile.objects.get(pk=pk)

        con = Connection.objects.get(Q(sender=sender) & Q(
            receiver=receiver) | Q(sender=receiver) & Q(receiver=sender))

        con.delete()

        return redirect(request.META.get('HTTP_REFERER'))

    return redirect('user_profiles:profile_view')
