## ADDED Requirements

### Requirement: Email sequences are defined in database
The system MUST have predefined email sequences stored in the `email_sequences` table.

#### Scenario: New lead is captured
- **WHEN** a lead is created via `/api/lead.php`
- **THEN** the backend creates a record in `email_sequences` for that lead
- **AND** sets all email flags to false initially
- **AND** calculates scheduled dates based on the sequence template

### Requirement: Welcome email sends immediately
The system MUST send a welcome email immediately after lead capture.

#### Scenario: Lead completes assessment
- **WHEN** a lead is successfully captured
- **THEN** the system sends email_1 (welcome) within 5 minutes
- **AND** the email includes: personalized greeting, profile summary, and link to results
- **AND** marks email_1_sent = true in the database

### Requirement: Reminder email sends after 48 hours
The system MUST send a reminder email if the user hasn't scheduled an appointment.

#### Scenario: 48 hours pass without booking
- **WHEN** 48 hours have passed since lead capture
- **AND** no appointment exists for the lead
- **THEN** the system sends email_2 (reminder)
- **AND** the subject reads: "Tu diagnóstico expira en 24 horas - Agenda tu revisión gratuita"
- **AND** includes a direct link to `/agendar`

### Requirement: Success case email sends after 7 days
The system MUST send a case study email 7 days after capture.

#### Scenario: 7 days pass since lead capture
- **WHEN** 7 days have passed since lead capture
- **THEN** the system sends email_3 (case study)
- **AND** the content includes a testimonial from a similar company/profile
- **AND** highlights specific metrics of improvement

### Requirement: Follow-up email sends after 14 days
The system MUST send a follow-up email with additional resources.

#### Scenario: 14 days pass since lead capture
- **WHEN** 14 days have passed since lead capture
- **THEN** the system sends email_4 (follow-up)
- **AND** asks: "¿Cómo va tu plan de acción?"
- **AND** provides links to blog posts, guides, or tools based on their profile

### Requirement: Re-evaluation email sends after 30 days
The system MUST invite the user to re-take the assessment after 30 days.

#### Scenario: 30 days pass since lead capture
- **WHEN** 30 days have passed since lead capture
- **THEN** the system sends email_5 (re-evaluation)
- **AND** the subject reads: "Re-evalúa tu bienestar - ¿Has mejorado?"
- **AND** includes a direct link to start a new assessment
- **AND** mentions their previous profile for comparison

### Requirement: Cron job processes email queue
The system MUST have a cron job that checks and sends pending emails hourly.

#### Scenario: Cron job runs every hour
- **WHEN** the cron job executes `/api/cron/send-emails.php`
- **THEN** the system queries `email_sequences` for unsent emails with scheduled_date <= NOW()
- **AND** sends each pending email via Resend API
- **AND** marks them as sent with timestamp
- **AND** logs any errors for retry

### Requirement: Unsubscribe link is included
The system MUST include an unsubscribe link in every marketing email.

#### Scenario: User receives nurturing email
- **WHEN** any nurturing email is sent (emails 2-5)
- **THEN** the email footer includes: "¿No quieres recibir más emails? [Cancelar suscripción]"
- **AND** clicking the link updates marketing_consent = false in the database
- **AND** the user receives a confirmation of unsubscription
