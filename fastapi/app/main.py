import os
import secrets
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

here = Path(__file__).parent

app = FastAPI()
app.add_middleware(
    SessionMiddleware,
    secret_key=os.environ.get("SESSION_SECRET", secrets.token_hex(32)),
    same_site="lax",
)
app.mount("/static", StaticFiles(directory=here / "static"), name="static")
templates = Jinja2Templates(directory=here / "templates")

current_user = {"name": "Ada Lovelace", "plan": "Pro"}


def csrf_token(request: Request) -> str:
    if "csrf_token" not in request.session:
        request.session["csrf_token"] = secrets.token_urlsafe(32)
    return request.session["csrf_token"]


@app.get("/")
def account(request: Request):
    return templates.TemplateResponse(
        request,
        "index.html",
        {"user": current_user, "csrf_token": csrf_token(request)},
    )


@app.post("/subscribe")
def subscribe(
    request: Request,
    email: Annotated[str, Form()],
    csrf: Annotated[str, Form(alias="_csrf")],
):
    if not secrets.compare_digest(csrf, request.session.get("csrf_token", "")):
        raise HTTPException(status_code=403, detail="Invalid CSRF token")
    request.session["subscribed"] = email
    return RedirectResponse("/subscribed", status_code=303)


@app.get("/subscribed")
def subscribed(request: Request):
    return templates.TemplateResponse(
        request,
        "subscribed.html",
        {"email": request.session.get("subscribed", "")},
    )
