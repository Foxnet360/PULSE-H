<?php
require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded. Try again later.'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        validateRequired($data, ['organization_name']);
        
        $hash = bin2hex(random_bytes(4)); // 8 chars
        $stmt = $db->prepare("
            INSERT INTO evaluations (hash, organization_name, sector, expected_participants, custom_message, deadline, status)
            VALUES (:hash, :org, :sector, :participants, :message, :deadline, 'active')
        ");
        
        $stmt->execute([
            ':hash' => $hash,
            ':org' => sanitizeString($data['organization_name']),
            ':sector' => isset($data['sector']) ? sanitizeString($data['sector']) : null,
            ':participants' => $data['expected_participants'] ?? 10,
            ':message' => isset($data['custom_message']) ? sanitizeString($data['custom_message']) : null,
            ':deadline' => isset($data['deadline']) ? $data['deadline'] : null,
        ]);
        
        $id = $db->lastInsertId();
        sendResponse([
            'success' => true,
            'id' => $id,
            'hash' => $hash,
            'url' => "https://acrux.life/pulso-h/e/$hash"
        ]);
        
    case 'GET':
        if (isset($_GET['hash'])) {
            $stmt = $db->prepare("SELECT * FROM evaluations WHERE hash = :hash");
            $stmt->execute([':hash' => $_GET['hash']]);
            $evaluation = $stmt->fetch();
            
            if (!$evaluation) {
                sendResponse(['error' => 'Evaluation not found'], 404);
            }
            
            sendResponse($evaluation);
        }
        
        // List evaluations
        $stmt = $db->query("SELECT * FROM evaluations ORDER BY created_at DESC");
        sendResponse($stmt->fetchAll());
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Evaluation ID required'], 400);
        }
        
        $stmt = $db->prepare("
            UPDATE evaluations 
            SET status = :status, updated_at = NOW()
            WHERE id = :id
        ");
        
        $stmt->execute([
            ':status' => $data['status'] ?? 'active',
            ':id' => $_GET['id'],
        ]);
        
        sendResponse(['success' => true]);
        
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
