from django import forms

class LoginForm(forms.Form):
    mail = forms.CharField(max_length=100)
    password = forms.CharField(max_length=18)
    