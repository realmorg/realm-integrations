// Serves the built React app from dist/ and handles the form post.
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(import.meta.dirname, "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const escape = (text) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const readBody = async (request) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  return new URLSearchParams(body);
};

const subscribed = (email) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Subscribed</title>
  <link rel="stylesheet" href="https://realm.js.org/dist/realm.css">
  <link rel="stylesheet" href="https://realm.js.org/dist/ui/theme.css">
  <link rel="stylesheet" href="/site.css">
</head>
<body>
  <main>
    <h1>Thanks</h1>
    <p>Subscribed: ${escape(email)}</p>
    <p><a href="/">Back</a></p>
  </main>
</body>
</html>`;

createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/subscribe") {
    if (request.headers["sec-fetch-site"] === "cross-site") return response.writeHead(403).end();
    const email = (await readBody(request)).get("email") ?? "";
    return response.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(subscribed(email));
  }
  const path = normalize(new URL(request.url, "http://localhost").pathname);
  const file = join(root, path.endsWith("/") ? `${path}index.html` : path);
  try {
    const body = await readFile(file);
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(process.env.PORT ?? 8000);
