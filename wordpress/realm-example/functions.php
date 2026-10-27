<?php

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('realm', 'https://realm.js.org/dist/realm.css', [], null);
    wp_enqueue_style('realm-ui-theme', 'https://realm.js.org/dist/ui/theme.css', ['realm'], null);
    wp_enqueue_style('realm-example', get_stylesheet_uri(), ['realm-ui-theme'], wp_get_theme()->get('Version'));
    wp_enqueue_script_module('realm', 'https://realm.js.org/dist/realm.js', [], null);
});

add_action('wp_body_open', function () {
    $user_card = get_theme_file_uri('components/user-card.html');
    echo '<import-element from="https://realm.js.org/dist/ui/ui.html"></import-element>' . "\n";
    echo '<import-element from="' . esc_url($user_card) . '"></import-element>' . "\n";
});

function realm_example_subscribe(): void
{
    check_admin_referer('realm_subscribe');
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    if (!is_email($email)) {
        wp_die('Enter a valid email address.', 400);
    }
    wp_safe_redirect(add_query_arg('subscribed', rawurlencode($email), home_url('/')), 303);
    exit;
}

add_action('admin_post_nopriv_realm_subscribe', 'realm_example_subscribe');
add_action('admin_post_realm_subscribe', 'realm_example_subscribe');
