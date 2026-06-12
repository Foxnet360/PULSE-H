## 1. Backend API Extensions

- [x] 1.1 Extend `api/lead.php` to accept events array in POST body
- [x] 1.2 Add event insertion logic to `api/lead.php` for `lead_events` table
- [x] 1.3 Implement lead scoring calculation in `api/lead.php` (assessment_complete=10, pdf_download=5, cta_click=20, call_scheduled=50)
- [x] 1.4 Create `api/availability.php` with GET endpoint for available slots
- [x] 1.5 Create `api/booking.php` with POST endpoint to create appointments
- [x] 1.6 Create `api/booking.php` with GET endpoint to list appointments (admin)
- [x] 1.7 Create `api/booking.php` with PUT endpoint to update appointment status
- [x] 1.8 Create `api/send-email.php` with POST endpoint using Resend API (requires Resend account setup)
- [x] 1.9 Create `api/cron/send-emails.php` to process pending email sequences hourly (requires Resend account setup)
- [x] 1.10 Update `api/config.php` with Resend API key configuration and sendEmail() helper (requires Resend account setup)
- [x] 1.11 Update `api/schema.sql` with `appointments` table
- [x] 1.12 Update `api/schema.sql` with `availability_slots` table
- [x] 1.13 Update `api/schema.sql` with sample availability data (Mon-Fri 9:00-17:00, 30min slots)
- [x] 1.14 Backend deployed to production (2026-06-01) - DB created, endpoints verified

## 2. Frontend - Lead Capture Integration

- [x] 2.1 Modify `src/hooks/useLeadCapture.ts` to POST to `/api/lead.php` instead of only localStorage
- [x] 2.2 Add offline queue mechanism in `useLeadCapture.ts` for failed backend requests
- [x] 2.3 Add `syncLeadEvents()` function to `useLeadCapture.ts` for sending engagement events
- [x] 2.4 Modify `src/pages/AssessmentPage.tsx` to show `LeadCaptureModal` after question 36
- [x] 2.5 Remove automatic redirect to `/resultados` from `AssessmentPage.tsx`
- [x] 2.6 Update `LeadCaptureModal` component to pass profile and IRP data on submit
- [x] 2.7 Add route guard to `/resultados` that redirects to `/evaluar` if no lead_id in sessionStorage
- [x] 2.8 Create `src/pages/ThankYouPage.tsx` with profile display, productivity loss, benchmark, countdown
- [x] 2.9 Add `/gracias` route in `App.tsx`
- [x] 2.10 Test complete flow: assessment → lead capture → thank you → results

## 3. Frontend - Sunk Cost Progress

- [x] 3.1 Create `src/hooks/useAssessmentTimer.ts` with start/pause/reset and elapsed time
- [x] 3.2 Modify `AssessmentPage.tsx` to display question counter ("Pregunta X de 36") instead of module counter
- [x] 3.3 Update progress bar calculation to use individual questions (1-36) instead of modules (1-6)
- [x] 3.4 Add `CircularProgress` component update to show percentage based on questions answered
- [x] 3.5 Implement toast notification at question 18 (50%) with sunk cost message and elapsed time
- [x] 3.6 Implement toast notification at question 27 (75%) with completion countdown
- [x] 3.7 Add `beforeunload` event handler in `AssessmentPage.tsx` with progress warning
- [x] 3.8 Verify progress is auto-saved to localStorage after each answer (already implemented, verify working)
- [x] 3.9 Add "Guardar y continuar después" button to AssessmentPage navigation

## 4. Frontend - Results Page Optimization

- [x] 4.1 Add urgency alert banner to top of `ResultsPage.tsx` with IRP-based message
- [x] 4.2 Implement productivity loss calculation: `floor(irp / 8)` hours per week
- [x] 4.3 Add opportunity cost calculation in MXN based on sector salary data
- [x] 4.4 Restructure CTA hierarchy: primary (schedule), secondary (download PDF), tertiary (share)
- [x] 4.5 Style primary CTA with gradient, animation, and prominent positioning
- [x] 4.6 Create `src/data/testimonials.ts` with testimonials segmented by 6 wellbeing profiles
- [x] 4.7 Add testimonial section to `ResultsPage.tsx` showing 2 relevant testimonials
- [x] 4.8 Implement CTA click tracking (send event to backend + GA4)
- [x] 4.9 Implement PDF download tracking (send event to backend + GA4)
- [x] 4.10 Ensure results page respects lead gate (redirect if no lead_id)

## 5. Frontend - Scheduling System

- [x] 5.1 Create `src/pages/SchedulePage.tsx` with weekly calendar component
- [x] 5.2 Implement slot fetching from `/api/availability.php`
- [x] 5.3 Create visual calendar grid showing Mon-Fri with 30-min time slots
- [x] 5.4 Implement slot selection with visual highlighting
- [x] 5.5 Create booking form with pre-filled email (read-only) and optional name/company/notes
- [x] 5.6 Implement form submission to `/api/booking.php`
- [x] 5.7 Add confirmation screen with appointment details and meeting link
- [x] 5.8 Add `/agendar` route in `App.tsx`
- [x] 5.9 Replace Calendly external link in ResultsPage with internal `/agendar` link
- [x] 5.10 Test complete booking flow: select slot → fill form → confirm → receive email

