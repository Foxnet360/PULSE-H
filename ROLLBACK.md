# PULSO-H High Conversion Funnel - Rollback Plan

## Overview
This document describes how to rollback the high-conversion funnel changes if issues are detected in production.

## Quick Rollback (Emergency)

If critical issues are detected:

```bash
# 1. Revert to pre-deployment git state
git log --oneline -20

# 2. Create emergency rollback branch
git checkout -b emergency-rollback-$(date +%Y%m%d)

# 3. Revert the change commits
git revert --no-commit HEAD~N..HEAD  # Replace N with number of commits

# 4. Deploy immediately
npm run deploy
```

## Feature Flag Rollback

The following features can be disabled without full deployment:

### 1. Lead Capture Gate
**File:** `src/pages/AssessmentPage.tsx`
**How to disable:** Comment out the `LeadCaptureModal` trigger at question 36.
**Effect:** Assessment flows directly to results without email capture.

### 2. Thank You Page
**File:** `src/App.tsx`
**How to disable:** Remove or comment out the `/gracias` route.
**Effect:** Users go directly from assessment to results.

### 3. Scheduling System
**File:** `src/pages/ResultsPage.tsx`
**How to disable:** Replace `/agendar` link with external Calendly URL.
**Effect:** Reverts to external Calendly scheduling.

### 4. Email Sequences
**File:** `api/config.php`
**How to disable:** Set `RESEND_API_KEY` to empty string or remove it.
**Effect:** Email sending fails gracefully, no emails sent.

## Database Rollback

If database schema changes need to be reverted:

```sql
-- Remove tables added by this change (DANGEROUS - DATA LOSS)
-- Only run if absolutely necessary

-- Backup first!
mysqldump -u pulso_user -p pulso_h > backup-$(date +%Y%m%d-%H%M%S).sql

-- Remove new tables
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS availability_slots;

-- Note: email_sequences and lead_events are part of the new system
-- and should be kept even during rollback
```

## Monitoring Checklist Before Rollback

- [ ] GA4 conversion rate dropped >20%
- [ ] Error rate spike in Sentry
- [ ] Backend API returning 5xx errors
- [ ] User complaints about broken flow
- [ ] Email delivery failures >50%

## Post-Rollback Verification

1. **Landing page loads correctly**
2. **Assessment flow works** (36 questions)
3. **Results page displays** without lead gate
4. **Calendly link works** (if scheduling reverted)
5. **No console errors** in browser
6. **Backend APIs respond** with 200

## Contacts

- **Tech Lead:** [Your name]
- **DevOps:** [DevOps contact]
- **Product:** [Product owner]

## Deployment History

| Date | Version | Changes | Rollback Commit |
|------|---------|---------|-----------------|
| YYYY-MM-DD | v1.1.0 | High conversion funnel | [commit hash] |

---

**Last Updated:** $(date +%Y-%m-%d)
