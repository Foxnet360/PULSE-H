## ADDED Requirements

### Requirement: Formulario anónimo progresivo
El sistema SHALL presentar un formulario web dividido en 6 módulos, mostrando un módulo a la vez sin scroll infinito.

#### Scenario: Navegación por módulos
- **WHEN** el empleado inicia el diagnóstico
- **THEN** ve el módulo 1 (Mi Energía) con 6 ítems
- **AND** puede avanzar al siguiente módulo con botón "Continuar"
- **AND** puede retroceder al módulo anterior con botón "Anterior"

#### Scenario: Barra de progreso
- **WHEN** el empleado navega entre módulos
- **THEN** una barra circular muestra el porcentaje completado (17%, 33%, 50%, 67%, 83%, 100%)
- **AND** un mensaje motivacional contextual aparece en cada etapa

### Requirement: Escala Likert visual
El sistema SHALL utilizar una escala visual interactiva en lugar de botones de radio tradicionales.

#### Scenario: Slider táctil con emojis
- **WHEN** el empleado ve un ítem
- **THEN** aparece una barra deslizante de 0 a 6
- **AND** el emoji cambia según la posición: 😌 (0-1), 😐 (2-3), 😟 (4), 😫 (5-6)
- **AND** el valor seleccionado se resalta visualmente

#### Scenario: Validación en tiempo real
- **WHEN** el empleado intenta avanzar sin responder un ítem
- **THEN** el sistema muestra un indicador visual sutil (no bloqueante)
- **AND** permite avanzar de todos modos (ítems opcionales)

### Requirement: Guardado automático local
El sistema SHALL guardar el progreso del empleado en localStorage cada 30 segundos.

#### Scenario: Guardado periódico
- **WHEN** el empleado responde un ítem
- **THEN** el sistema almacena respuestas en localStorage con clave `pulso-h-progress-{hash}`
- **AND** incluye timestamp de última actividad

#### Scenario: Recuperación de sesión
- **WHEN** el empleado regresa a la página después de cerrar el navegador
- **THEN** el sistema detecta progreso guardado
- **AND** ofrece opción "Continuar donde lo dejaste" o "Empezar de nuevo"

### Requirement: Mensajes de ánimo contextuales
El sistema SHALL mostrar mensajes motivacionales en puntos clave del diagnóstico.

#### Scenario: Mitad del camino
- **WHEN** el empleado completa el módulo 3 (50%)
- **THEN** aparece un mensaje de celebración: "¡Ya vas por la mitad! Estás dando un paso valiente hacia tu bienestar"
- **AND** gana badge "Mitad del Camino"

#### Scenario: Último módulo
- **WHEN** el empleado llega al módulo 6
- **THEN** el mensaje dice: "Casi listo. Respira profundo."
- **AND** la barra de progreso muestra 83%

### Requirement: Información demográfica opcional
El sistema SHALL permitir capturar datos demográficos opcionales para análisis organizacional.

#### Scenario: Campos demográficos
- **WHEN** el empleado inicia el diagnóstico
- **THEN** puede opcionalmente ingresar: Área/Departamento, Cargo, Antigüedad, Género, Edad (rango)
- **AND** estos datos se usan solo para agregación (nunca individual)
- **AND** se almacenan localmente hasta envío final

### Requirement: Consentimiento informado
El sistema SHALL obtener consentimiento explícito antes de iniciar el diagnóstico.

#### Scenario: Pantalla de bienvenida
- **WHEN** el empleado accede al link de evaluación
- **THEN** ve pantalla de bienvenida con: tiempo estimado (8-10 min), explicación de privacidad, checkbox de consentimiento
- **AND** no puede iniciar sin marcar checkbox
- **AND** se muestra texto legal: "Este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico"
