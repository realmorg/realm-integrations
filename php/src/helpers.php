<?php

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function csrf_token(): string
{
    return $_SESSION['csrf_token'] ??= bin2hex(random_bytes(32));
}

function csrf_valid(?string $token): bool
{
    return is_string($token) && hash_equals(csrf_token(), $token);
}

function render(string $template, array $data = []): void
{
    extract($data);
    ob_start();
    require __DIR__ . "/../templates/$template.php";
    $content = ob_get_clean();
    require __DIR__ . '/../templates/layout.php';
}
