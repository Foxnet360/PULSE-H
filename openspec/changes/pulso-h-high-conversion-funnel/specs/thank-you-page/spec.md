## ADDED Requirements

### Requirement: Thank You Page displays dynamic profile result
The system MUST show the user's wellbeing profile immediately upon reaching `/gracias`.

#### Scenario: User with "Sobrecargadx" profile
- **WHEN** the user completes the assessment and is captured as a lead
- **THEN** the Thank You Page displays their profile badge: "Sobrecargadx"
- **AND** shows the profile color (red) and description
- **AND** displays their IRP score prominently

### Requirement: Thank You Page shows productivity loss message
The system MUST calculate and display an estimated productivity loss based on IRP score.

#### Scenario: User with IRP of 67
- **WHEN** the user has an IRP of 67 (moderate-high risk)
- **THEN** the page displays: "Con un IRP de 67, estás perdiendo aproximadamente 8 horas semanales de productividad por agotamiento emocional"
- **AND** the hours are calculated based on a formula: `floor(irp / 8)` hours per week

### Requirement: Thank You Page shows sector benchmark
The system MUST display a benchmark comparing the user's results to their sector average.

#### Scenario: User in "Consultoría" sector
- **WHEN** the user's evaluation indicates they are in the "Consultoría" sector
- **THEN** the page displays: "El 73% de profesionales en Consultoría tienen mejor bienestar que tu equipo actual"
- **AND** the percentage is calculated from benchmark_data table

### Requirement: Thank You Page has countdown urgency
The system MUST display a countdown timer creating urgency to schedule a review.

#### Scenario: User views Thank You Page
- **WHEN** the user lands on `/gracias`
- **THEN** a countdown timer starts at 48 hours
- **AND** displays: "Tu diagnóstico expira en: 47:59:59"
- **AND** the timer counts down in real-time (hours:minutes:seconds)

### Requirement: Thank You Page has primary CTA to schedule
The system MUST display a prominent call-to-action to schedule a free review.

#### Scenario: User views Thank You Page
- **WHEN** the page loads
- **THEN** a large button displays: "Agendar mi revisión gratuita de 30 min con un Psicólogo Organizacional"
- **AND** clicking the button navigates to `/agendar`
- **AND** the button uses accent color with hover animation

### Requirement: Thank You Page has secondary CTA to results
The system MUST provide a secondary option to view full results.

#### Scenario: User declines to schedule immediately
- **WHEN** the user clicks "Ver mi informe completo"
- **THEN** the system navigates to `/resultados`
- **AND** the user can still return to schedule later from the results page
