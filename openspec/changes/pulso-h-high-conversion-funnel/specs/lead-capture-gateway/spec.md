## ADDED Requirements

### Requirement: Lead capture modal appears after assessment completion
The system MUST display the LeadCaptureModal immediately after the user answers the last question (question 36) and clicks "Finalizar".

#### Scenario: User completes all 36 questions
- **WHEN** the user answers question 36 and clicks the "Finalizar" button
- **THEN** the system calculates the assessment result
- **AND** stores the result in sessionStorage
- **AND** displays the LeadCaptureModal as an overlay blocking the rest of the interface

### Requirement: Lead capture is mandatory for accessing results
The system MUST require a valid email address and GDPR consent before allowing the user to view their results.

#### Scenario: User tries to access results without providing email
- **WHEN** the user navigates directly to `/resultados` without a valid lead_id in sessionStorage
- **THEN** the system redirects the user to `/evaluar`
- **AND** displays a message: "Por favor completa la evaluación para ver tus resultados"

#### Scenario: User provides invalid email
- **WHEN** the user enters an email without @ symbol in the LeadCaptureModal
- **THEN** the system displays an error message: "Por favor ingresa un correo válido"
- **AND** prevents form submission

#### Scenario: User does not accept GDPR consent
- **WHEN** the user enters a valid email but does not check the GDPR consent checkbox
- **THEN** the system displays an error message: "Debes aceptar la política de privacidad"
- **AND** prevents form submission

### Requirement: Lead data is synchronized to backend
The system MUST send lead data to the backend API immediately upon successful form submission.

#### Scenario: Successful lead capture
- **WHEN** the user submits the LeadCaptureModal with valid email and GDPR consent
- **THEN** the system sends a POST request to `/api/lead.php` with email, profile, IRP, gdpr_consent, and marketing_consent
- **AND** stores the returned lead_id in sessionStorage
- **AND** redirects the user to `/gracias`

#### Scenario: Backend is unavailable
- **WHEN** the backend API returns 500 or times out
- **THEN** the system stores the lead data in localStorage queue for retry
- **AND** still allows the user to proceed to `/gracias`
- **AND** attempts to sync in the background when connection is restored

### Requirement: Marketing consent is optional
The system MUST allow users to complete the lead capture without opting into marketing emails.

#### Scenario: User declines marketing consent
- **WHEN** the user unchecks the marketing consent checkbox
- **THEN** the system still captures the lead with marketing_consent=false
- **AND** the user can proceed normally to results
