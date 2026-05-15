## MODIFIED Requirements

### Requirement: Assessment flow redirects to lead capture on completion
The system SHALL redirect the user to the lead capture modal instead of directly to results when the assessment is completed.

#### Scenario: User completes final module
- **WHEN** the user completes the last question of the final module
- **THEN** the system calculates the assessment result
- **AND** stores the result in sessionStorage
- **AND** displays the LeadCaptureModal
- **AND** does NOT redirect to `/resultados` automatically

#### Scenario: User attempts to view results without lead capture
- **WHEN** the user navigates to `/resultados` without having completed lead capture
- **THEN** the system redirects to `/evaluar`
- **AND** displays a message explaining they need to complete the assessment first

## ADDED Requirements

### Requirement: Assessment progress is persisted across sessions
The system SHALL automatically save assessment progress to localStorage after each answer.

#### Scenario: User refreshes browser during assessment
- **WHEN** the user refreshes the page during an active assessment
- **THEN** the system restores all previously entered responses
- **AND** returns the user to the current module
- **AND** displays "Progreso restaurado ✓"

### Requirement: Assessment allows explicit save and continue later
The system SHALL provide a "Guardar y continuar después" button during the assessment.

#### Scenario: User clicks save and continue later
- **WHEN** the user clicks "Guardar y continuar después"
- **THEN** the system saves all responses to localStorage
- **AND** displays a confirmation: "Tu progreso ha sido guardado. Puedes retomar desde este dispositivo."
- **AND** provides an option to copy a recovery link
