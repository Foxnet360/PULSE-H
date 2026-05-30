# PULSO-H Manual Testing Checklist

## Pre-requisitos
- [ ] Backend deployed and accessible
- [ ] Frontend built and deployed
- [ ] Database schema applied (`api/schema.sql`)
- [ ] Resend API key configured (for email testing)

---

## 1. Assessment Flow (9.3, 2.10)

### Test: Complete 36-question assessment
```bash
# Navigate to assessment
curl -s http://YOUR_DOMAIN/pulso-h/evaluar | head -20
```

**Manual Steps:**
1. Open `/evaluar` in browser
2. Click "Comenzar evaluación"
3. Answer all 36 questions (select any option for each)
4. Verify progress counter shows "Pregunta X de 36"
5. At question 18: Verify toast notification appears
6. At question 27: Verify toast notification appears
7. At question 36: Verify LeadCaptureModal appears
8. Complete lead capture with valid email
9. Verify redirect to `/gracias`
10. Click "Ver mi informe completo"
11. Verify redirect to `/resultados`

**Expected Result:** Smooth flow without errors, all pages load correctly.

---

## 2. Lead Capture (9.4)

### Test: Valid email
1. Complete assessment
2. In LeadCaptureModal, enter: `test@example.com`
3. Check GDPR consent
4. Check Marketing consent
5. Submit

**Expected:** Success, redirect to `/gracias`, lead saved in database.

### Test: Invalid email
1. Complete assessment
2. Enter: `invalid-email`
3. Submit

**Expected:** Validation error shown, form not submitted.

### Test: Duplicate email
1. Complete assessment
2. Enter email already in database
3. Submit

**Expected:** Lead updated (not duplicated), score incremented.

---

## 3. Thank You Page (9.5)

### Test: All 6 profiles
Set in browser console before navigating to `/gracias`:
```javascript
sessionStorage.setItem('assessment_profile', 'PROFILENAME');
sessionStorage.setItem('assessment_irp', '72');
```

Test with each profile:
- `sobrecargadx`
- `desconectadx`
- `agotadx`
- `resiliente`
- `equilibradx`
- `floreciente`

**Expected:** Each profile shows correct name, color, and productivity loss calculation.

---

## 4. Results Page (9.6)

### Test: CTA hierarchy
1. Navigate to `/resultados` with valid lead_id in sessionStorage
2. Verify primary CTA: "Agendar revisión gratuita" (most prominent)
3. Verify secondary CTA: "Descargar PDF"
4. Verify tertiary CTA: "Compartir"
5. Click each CTA and verify correct action

**Expected:** 
- Primary CTA links to `/agendar`
- PDF download triggers download + tracking event
- Share opens share dialog

---

## 5. Scheduling (9.7, 5.10)

### Test: Complete booking flow
1. Navigate to `/agendar`
2. Verify calendar loads with available slots
3. Select a slot
4. Verify form appears with pre-filled email
5. Fill name and optional fields
6. Submit form
7. Verify confirmation screen with appointment details

**Expected:** Appointment created in database, confirmation displayed.

---

## 6. Responsive Design (9.10)

### Test: Mobile viewport
Use browser DevTools, set viewport to:
- iPhone SE: 375x667
- iPhone 12: 390x844
- Pixel 5: 393x851

**Check:**
- [ ] No horizontal scroll
- [ ] All buttons tappable (min 44x44px)
- [ ] Text readable without zoom
- [ ] Calendar usable on mobile
- [ ] Forms accessible

---

## 7. Email Testing (6.5, 9.8)

### Test: Individual email sending
```bash
curl -X POST https://YOUR_DOMAIN/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>",
    "text": "Test",
    "lead_id": 1
  }'
```

### Test: Email sequences (requires cron)
```bash
# Run cron job manually
php api/cron/send-emails.php
```

**Expected:** Emails sent via Resend, marked as sent in database.

---

## 8. GA4 Events (7.13, 9.9)

### Verify events in GA4 Real-time dashboard

Navigate through funnel and verify these events fire:

| Event | When |
|-------|------|
| `pulso_h_landing_view` | Load landing page |
| `pulso_h_assessment_start` | Click "Comenzar evaluación" |
| `pulso_h_question_answered` | Answer each question |
| `pulso_h_assessment_complete` | Complete all 36 questions |
| `pulso_h_lead_capture_complete` | Submit lead capture form |
| `pulso_h_thankyou_view` | Load thank you page |
| `pulso_h_results_view` | Load results page |
| `pulso_h_pdf_download` | Click download PDF |
| `pulso_h_cta_click` | Click any CTA |
| `pulso_h_appointment_booked` | Book appointment |

**Check GA4 Real-time dashboard after each action.**

---

## 9. Offline Behavior (9.11)

### Test: Airplane mode during assessment
1. Start assessment
2. Answer 10 questions
3. Enable airplane mode (or disconnect network)
4. Answer 5 more questions
5. Re-enable network
6. Continue assessment

**Expected:** Progress saved in localStorage, no data loss.

---

## 10. Admin Dashboard (8.10)

### Test: All tabs
1. Navigate to `/admin`
2. Verify Analytics tab shows funnel metrics
3. Verify Citas tab lists appointments
4. Verify Leads tab shows hot leads and all leads
5. Verify Disponibilidad tab shows slots
6. Test status updates on appointments
7. Click on hot lead to see event history
8. Verify email sequence status displayed

---

## Sign-off

**Tester:** _________________ **Date:** _________________

**Environment:** ☐ Beta ☐ Production

**Result:** ☐ Pass ☐ Fail (with notes)

**Notes:**

