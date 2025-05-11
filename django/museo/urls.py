from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("galleria/", views.galleria, name="galleria"),
    path("login/", views.login,name="login"),
]
