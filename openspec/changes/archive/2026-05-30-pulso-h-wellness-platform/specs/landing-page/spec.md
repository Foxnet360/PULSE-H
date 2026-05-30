## ADDED Requirements

### Requirement: Fórmula PAS (Problem-Agitation-Solution)
El sistema SHALL implementar landing page con estructura PAS optimizada para conversión.

#### Scenario: Problem
- **WHEN** usuario llega a landing
- **THEN** ve headline: "El 73% de empresas en LATAM no sabe cómo está su equipo"
- **AND** subheadline con datos de prevalencia burnout
- **AND** stat visual grande: "60-94%" con contexto

#### Scenario: Agitation
- **WHEN** usuario scrollea
- **THEN** ve sección de dolor: costos del burnout, compliance legal, pérdida de talento
- **AND** testimonios cortos de CEOs/RRHH
- **AND** comparativa: "Sin diagnóstico vs Con PULSO-H"

#### Scenario: Solution
- **WHEN** usuario llega a CTA
- **THEN** ve propuesta de valor: "8 minutos. 36 preguntas. 1 plan de acción."
- **AND** bullet points: gratuito, anónimo, basado en evidencia
- **AND** CTA principal: "Comenzar diagnóstico gratuito →"

### Requirement: Social Proof
El sistema SHALL incluir elementos de prueba social.

#### Scenario: Contador social
- **WHEN** usuario ve landing
- **THEN** ve contador: "2,847 personas ya conocen su pulso"
- **AND** actualiza en tiempo real (o simula animación)

#### Scenario: Testimonios
- **WHEN** usuario scrollea
- **THEN** ve 3-4 testimonios de:
  - Empleado: "PULSO-H me ayudó a conversar con mi jefe sobre mi carga"
  - RRHH: "Redujimos rotación 23% en 6 meses"
  - CEO: "Inversión en salud mental = ROI 4x"

#### Scenario: Logos de confianza
- **WHEN** usuario ve landing
- **THEN** ve logos de: empresas que usan PULSO-H, partnerships (universidades, cámaras), certificaciones ISO

### Requirement: UTM Tracking
El sistema SHALL detectar y almacenar parámetros UTM para analytics.

#### Scenario: Detección de fuente
- **WHEN** usuario llega con URL que incluye utm_source, utm_medium, utm_campaign
- **THEN** el sistema almacena estos valores en localStorage
- **AND** los incluye en eventos de GA4
- **AND** los envía al backend con el lead

#### Scenario: Personalización por fuente
- **WHEN** utm_source = linkedin
- **THEN** headline puede ajustarse: "Líderes conscientes miden el bienestar de su equipo"
- **WHEN** utm_source = instagram
- **THEN** headline: "Tu bienestar laboral importa 🧠"

### Requirement: SEO Optimizado
El sistema SHALL implementar SEO técnico y on-page.

#### Scenario: Meta tags dinámicos
- **WHEN** página carga
- **THEN** incluye: title "PULSO-H - Diagnóstico de Bienestar Laboral | ACRUX"
- **AND** description con keywords: burnout, bienestar laboral, diagnóstico gratuito, riesgos psicosociales
- **AND** Open Graph tags para sharing social
- **AND** canonical URL

#### Scenario: Schema.org
- **WHEN** página carga
- **THEN** incluye JSON-LD:
  - Organization (ACRUX Consultores)
  - Product (PULSO-H)
  - FAQPage (preguntas frecuentes)

### Requirement: FAQ y contenido educativo
El sistema SHALL incluir sección FAQ para reducir fricción.

#### Scenario: Preguntas frecuentes
- **WHEN** usuario scrollea a FAQ
- **THEN** ve acordeón con:
  - "¿Es realmente anónimo?" → Sí, procesamiento local...
  - "¿Cuánto toma?" → 8-10 minutos...
  - "¿Qué pasa con mis datos?" → Nunca salen de tu dispositivo...
  - "¿Es un diagnóstico médico?" → No, es autoevaluación...
  - "¿Puedo usarlo en mi empresa?" → Sí, genera un link para tu equipo...

### Requirement: Navegación compartida ACRUX
El sistema SHALL mantener navegación consistente con acrux.life.

#### Scenario: Header compartido
- **WHEN** usuario está en landing
- **THEN** header incluye: logo ACRUX, link a acrux.life, link a blog "El Radar"
- **AND** estilo visual consistente (colores, tipografía, spacing)

#### Scenario: Footer compartido
- **WHEN** usuario ve footer
- **THEN** incluye: links legales, newsletter "El Radar", redes sociales ACRUX
- **AND** copyright "© ACRUX Consultores"
