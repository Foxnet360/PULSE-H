## ADDED Requirements

### Requirement: Frontend synchronizes leads to backend API
The system MUST establish a persistent connection between the React frontend and the existing PHP backend for lead data.

#### Scenario: Lead data sync on capture
- **WHEN** a lead is captured via LeadCaptureModal
- **THEN** the system sends a POST request to `/api/lead.php` with lead data
- **AND** the backend creates or updates the lead record in the `leads` table
- **AND** returns a lead_id that the frontend stores in sessionStorage

#### Scenario: Lead events are tracked
- **WHEN** a user performs an action (pdf_download, cta_click, call_scheduled)
- **THEN** the system sends a POST request to `/api/lead.php` with event data
- **AND** the backend inserts a record into `lead_events` table
- **AND** updates the lead's total score

### Requirement: Frontend maintains offline queue
The system MUST maintain a local queue of leads and events when the backend is unavailable.

#### Scenario: Backend connection fails
- **WHEN** the backend returns 500 or network is unavailable
- **THEN** the system stores the lead/event in localStorage queue
- **AND** retries the sync on the next user interaction or page load
- **AND** marks items as synced when backend responds successfully

### Requirement: Backend accepts lead events array
The system MUST extend the existing `/api/lead.php` endpoint to accept an array of events.

#### Scenario: Batch event submission
- **WHEN** the frontend sends a POST with lead data including events array
- **THEN** the backend processes each event and inserts into `lead_events`
- **AND** calculates cumulative score based on event types and values
- **AND** returns success confirmation with updated lead score

### Requirement: Backend provides lead retrieval
The system MUST allow the frontend to retrieve lead data by email or lead_id.

#### Scenario: Existing lead returns
- **WHEN** a user who previously completed the assessment enters their email again
- **THEN** the backend updates the existing lead record instead of creating duplicate
- **AND** increments the lead's score
- **AND** returns the existing lead_id