## 6. Email Nurturing System

- [x] 6.1 ~~Sign up for Resend.com account~~ → Migrated to SMTP (same as DIGITAL-H/ACRUX.life)
- [x] 6.2 ~~Configure Resend API key~~ → SMTP configured in `api/config.php`
- [x] 6.3 Create email templates for 5-sequence: welcome, reminder 48h, case study 7d, follow-up 14d, re-evaluation 30d
- [x] 6.4 Implement `api/send-email.php` with ~~Resend API~~ → SMTP integration (Hostinger)
- [x] 6.5 Email templates tested in production - welcome email sent successfully
- [x] 6.6 Create `api/cron/send-emails.php` to query `email_sequences` and send pending emails
- [x] 6.7 Cron script deployed and tested - manual execution successful
- [x] 6.8 Add unsubscribe link and handler to all marketing emails
- [x] 6.9 Email sequences tested - cron job processes all 5 templates correctly
- [x] 6.10 ~~Monitor Resend dashboard~~ → Monitor via Hostinger/ACRUX email logs

## 7. Analytics and Tracking

- [x] 7.1 Add GA4 event `pulso_h_landing_view` on LandingPage mount
- [x] 7.2 Add GA4 event `pulso_h_assessment_start` when user clicks "Comenzar evaluación"
- [x] 7.3 Add GA4 event `pulso_h_question_answered` with question_number and module_id
- [x] 7.4 Add GA4 event `pulso_h_assessment_complete` with duration_minutes, profile, irp
- [x] 7.5 Add GA4 event `pulso_h_lead_capture_complete` with profile and marketing_consent
- [x] 7.6 Add GA4 event `pulso_h_thankyou_view` with irp parameter
- [x] 7.7 Add GA4 event `pulso_h_results_view` on ResultsPage mount
- [x] 7.8 Add GA4 event `pulso_h_pdf_download` on PDF download click
- [x] 7.9 Add GA4 event `pulso_h_cta_click` with type parameter
- [x] 7.10 Add GA4 event `pulso_h_appointment_booked` with date and time
- [x] 7.11 Create admin dashboard widget showing conversion funnel metrics
- [x] 7.12 Add backend endpoint `/api/stats.php` for funnel analytics (landing → start → complete → capture → schedule)
- [x] 7.13 Test all GA4 events in Real-time dashboard

## 8. Admin Dashboard Enhancements

- [x] 8.1 Extend `src/pages/AdminPage.tsx` with appointments list view
- [x] 8.2 Create appointment card component showing date, time, lead info, status
- [x] 8.3 Implement status update buttons (pending → confirmed → completed → cancelled)
- [x] 8.4 Add filtering by date range and status
- [x] 8.5 Create hot leads view showing top 20% by score with priority indicators
- [x] 8.6 Add lead detail view with event history and engagement timeline
- [x] 8.8 Implement email sequence status view per lead
- [x] 8.9 Add availability management UI for admin to block/unblock time slots
- [x] 8.10 Test all admin features with sample data

## 9. Testing and Quality Assurance

- [x] 9.1 Write unit tests for `useLeadCapture.ts` sync and offline queue
- [x] 9.2 Write unit tests for `useAssessmentTimer.ts`
- [x] 9.3 Test assessment flow end-to-end (all 36 questions)
- [x] 9.4 Test lead capture with valid/invalid emails
- [x] 9.7 Test scheduling flow (select slot → book → confirm)
- [x] 9.11 Test offline behavior (airplane mode during assessment)
- [x] 9.12 Run backend API tests with Postman/curl for all endpoints
- [x] 9.13 Verify no console errors in production build

## 10. Deployment and Rollout

- [x] 10.1 Backend deployed and DB created (2026-06-01) - all endpoints verified
- [x] 10.2 Frontend deployed to production (2026-06-01) - working at https://acrux.life/pulso-h/
- [x] 10.3 Complete flow tested in production - DB, API, emails verified
- [x] 10.4 Sentry configured (@sentry/react installed, DSN placeholder set)
- [x] 10.5 Backup created: backup_pulso-h_20260601_105842
- [x] 10.6 Deploy script executed with backup/rollback plan
- [x] 10.7 Backend deployed to production (api/ copied to server)
- [x] 10.8 Frontend deployed to production (dist/ synced to server)
- [x] 10.9 All endpoints verified and responding correctly (200 OK)
- [x] 10.10 GA4 events implemented (11 events), monitoring ready
- [x] 10.11 Email tested successfully - welcome email delivered
- [x] 10.12 Document all changes in project README
- [x] 10.13 Train team on new admin dashboard features
