## ADDED Requirements

### Requirement: Detección de canal de adquisición
El sistema DEBE detectar el canal de adquisición del usuario mediante parámetros UTM en la URL.

#### Scenario: Detección de fuente UTM
- **WHEN** el usuario accede a la landing page con parámetros UTM (ej: `?utm_source=instagram`)
- **THEN** el sistema identifica la fuente de forma insensible a mayúsculas/minúsculas
- **AND** las fuentes soportadas incluyen: instagram, facebook, google, email, linkedin, orgánico (default)

### Requirement: Mensajes personalizados por canal
El sistema DEBE mostrar mensajes y urgency cues específicos según el canal de adquisición.

#### Scenario: Mensaje personalizado para Instagram
- **WHEN** el usuario proviene de Instagram (`utm_source=instagram`)
- **THEN** el headline secundario dice: "¿Viste nuestro contenido? Obtén tu diagnóstico personalizado"
- **AND** muestra urgency cue contextual: "Únete a las 50+ empresas que ya transformaron su negocio"

#### Scenario: Mensaje personalizado para Email
- **WHEN** el usuario proviene de Email (`utm_source=email`)
- **THEN** el headline secundario dice: "Bienvenido. Tu diagnóstico de madurez digital está listo"
- **AND** muestra badge de confianza: "Recomendado por el equipo de Acrux Consultores"

#### Scenario: Mensaje por defecto (orgánico)
- **WHEN** el usuario NO tiene parámetros UTM o la fuente no está soportada
- **THEN** se muestra el mensaje por defecto: "Descubre en 15 minutos tu nivel de madurez digital"
- **AND** NO se muestran urgency cues artificiales

### Requirement: Eliminación de urgencia artificial hardcodeada
El sistema DEBE eliminar mensajes de urgencia con números hardcodeados no dinámicos.

#### Scenario: Eliminación de urgency cue falsa
- **WHEN** el usuario proviene de cualquier canal
- **THEN** NO se muestra el mensaje "Solo quedan 12 diagnósticos disponibles"
- **AND** si se requiere urgency, usa métricas reales o sociales (ej: "50+ empresas evaluadas esta semana")

### Requirement: Persistencia de contexto durante la sesión
El canal de adquisición detectado DEBE persistir durante toda la sesión del usuario.

#### Scenario: Persistencia de UTM durante navegación
- **WHEN** el usuario avanza del landing al cuestionario y resultados
- **THEN** el sistema mantiene el contexto del canal de adquisición
- **AND** los mensajes personalizados se aplican en todas las pantallas relevantes
- **AND** NO se requiere recargar la página ni pasar parámetros entre componentes
