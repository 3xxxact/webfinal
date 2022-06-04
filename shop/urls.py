from django.urls import path, include
from . import views



urlpatterns = [
    path("", views.ShopView.index, name='index')
]