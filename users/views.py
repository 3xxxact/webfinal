from django.shortcuts import render

from re import I
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.urls import reverse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from urllib.parse import urlencode
from uuid import uuid4

User = get_user_model()

@csrf_exempt
def register_user(request):
    logout(request)
    unavailable_email = False
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get("password")
        is_email_free = User.objects.filter(username=email.strip()).first()
        if is_email_free is not None:
            unavailable_email = True
        else:
            user =  User.objects.create(username=email)
            user.set_password(password)
            user.save()
            return redirect(reverse('login'))
    return render(request, "signup.html", context={'unavailable_email': unavailable_email})


@csrf_exempt
def login_user(request):
    logout(request)
    context = {}
    if request.method == "POST":
        username = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("index")
        else:
            context = {"wrong_auth_cred": True}
    return render(request, "login.html", context)
