import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 8000);

const currentUser = { name: "Ada Lovelace", plan: "Pro" };

// Browsers send Origin on every cross-site POST. Refusing other origins stops another site
// from posting a form here with the visitor's cookies.
function sameOrigin(req, res, next) {
  const origin = req.get("origin");
  if (origin && new URL(origin).host === req.get("host")) return next();
  res.status(403).json({ error: "Cross-origin request refused" });
}

app.use(express.urlencoded({ extended: false }));

app.get("/api/me", (req, res) => {
  res.json(currentUser);
});

app.post("/api/subscribe", sameOrigin, (req, res) => {
  res.json({ email: req.body.email });
});

app.use(express.static("dist"));
app.get("/{*path}", (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
