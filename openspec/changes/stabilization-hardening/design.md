# Design: stabilization-hardening

## Technical Approach

Stabilize the PULSO-H MVP by making four coordinated changes:

1. **Fix the scoring model** so every item contributes to risk in the same direction (higher = worse).
2. **Replace frontend mocks/localStorage** with the existing Hostinger PHP endpoints and add the missing ones (`nurturing-schedule.php`, `auth.php`, response persistence).
3. **Harden admin auth** with a server-side session cookie and an environment-only password.
4. **Clean up routing, CTAs, footer placeholders, and E2E tests** while lazy-loading the PDF chunk and centralizing profile names.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Reversed scoring | Invert `reversed: true` values in a `scoring.ts` normalization layer before aggregation; RP and custom dimensions then use higher-is-worse semantics | Keep ad-hoc inversion in `interpretSubscale` and IRP formula only | Single source of truth for item direction; cutoffs and tests become consistent |
| Backend integration | Fetch directly from PHP endpoints; no proxy | Add a Node/Express proxy | Matches the deployed Hostinger stack and requires no new server |
| Org response persistence | Extend `api/evaluation.php` with a `save_response` action | Create a separate `api/response.php` | Reuses existing hash lookup and keeps the API surface small |
| Admin auth | PHP session + `httpOnly` cookie; password from server-side env only | JWT in `localStorage` | Eliminates hardcoded fallback and client-side token storage |
| PDF bundle size | Lazy-load `PDFReportGenerator` in `ResultsPage`; keep existing `pdf` Rollup chunk | Remove PDF feature or switch library | Splits the heavy dependency out of the main bundle with minimal code change |
| Profile names | Centralize canonical keys/names in `src/data/profiles.ts`; update E2E tests to match | Change engine keys to match invented E2E names | Engine keys are already persisted in the DB; tests are cheaper to fix than a schema migration |
| Save progress | Keep localStorage auto-save; make the button trigger an explicit save with a timestamped key and a success toast | POST every keystroke to backend | Low complexity, works offline, and satisfies the "resume" acceptance criteria |

## Data Flow

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────────┐
│ AssessmentPage  │────→│ scoring.ts   │────→│ assessmentEngine.ts │
└─────────────────┘     └──────────────┘     └─────────────────────┘
         │                                            │
         │                                            ▼
         │                                   ┌─────────────────┐
         │                                   │  useLeadCapture │
         │                                   └────────┬────────┘
         │                                            │ POST /api/lead.php
         │                                            ▼
         │                                   ┌─────────────────┐
         │                                   │  lead + events  │
         │                                   └─────────────────┘
         │
         ▼ (org hash present)
┌─────────────────────┐     ┌─────────────────────┐
│ useLinkManagement   │────→│ api/evaluation.php  │
│ saveResponse()      │     │ (save_response)     │
└─────────────────────┘     └─────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────────┐     ┌─────────────────────┐
│ dashboard.php       │←────│ responses table     │
│ (GET ?hash=…)       │     │ (irp, profile, area)│
└─────────┬───────────┘     └─────────────────────┘
          │
          ▼
