import { randomBytes } from "node:crypto";
import express from "express";
import session from "express-session";
import { csrfSync } from "csrf-sync";

const app = express();
const port = Number(process.env.PORT ?? 8000);

const { generateToken, csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => req.body._csrf,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax" },
  }),
);

const currentUser = { name: "Ada Lovelace", plan: "Pro" };
const team = [
  { name: "Ada Lovelace", plan: "Pro" },
  { name: "Grace Hopper", plan: "Team" },
];

app.get("/", (req, res) => {
  res.render("index", { user: currentUser, csrfToken: generateToken(req) });
});

app.get("/team", (req, res) => {
  res.render("team", { team });
});

app.post("/subscribe", csrfSynchronisedProtection, (req, res) => {
  req.session.subscribed = req.body.email;
  res.redirect(303, "/subscribed");
});

app.get("/subscribed", (req, res) => {
  res.render("subscribed", { email: req.session.subscribed ?? "" });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
