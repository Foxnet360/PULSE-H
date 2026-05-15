## ADDED Requirements

### Requirement: Progress displayed by individual question
The system MUST display progress as "Pregunta X de 36" instead of "Módulo X de 6".

#### Scenario: User answers question 15
- **WHEN** the user is viewing question 15 out of 36 total questions
- **THEN** the header displays "Pregunta 15 de 36"
- **AND** the progress bar shows 41.7% completion

#### Scenario: User navigates between modules
- **WHEN** the user moves from module 2 to module 3
- **THEN** the question counter continues sequentially (e.g., from question 11 to question 12)
- **AND** does not reset or show module-based counting

### Requirement: Timer displays elapsed time
The system MUST show a visible timer counting the time invested in the assessment.

#### Scenario: Assessment starts
- **WHEN** the user clicks "Comenzar evaluación"
- **THEN** a timer starts counting from 00:00
- **AND** displays prominently near the progress indicator

#### Scenario: Timer shows elapsed time at 5 minutes
- **WHEN** the user has been answering questions for 5 minutes
- **THEN** the timer displays "05:32" (or actual elapsed time)
- **AND** continues counting until assessment completion

### Requirement: Sunk cost messages at milestones
The system MUST display encouraging messages at the 50% and 75% completion milestones.

#### Scenario: User reaches 50% completion (question 18)
- **WHEN** the user answers question 18
- **THEN** the system displays a toast notification: "¡Llevas X minutos! Ya estás a mitad de camino de tu diagnóstico personalizado."
- **AND** the message auto-dismisses after 5 seconds

#### Scenario: User reaches 75% completion (question 27)
- **WHEN** the user answers question 27
- **THEN** the system displays a toast notification: "¡Casi terminas! Solo te quedan 9 preguntas para recibir tu informe completo."
- **AND** the message remains visible until the user interacts with the next question

### Requirement: Browser prevents accidental exit with progress
The system MUST warn users before closing the browser tab if they have unsaved progress.

#### Scenario: User tries to close tab mid-assessment
- **WHEN** the user attempts to close the browser tab with unanswered questions remaining
- **THEN** the browser displays a native confirmation dialog
- **AND** the message reads: "¿Seguro que quieres salir? Perderás tu progreso de X minutos."
- **AND** the dialog appears only if at least 3 questions have been answered

### Requirement: Assessment progress is auto-saved
The system MUST automatically save assessment progress to localStorage.

#### Scenario: User refreshes page mid-assessment
- **WHEN** the user refreshes the browser page during the assessment
- **THEN** the system restores their previous responses from localStorage
- **AND** redirects them to the last module they were viewing
- **AND** displays a subtle indicator: "Progreso restaurado ✓"
