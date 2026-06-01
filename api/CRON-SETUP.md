# PULSO-H Cron Job Setup

## Status
- Cron job script: ✅ Deployed at `/pulso-h/api/cron/send-emails.php`
- Cron job execution: ⏳ Must be configured in Hostinger panel

## Required Configuration

### Hostinger Panel Setup
1. Log in to Hostinger control panel
2. Go to: Advanced → Cron Jobs (or Tools → Cron Jobs)
3. Add new cron job:

**Command:**
```bash
/usr/bin/php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php
```

**Schedule:** Every hour
- Minute: `0`
- Hour: `*`
- Day: `*`
- Month: `*`
- Weekday: `*`

Or use the common preset: **"Once per hour"**

### Alternative (if PHP path differs)
If `/usr/bin/php` doesn't work, try:
```bash
php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php
```

### What the script does
- Queries `email_sequences` table for pending emails
- Sends emails based on timing (welcome: 0h, reminder: 48h, case study: 168h, follow-up: 336h, re-evaluation: 720h)
- Marks emails as sent after successful delivery
- Logs errors to server's error log

### Testing the script manually
Before setting up cron, test the script:
```bash
ssh acrux
php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php
```

Expected output if no pending emails:
```json
{"success":true,"sent":0,"errors":0,"timestamp":"2026-06-01 HH:MM:SS"}
```