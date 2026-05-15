## ADDED Requirements

### Requirement: Motor de 36 ítems validados
El sistema SHALL implementar un motor de evaluación con 36 ítems distribuidos en 6 módulos que evalúen 6 dimensiones del bienestar laboral.

#### Scenario: Estructura de módulos
- **WHEN** el sistema carga el motor de evaluación
- **THEN** debe exponer 6 módulos: Mi Energía (6 ítems), Mi Conexión (5 ítems), Mi Propósito (6 ítems), Mi Entorno (7 ítems), Mi Equilibrio (6 ítems), Mi Fortaleza (6 ítems)

#### Scenario: Escala Likert de 7 puntos
- **WHEN** un empleado responde un ítem
- **THEN** la escala debe ser 0-6 con anclajes: 0=Nunca, 1=Casi nunca, 2=Raramente, 3=A veces, 4=Frecuentemente, 5=Muy frecuentemente, 6=Siempre

### Requirement: Cálculo de subescalas MBI-HSS
El sistema SHALL calcular las tres subescalas del MBI-HSS con puntos de corte validados para poblaciones latinoamericanas.

#### Scenario: Agotamiento Emocional
- **WHEN** se completan los ítems 1-6 del módulo Mi Energía
- **THEN** el sistema calcula AE = suma de ítems (rango 0-36)
- **AND** clasifica: Bajo ≤18, Moderado 19-26, Alto ≥27

#### Scenario: Despersonalización
- **WHEN** se completan los ítems 1-5 del módulo Mi Conexión
- **THEN** el sistema calcula DP = suma de ítems (rango 0-30)
- **AND** clasifica: Bajo ≤5, Moderado 6-9, Alto ≥10

#### Scenario: Realización Personal invertida
- **WHEN** se completan los ítems 1-6 del módulo Mi Propósito
- **THEN** el sistema calcula RP = suma de ítems (rango 0-36)
- **AND** clasifica: Alto (saludable) ≥28, Moderado 22-27, Bajo (riesgo) ≤21

### Requirement: Dimensiones propias PULSO-H
El sistema SHALL calcular tres dimensiones adicionales específicas del contexto latinoamericano.

#### Scenario: Factores Organizacionales de Riesgo
- **WHEN** se completan los 7 ítems del módulo Mi Entorno
- **THEN** el sistema calcula FOR = promedio de ítems normalizado 0-100
- **AND** identifica factores: carga laboral, liderazgo, violencia, recompensa, control, claridad de roles, descansos

#### Scenario: Conciliación Vida-Trabajo
- **WHEN** se completan los 6 ítems del módulo Mi Equilibrio
- **THEN** el sistema calcula CVT = promedio de ítems normalizado 0-100
- **AND** bajo CVT indica riesgo (escala invertida en IRP)

#### Scenario: Recursos de Resiliencia Individual
- **WHEN** se completan los 6 ítems del módulo Mi Fortaleza
- **THEN** el sistema calcula RRI = promedio de ítems normalizado 0-100
- **AND** alto RRI es protector (factor positivo)

### Requirement: Índice de Riesgo Psicosocial (IRP)
El sistema SHALL calcular un IRP global de 0-100 integrando las 6 dimensiones con pesos diferenciados.

#### Scenario: Cálculo ponderado
- **WHEN** todas las dimensiones están calculadas
- **THEN** IRP = (AE_norm × 0.25) + (DP_norm × 0.20) + ((max_RP-RP)_norm × 0.20) + (FOR_norm × 0.20) + ((max_CVT-CVT)_norm × 0.10) + (RRI_norm × 0.05)
- **AND** se clasifica: Verde 0-25, Amarilla 26-50, Naranja 51-75, Roja 76-100

### Requirement: Perfiles de Burnout
El sistema SHALL identificar perfiles de burnout basados en combinaciones de AE, DP y RP.

#### Scenario: Clasificación de perfiles
- **WHEN** las tres subescalas MBI están calculadas
- **THEN** el sistema asigna uno de 6 perfiles: Floreciente, Estable, Resiliente, Requete, Sobrecargadx, Funcional pero Frágil
- **AND** cada perfil tiene narrativa empática y prevalencia estimada

### Requirement: Procesamiento local
El sistema SHALL procesar todos los cálculos en el navegador del usuario sin enviar respuestas individuales a servidor.

#### Scenario: Cálculo client-side
- **WHEN** el empleado completa el diagnóstico
- **THEN** todas las operaciones matemáticas ocurren en JavaScript/Web Worker
- **AND** ninguna respuesta individual se transmite por red
