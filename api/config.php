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

// Database configuration - Hostinger Production
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'u554044004_pulso_h');
define('DB_USER', $_ENV['DB_USER'] ?? 'u554044004_acruxuser_ph');
define('DB_PASS', $_ENV['DB_PASS'] ?? '4Crux2026*');

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

// SMTP Email Configuration - Unified with ACRUX.life and DIGITAL-H
$SMTP_HOST = 'smtp.hostinger.com';
$SMTP_PORT = 465;
$SMTP_SECURE = true; // SSL
$SMTP_USER = 'hola@acrux.life';
$SMTP_PASS = '4Crux2026*';
$SMTP_FROM = 'PULSO-H <hola@acrux.life>';

function sendEmail($to, $subject, $html, $text = null): array {
    global $SMTP_FROM;
    
    // Encode subject for UTF-8
    $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
    
    // Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$SMTP_FROM}\r\n";
    $headers .= "Reply-To: hola@acrux.life\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Send email using mail() function (Hostinger handles SMTP automatically)
    $result = mail($to, $encodedSubject, $html, $headers);
    
    if ($result) {
        return ['success' => true, 'id' => uniqid('email_')];
    }
    
    return ['success' => false, 'error' => 'Email send failed via SMTP'];
}

// Legacy function - kept for backward compatibility but uses SMTP now
function getResendApiKey(): string {
    return 'deprecated_use_smtp';
}

function createEmailSequence($leadId): bool {
    try {
        $db = Database::getConnection();
        $stmt = $db->prepare("INSERT INTO email_sequences (lead_id) VALUES (?)");
        $stmt->execute([$leadId]);
        return true;
    } catch (PDOException $e) {
        error_log("Failed to create email sequence: " . $e->getMessage());
        return false;
    }
}

function sendWelcomeEmail($leadId): array {
    try {
        $db = Database::getConnection();
        
        // Get lead data
        $stmt = $db->prepare("SELECT * FROM leads WHERE id = ?");
        $stmt->execute([$leadId]);
        $lead = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$lead) {
            return ['success' => false, 'error' => 'Lead not found'];
        }
        
        // Check if welcome email already sent
        $stmt = $db->prepare("SELECT email_1_sent FROM email_sequences WHERE lead_id = ?");
        $stmt->execute([$leadId]);
        $sequence = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($sequence && $sequence['email_1_sent']) {
            return ['success' => false, 'error' => 'Welcome email already sent'];
        }
        
        // Personalize email
        $name = $lead['name'] ?? 'Líder';
        $profile = $lead['profile'] ?? 'N/A';
        $irp = $lead['score'] ?? 0;
        
        $subject = 'Tu informe de bienestar laboral está listo 📊';
        
        $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PULSO-H - Diagnóstico de Bienestar Laboral</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1B2A4A; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1B2A4A; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; }
        .cta-button { display: inline-block; background: #f5a623; color: #1B2A4A; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 12px 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔥 PULSO-H</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0;">Diagnóstico de Bienestar Laboral</p>
        </div>
        <div class="content">
            <h2>¡Hola {$name}! 👋</h2>
            <p>Gracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.</p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; background: #f5a62320; color: #1B2A4A;">
                    Tu perfil: <strong>{$profile}</strong>
                </div>
            </div>
            <p><strong>Tu Índice de Riesgo Psicosocial (IRP): {$irp}/100</strong></p>
            <p>Hemos analizado tus respuestas en 6 dimensiones del bienestar laboral y preparado recomendaciones personalizadas para ti.</p>
            <div style="text-align: center;">
                <a href="https://pulso-h.acrux.life/resultados" class="cta-button">Ver mi informe completo</a>
            </div>
            <p style="font-size: 14px; color: #64748b;">💡 <strong>Siguiente paso recomendado:</strong> Agenda una revisión gratuita de 30 minutos con uno de nuestros Psicólogos Organizacionales para interpretar tus resultados y crear un plan de acción.</p>
            <div style="text-align: center;">
                <a href="https://pulso-h.acrux.life/agendar" style="color: #f5a623; font-weight: 600;">Agendar revisión gratuita →</a>
            </div>
        </div>
        <div class="footer">
            <p>© 2024 ACRUX Consultores. Todos los derechos reservados.</p>
            <p>¿No quieres recibir más emails? <a href="https://pulso-h.acrux.life/api/unsubscribe.php?lead_id={$leadId}">Cancelar suscripción</a></p>
        </div>
    </div>
</body>
</html>
HTML;

        $text = "Hola {$name},\n\nGracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.\n\nTu perfil: {$profile}\nTu IRP: {$irp}/100\n\nVer informe completo: https://pulso-h.acrux.life/resultados\n\nSiguiente paso recomendado: Agenda una revisión gratuita de 30 minutos con nuestro Psicólogo Organizacional.\n\nAgendar: https://pulso-h.acrux.life/agendar\n\nSaludos,\nEquipo ACRUX";
        
        $result = sendEmail($lead['email'], $subject, $html, $text);
        
        if ($result['success']) {
            // Mark as sent
            if ($sequence) {
                $stmt = $db->prepare("UPDATE email_sequences SET email_1_sent = TRUE, email_1_sent_at = NOW() WHERE lead_id = ?");
                $stmt->execute([$leadId]);
            } else {
                createEmailSequence($leadId);
                $stmt = $db->prepare("UPDATE email_sequences SET email_1_sent = TRUE, email_1_sent_at = NOW() WHERE lead_id = ?");
                $stmt->execute([$leadId]);
            }
            
            // Log event
            $stmt = $db->prepare("INSERT INTO lead_events (lead_id, event_type, event_data, score_value) VALUES (?, 'email_open', ?, 0)");
            $stmt->execute([$leadId, json_encode(['email_type' => 'welcome', 'email_id' => $result['id']])]);
        }
        
        return $result;
    } catch (PDOException $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}
