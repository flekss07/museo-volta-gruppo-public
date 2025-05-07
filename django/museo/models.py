from django.db import models

# Create your models here.

from django.db import models
  
# tabella per opere
class Opera(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    date = models.IntegerField()
    image = models.ImageField(upload_to='immagini',blank=True,null=True)
    
class User(models.Model):
    userHash = models.CharField(max_length=255)
    mail = models.CharField(max_length=100)
    role = models.CharField(max_length=100)