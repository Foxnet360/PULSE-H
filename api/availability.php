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

// Get date range parameters
$startDate = $_GET['start'] ?? date('Y-m-d');
$endDate = $_GET['end'] ?? date('Y-m-d', strtotime('+14 days'));

// Validate dates
if (!DateTime::createFromFormat('Y-m-d', $startDate) || !DateTime::createFromFormat('Y-m-d', $endDate)) {
    sendResponse(['error' => 'Invalid date format. Use YYYY-MM-DD'], 400);
}

// Get available slots for the date range
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

// Group slots by date
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
?>
