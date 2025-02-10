from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request,"museo/homepage.html")

def galleria(request):
    return render(request,"museo/galleria.html")