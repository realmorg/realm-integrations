<?php
$user = ['name' => 'Ada Lovelace', 'plan' => 'Pro'];
$subscribed = isset($_GET['subscribed']) ? sanitize_email(wp_unslash($_GET['subscribed'])) : '';
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<main>
  <?php if ($subscribed) : ?>
    <h1>Thanks</h1>
    <p>Subscribed: <?php echo esc_html($subscribed); ?></p>
    <p><a href="<?php echo esc_url(home_url('/')); ?>">Back</a></p>
  <?php else : ?>
    <h1>Account</h1>

    <user-card name="<?php echo esc_attr($user['name']); ?>" plan="<?php echo esc_attr($user['plan']); ?>"></user-card>

    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
      <input type="hidden" name="action" value="realm_subscribe">
      <?php wp_nonce_field('realm_subscribe'); ?>
      <ui-label for="email">Email</ui-label>
      <ui-input id="email" name="email" type="email" autocomplete="email" required></ui-input>
      <ui-button type="submit">Subscribe</ui-button>
    </form>
  <?php endif; ?>
</main>
<?php wp_footer(); ?>
</body>
</html>
