from django.shortcuts import render, redirect
from .models import Post, Like
from main.models import Profile
from django.http import JsonResponse
from .forms import PostModelForm, CommentModelForm
from django.views.generic import UpdateView, DeleteView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib import messages

@login_required
def main_post_view(request):
    query_set = Post.objects.all()
    profile = Profile.objects.get(user=request.user)

    post_added = False
    comment_sent = False

    post_form = PostModelForm()
    comment_form = CommentModelForm()

    if 'submit_p_form' in request.POST:
        post_form = PostModelForm(request.POST, request.FILES)
        if post_form.is_valid():
            instance = post_form.save(commit=False)
            instance.author = profile
            instance.save()
            post_form = PostModelForm
            post_added = True

    if 'submit_comment_form' in request.POST:
        comment_form = CommentModelForm(request.POST)
        if comment_form.is_valid():
            instance = comment_form.save(commit=False)
            instance.user = profile
            instance.post = Post.objects.get(id=request.POST.get('post_id'))
            instance.save()
            comment_form = CommentModelForm
            comment_sent = True

    return render(request, 'posts/posts.html', {
        'qs': query_set,
        'profile': profile,
        'post_form': post_form,
        'comment_form': comment_form,
        'post_added': post_added,
        'comment_sent': comment_sent
    })

@login_required
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
        else:
            like.value='Like'

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
            messages.warning(self.request, 'You need to be the author of the post in order to delete it')
        return post

class PostUpdateView(LoginRequiredMixin, UpdateView):
    form_class = PostModelForm
    model = Post
    template_name = 'posts/update.html'
    success_url = reverse_lazy('posts:main_post_view')

    def form_valid(self, form):
        profile = Profile.objects.get(user=self.request.user)
        if form.instance.author == profile:
            return super().form_valid(form)
        else:
            form.add_error(None, "You need to be the author of the post in order to update it")
            return super().form_invalid(form)