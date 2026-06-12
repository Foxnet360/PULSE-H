<?php
/**
 * PULSO-H Availability API
 * Manages availability slots for scheduling
 */

require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'GET':
        // Get specific date or date range
        if (isset($_GET['date'])) {
            $date = $_GET['date'];
            if (!DateTime::createFromFormat('Y-m-d', $date)) {
                sendResponse(['error' => 'Invalid date format. Use YYYY-MM-DD'], 400);
            }
            
            $stmt = $db->prepare("
                SELECT 
                    s.id,
                    s.slot_date,
                    s.slot_time,
                    s.is_available,
                    s.psychologist_id,
                    CASE WHEN a.id IS NOT NULL THEN TRUE ELSE FALSE END as is_booked
                FROM availability_slots s
                LEFT JOIN appointments a ON s.slot_date = a.appointment_date 
                    AND s.slot_time = a.appointment_time
                    AND a.status IN ('pending', 'confirmed')
                WHERE s.slot_date = :date
                ORDER BY s.slot_time
            ");
            $stmt->execute([':date' => $date]);
            $slots = $stmt->fetchAll();
            
            sendResponse([
                'success' => true,
                'date' => $date,
                'slots' => $slots,
            ]);
        }
        
        // Get date range
        $startDate = $_GET['start'] ?? date('Y-m-d');
        $endDate = $_GET['end'] ?? date('Y-m-d', strtotime('+14 days'));
        
        if (!DateTime::createFromFormat('Y-m-d', $startDate) || !DateTime::createFromFormat('Y-m-d', $endDate)) {
            sendResponse(['error' => 'Invalid date format. Use YYYY-MM-DD'], 400);
        }
        
        $stmt = $db->prepare("
            SELECT 
                s.id,
                s.slot_date,
                s.slot_time,
                s.is_available,
                s.psychologist_id,
                CASE WHEN a.id IS NOT NULL THEN TRUE ELSE FALSE END as is_booked
            FROM availability_slots s
            LEFT JOIN appointments a ON s.slot_date = a.appointment_date 
                AND s.slot_time = a.appointment_time
                AND a.status IN ('pending', 'confirmed')
            WHERE s.slot_date BETWEEN :start_date AND :end_date
                AND s.is_available = TRUE
            ORDER BY s.slot_date, s.slot_time
        ");
        
        $stmt->execute([
            ':start_date' => $startDate,
            ':end_date' => $endDate,
        ]);
        
        $slots = $stmt->fetchAll();
        
        $groupedSlots = [];
        foreach ($slots as $slot) {
            $date = $slot['slot_date'];
            if (!isset($groupedSlots[$date])) {
                $groupedSlots[$date] = [];
            }
            
            $groupedSlots[$date][] = [
                'id' => $slot['id'],
                'time' => $slot['slot_time'],
                'available' => !$slot['is_booked'],
                'psychologist_id' => $slot['psychologist_id'],
            ];
        }
        
        sendResponse([
            'success' => true,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'slots' => $groupedSlots,
        ]);
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $slotId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        
        if ($slotId <= 0) {
            sendResponse(['error' => 'Slot ID is required'], 400);
        }
        
        if (!isset($data['is_available'])) {
            sendResponse(['error' => 'is_available field is required'], 400);
        }
        
        $isAvailable = $data['is_available'] ? 1 : 0;
        
        $stmt = $db->prepare("UPDATE availability_slots SET is_available = :is_available WHERE id = :id");
        $stmt->execute([
            ':is_available' => $isAvailable,
            ':id' => $slotId,
        ]);
        
        sendResponse([
            'success' => true,
            'message' => 'Availability updated',
            'slot_id' => $slotId,
            'is_available' => $isAvailable,
        ]);
        
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
