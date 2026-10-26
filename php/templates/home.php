<h1>Account</h1>

<user-card name="<?= e($user['name']) ?>" plan="<?= e($user['plan']) ?>"></user-card>

<form method="post" action="/subscribe">
  <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
  <ui-label for="email">Email</ui-label>
  <ui-input id="email" name="email" type="email" autocomplete="email" required></ui-input>
  <ui-button type="submit">Subscribe</ui-button>
</form>
