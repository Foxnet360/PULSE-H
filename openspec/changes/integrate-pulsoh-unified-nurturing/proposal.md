# Proposal: Integrate PULSO-H with Unified Nurturing

## Intent

PULSO-H currently runs its own nurturing stack (`leads`, `email_sequences`, `api/cron/send-emails.php`). acrux.life already operates a unified nurturing system in `acruxdb`. This change retires the standalone write path and makes PULSO-H feed the unified pipeline, eliminating duplicate data, inconsistent sequences, and operational overhead.

## Scope

### In Scope
- Add `acruxdb` PDO connection using env vars in `api/config.php`.
- Insert lead into `acruxdb.nurturing_sequences` after local lead creation in `api/lead.php`.
- Fall back to legacy welcome email if unified insert fails.
- Deprecate `api/cron/send-emails.php`.
- Document `acruxdb` credentials in `.env.example`.
- Preserve GDPR/marketing consent flags.

### Out of Scope
- Modifying acrux.life unified sender logic.
- Migrating historical `email_sequences` data.
- Removing `leads` or `email_sequences` tables.

## Capabilities

### New Capabilities
- `unified-nurturing-connector`: Persist PULSO-H leads into `acruxdb.nurturing_sequences` with consent metadata.

### Modified Capabilities
- `lead-capture-gateway`: Extend `POST /api/lead.php` to call unified nurturing and fall back to legacy welcome email.
- `email-nurturing`: Mark legacy cron as deprecated; sequence execution moves to acrux.life unified sender.

## Approach

1. Add an `acruxdb` PDO helper in `api/config.php` using env vars (`ACRUX_DB_HOST`, `ACRUX_DB_NAME`, `ACRUX_DB_USER`, `ACRUX_DB_PASS`).
2. In `api/lead.php`, after successful local insert, call a helper that writes to `acruxdb.nurturing_sequences` inside a `try/catch`.
3. On failure, log to `error_log` and trigger the existing `sendWelcomeEmail()` if `marketing_consent` is true.
4. Keep `createEmailSequence($leadId)` for local sequence state until the cron is removed.
5. Update the cron file header to deprecated and emit `error_log` on execution.
6. Add env vars to `.env.example`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `api/config.php` | Modified | Add `acruxdb` PDO constants/helper alongside existing local DB. |
| `api/lead.php` | Modified | Insert into `acruxdb.nurturing_sequences` after lead creation. |
| `api/cron/send-emails.php` | Deprecated | Add deprecated warning; stop scheduling. |
| `.env.example` | Modified | Document `ACRUX_DB_*` connection variables. |
| `api/schema.sql` | No change | Existing tables remain; no migration required. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Unified DB unavailable on insert | Med | `try/catch` + fallback to legacy welcome email. |
| Missing/incorrect env vars | Med | Validate on boot; fail open to legacy path. |
| Duplicate welcome email | Low | Unified sender owns welcome; local fallback only on failure. |
| GDPR consent mismatch | Low | Pass `gdpr_consent` and `marketing_consent` exactly as stored locally. |

## Rollback Plan

1. Revert `api/lead.php` to skip the `acruxdb` insert.
2. Re-enable `api/cron/send-emails.php` in the Hostinger cron panel.
3. Remove or unset `ACRUX_DB_*` env vars.

## Dependencies

- `acruxdb` schema with `nurturing_sequences` table (already exists).
- DIGITAL-H Option A integration as reference.

## Success Criteria

- [ ] New leads appear in `acruxdb.nurturing_sequences` within 5 seconds.
- [ ] Missing unified DB does not break the lead capture response.
- [ ] Legacy welcome email still sends when unified insert fails.
- [ ] No PII hardcoded; all credentials via env vars.
- [ ] GDPR/marketing consent flags match the local lead record.
