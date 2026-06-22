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

        // Branch: save organizational response
        if (isset($data['action']) && $data['action'] === 'save_response') {
            validateRequired($data, ['hash', 'irp', 'profile']);

            $stmt = $db->prepare("SELECT id FROM evaluations WHERE hash = :hash");
            $stmt->execute([':hash' => $data['hash']]);
            $evaluation = $stmt->fetch();

            if (!$evaluation) {
                sendResponse(['error' => 'Evaluation not found'], 404);
            }

            $stmt = $db->prepare("
                INSERT INTO responses (
                    evaluation_id, irp, profile, irp_zone,
                    ae_score, dp_score, rp_score,
                    for_score, cvt_score, rri_score,
                    demographic_area, demographic_role, demographic_seniority,
                    demographic_gender, demographic_age_range
                ) VALUES (
                    :evaluation_id, :irp, :profile, :irp_zone,
                    :ae_score, :dp_score, :rp_score,
                    :for_score, :cvt_score, :rri_score,
                    :demographic_area, :demographic_role, :demographic_seniority,
                    :demographic_gender, :demographic_age_range
                )
            ");

            $stmt->execute([
                ':evaluation_id' => $evaluation['id'],
                ':irp' => $data['irp'],
                ':profile' => isset($data['profile']) ? sanitizeString($data['profile']) : null,
                ':irp_zone' => $data['irp_zone'] ?? null,
                ':ae_score' => $data['ae_score'] ?? null,
                ':dp_score' => $data['dp_score'] ?? null,
                ':rp_score' => $data['rp_score'] ?? null,
                ':for_score' => $data['for_score'] ?? null,
                ':cvt_score' => $data['cvt_score'] ?? null,
                ':rri_score' => $data['rri_score'] ?? null,
                ':demographic_area' => isset($data['demographic_area']) ? sanitizeString($data['demographic_area']) : null,
                ':demographic_role' => isset($data['demographic_role']) ? sanitizeString($data['demographic_role']) : null,
                ':demographic_seniority' => isset($data['demographic_seniority']) ? sanitizeString($data['demographic_seniority']) : null,
                ':demographic_gender' => isset($data['demographic_gender']) ? sanitizeString($data['demographic_gender']) : null,
                ':demographic_age_range' => isset($data['demographic_age_range']) ? sanitizeString($data['demographic_age_range']) : null,
            ]);

            $responseId = $db->lastInsertId();
            sendResponse(['success' => true, 'id' => $responseId], 201);
        }

        // Branch: create evaluation
        validateRequired($data, ['organization_name']);

        $hash = bin2hex(random_bytes(4)); // 8 chars
        $stmt = $db->prepare("
            INSERT INTO evaluations (hash, organization_name, sector, expected_participants, demographic_fields, custom_message, deadline, status)
            VALUES (:hash, :org, :sector, :participants, :fields, :message, :deadline, 'active')
        ");

        $stmt->execute([
            ':hash' => $hash,
            ':org' => sanitizeString($data['organization_name']),
            ':sector' => isset($data['sector']) ? sanitizeString($data['sector']) : null,
            ':participants' => $data['expected_participants'] ?? 10,
            ':fields' => isset($data['demographic_fields']) ? json_encode($data['demographic_fields']) : null,
            ':message' => isset($data['custom_message']) ? sanitizeString($data['custom_message']) : null,
            ':deadline' => isset($data['deadline']) ? $data['deadline'] : null,
        ]);

        $id = $db->lastInsertId();
        sendResponse([
            'id' => $id,
            'hash' => $hash,
            'organization_name' => sanitizeString($data['organization_name']),
            'sector' => isset($data['sector']) ? sanitizeString($data['sector']) : null,
            'expected_participants' => $data['expected_participants'] ?? 10,
            'demographic_fields' => isset($data['demographic_fields']) ? json_encode($data['demographic_fields']) : null,
            'custom_message' => isset($data['custom_message']) ? sanitizeString($data['custom_message']) : null,
            'deadline' => isset($data['deadline']) ? $data['deadline'] : null,
            'status' => 'active',
            'created_at' => date('c'),
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

    case 'DELETE':
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Evaluation ID required'], 400);
        }

        $stmt = $db->prepare("DELETE FROM evaluations WHERE id = :id");
        $stmt->execute([':id' => $_GET['id']]);

        sendResponse(['success' => true]);

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
