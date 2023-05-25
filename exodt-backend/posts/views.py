from django.shortcuts import redirect
from .models import Post, Like
from rest_framework.views import APIView
from user_profiles.models import UserProfile
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.generic import UpdateView, DeleteView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib import messages


# class CreatePostView(APIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = PostSerializer


@login_required
def like_unlike_post(request):
    user = request.user
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        post = Post.objects.get(id=post_id)
        profile = UserProfile.objects.get(user=user)

        if profile in post.liked.all():
            post.liked.remove(profile)
        else:
            post.liked.add(profile)

        like, created = Like.objects.get_or_create(
            user=profile, post_id=post_id)

        if not created:
            if like.value == 'Like':
                like.value = 'Unlike'
            else:
                like.value = 'Like'
        else:
            like.value = 'Like'

        post.save()
        like.save()

        data = {
            'value': like.value,
            'likes': post.liked.all().count()
        }

        print(data)

        return JsonResponse(data, safe=False)

    return redirect('posts:main_post_view')


class PostDeleteView(LoginRequiredMixin, DeleteView):
    model = Post
    template_name = 'posts/confirm_delete.html'
    success_url = reverse_lazy('posts:main_post_view')

    def get_object(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        post = Post.objects.get(pk=pk)
        if not post.author.user == self.request.user:
            messages.warning(
                self.request, 'You need to be the author of the post in order to delete it')
        return post