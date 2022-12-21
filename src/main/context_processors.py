from . models import Profile, Connection

def profile_pic(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        picture = profile.profile_picture
        return {'pic':picture}
    return {}

def invitations_recieved_count(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        query_set_count = Connection.objects.invitations_recieved(profile).count()
        return {'invites_num': query_set_count}
    return {}
