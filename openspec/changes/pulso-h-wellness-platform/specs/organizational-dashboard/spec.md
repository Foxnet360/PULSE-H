## ADDED Requirements

### Requirement: Umbral de activación
El sistema SHALL activar el dashboard organizacional solo cuando hay ≥5 respuestas válidas.

#### Scenario: Activación automática
- **WHEN** una organización recibe la 5ta respuesta completa
- **THEN** el dashboard se activa automáticamente
- **AND** envía notificación al administrador

#### Scenario: Estado inactivo
- **WHEN** hay <5 respuestas
- **THEN** el dashboard muestra mensaje: "Faltan X respuestas para activar el análisis"
- **AND** muestra progreso de participación

### Requirement: IRP Promedio y distribución
El sistema SHALL calcular y visualizar el IRP promedio de la organización.

#### Scenario: Métricas globales
- **WHEN** el administrador accede al dashboard
- **THEN** ve: IRP promedio, número de participantes, distribución de perfiles
- **AND** comparación con benchmark sectorial anónimo

#### Scenario: Tendencia temporal
- **WHEN** hay múltiples evaluaciones en el tiempo
- **THEN** se muestra gráfico de línea con evolución del IRP
- **AND** se calcula variación porcentual vs evaluación anterior

### Requirement: Análisis por área/demografía
El sistema SHALL permitir filtrar y comparar resultados por dimensiones organizacionales.

#### Scenario: Filtros demográficos
- **WHEN** el administrador selecciona filtros
- **THEN** puede ver IRP por: Área, Cargo, Antigüedad, Género, Edad
- **AND** cada celda muestra promedio solo si hay ≥5 personas (regla de privacidad)

#### Scenario: Ranking de riesgo
- **WHEN** se aplica filtro por área
- **THEN** se muestra ranking de áreas por IRP (de mayor a menor riesgo)
- **AND** áreas con <5 empleados aparecen como "Datos insuficientes"

### Requirement: Clustering K-Means
El sistema SHALL realizar clustering automático para identificar perfiles homogéneos.

#### Scenario: Segmentación automática
- **WHEN** hay ≥20 respuestas
- **THEN** el sistema aplica K-Means (k=2-5) en las 6 dimensiones
- **AND** determina k óptimo con método del codo
- **AND** muestra distribución por cluster

#### Scenario: Perfiles de cluster
- **WHEN** el clustering está completo
- **THEN** cada cluster tiene: nombre tentativo, centroide por dimensión, porcentaje de población
- **AND** se sugieren intervenciones por cluster

### Requirement: Mapa de calor
El sistema SHALL mostrar un heatmap cruzando factores organizacionales vs resultados.

#### Scenario: Matriz de riesgo
- **WHEN** el administrador abre el mapa de calor
- **THEN** ve matriz: áreas × dimensiones (AE, DP, RP, FOR, CVT, RRI)
- **AND** el color indica intensidad (verde < amarillo < naranja < rojo)
- **AND** puede hacer hover para ver valor exacto

### Requirement: Benchmark sectorial
El sistema SHALL comparar resultados con datos anónimos del mismo sector.

#### Scenario: Comparativa contextual
- **WHEN** la organización selecciona su sector (Tech, Salud, Educación, etc.)
- **THEN** el dashboard muestra: IRP propio vs IRP promedio sector
- **AND** percentil: "Tu organización está en el percentil X de tu sector"
- **AND** datos son agregados anónimos de otras empresas

### Requirement: Exportación de datos agregados
El sistema SHALL permitir exportar datos agregados en formato CSV.

#### Scenario: Export CSV
- **WHEN** el administrador solicita exportar
- **THEN** se genera CSV con: áreas, IRP por dimensión, número de empleados por celda
- **AND** nunca incluye respuestas individuales
- **AND** se procesa client-side o en servidor según tamaño
