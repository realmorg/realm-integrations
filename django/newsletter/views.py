from django.shortcuts import render
from django.views.decorators.http import require_POST

from .forms import SubscribeForm


def home(request):
    user = {"name": "Ada Lovelace", "plan": "Pro"}
    return render(request, "newsletter/home.html", {"user": user, "form": SubscribeForm()})


@require_POST
def subscribe(request):
    form = SubscribeForm(request.POST)
    if not form.is_valid():
        user = {"name": "Ada Lovelace", "plan": "Pro"}
        return render(request, "newsletter/home.html", {"user": user, "form": form}, status=400)
    return render(request, "newsletter/subscribed.html", {"email": form.cleaned_data["email"]})
