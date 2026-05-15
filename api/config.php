<?php
/**
 * PULSO-H API Configuration
 * Database connection and shared utilities
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'pulso_h');
define('DB_USER', $_ENV['DB_USER'] ?? 'pulso_user');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');

// Rate limiting
define('RATE_LIMIT_REQUESTS', 100);
define('RATE_LIMIT_WINDOW', 3600); // 1 hour

class Database {
    private static ?PDO $instance = null;
    
    public static function getConnection(): PDO {
        if (self::$instance === null) {
            try {
                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Database connection failed']);
                exit;
            }
        }
        return self::$instance;
    }
}

class RateLimiter {
    private string $ip;
    
    public function __construct() {
        $this->ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }
    
    public function check(): bool {
        $key = 'rate_limit:' . $this->ip;
        $file = sys_get_temp_dir() . '/' . md5($key) . '.txt';
        
        $requests = [];
        if (file_exists($file)) {
            $requests = json_decode(file_get_contents($file), true) ?: [];
        }
        
        $now = time();
        $requests = array_filter($requests, fn($t) => $now - $t < RATE_LIMIT_WINDOW);
        
        if (count($requests) >= RATE_LIMIT_REQUESTS) {
            return false;
        }
        
        $requests[] = $now;
        file_put_contents($file, json_encode($requests));
        
        return true;
    }
}

function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function validateRequired($data, $fields) {
    $missing = [];
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $missing[] = $field;
        }
    }
    if (!empty($missing)) {
        sendResponse(['error' => 'Missing required fields', 'fields' => $missing], 400);
    }
}

function sanitizeString($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}
