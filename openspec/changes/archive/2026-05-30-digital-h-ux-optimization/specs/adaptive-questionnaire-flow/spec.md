## ADDED Requirements

### Requirement: Flujo sin interrupciones
El cuestionario DEBE permitir al usuario completar las 48 preguntas sin interrupciones de formularios de captura de datos.

#### Scenario: Usuario avanza del cuestionario al LeadForm
- **WHEN** el usuario responde la pregunta 48 y hace clic en "Siguiente"
- **THEN** el sistema redirige automáticamente a la pantalla LeadForm
- **AND** el cuestionario NO muestra ningún formulario de captura en preguntas anteriores

### Requirement: Preview de resultados como incentivo
El LeadForm DEBE mostrar un resumen visual del progreso del usuario como incentivo para completar el registro.

#### Scenario: Usuario llega al LeadForm tras completar cuestionario
- **WHEN** el usuario completa las 48 preguntas
- **THEN** el LeadForm muestra un preview con: número de preguntas completadas, dimensiones evaluadas, y mensaje de valor "Tu reporte personalizado está listo"

### Requirement: Botón de guardar sesión explícito
El cuestionario DEBE incluir un botón visible que permita al usuario guardar su progreso y salir.

#### Scenario: Usuario guarda progreso explícitamente
- **WHEN** el usuario hace clic en "Guardar y continuar después"
- **THEN** el sistema guarda la sesión inmediatamente en sessionStorage
- **AND** muestra un modal confirmando "Progreso guardado. Puedes cerrar esta pestaña y continuar después"
- **AND** la siguiente visita muestra el prompt de reanudar sesión

### Requirement: Navegación de salida consistente
El enlace "Volver a Acrux" DEBE comportarse de manera consistente en todas las pantallas.

#### Scenario: Usuario intenta salir durante el cuestionario
- **WHEN** el usuario hace clic en "Volver a Acrux" durante el cuestionario
- **THEN** el sistema muestra un modal preguntando "¿Guardar progreso antes de salir?"
- **AND** ofrece opciones: "Guardar y salir", "Salir sin guardar", "Continuar cuestionario"

### Requirement: Footer condicional
El footer de copyright DEBE ocultarse durante el cuestionario para maximizar espacio vertical.

#### Scenario: Usuario está en pantalla de cuestionario
- **WHEN** la pantalla activa es "questionnaire"
- **THEN** el footer de copyright NO es visible
- **AND** el footer reaparece cuando el usuario está en landing, leadform o results
