# Generated by Django 4.1.4 on 2023-04-20 08:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import user_profiles.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Countries',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=225)),
                ('last_name', models.CharField(blank=True, max_length=225)),
                ('email', models.EmailField(blank=True, max_length=200, unique=True)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('bio', models.TextField(blank=True, default='No bio', max_length=300)),
                ('profile_image', models.ImageField(blank=True, default=user_profiles.models.default_profile_image, max_length=255, null=True, upload_to=user_profiles.models.get_profile_image_filepath)),
                ('gender', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('non-binary', 'Non-binary'), ('other', 'Other')], max_length=10, null=True)),
                ('fav_field_os', models.CharField(blank=True, max_length=225)),
                ('followers', models.CharField(blank=True, max_length=225)),
                ('following', models.CharField(blank=True, max_length=225)),
                ('profile_type', models.CharField(blank=True, max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('hide_email', models.BooleanField(default=True)),
                ('connections', models.ManyToManyField(blank=True, related_name='connections', to=settings.AUTH_USER_MODEL)),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='user_profiles.country')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('send', 'Send'), ('accepted', 'Accepted')], max_length=10)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='user_profiles.userprofile')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='user_profiles.userprofile')),
            ],
        ),
    ]
