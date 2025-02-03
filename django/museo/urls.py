from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"), #collegamento alla view in base al path
]