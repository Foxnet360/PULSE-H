## ADDED Requirements

### Requirement: GA4 events track the complete funnel
The system MUST instrument GA4 events for every step of the conversion funnel.

#### Scenario: User lands on PULSO-H
- **WHEN** the user visits the PULSO-H landing page
- **THEN** the system fires GA4 event `pulso_h_landing_view`
- **AND** includes UTM parameters if present in URL

#### Scenario: User starts assessment
- **WHEN** the user clicks "Comenzar evaluación"
- **THEN** the system fires GA4 event `pulso_h_assessment_start`

#### Scenario: User answers a question
- **WHEN** the user answers any question
- **THEN** the system fires GA4 event `pulso_h_question_answered`
- **AND** includes parameters: question_number, module_id

#### Scenario: User completes assessment
- **WHEN** the user answers question 36
- **THEN** the system fires GA4 event `pulso_h_assessment_complete`
- **AND** includes parameters: duration_minutes, profile, irp

#### Scenario: User is captured as lead
- **WHEN** the user submits LeadCaptureModal
- **THEN** the system fires GA4 event `pulso_h_lead_capture_complete`
- **AND** includes parameters: profile, marketing_consent

#### Scenario: User views Thank You Page
- **WHEN** the user lands on `/gracias`
- **THEN** the system fires GA4 event `pulso_h_thankyou_view`
- **AND** includes parameter: irp

#### Scenario: User views results
- **WHEN** the user lands on `/resultados`
- **THEN** the system fires GA4 event `pulso_h_results_view`

#### Scenario: User downloads PDF
- **WHEN** the user clicks "Descargar informe PDF"
- **THEN** the system fires GA4 event `pulso_h_pdf_download`

#### Scenario: User clicks CTA
- **WHEN** the user clicks any CTA on results page
- **THEN** the system fires GA4 event `pulso_h_cta_click`
- **AND** includes parameter: type ('schedule', 'download', 'share')

#### Scenario: User books appointment
- **WHEN** the user successfully creates an appointment
- **THEN** the system fires GA4 event `pulso_h_appointment_booked`
- **AND** includes parameters: date, time

### Requirement: Admin dashboard shows conversion funnel
The system MUST display a funnel visualization in the admin dashboard.

#### Scenario: Admin views analytics
- **WHEN** an admin navigates to the analytics section
- **THEN** the system displays a funnel with these stages and conversion rates:
  - Landing visits → Assessment starts (target: >15%)
  - Assessment starts → Question 18 (50%) (target: >70%)
  - Question 18 → Assessment complete (target: >80%)
  - Assessment complete → Lead captured (target: >60%)
  - Lead captured → Thank You Page viewed (target: >95%)
  - Thank You Page → Results viewed (target: >70%)
  - Results → PDF downloaded (target: >40%)
  - Results → Appointment booked (target: >10%)

### Requirement: Backend tracks lead events for scoring
The system MUST store engagement events in the backend for lead scoring.

#### Scenario: User performs tracked action
- **WHEN** any tracked event occurs (assessment_complete, pdf_download, cta_click, call_scheduled)
- **THEN** the backend inserts a record into `lead_events`
- **AND** assigns score_value based on event type:
  - assessment_complete: 10 points
  - pdf_download: 5 points
  - cta_click: 20 points
  - call_scheduled: 50 points
- **AND** updates the cumulative score in `leads` table

### Requirement: System identifies hot leads
The system MUST flag leads with high engagement scores.

#### Scenario: Admin views hot leads
- **WHEN** an admin requests hot leads
- **THEN** the system returns the top 20% of leads by score
- **AND** marks them with priority indicators
- **AND** includes their last activity timestamp
