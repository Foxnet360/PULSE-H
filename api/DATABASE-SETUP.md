# PULSO-H Database Setup

## Status
- Frontend: ✅ Deployed and working (https://acrux.life/pulso-h/)
- Backend API: ✅ Deployed (https://acrux.life/pulso-h/api/)
- Database: ⏳ Needs to be created

## Required Steps

### 1. Create Database in Hostinger Panel
1. Log in to Hostinger control panel
2. Go to Databases → MySQL Databases
3. Create a new database:
   - Database name: `u554044004_pulso_h`
   - User: `u554044004_acruxuser` (or create new)
   - Password: `4Crux2026*` (or set new)

### 2. Run Schema
Once database is created, run the schema file:
```bash
ssh acrux
mysql -u u554044004_acruxuser -p u554044004_pulso_h < domains/acrux.life/public_html/pulso-h/api/schema.sql
```

### 3. Verify Connection
After setup, test the endpoints:
```bash
curl https://acrux.life/pulso-h/api/lead.php
curl https://acrux.life/pulso-h/api/availability.php
```

Expected response: `{"error":"Method not allowed"}` or valid JSON (not database connection error)

## Cron Job Setup
After database is working, set up the email cron job in Hostinger:
- Command: `php /home/u554044004/domains/acrux.life/public_html/pulso-h/api/cron/send-emails.php`
- Schedule: Every hour (`0 * * * *`)

## Current Configuration
- Config file: `api/config.php`
- Uses same MySQL user as DIGITAL-H for simplicity
- SMTP: Hostinger (hola@acrux.life)