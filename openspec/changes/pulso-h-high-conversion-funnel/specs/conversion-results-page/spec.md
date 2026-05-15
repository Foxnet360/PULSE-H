## ADDED Requirements

### Requirement: Results page displays urgency header
The system MUST show a prominent alert at the top of the results page with productivity loss information.

#### Scenario: User with high IRP views results
- **WHEN** the user with IRP > 50 views `/resultados`
- **THEN** an alert banner displays: "⚠️ ALERTA DE PRODUCTIVIDAD: Tu IRP de 67 indica riesgo MODERADO-ALTO. Estás perdiendo ~8 horas semanales de productividad."
- **AND** the banner uses the IRP zone color (orange/red)

### Requirement: Results page has optimized CTA hierarchy
The system MUST restructure CTAs with clear visual hierarchy.

#### Scenario: User views results page
- **WHEN** the results page loads
- **THEN** the primary CTA (largest, gradient, animated) reads: "Agendar revisión gratuita de 30 min"
- **AND** the secondary CTA (medium, outlined) reads: "Descargar informe PDF"
- **AND** the tertiary CTA (small, text-only) reads: "Compartir resultados"
- **AND** they are ordered vertically with primary at top

### Requirement: Results page shows dynamic testimonials
The system MUST display testimonials based on the user's wellbeing profile.

#### Scenario: User has "Sobrecargadx" profile
- **WHEN** the user has the "Sobrecargadx" profile
- **THEN** the page displays 2 testimonials from users who recovered from high burnout
- **AND** each testimonial includes: quote, author name, company, and metric of improvement

#### Scenario: User has "Floreciente" profile
- **WHEN** the user has the "Floreciente" profile
- **THEN** the page displays testimonials about maintaining high wellbeing
- **AND** focuses on prevention and sustainability

### Requirement: Results page tracks CTA interactions
The system MUST track when users click on CTAs for analytics and lead scoring.

#### Scenario: User clicks "Agendar revisión"
- **WHEN** the user clicks the primary CTA
- **THEN** the system sends a `cta_click` event to the backend with type='schedule'
- **AND** adds 20 points to the lead's score
- **AND** triggers GA4 event `pulso_h_cta_click`

#### Scenario: User clicks "Descargar PDF"
- **WHEN** the user clicks the secondary CTA
- **THEN** the system sends a `pdf_download` event to the backend
- **AND** adds 5 points to the lead's score
- **AND** triggers GA4 event `pulso_h_pdf_download`

### Requirement: Results page estimates opportunity cost
The system MUST calculate and display the monetary/opportunity cost of the user's wellbeing status.

#### Scenario: User with IRP 67 in management role
- **WHEN** the user views results with IRP 67
- **THEN** the page displays: "El costo estimado de esta situación: ~$X,XXX MXN mensuales en pérdida de productividad"
- **AND** the calculation uses sector salary data and productivity loss formula
