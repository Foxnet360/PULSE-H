<?php
/**
 * PULSO-H Admin Authentication
 *
 * Session-cookie based authentication for the admin panel.
 * Password is read from the PULSO_ADMIN_PASSWORD environment variable only.
 */

require_once __DIR__ . '/config.php';

// Enforce JSON responses and allow credentials
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => '',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

const AUTH_SESSION_KEY = 'pulso_h_admin_authenticated';

function isAuthenticated(): bool {
    return !empty($_SESSION[AUTH_SESSION_KEY]) && $_SESSION[AUTH_SESSION_KEY] === true;
}

function getExpectedPassword(): string {
    $password = env('PULSO_ADMIN_PASSWORD', '');
    if ($password === '') {
        error_log('PULSO-H Warning: PULSO_ADMIN_PASSWORD no está configurado.');
    }
    return $password;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    sendResponse(['authenticated' => isAuthenticated()]);
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];

    // If no password is sent, treat as logout
    if (!isset($data['password']) || $data['password'] === '') {
        unset($_SESSION[AUTH_SESSION_KEY]);
        session_destroy();
        sendResponse(['authenticated' => false]);
    }

    $expected = getExpectedPassword();

    if ($expected === '') {
        sendResponse(['error' => 'Authentication is not configured'], 500);
    }

    if (hash_equals($expected, $data['password'])) {
        $_SESSION[AUTH_SESSION_KEY] = true;
        sendResponse(['authenticated' => true]);
    }

    sendResponse(['error' => 'Invalid password'], 401);
}

sendResponse(['error' => 'Method not allowed'], 405);
