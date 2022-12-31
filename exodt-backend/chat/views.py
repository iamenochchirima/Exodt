from django.shortcuts import render

# Create your views here.

def chat_view(request):
    return render(request, 'chat/chat.html')

def room(request, room_name):
    return render(request, 'chat/chatroom.html', {
        'room_name': room_name
    })