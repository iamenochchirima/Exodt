from django.shortcuts import render, redirect
from .models import Post, Like
from main.models import Profile

def main_post_view(request):
    query_set = Post.objects.all()

    return render(request, 'posts/posts.html', {
        'qs': query_set
    })

def like_unlike_post(request):
    user = request.user
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        post = Post.objects.get(id=post_id)
        profile = Profile.objects.get(user=user)

        if profile in post.liked.all():
            post.liked.remove(profile)
        else:
            post.liked.add(profile)

        like, created = Like.objects.get_or_create(user=profile, post_id=post_id)

        if not created:
            if like.value == 'Like':
                like.value = 'Unlike'
            else:
                like.value = 'Like'
            post.save()
            like.save()

    return redirect('posts:main_post_view')