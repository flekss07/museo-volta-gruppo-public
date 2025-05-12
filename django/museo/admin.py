from django.contrib import admin
from .models import Opera, User, Slot, Giocata, JackPot

# Register your models here.

admin.site.register(Opera)
admin.site.register(User)
admin.site.register(Slot)
admin.site.register(Giocata)
admin.site.register(JackPot)
