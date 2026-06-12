## ADDED Requirements

### Requirement: Captura de email estratégica
El sistema SHALL capturar email del empleado en momentos clave para maximizar conversión.

#### Scenario: Email opcional en bienvenida
- **WHEN** el empleado inicia diagnóstico
- **THEN** puede ingresar email opcional: "Guarda tu progreso y recibe tu informe"
- **AND** microcopy: "Sin spam. Solo valor humano."
- **AND** checkbox GDPR: "Acepto recibir comunicaciones de ACRUX"

#### Scenario: Email obligatorio para resultados completos
- **WHEN** el empleado completa diagnóstico sin haber dado email
- **THEN** para descargar PDF o ver resultados detallados, debe ingresar email
- **AND** se explica valor: "Te enviaremos tu informe completo y recursos personalizados"

### Requirement: Secuencia de nurturing
El sistema SHALL enviar 5 emails automatizados en 14 días.

#### Scenario: Email 1 - Bienvenida + Informe
- **WHEN** completa diagnóstico
- **THEN** Email 1 (inmediato):
  - Asunto: "Tu PULSO está listo, [nombre]"
  - Contenido: Resumen de perfil, link a resultados online, PDF adjunto
  - CTA: "Agendar llamada gratuita con ACRUX"

#### Scenario: Email 2 - Contenido relevante
- **WHEN** día 3 después del diagnóstico
- **THEN** Email 2:
  - Artículo de blog relacionado con su perfil de riesgo
  - Ej: Si alto AE → "5 micro-hábitos para recuperar energía"

#### Scenario: Email 3 - Caso de éxito
- **WHEN** día 6 después del diagnóstico
- **THEN** Email 3:
  - Caso de éxito de empresa que redujo burnout con ACRUX
  - Testimonio de CEO/RRHH

#### Scenario: Email 4 - Webinar
- **WHEN** día 10 después del diagnóstico
- **THEN** Email 4:
  - Invitación a webinar: "Cómo liderar equipos sin burnout"
  - Registro gratuito

#### Scenario: Email 5 - Oferta
- **WHEN** día 14 después del diagnóstico
- **THEN** Email 5:
  - Oferta: "15% descuento en diagnóstico organizacional completo"
  - Urgencia: "Válido por 7 días"
  - CTA: "Agendar llamada de calificación"

### Requirement: Integración con consultoría ACRUX
El sistema SHALL canalizar leads hacia servicios de consultoría.

#### Scenario: CTA estratégico en resultados
- **WHEN** el empleado ve su perfil
- **THEN** CTA primario: "Hablemos del bienestar de tu equipo" (calendly)
- **AND** CTA secundario: "Descargar informe PDF"
- **AND** CTA terciario: "Compartir con mi equipo"

#### Scenario: Descuento por plan
- **WHEN** organización en plan Growth
- **THEN** ofrece 10% descuento en consultoría
- **WHEN** plan Pro
- **THEN** ofrece 20% descuento
- **WHEN** plan Enterprise
- **THEN** consultoría incluida

### Requirement: Calificación de leads
El sistema SHALL calificar leads según engagement.

#### Scenario: Scoring automático
- **WHEN** lead interactúa con PULSO-H
- **THEN** se asigna score:
  - Completa diagnóstico: +10 pts
  - Descarga PDF: +5 pts
  - Abre email: +2 pts
  - Click CTA: +5 pts
  - Agenda llamada: +20 pts
  - Organización con 10+ empleados: +15 pts

#### Scenario: Priorización
- **WHEN** ACRUX revisa pipeline
- **THEN** leads se ordenan por score
- **AND** top 20% se marcan como "Hot"
- **AND** se notifica al consultor asignado

### Requirement: Integración CRM
El sistema SHALL integrar con HubSpot (u otro CRM) para tracking de leads.

#### Scenario: Creación de contacto
- **WHEN** se captura email
- **THEN** se crea contacto en HubSpot con: email, nombre, empresa, perfil de riesgo, fuente (PULSO-H)
- **AND** se asigna a pipeline "Wellness Diagnostic"

#### Scenario: Tracking de eventos
- **WHEN** ocurre evento (completitud, descarga, click CTA)
- **THEN** se registra en HubSpot como actividad del contacto
- **AND** actualiza score y etapa del pipeline
