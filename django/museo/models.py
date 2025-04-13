from django.db import models

# Create your models here.

from django.db import models

class Immagine(models.Model): # table per le immagini
    percorso = models.CharField(max_length=255)

    def __str__(self):
        return self.percorso


class Cella(models.Model): # table per le celle
    immagine = models.ForeignKey(Immagine, on_delete=models.CASCADE)

    def __str__(self):
        return f'Cella {self.id}'


class Combinazione(models.Model): # table combinazioni vincenti
    tipo_combinazione = models.CharField(max_length=100)
    celle = models.ManyToManyField(Cella)

    def __str__(self):
        return self.tipo_combinazione


class Informazione(models.Model): # table informazioni vincite
    data = models.DateTimeField()
    tipo_combinazione = models.ForeignKey(Combinazione, on_delete=models.CASCADE)

    def __str__(self):
        return f'Informazione {self.id}'


class Slot(models.Model): # table per collegamento informazioni e celle
    informazione = models.ForeignKey(Informazione, on_delete=models.CASCADE) # campo informazioni
    celle = models.ManyToManyField(Cella) # campo celle

    def __str__(self):
        return f'Slot {self.id}'


class Utente(models.Model):
    nome_utente = models.CharField(max_length=100, primary_key=True) # campo nome utente
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE) # slot associata a utente

    def __str__(self): # utilizzato per display valori del campo durante debugging
        return self.nome_utente
