from django.db import models

class Opera(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    date = models.IntegerField()
    image = models.ImageField(upload_to='immagini', blank=True, null=True)

class User(models.Model):
    userHash = models.CharField(max_length=255)
    mail = models.CharField(max_length=100)

class Slot(models.Model):
    image = models.ImageField(upload_to='immagini', blank=True, null=True)

class Giocata(models.Model):
    tentativi = models.IntegerField()
    date = models.IntegerField()
    slot1 = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='giocate_slot1')
    slot2 = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='giocate_slot2')
    slot3 = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='giocate_slot3')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class JackPot(models.Model):
    desc = models.TextField()
    image = models.ImageField(upload_to='immagini', blank=True, null=True)
    messaggio = models.TextField()