┌─────────────────────┐
│ DashboardPage       │
└─────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/utils/scoring.ts` | Create | `normalizeResponse`, `getRiskValue`, and per-module aggregation helpers |
| `src/utils/assessmentEngine.ts` | Modify | Use normalized values; update RP/custom-dimension cutoffs and interpretation |
| `src/utils/assessmentEngine.test.ts` | Modify | Golden tests for reversed RP and reversed custom items |
| `src/data/profiles.ts` | Create | Canonical profile keys, display names, descriptions, colors |
| `src/data/assessmentData.ts` | Modify | Add `reversed: true` to custom-dimension items that are worded positively |
| `src/hooks/useDashboard.ts` | Modify | Fetch `/api/dashboard.php?hash=…`; remove mock generator; add loading/error states |
| `src/hooks/useLinkManagement.ts` | Modify | CRUD against `/api/evaluation.php`; add `saveResponse(evaluationHash, result)` |
| `src/hooks/useAssessment.ts` | Modify | Expose `saveProgress()` returning a durable key; preserve localStorage resume |
| `src/pages/AssessmentPage.tsx` | Modify | Wire "Guardar progreso" button to `saveProgress()` with toast feedback |
| `src/pages/OrganizationAssessmentPage.tsx` | Modify | Validate hash via backend before rendering; pass hash to `startAssessment` |
| `src/pages/ResultsPage.tsx` | Modify | Replace Calendly link with internal `/agendar`; lazy-load PDF generator |
| `src/pages/DashboardPage.tsx` | Modify | Render loading/error states; use real backend distributions |
| `src/components/layout/Footer.tsx` | Modify | Read `VITE_CONTACT_PHONE` and `VITE_CONTACT_EMAIL`; remove placeholder |
| `src/components/landing/ProfilesSection.tsx` | Modify | Consume canonical profile data from `src/data/profiles.ts` |
| `src/context/AuthContext.tsx` | Modify | POST to `/api/auth.php`; read session cookie; remove localStorage token and fallback password |
| `src/pages/AdminPage.tsx` | Modify | Use `logout()` from AuthContext; profile names from canonical source |
| `src/App.tsx` | Modify | Remove self-referencing `<Navigate>` routes; route `/dashboard`, `/admin`, `/privacidad` to real pages |
| `vite.config.ts` | Modify | Keep `pdf` manual chunk; verify chunk < 500 KB in build |
| `api/evaluation.php` | Modify | Add `save_response` POST branch that inserts into `responses` table |
| `api/nurturing-schedule.php` | Create | Accept schedule payload, persist to `nurturing_schedules` or adapted `email_sequences` |
| `api/auth.php` | Create | Login/logout/session-check endpoints; password from `PULSO_ADMIN_PASSWORD` env |
| `api/cron/send-emails.php` | Modify | Read pending rows from nurturing table and send via existing `sendEmail()` |
| `e2e/pulso-h.spec.ts` | Modify | Stable `data-testid` selectors; updated canonical profile names; realistic timeouts |
| `.env.example` | Modify | Add `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`, `PULSO_ADMIN_PASSWORD` |

## Interfaces / Contracts

```typescript
// src/utils/scoring.ts
export interface NormalizedResponse {
  itemId: string
  rawValue: number
  riskValue: number // 0-6, higher = worse
}

export const normalizeResponse = (
  item: AssessmentItem,
  value: number
): NormalizedResponse => ({
  itemId: item.id,
  rawValue: value,
  riskValue: item.reversed ? 6 - value : value,
})
```

```typescript
// api/dashboard.php response shape consumed by useDashboard
interface DashboardApiResponse {
  evaluation_id: number
  is_active: boolean
  responses_needed: number
  stats: {
    total_responses: number
    average_irp: number
  }
  irp_distribution: Array<{ zone: IRPZone; count: number }>
  profile_distribution: Array<{ profile: BurnoutProfile; count: number }>
  area_results: Array<{ area: string; participant_count: number; average_irp: number }>
}
```

```typescript
// api/evaluation.php save_response payload
interface SaveResponsePayload {
  action: 'save_response'
  hash: string
  irp: number
  profile: BurnoutProfile
  demographic_area?: string
  dimensions: Record<string, number>
}
```

```typescript
// api/auth.php contract
interface AuthSessionResponse {
  authenticated: boolean
}

interface AuthLoginPayload {
  password: string
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Scoring normalization, profile determination, IRP calculation | Golden-value tests in `assessmentEngine.test.ts` |
| Unit | `useDashboard`, `useLinkManagement`, `AuthContext` | Mock `fetch`/`msw`; assert loading/error/success states |
| Integration | Assessment → result → lead capture → thank you | Render pages with mocked backend and router |
| E2E | Full funnel, scheduling, offline resume | Playwright with `data-testid` selectors and 120 s timeouts |
| Build | PDF chunk size | `npm run build` + inspect `dist/assets/pdf-*.js` < 500 KB |

## Migration / Rollout

1. **Database**: ensure `responses` table exists with `evaluation_id`, `irp`, `profile`, `demographic_area`. Add `nurturing_schedules` table (id, email, name, profile, irp, sequence JSON, created_at, sent_at) if `email_sequences` cannot store arbitrary JSON.
2. **Environment**: set `PULSO_ADMIN_PASSWORD` server-side (not `VITE_*`); add `VITE_CONTACT_PHONE` and `VITE_CONTACT_EMAIL` to build env.
3. **Scoring**: new calculations apply to future assessments only; no historical migration required.
4. **Rollback**: revert the branch; the app falls back to the previous localStorage/mock behavior for evaluation links and dashboard.

## Open Questions

- [ ] Confirm Hostinger CORS/base URL so the SPA can reach `/api/*` in production.
- [ ] Does the `responses` table already exist in Hostinger, or must the schema be created?
- [ ] Should "Guardar progreso" also POST a draft response for org assessments, or is localStorage-only acceptable?
