from django.shortcuts import render
from django.http import HttpResponse
from .forms import LoginForm
from .models import Opera

# Create your views here.
def index(request):
    return render(request,"homepage.html")

def galleria(request):
    opere = Opera.objects.all().order_by("date") #prende tutte le opere in ordine di data per linea temporale
    return render(request,"galleria.html",{"opere": opere})

def master(request):
    return render(request,"master.html")

# richiesta per pagina di login
def login(request):
    context = {} # array di contenuti da passare a pagina
    context["form"] = LoginForm() # aggiunge form ad array
    return render(request,"login.html",context) #passa dati a pagina

def registrazione(request):
    return render(request,"registrazione.html")