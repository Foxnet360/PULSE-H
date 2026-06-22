# Tasks: Integrate PULSO-H with Unified Nurturing

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~180–250 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception (not needed) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Unified nurturing connector + fallback | Single PR | Config, lead.php wiring, cron deprecation, env docs, manual test |

## Phase 1: Config & Environment

- [x] 1.1 Add `ACRUX_DB_*` constants to `api/config.php` using the existing `env()` helper.
- [x] 1.2 Add `getAcuxDBConnection()` PDO helper in `api/config.php` that returns `null` on failure instead of fatal.
- [x] 1.3 Append `ACRUX_DB_HOST`, `ACRUX_DB_NAME`, `ACRUX_DB_USER`, `ACRUX_DB_PASS` placeholders to `.env.example`.

## Phase 2: Unified Nurturing Adapter

- [x] 2.1 Add `insertEmailSequence(PDO $acruxDb, array $lead): ?int` to `api/config.php` (or `api/lead.php`) that upserts `product='pulso-h'` into `acruxdb.nurturing_sequences`.
- [x] 2.2 Map PULSO-H fields: `email`, `name`, `organization`→`company`, `score` (IRP), `profile`, `gdpr_consent`, `marketing_consent`.
- [x] 2.3 Use `ON DUPLICATE KEY UPDATE` to reset state for re-submissions while preserving the `email`+`product` unique key.

## Phase 3: Lead Endpoint Wiring

- [x] 3.1 In `api/lead.php`, after new lead insert and `createEmailSequence()`, call `getAcuxDBConnection()` and `insertEmailSequence()` inside a `try/catch`.
- [x] 3.2 On successful unified insert with `marketing_consent=true`, skip local `sendWelcomeEmail()` so the unified sender owns welcome delivery.
- [x] 3.3 On unified insert failure, `error_log` the exception and call `sendWelcomeEmail($leadId)` when `marketing_consent=true`.
- [x] 3.4 Ensure `POST /api/lead.php` always returns `success: true` even if unified nurturing fails.

## Phase 4: Legacy Cron Deprecation

- [x] 4.1 Verify `api/cron/send-emails.php` header already marks the file deprecated and emits `error_log` on execution; tighten the warning if needed.
- [x] 4.2 Remove the cron from the Hostinger scheduler (ops step, documented in PR description).

## Phase 5: Manual Verification

- [ ] 5.1 POST a test lead to local/staging `api/lead.php` and confirm a `pulso-h` row appears in `acruxdb.nurturing_sequences`.
- [ ] 5.2 Simulate missing `ACRUX_DB_*` credentials and confirm the legacy welcome email is sent and the response still returns `success: true`.
- [x] 5.3 Confirm no PII or DB passwords are hardcoded in the changed PHP files.
