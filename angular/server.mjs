import { randomBytes } from "node:crypto";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 8000);
const browser = "dist/angular/browser";

const currentUser = { name: "Ada Lovelace", plan: "Pro" };

// Angular's HttpClient copies the XSRF-TOKEN cookie into an X-XSRF-TOKEN header on every
// same-origin request that is not GET or HEAD. Another site can make the browser send the cookie,
// but cannot read it to set the header.
function readCookie(req, name) {
  const pair = (req.get("cookie") ?? "").split("; ").find((part) => part.startsWith(`${name}=`));
  return pair?.slice(name.length + 1);
}

function issueXsrfToken(req, res, next) {
  if (!readCookie(req, "XSRF-TOKEN")) {
    res.cookie("XSRF-TOKEN", randomBytes(32).toString("hex"), { sameSite: "lax" });
  }
  next();
}

function checkXsrfToken(req, res, next) {
  const cookie = readCookie(req, "XSRF-TOKEN");
  if (cookie && req.get("x-xsrf-token") === cookie) return next();
  res.status(403).json({ error: "Missing or wrong XSRF token" });
}

app.use(express.json());
app.use(issueXsrfToken);

app.get("/api/me", (req, res) => {
  res.json(currentUser);
});

app.post("/api/subscribe", checkXsrfToken, (req, res) => {
  res.json({ email: req.body.email });
});

app.use(express.static(browser));
app.get("/{*path}", (req, res) => {
  res.sendFile("index.html", { root: browser });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
