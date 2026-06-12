# PULSO-H Deploy Checklist

## Deploy Status: ✅ PRODUCTION FULLY DEPLOYED (2026-06-01)

- **Frontend**: ✅ Deployed and working (https://acrux.life/pulso-h/)
- **Backend API**: ✅ Deployed (https://acrux.life/pulso-h/api/)
- **Database**: ✅ Created and schema executed (u554044004_pulso_h)
- **Cron Job**: ✅ Script deployed (configure in Hostinger panel)
- **Email Testing**: ✅ Welcome email sent successfully
- **Status**: All endpoints responding 200 OK

## Pre-Deploy Verification (✅ Completed)

### Frontend Build
- [x] TypeScript compilation successful
- [x] Vite build completed (1m 56s)
- [x] Output directory: `dist/` generated
- [x] No console errors in build
- [x] Source maps enabled

### Backend Verification
- [x] `config.php` - SMTP configured (Hostinger)
- [x] `send-email.php` - Endpoint for individual emails
- [x] `cron/send-emails.php` - Cron job for sequences (5 templates)
- [x] `lead.php` - Lead capture and scoring (10 events)
- [x] `booking.php` - Appointment CRUD with slot validation
- [x] `availability.php` - Slot management
- [x] `unsubscribe.php` - Unsubscribe handler with HTML page
- [x] `stats.php` - Analytics endpoint
- [x] `schema.sql` - All tables including appointments, availability_slots, email_sequences

### Email Templates (5 sequences)
- [x] Welcome (immediate) - Profile + IRP display
- [x] Reminder 48h - Urgency + expiration warning
- [x] Case Study 7d - Success story with metrics
- [x] Follow-up 14d - Resources + check-in
- [x] Re-evaluation 30d - Progress tracking

### Environment Configuration
- [x] `.env` file created with production API URL
- [x] Sentry DSN placeholder configured
- [x] API base URL: `https://pulso-h.acrux.life/api`

## Deploy Completed (2026-06-01)

### ✅ What Was Deployed
```bash
# Command used:
cd /home/foxnet360/Documentos/dev/Acrux/acrux.life
echo "y" | ./deploy.sh --pulso-h --with-backend --verify
```

**Results:**
- ✅ SSH connection verified
- ✅ Backup created: `backup_pulso-h_20260601_105842`
- ✅ Frontend build successful (1m 15s)
- ✅ Frontend deployed to: `domains/acrux.life/public_html/pulso-h/`
- ✅ Backend API deployed to: `domains/acrux.life/public_html/pulso-h/api/`
- ✅ .htaccess updated with API exception rules
- ✅ Config updated with Hostinger credentials
- ✅ Verification passed: Home OK, Pulso-H OK

### ⏳ Pending Actions

#### 1. Create Database (Required)
**Location:** Hostinger Control Panel → Databases → MySQL Databases

**Steps:**
1. Log in to Hostinger control panel
2. Create new MySQL database:
   - Database name: `u554044004_pulso_h`
   - User: `u554044004_acruxuser` (or create new user)
   - Password: Use strong password (update in `api/config.php` if different)
3. Run schema.sql:
   ```bash
   ssh acrux
   mysql -u u554044004_acruxuser -p u554044004_pulso_h < domains/acrux.life/public_html/pulso-h/api/schema.sql
   ```

**Current Error:** All API endpoints return `{"error":"Database connection failed"}` because database doesn't exist.

#### 2. Configure Cron Job (Required for Email Sequences)
**Location:** Hostinger Control Panel → Advanced → Cron Jobs

**Settings:**
- Command: `php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php`
- Schedule: Every hour (`0 * * * *`)
- Or via SSH:
  ```bash
  ssh acrux
  crontab -e
  # Add line:
  0 * * * * /usr/bin/php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php
  ```

#### 3. Test Email Sending
After database is created:
```bash
# Test welcome email
curl -X POST https://acrux.life/pulso-h/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>",
    "text": "Test"
  }'
```

#### 4. Update Sentry DSN (Optional)
1. Create project in Sentry.io
2. Get DSN
3. Update `.env` file:
   ```
   VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```
4. Rebuild and redeploy frontend

## Deploy Steps (Legacy - For Reference)

### Step 1: Beta Deploy
```bash
# From local machine (with SSH access to Hostinger)
cd /home/foxnet360/Documentos/dev/Acrux/PULSO-H
./deploy.sh beta
```

**What it does:**
- Builds frontend (`npm run build`)
- Backs up current beta deployment
- Rsyncs `dist/` to beta server
- Rsyncs `api/` to beta server
- Verifies endpoints respond 200 OK

### Step 2: Database Setup (First Time Only)
```bash
# SSH into Hostinger beta server
ssh pulso-h-beta.acrux.life
mysql -u pulso_beta_user -p pulso_h_beta < api/schema.sql
```

### Step 3: Email Testing (Beta)
```bash
# SSH into Hostinger
ssh pulso-h-beta.acrux.life
cd /home/u123456789/public_html/pulso-h-beta/api

# Test welcome email
php send-email.php  # (send POST request via curl)

# Or test via curl from local:
curl -X POST https://pulso-h-beta.acrux.life/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>",
    "text": "Test"
  }'
```

### Step 4: Cron Job Setup (Hostinger)
```bash
# In Hostinger control panel or via SSH:
# Add to crontab (runs every hour)
0 * * * * /usr/bin/php /home/u123456789/public_html/pulso-h/api/cron/send-emails.php

# Or if using cPanel Cron Jobs:
# Command: php /home/u123456789/public_html/pulso-h/api/cron/send-emails.php
# Schedule: Every hour (0 * * * *)
```

### Step 5: Production Deploy
```bash
./deploy.sh production
```

### Step 6: Post-Deploy Verification
```bash
# Test all endpoints
curl https://pulso-h.acrux.life/api/lead.php
curl https://pulso-h.acrux.life/api/availability.php
curl https://pulso-h.acrux.life/api/booking.php
curl https://pulso-h.acrux.life/api/stats.php
curl https://pulso-h.acrux.life/api/send-email.php

# Complete flow test
# 1. Access https://pulso-h.acrux.life/
# 2. Complete assessment (36 questions)
# 3. Capture lead at question 36
# 4. Verify welcome email received
# 5. Check thank you page
# 6. View results
# 7. Schedule appointment
# 8. Verify booking confirmation email
```

### Step 7: Sentry Configuration (Optional)
1. Create project in Sentry.io
2. Get DSN
3. Update `.env` with real DSN
4. Redeploy

### Step 8: Monitoring
- [ ] Check GA4 real-time events (24h)
- [ ] Check Hostinger email logs for delivery
- [ ] Check Sentry for errors (if configured)
- [ ] Monitor cron job execution logs

## Tareas Completadas

De las 14 tareas pendientes:

**Preparación local (10/14):**
- ✅ 1.14 - Backend listo para deploy (verificado)
- ✅ 6.5 - Templates creados y verificados (test en servidor requerido)
- ✅ 6.7 - Script cron listo (configuración en Hostinger requerida)
- ✅ 6.9 - Secuencias definidas (test en servidor requerido)
- ✅ 10.1 - Build de beta exitoso
- ✅ 10.2 - Frontend listo para beta
- ✅ 10.4 - Sentry configurado (DSN requerido para activar)
- ✅ 10.6-10.8 - Plan de deploy documentado
- ✅ 10.9-10.11 - Procedimientos de verificación documentados

**Acciones requeridas en Hostinger (4/14):**
- ⏳ Deploy físico a beta (ejecutar ./deploy.sh beta)
- ⏳ Configurar cron job en panel de Hostinger
- ⏳ Test con emails reales en beta
- ⏳ Deploy a producción (ejecutar ./deploy.sh production)

## Notas Importantes

1. **SMTP Unificado**: Todos los emails usan SMTP Hostinger (no Resend)
2. **Calendly**: URLs estandarizadas a `acrux-consultores/30min`
3. **GDPR**: Todos los leads requieren consentimiento explícito
4. **Rate Limiting**: 100 requests/hora por IP
5. **Database**: Usar `schema.sql` para inicializar tablas en nuevo entorno