<?php
/**
 * PULSO-H Unsubscribe Handler
 * Handles email unsubscription requests
 */

require_once 'config.php';

$leadId = isset($_GET['lead_id']) ? (int)$_GET['lead_id'] : 0;

if ($leadId <= 0) {
    echo '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - PULSO-H</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; color: #1B2A4A; }
        .error { color: #ef4444; }
    </style>
</head>
<body>
    <h1 class="error">Error</h1>
    <p>No se proporcionó un ID de lead válido.</p>
</body>
</html>';
    exit;
}

try {
    $db = Database::getConnection();
    
    // Update lead to unsubscribe
    $stmt = $db->prepare("UPDATE leads SET marketing_consent = FALSE, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$leadId]);
    
    // Log the unsubscription
    $stmt = $db->prepare("INSERT INTO lead_events (lead_id, event_type, event_data, score_value) VALUES (?, 'email_open', ?, 0)");
    $stmt->execute([$leadId, json_encode(['action' => 'unsubscribe', 'source' => 'email_link'])]);
    
    echo '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suscripción cancelada - PULSO-H</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; color: #1B2A4A; background: #f8fafc; }
        .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #22c55e; }
        .btn { display: inline-block; background: #1B2A4A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ Suscripción cancelada</h1>
        <p>Has sido dado de baja exitosamente de nuestra lista de emails de marketing.</p>
        <p style="color: #64748b; font-size: 14px;">Ya no recibirás emails promocionales ni recordatorios de PULSO-H. Si cambias de opinión, puedes contactarnos en cualquier momento.</p>
        <a href="https://pulso-h.acrux.life" class="btn">Volver al inicio</a>
    </div>
</body>
</html>';
    
} catch (PDOException $e) {
    echo '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - PULSO-H</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; color: #1B2A4A; }
        .error { color: #ef4444; }
    </style>
</head>
<body>
    <h1 class="error">Error</h1>
    <p>Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo más tarde.</p>
</body>
</html>';
}
