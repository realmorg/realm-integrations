import os

from flask import Flask, render_template, request
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-only-not-secret")
csrf = CSRFProtect(app)


@app.get("/")
def account():
    user = {"name": "Ada Lovelace", "plan": "Pro"}
    return render_template("account.html", user=user)


@app.post("/subscribe")
def subscribe():
    email = request.form.get("email", "").strip()
    return render_template("subscribed.html", email=email)
