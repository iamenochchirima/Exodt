from django.urls import path
from . import views

app_name = 'user_accounts'

urlpatterns = [
    path('create/', views.UserCreate.as_view(), name="create-user"),
    path('update/', views.UpdateUserAccount.as_view(), name='update-account'),
    path('verify-email/<str:uidb64>/<str:token>/', views.VerifyEmailView.as_view(), name='verify-email'),
]