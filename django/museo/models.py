from django.db import models

# Create your models here.

from django.db import models
  
# tabella per opere
class Opera(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    date = models.DateTimeField()
    image = models.ImageField(upload_to='immagini',blank=True,null=True)