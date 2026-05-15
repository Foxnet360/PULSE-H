## ADDED Requirements

### Requirement: Repositorio de testimonios
El sistema DEBE contar con un repositorio estático de testimonios segmentados por nivel de madurez.

#### Scenario: Estructura de testimonios
- **WHEN** el sistema necesita mostrar testimonios
- **THEN** accede a un array de testimonios con estructura: quote, author, company, industry, maturityLevel, metric
- **AND** cada nivel de madurez (Inicial, Emergente, Desarrollo, Optimización) tiene al menos 2 testimonios
- **AND** los testimonios incluyen métricas de resultados concretas (ej: "Redujimos costos operativos en 30%")

### Requirement: Selección de testimonios relevantes
El sistema DEBE mostrar testimonios que correspondan al nivel de madurez alcanzado por el usuario.

#### Scenario: Testimonios según nivel de madurez
- **WHEN** el usuario obtiene un nivel de madurez "Emergente"
- **THEN** el sistema muestra 2 testimonios de empresas que también tenían nivel "Emergente"
- **AND** los testimonios muestran progresión: "De Emergente a Desarrollo en 6 meses"
- **AND** si no hay testimonios exactos del nivel, muestra del nivel más cercano inferior

### Requirement: Visualización de testimonios en resultados
Los testimonios DEBEN aparecer en la pantalla de resultados debajo del score principal.

#### Scenario: Visualización de prueba social
- **WHEN** el usuario visualiza la pantalla de resultados
- **THEN** aparece una sección "Empresas que ya transformaron su negocio"
- **AND** muestra 2 testimonios con foto de perfil genérica, nombre, cargo, empresa
- **AND** cada testimonio incluye una métrica de impacto relevante

### Requirement: Casos de éxito por dimensión
El sistema DEBE mostrar casos de éxito específicos relacionados con las dimensiones débiles del usuario.

#### Scenario: Casos de éxito contextualizados
- **WHEN** las dimensiones más débiles del usuario son "Estrategia Digital" y "Tecnología"
- **THEN** los testimonios destacan mejoras específicas en esas áreas
- **AND** incluyen acciones concretas tomadas: "Implementamos roadmap digital de 6 meses"
- **AND** métricas específicas: "Aumentamos eficiencia operativa en 40%"

### Requirement: Testimonios creíbles
Los testimonios DEBEN parecer auténticos y verosímiles.

#### Scenario: Verosimilitud de testimonios
- **WHEN** el usuario lee los testimonios
- **THEN** los nombres y empresas son realistas (no obviamente ficticios)
- **AND** las métricas son plausibles para el tamaño de empresa objetivo (PYME)
- **AND** el tono es profesional pero humano, sin exageraciones evidentes
