from django.shortcuts import render
from django.http import HttpResponse
from .forms import LoginForm

# Create your views here.
def index(request):
    return render(request,"homepage.html")

def galleria(request):
    return render(request,"galleria.html")

def master(request):
    return render(request,"master.html")

def slot(request):
    return render(request, "slot.html")

# richiesta per pagina di login
def login(request):
    context = {} # array di contenuti da passare a pagina
    context["form"] = LoginForm() # aggiunge form ad array
    return render(request,"login.html",context) #passa dati a pagina