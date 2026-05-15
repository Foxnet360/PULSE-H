<?php
require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

if ($method !== 'GET') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

$evaluationHash = $_GET['hash'] ?? null;

if (!$evaluationHash) {
    sendResponse(['error' => 'Evaluation hash required'], 400);
}

// Get evaluation
$stmt = $db->prepare("SELECT id FROM evaluations WHERE hash = :hash");
$stmt->execute([':hash' => $evaluationHash]);
$evaluation = $stmt->fetch();

if (!$evaluation) {
    sendResponse(['error' => 'Evaluation not found'], 404);
}

$evaluationId = $evaluation['id'];

// Get aggregated responses
$stmt = $db->prepare("
    SELECT 
        COUNT(*) as total_responses,
        AVG(irp) as average_irp,
        MIN(irp) as min_irp,
        MAX(irp) as max_irp,
        STDDEV(irp) as std_irp
    FROM responses 
    WHERE evaluation_id = :eval_id
");
$stmt->execute([':eval_id' => $evaluationId]);
$stats = $stmt->fetch();

// Get IRP distribution
$stmt = $db->prepare("
    SELECT 
        CASE 
            WHEN irp < 25 THEN 'verde'
            WHEN irp < 50 THEN 'amarilla'
            WHEN irp < 75 THEN 'naranja'
            ELSE 'roja'
        END as zone,
        COUNT(*) as count
    FROM responses 
    WHERE evaluation_id = :eval_id
    GROUP BY zone
");
$stmt->execute([':eval_id' => $evaluationId]);
$irpDistribution = $stmt->fetchAll();

// Get profile distribution
$stmt = $db->prepare("
    SELECT profile, COUNT(*) as count
    FROM responses 
    WHERE evaluation_id = :eval_id
    GROUP BY profile
");
$stmt->execute([':eval_id' => $evaluationId]);
$profileDistribution = $stmt->fetchAll();

// Get area results (with k-anonymity check)
$stmt = $db->prepare("
    SELECT 
        demographic_area as area,
        COUNT(*) as participant_count,
        AVG(irp) as average_irp
    FROM responses 
    WHERE evaluation_id = :eval_id AND demographic_area IS NOT NULL
    GROUP BY demographic_area
    HAVING COUNT(*) >= 5
");
$stmt->execute([':eval_id' => $evaluationId]);
$areaResults = $stmt->fetchAll();

// Check if dashboard is active (min 5 responses)
$isActive = ($stats['total_responses'] ?? 0) >= 5;
$responsesNeeded = max(0, 5 - ($stats['total_responses'] ?? 0));

sendResponse([
    'evaluation_id' => $evaluationId,
    'is_active' => $isActive,
    'responses_needed' => $responsesNeeded,
    'stats' => $stats,
    'irp_distribution' => $irpDistribution,
    'profile_distribution' => $profileDistribution,
    'area_results' => $areaResults,
]);
