## ADDED Requirements

### Requirement: Procesamiento local completo
El sistema SHALL garantizar que las respuestas individuales nunca salgan del dispositivo.

#### Scenario: No transmisión de respuestas
- **WHEN** empleado responde ítem
- **THEN** datos se almacenan en localStorage/memory
- **AND** ninguna petición HTTP incluye respuestas individuales
- **AND** cálculos ocurren en JavaScript/Web Worker

#### Scenario: Generación de hash anónimo
- **WHEN** empleado inicia evaluación
- **THEN** sistema genera hash local (no vinculado a identidad real)
- **AND** solo este hash + resultados agregados se envían al servidor
- **AND** imposible reconstruir respuestas individuales desde servidor

### Requirement: Consentimiento informado GDPR
El sistema SHALL obtener consentimiento explícito antes de cualquier procesamiento.

#### Scenario: Pantalla de consentimiento
- **WHEN** empleado accede a evaluación
- **THEN** ve pantalla con:
  - Propósito del diagnóstico
  - Qué datos se recolectan (solo agregados)
  - Quién tiene acceso (solo org, no individuos)
  - Duración de retención
  - Derecho a eliminación
- **AND** debe marcar checkbox: "He leído y acepto"

#### Scenario: Revocación de consentimiento
- **WHEN** empleado quiere revocar
- **THEN** puede contactar a admin de org o a ACRUX
- **AND** ACRUX elimina datos agregados asociados a su hash
- **AND** empleado recibe confirmación por email

### Requirement: Cumplimiento normativo LATAM
El sistema SHALL cumplir con normativas de riesgos psicosociales en LATAM.

#### Scenario: NOM-035 (México)
- **WHEN** organización mexicana usa PULSO-H
- **THEN** informe ejecutivo incluye: identificación de factores de riesgo psicosocial
- **AND** cumple requerimiento de "evaluación del entorno organizacional"
- **AND** formato puede usarse como evidencia ante auditoría

#### Scenario: Decreto 2090 (Colombia)
- **WHEN** organización colombiana usa PULSO-H
- **THEN** cumple: medidas de prevención del estrés laboral
- **AND** evaluación periódica obligatoria (se soportan re-evaluaciones)

#### Scenario: ISO 45003:2021
- **WHEN** organización busca certificación
- **THEN** PULSO-H cumple: identificación de riesgos psicosociales
- **AND** evaluación de entorno de trabajo
- **AND** intervenciones basadas en riesgos identificados

#### Scenario: Ley 21.643 (Chile)
- **WHEN** organización chilena usa PULSO-H
- **THEN** contribuye a: prevención del burnout como enfermedad profesional
- **AND** genera evidencia de evaluación periódica

### Requirement: Anonimato diferencial
El sistema SHALL implementar k-anonimato en datos agregados.

#### Scenario: Regla de 5 personas
- **WHEN** admin solicita análisis por área
- **THEN** sistema solo muestra datos si área tiene ≥5 respuestas
- **AND** si <5 → mensaje: "Datos insuficientes para proteger anonimato"
- **AND** combinaciones demográficas también aplican regla (ej: "Mujeres <30 en Ventas")

#### Scenario: Agregación mínima
- **WHEN** se exportan datos
- **THEN** nunca se incluye: promedio de <5 personas, moda si identificable, correlaciones individuales

### Requirement: Descargo de responsabilidad
El sistema SHALL incluir disclaimers legales en múltiples puntos.

#### Scenario: Disclaimer en resultados
- **WHEN** empleado ve resultados
- **THEN** texto visible: "Este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico."
- **AND** "Si tus resultados te preocupan, te recomendamos hablar con un profesional de salud mental."
- **AND** links a: línea de crisis nacional, directorio de psicólogos

#### Scenario: Disclaimer en informe PDF
- **WHEN** se genera PDF
- **THEN** página dedicada con: limitaciones metodológicas, uso apropiado de resultados, recomendación de validación profesional

### Requirement: Derecho al olvido
El sistema SHALL permitir eliminación de datos personales.

#### Scenario: Solicitud de eliminación
- **WHEN** empleado solicita eliminar sus datos
- **THEN** ACRUX elimina: hash asociado, respuestas agregadas, lead information
- **AND** dentro de 30 días (cumplimiento GDPR/Ley 1581)
- **AND** envía confirmación de eliminación

#### Scenario: Eliminación por organización
- **WHEN** org termina contrato o solicita eliminación
- **THEN** ACRUX elimina todos los datos asociados
- **AND** admin recibe certificado de eliminación
