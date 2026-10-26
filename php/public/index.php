<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (PHP_SAPI === 'cli-server' && $path !== '/' && is_file(__DIR__ . $path)) {
    return false;
}

require __DIR__ . '/../src/helpers.php';
session_start();

$route = $_SERVER['REQUEST_METHOD'] . ' ' . $path;

match ($route) {
    'GET /' => render('home', [
        'user' => ['name' => 'Ada Lovelace', 'plan' => 'Pro'],
    ]),
    'POST /subscribe' => csrf_valid($_POST['csrf_token'] ?? null)
        ? render('subscribed', ['email' => (string) ($_POST['email'] ?? '')])
        : http_response_code(403),
    default => http_response_code(404),
};
