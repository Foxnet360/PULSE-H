<?php
require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

// Event scoring configuration
$EVENT_SCORES = [
    'assessment_complete' => 10,
    'pdf_download' => 5,
    'cta_click' => 20,
    'call_scheduled' => 50,
    'email_open' => 2,
];

function getEventScore($eventType) {
    global $EVENT_SCORES;
    return $EVENT_SCORES[$eventType] ?? 0;
}

function insertLeadEvents($db, $leadId, $events) {
    if (empty($events) || !is_array($events)) {
        return 0;
    }
    
    $totalScore = 0;
    $stmt = $db->prepare("
        INSERT INTO lead_events (lead_id, event_type, event_data, score_value)
        VALUES (:lead_id, :event_type, :event_data, :score_value)
    ");
    
    foreach ($events as $event) {
        $eventType = $event['type'] ?? '';
        $score = getEventScore($eventType);
        
        $stmt->execute([
            ':lead_id' => $leadId,
            ':event_type' => $eventType,
            ':event_data' => isset($event['data']) ? json_encode($event['data']) : null,
            ':score_value' => $score,
        ]);
        
        $totalScore += $score;
    }
    
    return $totalScore;
}

function updateLeadScore($db, $leadId, $additionalScore) {
    $stmt = $db->prepare("
        UPDATE leads 
        SET score = score + :score, updated_at = NOW()
        WHERE id = :id
    ");
    $stmt->execute([
        ':score' => $additionalScore,
        ':id' => $leadId,
    ]);
}

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        validateRequired($data, ['email']);
        
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse(['error' => 'Invalid email address'], 400);
        }
        
        // Check if lead exists
        $stmt = $db->prepare("SELECT id, score FROM leads WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $existingLead = $stmt->fetch();
        
        if ($existingLead) {
            $leadId = $existingLead['id'];
            
            // Update existing lead
            $updateData = [
                ':id' => $leadId,
                ':score' => $data['score'] ?? 0,
            ];
            
            $updateFields = ["score = score + :score"];
            
            if (isset($data['profile'])) {
                $updateFields[] = "profile = :profile";
                $updateData[':profile'] = sanitizeString($data['profile']);
            }
            if (isset($data['gdpr_consent'])) {
                $updateFields[] = "gdpr_consent = :gdpr";
                $updateData[':gdpr'] = $data['gdpr_consent'] ? 1 : 0;
            }
            if (isset($data['marketing_consent'])) {
                $updateFields[] = "marketing_consent = :marketing";
                $updateData[':marketing'] = $data['marketing_consent'] ? 1 : 0;
            }
            
            $stmt = $db->prepare("UPDATE leads SET " . implode(', ', $updateFields) . ", updated_at = NOW() WHERE id = :id");
            $stmt->execute($updateData);
            
            // Insert events if provided
            $eventsScore = 0;
            if (isset($data['events']) && is_array($data['events'])) {
                $eventsScore = insertLeadEvents($db, $leadId, $data['events']);
                updateLeadScore($db, $leadId, $eventsScore);
            }
            
            sendResponse([
                'success' => true,
                'id' => $leadId,
                'message' => 'Lead updated',
                'events_processed' => isset($data['events']) ? count($data['events']) : 0,
                'score_added' => $eventsScore,
            ]);
        }
        
        // Create new lead
        $stmt = $db->prepare("
            INSERT INTO leads (email, name, organization, profile, score, gdpr_consent, marketing_consent, source)
            VALUES (:email, :name, :org, :profile, :score, :gdpr, :marketing, 'PULSO-H')
        ");
        
        $stmt->execute([
            ':email' => $email,
            ':name' => isset($data['name']) ? sanitizeString($data['name']) : null,
            ':org' => isset($data['organization']) ? sanitizeString($data['organization']) : null,
            ':profile' => isset($data['profile']) ? sanitizeString($data['profile']) : null,
            ':score' => $data['score'] ?? 10,
            ':gdpr' => $data['gdpr_consent'] ? 1 : 0,
            ':marketing' => $data['marketing_consent'] ? 1 : 0,
        ]);
        
        $leadId = $db->lastInsertId();
        
        // Insert events if provided
        $eventsScore = 0;
        if (isset($data['events']) && is_array($data['events'])) {
            $eventsScore = insertLeadEvents($db, $leadId, $data['events']);
            updateLeadScore($db, $leadId, $eventsScore);
        }
        
        sendResponse([
            'success' => true,
            'id' => $leadId,
            'events_processed' => isset($data['events']) ? count($data['events']) : 0,
            'score_added' => $eventsScore,
        ]);
        
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $db->prepare("SELECT * FROM leads WHERE id = :id");
            $stmt->execute([':id' => $_GET['id']]);
            $lead = $stmt->fetch();
            
            if (!$lead) {
                sendResponse(['error' => 'Lead not found'], 404);
            }
            
            // Get events for this lead
            $stmt = $db->prepare("SELECT * FROM lead_events WHERE lead_id = :lead_id ORDER BY created_at DESC");
            $stmt->execute([':lead_id' => $_GET['id']]);
            $lead['events'] = $stmt->fetchAll();
            
            sendResponse($lead);
        }
        
        // List leads with optional filters
        $query = "SELECT * FROM leads WHERE 1=1";
        $params = [];
        
        if (isset($_GET['min_score'])) {
            $query .= " AND score >= :min_score";
            $params[':min_score'] = (int)$_GET['min_score'];
        }
        
        if (isset($_GET['hot'])) {
            // Hot leads: top 20% by score
            $stmt = $db->query("SELECT COUNT(*) as total FROM leads");
            $total = $stmt->fetch()['total'];
            $top20 = max(1, ceil($total * 0.2));
            
            $query = "SELECT * FROM leads ORDER BY score DESC LIMIT $top20";
        } else {
            $query .= " ORDER BY score DESC, created_at DESC";
        }
        
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        sendResponse($stmt->fetchAll());
        
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
