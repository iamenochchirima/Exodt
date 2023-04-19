from django.urls import path

from . import views

app_name = 'user_profiles'

urlpatterns = [
    path('load/', views.LoadUserProfileView.as_view(), name='load-user'),
    
    path("profile_view", views.profile_view, name="profile_view") ,
    path("invites", views.invites_recieved_view, name="invites"),
    path("accept_invite", views.accept_invitation, name="accept_invite"),
    path("decline_invite", views.decline_invitation, name="decline_invite"),
    path("remove_connection", views.remove_from_connections, name="remove_connection"), 
    path("all_profiles", views.ProfileListView.as_view(), name="all_profiles"),
    path("<slug>", views.ProfileDetailView.as_view(), name="profile_detail"),
    path("toinvite_profiles", views.invite_profile_list_view, name="toinvite_profiles"),
    path("send_invitation/", views.send_invitation, name="send_invitation"), 
]