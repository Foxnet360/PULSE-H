## MODIFIED Requirements

### Requirement: Lead management synchronizes with backend
The system SHALL synchronize lead data with the backend API instead of storing only in localStorage.

#### Scenario: New lead is captured
- **WHEN** a new lead is captured through the LeadCaptureModal
- **THEN** the system sends a POST request to `/api/lead.php`
- **AND** the backend creates or updates the lead record in the database
- **AND** returns a lead_id that is stored in sessionStorage

#### Scenario: Existing lead returns
- **WHEN** a user enters an email that already exists in the database
- **THEN** the backend updates the existing lead's score and timestamp
- **AND** returns the existing lead_id
- **AND** does NOT create a duplicate record

## ADDED Requirements

### Requirement: Lead management tracks engagement events
The system SHALL track user engagement events and associate them with leads.

#### Scenario: User downloads PDF
- **WHEN** a logged-in lead clicks "Descargar informe PDF"
- **THEN** the system sends an event to the backend with type 'pdf_download'
- **AND** adds 5 points to the lead's total score

#### Scenario: User schedules appointment
- **WHEN** a lead successfully books an appointment
- **THEN** the system sends an event with type 'call_scheduled'
- **AND** adds 50 points to the lead's score
- **AND** updates the lead status to 'contacted'

### Requirement: Lead management supports email sequences
The system SHALL initiate email nurturing sequences when a lead is created.

#### Scenario: Lead is created
- **WHEN** a new lead is inserted into the database
- **THEN** the system creates an `email_sequences` record for that lead
- **AND** schedules the 5-email sequence based on the lead's creation date
- **AND** sets all email sent flags to false

### Requirement: Lead management provides hot lead identification
The system SHALL identify and surface high-value leads based on engagement scoring.

#### Scenario: Admin requests hot leads
- **WHEN** an admin accesses the leads dashboard
- **THEN** the system calculates the top 20% of leads by total score
- **AND** displays them with priority markers
- **AND** includes their profile, last activity, and total score
