<?php
/**
 * PULSO-H Email Sequence Cron Job
 * Processes pending emails from email_sequences table
 * Run every hour via cron: php /path/to/api/cron/send-emails.php
 */

require_once dirname(__DIR__) . '/config.php';

// Prevent direct web access (optional security layer)
if (php_sapi_name() !== 'cli' && !isset($_GET['cron_key'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden. Use CLI or provide cron_key.']);
    exit;
}

$apiKey = getResendApiKey();
if (empty($apiKey)) {
    echo "ERROR: Resend API key not configured\n";
    exit(1);
}

try {
    $db = Database::getConnection();
    
    $sentCount = 0;
    $errorCount = 0;
    
    // Process each pending email in sequence
    $emailsToProcess = [
        ['field' => 'email_1_sent', 'sent_at' => 'email_1_sent_at', 'template' => 'welcome', 'delay_hours' => 0],
        ['field' => 'email_2_sent', 'sent_at' => 'email_2_sent_at', 'template' => 'reminder', 'delay_hours' => 48],
        ['field' => 'email_3_sent', 'sent_at' => 'email_3_sent_at', 'template' => 'case_study', 'delay_hours' => 168],
        ['field' => 'email_4_sent', 'sent_at' => 'email_4_sent_at', 'template' => 'follow_up', 'delay_hours' => 336],
        ['field' => 'email_5_sent', 'sent_at' => 'email_5_sent_at', 'template' => 're_evaluation', 'delay_hours' => 720],
    ];
    
    foreach ($emailsToProcess as $emailConfig) {
        $stmt = $db->prepare("
            SELECT es.*, l.email, l.name, l.profile, l.score as irp, l.created_at as lead_created_at
            FROM email_sequences es
            JOIN leads l ON es.lead_id = l.id
            WHERE es.{$emailConfig['field']} = FALSE
            AND l.marketing_consent = TRUE
            AND DATE_ADD(l.created_at, INTERVAL {$emailConfig['delay_hours']} HOUR) <= NOW()
            LIMIT 50
        ");
        $stmt->execute();
        $pendingEmails = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($pendingEmails as $pending) {
            $result = sendSequenceEmail($pending, $emailConfig['template']);
            
            if ($result['success']) {
                // Mark as sent
                $updateStmt = $db->prepare("UPDATE email_sequences SET {$emailConfig['field']} = TRUE, {$emailConfig['sent_at']} = NOW() WHERE id = ?");
                $updateStmt->execute([$pending['id']]);
                
                // Log event
                $eventStmt = $db->prepare("INSERT INTO lead_events (lead_id, event_type, event_data, score_value) VALUES (?, 'email_open', ?, 0)");
                $eventStmt->execute([$pending['lead_id'], json_encode(['email_type' => $emailConfig['template'], 'sequence_email' => true])]);
                
                $sentCount++;
            } else {
                error_log("Failed to send {$emailConfig['template']} email to lead {$pending['lead_id']}: " . ($result['error'] ?? 'Unknown error'));
                $errorCount++;
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'sent' => $sentCount,
        'errors' => $errorCount,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (PDOException $e) {
    error_log("Cron job error: " . $e->getMessage());
    echo json_encode(['error' => 'Database error', 'message' => $e->getMessage()]);
    exit(1);
}

function sendSequenceEmail($lead, $template) {
    $name = $lead['name'] ?? 'Líder';
    $profile = $lead['profile'] ?? 'N/A';
    $irp = $lead['irp'] ?? 0;
    $leadId = $lead['lead_id'];
    
    $templates = [
        'welcome' => [
            'subject' => 'Tu informe de bienestar laboral está listo 📊',
            'html' => getWelcomeEmailHtml($name, $profile, $irp, $leadId),
            'text' => getWelcomeEmailText($name, $profile, $irp),
        ],
        'reminder' => [
            'subject' => '⏰ Tu diagnóstico expira en 24 horas',
            'html' => getReminderEmailHtml($name, $profile, $irp, $leadId),
            'text' => getReminderEmailText($name, $profile, $irp),
        ],
        'case_study' => [
            'subject' => 'Cómo una empresa mejoró su bienestar laboral en 3 meses 📈',
            'html' => getCaseStudyEmailHtml($name, $profile, $leadId),
            'text' => getCaseStudyEmailText($name, $profile),
        ],
        'follow_up' => [
            'subject' => '¿Cómo va tu plan de acción? Te enviamos recursos adicionales 📚',
            'html' => getFollowUpEmailHtml($name, $leadId),
            'text' => getFollowUpEmailText($name),
        ],
        're_evaluation' => [
            'subject' => 'Re-evalúa tu bienestar: ¿Has mejorado? 🔄',
            'html' => getReEvaluationEmailHtml($name, $profile, $irp, $leadId),
            'text' => getReEvaluationEmailText($name, $profile, $irp),
        ],
    ];
    
    if (!isset($templates[$template])) {
        return ['success' => false, 'error' => 'Unknown template'];
    }
    
    $emailData = $templates[$template];
    return sendEmail($lead['email'], $emailData['subject'], $emailData['html'], $emailData['text']);
}

function getEmailWrapper($content, $leadId) {
    return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1B2A4A; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1B2A4A; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; }
        .cta-button { display: inline-block; background: #f5a623; color: #1B2A4A; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 12px 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔥 PULSO-H</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0;">Diagnóstico de Bienestar Laboral</p>
        </div>
        <div class="content">
            {$content}
        </div>
        <div class="footer">
            <p>© 2024 ACRUX Consultores. Todos los derechos reservados.</p>
            <p>¿No quieres recibir más emails? <a href="https://pulso-h.acrux.life/api/unsubscribe.php?lead_id={$leadId}">Cancelar suscripción</a></p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getWelcomeEmailHtml($name, $profile, $irp, $leadId) {
    $content = <<<HTML
<h2>¡Hola {$name}! 👋</h2>
<p>Gracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.</p>
<div style="text-align: center; margin: 30px 0;">
    <div style="display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; background: #f5a62320; color: #1B2A4A;">
        Tu perfil: <strong>{$profile}</strong>
    </div>
</div>
<p><strong>Tu Índice de Riesgo Psicosocial (IRP): {$irp}/100</strong></p>
<p>Hemos analizado tus respuestas en 6 dimensiones del bienestar laboral y preparado recomendaciones personalizadas para ti.</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/resultados" class="cta-button">Ver mi informe completo</a>
</div>
<p style="font-size: 14px; color: #64748b;">💡 <strong>Siguiente paso recomendado:</strong> Agenda una revisión gratuita de 30 minutos con uno de nuestros Psicólogos Organizacionales para interpretar tus resultados y crear un plan de acción.</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/agendar" style="color: #f5a623; font-weight: 600;">Agendar revisión gratuita →</a>
</div>
HTML;
    return getEmailWrapper($content, $leadId);
}

function getWelcomeEmailText($name, $profile, $irp) {
    return "Hola {$name},\n\nGracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.\n\nTu perfil: {$profile}\nTu IRP: {$irp}/100\n\nVer informe completo: https://pulso-h.acrux.life/resultados\n\nSiguiente paso recomendado: Agenda una revisión gratuita de 30 minutos con nuestro Psicólogo Organizacional.\n\nAgendar: https://pulso-h.acrux.life/agendar\n\nSaludos,\nEquipo ACRUX";
}

function getReminderEmailHtml($name, $profile, $irp, $leadId) {
    $content = <<<HTML
<h2>{$name}, tu diagnóstico expira pronto ⏰</h2>
<div style="background: #fef3c7; border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0;">
    <p><strong>⚠️ Importante:</strong> Tu informe personalizado de PULSO-H expirará en 24 horas. Después de eso, perderás acceso a tus resultados y recomendaciones.</p>
</div>
<p>No dejes pasar esta oportunidad de entender el bienestar de tu equipo y tomar acción.</p>
<p><strong>Recuerda tu perfil:</strong> {$profile} (IRP: {$irp})</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/resultados" class="cta-button">Ver mi informe antes de que expire</a>
</div>
<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
<p>¿Quieres profundizar en tus resultados?</p>
<p>Nuestros Psicólogos Organizacionales están disponibles para una revisión gratuita de 30 minutos donde:</p>
<ul>
    <li>Interpretaremos tus resultados en detalle</li>
    <li>Identificaremos las áreas de mayor riesgo</li>
    <li>Diseñaremos un plan de acción personalizado</li>
</ul>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/agendar" class="cta-button">Agendar mi revisión gratuita</a>
</div>
HTML;
    return getEmailWrapper($content, $leadId);
}

function getReminderEmailText($name, $profile, $irp) {
    return "Hola {$name},\n\nTu diagnóstico PULSO-H expirará en 24 horas. Después perderás acceso a tus resultados.\n\nTu perfil: {$profile} (IRP: {$irp})\n\nVer informe: https://pulso-h.acrux.life/resultados\n\n¿Quieres profundizar? Agenda una revisión gratuita de 30 minutos con nuestro Psicólogo Organizacional.\n\nAgendar: https://pulso-h.acrux.life/agendar\n\nEquipo ACRUX";
}

function getCaseStudyEmailHtml($name, $profile, $leadId) {
    $content = <<<HTML
<h2>Historia de éxito: De {$profile} a Floreciente 🌱</h2>
<p>Hola {$name},</p>
<p>Queremos compartirte una historia que podría inspirar tu camino hacia el bienestar laboral.</p>
<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
    <p><strong>Caso de éxito:</strong> Una empresa de consultoría en CDMX con un perfil similar al tuyo implementó un programa de bienestar basado en PULSO-H.</p>
    <p><strong>Resultados en 3 meses:</strong></p>
    <ul>
        <li>✅ Reducción del 40% en ausentismo</li>
        <li>✅ Aumento del 25% en satisfacción laboral</li>
        <li>✅ Mejora del 30% en productividad</li>
        <li>✅ 85% de empleados reportan mejor balance vida-trabajo</li>
    </ul>
</div>
<p><strong>¿Cómo lo lograron?</strong></p>
<ol>
    <li>Realizaron el diagnóstico PULSO-H con todo el equipo</li>
    <li>Implementaron las recomendaciones personalizadas</li>
    <li>Establecieron checkpoints mensuales de bienestar</li>
    <li>Capacitaron a líderes en gestión del bienestar</li>
</ol>
<p>Tú también puedes lograr resultados similares. ¿Te gustaría saber cómo?</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/agendar" class="cta-button">Agendar revisión gratuita</a>
</div>
HTML;
    return getEmailWrapper($content, $leadId);
}

function getCaseStudyEmailText($name, $profile) {
    return "Hola {$name},\n\nTe compartimos una historia de éxito:\n\nUna empresa de consultoría con perfil similar al tuyo ({$profile}) implementó PULSO-H y en 3 meses logró:\n- 40% reducción en ausentismo\n- 25% aumento en satisfacción\n- 30% mejora en productividad\n\n¿Quieres saber cómo? Agenda una revisión gratuita:\nhttps://pulso-h.acrux.life/agendar\n\nEquipo ACRUX";
}

function getFollowUpEmailHtml($name, $leadId) {
    $content = <<<HTML
<h2>Hola {$name} 👋</h2>
<p>Han pasado 2 semanas desde tu diagnóstico PULSO-H. ¿Has tenido oportunidad de implementar alguna de las recomendaciones?</p>
<p>Sabemos que el día a día puede ser abrumador, pero cada pequeño paso cuenta hacia el bienestar de tu equipo.</p>
<div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Recursos gratuitos que podrían interesarte:</strong></p>
    <ul>
        <li>📄 Guía: "10 señales de alerta de burnout en tu equipo"</li>
        <li>📄 Checklist: "Evaluación rápida de bienestar laboral"</li>
        <li>🎥 Webinar: "Cómo implementar un programa de bienestar con poco presupuesto"</li>
    </ul>
</div>
<p>¿Necesitas ayuda para crear un plan de acción efectivo?</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/agendar" class="cta-button">Agendar revisión gratuita</a>
</div>
<p style="font-size: 14px; color: #64748b; margin-top: 30px;">Si ya has implementado cambios, ¡nos encantaría saber cómo te va! Responde a este email y cuéntanos tu experiencia.</p>
HTML;
    return getEmailWrapper($content, $leadId);
}

function getFollowUpEmailText($name) {
    return "Hola {$name},\n\n¿Cómo va tu plan de acción después del diagnóstico PULSO-H?\n\nTe compartimos recursos gratuitos:\n- Guía: \"10 señales de alerta de burnout\"\n- Checklist de evaluación rápida\n- Webinar sobre programas de bienestar\n\n¿Necesitas ayuda? Agenda una revisión gratuita:\nhttps://pulso-h.acrux.life/agendar\n\nEquipo ACRUX";
}

function getReEvaluationEmailHtml($name, $profile, $irp, $leadId) {
    $content = <<<HTML
<h2>Hola {$name} 🌟</h2>
<p>Han pasado 30 días desde tu último diagnóstico PULSO-H. Mucho puede haber cambiado en este tiempo.</p>
<div style="background: #fef3c7; border-left: 4px solid #f5a623; padding: 15px; margin: 20px 0;">
    <p><strong>¿Por qué re-evaluar?</strong></p>
    <ul>
        <li>🔄 Medir el impacto de las intervenciones implementadas</li>
        <li>📊 Comparar tu progreso con el diagnóstico anterior</li>
        <li>🎯 Ajustar el plan de acción según resultados actuales</li>
        <li>💪 Celebrar los avances y identificar nuevas áreas de mejora</li>
    </ul>
</div>
<p><strong>Tu perfil anterior:</strong> {$profile} (IRP: {$irp})</p>
<p>¿Estás listo para descubrir cómo ha cambiado tu bienestar laboral?</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/evaluar" class="cta-button">Realizar nueva evaluación</a>
</div>
<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
<p>¿Prefieres hablar con un experto primero?</p>
<div style="text-align: center;">
    <a href="https://pulso-h.acrux.life/agendar" style="color: #f5a623; font-weight: 600;">Agendar revisión gratuita →</a>
</div>
HTML;
    return getEmailWrapper($content, $leadId);
}

function getReEvaluationEmailText($name, $profile, $irp) {
    return "Hola {$name},\n\nHan pasado 30 días desde tu diagnóstico PULSO-H. ¿Has mejorado?\n\nTu perfil anterior: {$profile} (IRP: {$irp})\n\nBeneficios de re-evaluar:\n- Medir impacto de intervenciones\n- Comparar progreso\n- Ajustar plan de acción\n\nRealizar nueva evaluación: https://pulso-h.acrux.life/evaluar\n\nO agenda una revisión gratuita: https://pulso-h.acrux.life/agendar\n\nEquipo ACRUX";
}
