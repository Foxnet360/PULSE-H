## ADDED Requirements

### Requirement: CTA primario "Agendar consultoría"
El CTA "Agendar consultoría gratuita" DEBE ser el elemento visualmente dominante en la pantalla de resultados.

#### Scenario: Visualización de CTAs en resultados
- **WHEN** el usuario visualiza la pantalla de resultados
- **THEN** el botón "Agendar consultoría gratuita" es el más grande, con gradiente de color, sombra pronunciada, y animación hover
- **AND** su posición es la primera en el flujo visual, arriba y centrada
- **AND** el texto incluye valor explícito: "30 minutos gratuitos"

### Requirement: CTA secundario "Descargar PDF"
El CTA "Descargar Reporte PDF" DEBE tener estilo visual secundario (menos prominente).

#### Scenario: Jerarquía visual de CTA secundario
- **WHEN** el usuario visualiza la pantalla de resultados
- **THEN** el botón "Descargar Reporte PDF" está debajo del CTA primario
- **AND** usa estilo outline o fondo sutil (no gradiente)
- **AND** es visualmente más pequeño que el CTA primario

### Requirement: CTA terciario "Compartir"
El CTA para compartir en LinkedIn DEBE tener mínima prominencia visual.

#### Scenario: Jerarquía visual de CTA terciario
- **WHEN** el usuario visualiza la pantalla de resultados
- **THEN** la opción "Compartir en LinkedIn" está al final de la sección de CTAs
- **AND** usa solo icono + texto pequeño, sin fondo destacado
- **AND** no compite visualmente con los CTAs primario y secundario

### Requirement: Sección persuasiva de agendamiento
La pantalla de resultados DEBE incluir una sección dedicada a promover la consultoría gratuita.

#### Scenario: Sección de agendamiento persuasiva
- **WHEN** el usuario llega a la pantalla de resultados
- **THEN** debajo del score principal aparece una sección destacada con:
  - Icono de calendario/teléfono
  - Titular: "¿Quieres profundizar en tus resultados?"
  - Subtítulo: "Agenda una consultoría gratuita de 30 minutos con nuestros expertos"
  - Beneficios bullet points: "Análisis personalizado", "Hoja de ruta priorizada", "Sin compromiso"
  - CTA prominente: "Agendar mi consultoría gratuita"
