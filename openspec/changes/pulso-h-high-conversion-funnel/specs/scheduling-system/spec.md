## ADDED Requirements

### Requirement: Scheduling page displays weekly calendar
The system MUST show a visual calendar with available 30-minute slots for the current and next week.

#### Scenario: User navigates to /agendar
- **WHEN** the user clicks "Agendar revisión gratuita" from Thank You Page
- **THEN** the system displays a weekly calendar grid
- **AND** shows days from Monday to Friday
- **AND** displays available time slots in 30-minute increments

#### Scenario: User views available slots
- **WHEN** the calendar loads
- **THEN** the system fetches available slots from `/api/availability.php`
- **AND** marks unavailable slots as disabled (grayed out)
- **AND** highlights the current day

### Requirement: User can select a time slot
The system MUST allow users to click on an available slot to select it.

#### Scenario: User selects Monday 10:00 AM
- **WHEN** the user clicks on the "10:00" slot on Monday
- **THEN** the slot becomes visually selected (highlighted)
- **AND** a booking form appears with pre-filled data
- **AND** the selected date/time is stored in form state

### Requirement: Booking form is pre-populated with lead data
The system MUST auto-fill the booking form with data from the lead capture.

#### Scenario: User opens booking form
- **WHEN** the booking form appears after selecting a slot
- **THEN** the name field is pre-filled from lead data (if available)
- **AND** the email field is pre-filled and read-only
- **AND** the company field is optional
- **AND** a notes field allows adding context about the diagnostic results

### Requirement: Booking confirms and creates appointment
The system MUST create an appointment record when the user submits the booking form.

#### Scenario: User submits booking
- **WHEN** the user fills the form and clicks "Confirmar cita"
- **THEN** the system sends POST to `/api/booking.php` with lead_id, date, time, and form data
- **AND** the backend creates a record in `appointments` table
- **AND** marks the slot as unavailable in `availability_slots`
- **AND** returns a confirmation with appointment_id

### Requirement: Booking sends confirmation email
The system MUST send an email confirmation upon successful booking.

#### Scenario: Booking is confirmed
- **WHEN** the appointment is created successfully
- **THEN** the system sends an email via Resend API
- **AND** the email includes: date, time, psychologist name, meeting link (if virtual), and calendar invite
- **AND** the email is sent to the lead's email address

### Requirement: Admin can view appointments
The system MUST provide an admin dashboard to view scheduled appointments.

#### Scenario: Admin views dashboard
- **WHEN** an admin navigates to the appointments section
- **THEN** the system displays a list of upcoming appointments
- **AND** shows: date, time, lead name, email, status (pending/confirmed/completed)
- **AND** allows filtering by date range and status

### Requirement: Admin can manage appointment status
The system MUST allow admins to update appointment status.

#### Scenario: Admin marks appointment as completed
- **WHEN** an admin clicks "Marcar como completada"
- **THEN** the system updates the appointment status to 'completed'
- **AND** adds a `call_scheduled` event to the lead with 50 score points
- **AND** updates the lead status to 'contacted' or 'qualified'
