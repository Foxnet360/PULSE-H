## ADDED Requirements

### Requirement: Biblioteca de intervenciones
El sistema SHALL mantener una biblioteca de intervenciones evidence-based clasificadas por dimensión, nivel de riesgo y tipo.

#### Scenario: Estructura de recomendaciones
- **WHEN** el sistema genera recomendaciones
- **THEN** cada recomendación tiene: título, descripción (2-3 líneas), tiempo requerido, evidencia científica, dificultad (fácil/medio/difícil)
- **AND** se clasifica por dimensión: AE, DP, RP, FOR, CVT, RRI

#### Scenario: Priorización por perfil
- **WHEN** se identifica el perfil de burnout
- **THEN** el sistema selecciona 3 intervenciones priorizadas
- **AND** ordena por impacto estimado × facilidad de implementación

### Requirement: Plan de Acción Personalizado (PAP)
El sistema SHALL generar un PAP con 3 acciones concretas basadas en el perfil del empleado.

#### Scenario: Generación de PAP individual
- **WHEN** el empleado completa el diagnóstico
- **THEN** recibe 3 tarjetas de acción:
  1. Acción inmediata (hoy, <5 min)
  2. Acción corto plazo (esta semana, <30 min)
  3. Acción medio plazo (este mes, requiere planificación)
- **AND** cada acción incluye instrucciones paso a paso expandibles

#### Scenario: Personalización por dimensión crítica
- **WHEN** AE es la dimensión más crítica
- **THEN** las acciones se enfocan en: técnicas de respiración, límites de disponibilidad, micro-pausas
- **WHEN** DP es crítica
- **THEN** acciones sobre: reconexión con colegas, propósito del trabajo, gratitud

### Requirement: Recomendaciones por nivel de riesgo
El sistema SHALL diferenciar recomendaciones gratuitas vs pagas.

#### Scenario: Nivel individual (gratis)
- **WHEN** el empleado ve resultados individuales
- **THEN** recibe: 3 acciones personales + técnicas de autocuidado + recursos gratuitos
- **AND** se indica: "Para intervenciones de equipo, tu organización puede acceder al plan completo"

#### Scenario: Nivel organizacional (pago)
- **WHEN** la organización contrata plan Growth/Pro
- **THEN** recibe: plan de intervención completo por área + roadmap de implementación + KPIs de seguimiento
- **AND** recomendaciones de rediseño organizacional que requieren consultoría ACRUX

### Requirement: Evidencia científica
Cada recomendación SHALL incluir referencia a evidencia científica.

#### Scenario: Base de evidencia
- **WHEN** se muestra una recomendación
- **THEN** incluye: "Basado en: [estudio] ([año]) - [resultado clave]"
- **AND** ejemplos: "Mindfulness reduce AE 23% (Grossman et al., 2004)", "Límites de disponibilidad mejoran CVT 31% (Park et al., 2020)"

### Requirement: Espacio para consultoría ACRUX
El sistema SHALL dejar espacio estratégico para servicios de consultoría.

#### Scenario: Upselling consultoría
- **WHEN** la organización tiene IRP >50 (Naranja/Roja)
- **THEN** el plan incluye nota: "Esta intervención requiere acompañamiento especializado. ACRUX ofrece diagnóstico sistémico con 20% descuento"
- **AND** CTA: "Agendar llamada gratuita con consultor ACRUX"

#### Scenario: Dejar valor pero crear necesidad
- **WHEN** se muestra una recomendación compleja (ej: rediseño de roles)
- **THEN** se describe a alto nivel pero se indica: "Implementación detallada disponible con consultoría"
- **AND** se entrega suficiente valor para que la organización vea ROI de invertir
