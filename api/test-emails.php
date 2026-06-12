<?php
/**
 * PULSO-H Email Test Script
 * Tests all 5 email templates
 * Usage: php test-emails.php <test-email-address>
 */

require_once 'config.php';
require_once 'cron/send-emails.php';

if ($argc < 2) {
    echo "Usage: php test-emails.php <test-email-address>\n";
    exit(1);
}

$testEmail = $argv[1];

if (!filter_var($testEmail, FILTER_VALIDATE_EMAIL)) {
    echo "Error: Invalid email address\n";
    exit(1);
}

echo "========================================\n";
echo "PULSO-H Email Template Test\n";
echo "Testing to: {$testEmail}\n";
echo "SMTP Host: {$SMTP_HOST}\n";
echo "========================================\n\n";

$testLead = [
    'email' => $testEmail,
    'name' => 'Usuario de Prueba',
    'profile' => 'Resiliente',
    'irp' => 65,
    'lead_id' => 999
];

$templates = [
    'welcome' => 'Bienvenida (Email 1)',
    'reminder' => 'Recordatorio 48h (Email 2)',
    'case_study' => 'Caso de Éxito 7d (Email 3)',
    'follow_up' => 'Seguimiento 14d (Email 4)',
    're_evaluation' => 'Re-evaluación 30d (Email 5)'
];

$successCount = 0;
$errorCount = 0;

foreach ($templates as $template => $label) {
    echo "Testing {$label}...\n";
    
    $result = sendSequenceEmail($testLead, $template);
    
    if ($result['success']) {
        echo "  ✓ Sent successfully (ID: {$result['id']})\n";
        $successCount++;
    } else {
        echo "  ✗ Failed: {$result['error']}\n";
        $errorCount++;
    }
    
    // Small delay to avoid rate limiting
    sleep(1);
}

echo "\n========================================\n";
echo "Test Results:\n";
echo "  Success: {$successCount}\n";
echo "  Failed: {$errorCount}\n";
echo "========================================\n";

if ($errorCount > 0) {
    exit(1);
}

echo "\nAll templates sent successfully!\n";
echo "Please check your inbox (and spam folder) at {$testEmail}\n";