## ADDED Requirements

### Requirement: Identificación de dimensiones débiles
El sistema DEBE identificar las 2-3 dimensiones con menor puntuación promedio basándose en las respuestas del usuario.

#### Scenario: Cálculo de dimensiones débiles
- **WHEN** el usuario completa todas las preguntas
- **THEN** el sistema calcula el promedio de respuestas por cada una de las 6 dimensiones
- **AND** identifica las 2 dimensiones con promedio más bajo
- **AND** en caso de empate, prioriza dimensiones con mayor número de preguntas respondidas

### Requirement: Generación de recomendaciones personalizadas
El sistema DEBE generar recomendaciones específicas basadas en las dimensiones débiles identificadas.

#### Scenario: Usuario con dimensiones débiles específicas
- **WHEN** el sistema identifica que las dimensiones más débiles son "Estrategia Digital" y "Tecnología"
- **THEN** muestra recomendaciones específicas para esas dimensiones
- **AND** incluye al menos 1 recomendación "quick win" (bajo esfuerzo, alto impacto)
- **AND** completa con recomendaciones genéricas solo si hay menos de 4 recomendaciones específicas disponibles

### Requirement: Recomendaciones por dimensión
El sistema DEBE tener un repositorio de recomendaciones organizadas por dimensión.

#### Scenario: Repositorio de recomendaciones
- **WHEN** el sistema necesita generar recomendaciones
- **THEN** accede a un mapa estático de recomendaciones por dimensión
- **AND** cada dimensión tiene al menos 3 recomendaciones diferentes
- **AND** cada recomendación incluye: título, descripción corta, detalle de implementación, icono, y categoría (quick-win vs estratégico)

### Requirement: Priorización automática
El sistema DEBE priorizar recomendaciones de dimensiones débiles sobre genéricas.

#### Scenario: Priorización de recomendaciones
- **WHEN** el sistema genera la lista de 4 recomendaciones para mostrar
- **THEN** las 2 primeras son de las dimensiones más débiles
- **AND** la tercera es la siguiente dimensión más débil o un quick-win
- **AND** la cuarta es una recomendación de alta prioridad general
