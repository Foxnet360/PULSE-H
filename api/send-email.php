<?php
/**
 * PULSO-H Send Email API
 * Individual email sending endpoint using SMTP (Hostinger)
 */

require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded. Try again later.'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    validateRequired($data, ['to', 'subject', 'html']);
    
    $to = sanitizeString($data['to']);
    $subject = sanitizeString($data['subject']);
    $html = $data['html']; // Allow HTML, sanitize as needed
    $text = isset($data['text']) ? sanitizeString($data['text']) : null;
    $leadId = isset($data['lead_id']) ? (int)$data['lead_id'] : null;
    
    // Validate email format
    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        sendResponse(['error' => 'Invalid email address'], 400);
    }
    
    // Send email via Resend
    $result = sendEmail($to, $subject, $html, $text);
    
    if ($result['success']) {
        // Log to audit_log if lead_id provided
        if ($leadId) {
            try {
                $db = Database::getConnection();
                $stmt = $db->prepare("INSERT INTO audit_log (table_name, record_id, action, new_values, performed_by) VALUES ('leads', ?, 'update', ?, 'system')");
                $stmt->execute([$leadId, json_encode(['email_sent' => true, 'email_id' => $result['id']])]);
            } catch (PDOException $e) {
                error_log("Failed to log email send: " . $e->getMessage());
            }
        }
        
        sendResponse([
            'success' => true,
            'message' => 'Email sent successfully',
            'email_id' => $result['id']
        ]);
    } else {
        sendResponse([
            'success' => false,
            'error' => $result['error'] ?? 'Failed to send email',
            'details' => $result['response'] ?? null
        ], 500);
    }
} else {
    sendResponse(['error' => 'Method not allowed. Use POST.'], 405);
}
