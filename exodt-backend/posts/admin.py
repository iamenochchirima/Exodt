from django.contrib import admin
from .models import Post, Like, Comment, Category

class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'status']
    list_filter = ['status']
    search_fields = ['title', 'slug']
    prepopulated_fields = {'slug': ('title',)}
    # Add this line
    auto_populate_fields = ['slug']

admin.site.register(Post, PostAdmin)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Category)
