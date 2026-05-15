<?php
require_once 'config.php';

$rateLimiter = new RateLimiter();
if (!$rateLimiter->check()) {
    sendResponse(['error' => 'Rate limit exceeded'], 429);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'POST':
        // Create new appointment
        $data = json_decode(file_get_contents('php://input'), true);
        validateRequired($data, ['lead_id', 'appointment_date', 'appointment_time']);
        
        $leadId = (int)$data['lead_id'];
        $appointmentDate = $data['appointment_date'];
        $appointmentTime = $data['appointment_time'];
        
        // Validate date format
        if (!DateTime::createFromFormat('Y-m-d', $appointmentDate) || !DateTime::createFromFormat('H:i', $appointmentTime)) {
            sendResponse(['error' => 'Invalid date or time format'], 400);
        }
        
        // Check if slot is available
        $stmt = $db->prepare("
            SELECT id FROM availability_slots 
            WHERE slot_date = :date AND slot_time = :time AND is_available = TRUE
        ");
        $stmt->execute([':date' => $appointmentDate, ':time' => $appointmentTime]);
        
        if (!$stmt->fetch()) {
            sendResponse(['error' => 'Slot not available'], 400);
        }
        
        // Check if slot is already booked
        $stmt = $db->prepare("
            SELECT id FROM appointments 
            WHERE appointment_date = :date AND appointment_time = :time 
            AND status IN ('pending', 'confirmed')
        ");
        $stmt->execute([':date' => $appointmentDate, ':time' => $appointmentTime]);
        
        if ($stmt->fetch()) {
            sendResponse(['error' => 'Slot already booked'], 400);
        }
        
        // Get lead email for the appointment
        $stmt = $db->prepare("SELECT email, name FROM leads WHERE id = :id");
        $stmt->execute([':id' => $leadId]);
        $lead = $stmt->fetch();
        
        if (!$lead) {
            sendResponse(['error' => 'Lead not found'], 404);
        }
        
        // Create appointment
        $stmt = $db->prepare("
            INSERT INTO appointments (lead_id, appointment_date, appointment_time, duration_minutes, status, notes)
            VALUES (:lead_id, :date, :time, 30, 'pending', :notes)
        ");
        
        $stmt->execute([
            ':lead_id' => $leadId,
            ':date' => $appointmentDate,
            ':time' => $appointmentTime,
            ':notes' => isset($data['notes']) ? sanitizeString($data['notes']) : null,
        ]);
        
        $appointmentId = $db->lastInsertId();
        
        // Add event to lead_events for scoring
        $stmt = $db->prepare("
            INSERT INTO lead_events (lead_id, event_type, event_data, score_value)
            VALUES (:lead_id, 'call_scheduled', :data, 50)
        ");
        $stmt->execute([
            ':lead_id' => $leadId,
            ':data' => json_encode(['appointment_id' => $appointmentId, 'date' => $appointmentDate, 'time' => $appointmentTime]),
        ]);
        
        // Update lead score and status
        $stmt = $db->prepare("
            UPDATE leads SET score = score + 50, status = 'contacted', updated_at = NOW()
            WHERE id = :id
        ");
        $stmt->execute([':id' => $leadId]);
        
        sendResponse([
            'success' => true,
            'id' => $appointmentId,
            'lead_email' => $lead['email'],
            'lead_name' => $lead['name'],
            'appointment_date' => $appointmentDate,
            'appointment_time' => $appointmentTime,
        ]);
        
    case 'GET':
        // List appointments with optional filters
        $query = "
            SELECT a.*, l.email as lead_email, l.name as lead_name, l.profile as lead_profile
            FROM appointments a
            JOIN leads l ON a.lead_id = l.id
            WHERE 1=1
        ";
        $params = [];
        
        if (isset($_GET['status'])) {
            $query .= " AND a.status = :status";
            $params[':status'] = $_GET['status'];
        }
        
        if (isset($_GET['date_from'])) {
            $query .= " AND a.appointment_date >= :date_from";
            $params[':date_from'] = $_GET['date_from'];
        }
        
        if (isset($_GET['date_to'])) {
            $query .= " AND a.appointment_date <= :date_to";
            $params[':date_to'] = $_GET['date_to'];
        }
        
        if (isset($_GET['lead_id'])) {
            $query .= " AND a.lead_id = :lead_id";
            $params[':lead_id'] = (int)$_GET['lead_id'];
        }
        
        $query .= " ORDER BY a.appointment_date DESC, a.appointment_time DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute($params);
        
        sendResponse([
            'success' => true,
            'appointments' => $stmt->fetchAll(),
        ]);
        
    case 'PUT':
        // Update appointment status
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Appointment ID required'], 400);
        }
        
        $appointmentId = (int)$_GET['id'];
        
        $stmt = $db->prepare("SELECT * FROM appointments WHERE id = :id");
        $stmt->execute([':id' => $appointmentId]);
        $appointment = $stmt->fetch();
        
        if (!$appointment) {
            sendResponse(['error' => 'Appointment not found'], 404);
        }
        
        $updateFields = [];
        $updateParams = [':id' => $appointmentId];
        
        if (isset($data['status'])) {
            $validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];
            if (!in_array($data['status'], $validStatuses)) {
                sendResponse(['error' => 'Invalid status'], 400);
            }
            $updateFields[] = "status = :status";
            $updateParams[':status'] = $data['status'];
            
            // If status changed to completed, update lead status to qualified
            if ($data['status'] === 'completed') {
                $stmt = $db->prepare("
                    UPDATE leads SET status = 'qualified', updated_at = NOW()
                    WHERE id = :lead_id
                ");
                $stmt->execute([':lead_id' => $appointment['lead_id']]);
            }
        }
        
        if (isset($data['meeting_link'])) {
            $updateFields[] = "meeting_link = :meeting_link";
            $updateParams[':meeting_link'] = sanitizeString($data['meeting_link']);
        }
        
        if (isset($data['notes'])) {
            $updateFields[] = "notes = :notes";
            $updateParams[':notes'] = sanitizeString($data['notes']);
        }
        
        if (empty($updateFields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }
        
        $stmt = $db->prepare("UPDATE appointments SET " . implode(', ', $updateFields) . ", updated_at = NOW() WHERE id = :id");
        $stmt->execute($updateParams);
        
        sendResponse([
            'success' => true,
            'message' => 'Appointment updated',
        ]);
        
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
}
?>
