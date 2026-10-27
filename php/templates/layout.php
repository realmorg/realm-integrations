<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>REALM in plain PHP</title>
  <link rel="stylesheet" href="https://realm.js.org/dist/realm.css">
  <link rel="stylesheet" href="https://realm.js.org/dist/ui/theme.css">
  <link rel="stylesheet" href="/site.css">
  <script type="module" src="https://realm.js.org/dist/realm.js"></script>
</head>
<body>
  <import-element from="https://realm.js.org/dist/ui/ui.html"></import-element>
  <import-element from="/components/user-card.html"></import-element>

  <main>
    <?= $content ?>
  </main>
</body>
</html>
