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

// Get date range (default: last 30 days)
$days = isset($_GET['days']) ? (int)$_GET['days'] : 30;
$startDate = date('Y-m-d', strtotime("-{$days} days"));

// Total leads
$stmt = $db->prepare("SELECT COUNT(*) as total FROM leads WHERE created_at >= :start_date");
$stmt->execute([':start_date' => $startDate]);
$totalLeads = $stmt->fetch()['total'];

// Leads by profile
$stmt = $db->prepare("
    SELECT profile, COUNT(*) as count 
    FROM leads 
    WHERE created_at >= :start_date AND profile IS NOT NULL
    GROUP BY profile
");
$stmt->execute([':start_date' => $startDate]);
$leadsByProfile = $stmt->fetchAll();

// Total appointments
$stmt = $db->prepare("SELECT COUNT(*) as total FROM appointments WHERE created_at >= :start_date");
$stmt->execute([':start_date' => $startDate]);
$totalAppointments = $stmt->fetch()['total'];

// Appointments by status
$stmt = $db->prepare("
    SELECT status, COUNT(*) as count 
    FROM appointments 
    WHERE created_at >= :start_date
    GROUP BY status
");
$stmt->execute([':start_date' => $startDate]);
$appointmentsByStatus = $stmt->fetchAll();

// Hot leads (top 20% by score)
$stmt = $db->query("SELECT COUNT(*) as total FROM leads");
$totalLeadsAll = $stmt->fetch()['total'];
$top20 = max(1, ceil($totalLeadsAll * 0.2));

$stmt = $db->prepare("SELECT * FROM leads ORDER BY score DESC LIMIT :limit");
$stmt->execute([':limit' => $top20]);
$hotLeads = $stmt->fetchAll();

// Daily stats for chart
$stmt = $db->prepare("
    SELECT 
        DATE(created_at) as date,
        COUNT(*) as leads,
        SUM(score) as total_score
    FROM leads
    WHERE created_at >= :start_date
    GROUP BY DATE(created_at)
    ORDER BY date
");
$stmt->execute([':start_date' => $startDate]);
$dailyStats = $stmt->fetchAll();

// Conversion funnel
$stmt = $db->prepare("
    SELECT 
        COUNT(DISTINCT l.id) as total_leads,
        COUNT(DISTINCT CASE WHEN e.event_type = 'assessment_complete' THEN l.id END) as completed_assessment,
        COUNT(DISTINCT CASE WHEN e.event_type = 'pdf_download' THEN l.id END) as downloaded_pdf,
        COUNT(DISTINCT CASE WHEN e.event_type = 'cta_click' THEN l.id END) as clicked_cta,
        COUNT(DISTINCT a.id) as booked_appointment
    FROM leads l
    LEFT JOIN lead_events e ON l.id = e.lead_id
    LEFT JOIN appointments a ON l.id = a.lead_id AND a.status IN ('pending', 'confirmed', 'completed')
    WHERE l.created_at >= :start_date
");
$stmt->execute([':start_date' => $startDate]);
$funnel = $stmt->fetch();

// Calculate conversion rates
$conversionRates = [];
if ($funnel['total_leads'] > 0) {
    $conversionRates = [
        'leads_to_assessment' => round(($funnel['completed_assessment'] / $funnel['total_leads']) * 100, 1),
        'assessment_to_pdf' => $funnel['completed_assessment'] > 0 ? round(($funnel['downloaded_pdf'] / $funnel['completed_assessment']) * 100, 1) : 0,
        'assessment_to_cta' => $funnel['completed_assessment'] > 0 ? round(($funnel['clicked_cta'] / $funnel['completed_assessment']) * 100, 1) : 0,
        'leads_to_appointment' => round(($funnel['booked_appointment'] / $funnel['total_leads']) * 100, 1),
    ];
}

sendResponse([
    'success' => true,
    'period' => [
        'days' => $days,
        'start_date' => $startDate,
        'end_date' => date('Y-m-d'),
    ],
    'summary' => [
        'total_leads' => (int)$totalLeads,
        'total_appointments' => (int)$totalAppointments,
        'hot_leads_count' => count($hotLeads),
    ],
    'funnel' => [
        'raw' => $funnel,
        'conversion_rates' => $conversionRates,
    ],
    'leads_by_profile' => $leadsByProfile,
    'appointments_by_status' => $appointmentsByStatus,
    'hot_leads' => $hotLeads,
    'daily_stats' => $dailyStats,
]);
?>
