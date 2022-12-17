from django.urls import path
from .views import profile_view

from . import views

app_name = 'main'

urlpatterns = [
    path("", views.index, name='index'),
    path("profile_view", views.profile_view, name="profile_view") ,
    path("invites", views.invites_recieved_view, name="invites"),
    path("all_profiles", views.ProfileListView.as_view(), name="all_profiles"),
    path("toinvite_profiles", views.invite_profile_list_view, name="toinvite_profiles"),
    path("send_invitation", views.send_invitation, name="send_invitation"),
]