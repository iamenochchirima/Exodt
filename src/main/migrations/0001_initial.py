# Generated by Django 3.2.12 on 2022-12-17 08:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=225)),
                ('last_name', models.CharField(blank=True, max_length=225)),
                ('email', models.EmailField(max_length=200)),
                ('bio', models.TextField(default='No bio', max_length=300)),
                ('profile_picture', models.ImageField(default='profile_pic.jpg', upload_to='profile_pictures/')),
                ('country', models.CharField(max_length=225)),
                ('fav_field_os', models.CharField(blank=True, max_length=225)),
                ('followers', models.CharField(blank=True, max_length=225)),
                ('following', models.CharField(blank=True, max_length=225)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('user_profile_type', models.CharField(blank=True, max_length=200)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('connections', models.ManyToManyField(blank=True, related_name='friends', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('send', 'Send'), ('accepted', 'Accepted')], max_length=10)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='main.profile')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='main.profile')),
            ],
        ),
    ]
