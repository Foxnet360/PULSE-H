## ADDED Requirements

### Requirement: Generación de links únicos
El sistema SHALL generar links únicos para cada evaluación organizacional.

#### Scenario: Creación de evaluación
- **WHEN** RRHH/Admin crea nueva evaluación
- **THEN** sistema genera hash único de 8 caracteres (ej: abc123xy)
- **AND** URL: `https://acrux.life/pulso-h/e/{hash}`
- **AND** almacena: nombre org, sector, tamaño estimado, fecha creación

#### Scenario: Customización de link
- **WHEN** admin configura evaluación
- **THEN** puede opcionalmente: agregar logo org, mensaje personalizado, fecha límite
- **AND** estos se muestran en la landing del empleado

### Requirement: Seguimiento de participación
El sistema SHALL rastrear participación en tiempo real.

#### Scenario: Dashboard de progreso
- **WHEN** admin accede a gestión de evaluación
- **THEN** ve: número de respuestas, porcentaje de participación, empleados pendientes
- **AND** gráfico de línea con respuestas por día

#### Scenario: Recordatorios automáticos
- **WHEN** quedan 3 días para fecha límite
- **THEN** sistema puede enviar recordatorio a admin: "Faltan X empleados por responder"
- **AND** admin puede re-enviar link a empleados específicos

### Requirement: Umbral freemium
El sistema SHALL limitar análisis organizacional a 5 empleados en plan Free.

#### Scenario: Límite de 5 empleados
- **WHEN** plan es Free
- **THEN** dashboard muestra análisis de máximo 5 primeras respuestas
- **AND** mensaje: "Has alcanzado el límite del plan gratuito. Actualiza para ver análisis completo."
- **AND** CTA a planes de pago

#### Scenario: Upgrade automático
- **WHEN** llega la 6ta respuesta en plan Free
- **THEN** sistema notifica admin: "¡Felicidades! Tu equipo está comprometido. Actualiza para desbloquear análisis completo."
- **AND** ofrece descuento primer mes: 50% off Growth

### Requirement: Múltiples evaluaciones
El sistema SHALL permitir múltiples evaluaciones por organización.

#### Scenario: Evaluaciones periódicas
- **WHEN** admin quiere evaluación de seguimiento
- **THEN** puede crear nueva evaluación o "repetir" evaluación anterior
- **AND** sistema mantiene historial de evaluaciones pasadas
- **AND** permite comparación temporal

#### Scenario: Diferentes equipos
- **WHEN** organización tiene múltiples áreas
- **THEN** admin puede crear evaluaciones separadas por área
- **AND** cada una tiene su propio link y dashboard

### Requirement: Seguridad de links
El sistema SHALL proteger links contra acceso no autorizado.

#### Scenario: Validación de link
- **WHEN** empleado accede a link
- **THEN** sistema valida que hash existe y está activo
- **AND** si expiró → mensaje: "Esta evaluación ha cerrado"
- **AND** si no existe → 404 con opción de crear evaluación

#### Scenario: Rate limiting
- **WHEN** mismo IP intenta múltiples respuestas
- **THEN** sistema detecta patrón sospechoso
- **AND** requiere CAPTCHA o bloquea temporalmente
- **AND** marca respuestas como "posible duplicado"
