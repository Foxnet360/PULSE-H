# PULSO-H — Diagnóstico de Bienestar Laboral y Burnout
## Herramienta Lead Magnet para ACRUX Consultores
### Documento de Especificación Estratégica, Metodológica y Técnica

---

## ÍNDICE

1. [Visión Estratégica](#1-visión-estratégica)
2. [Contexto y Oportunidad de Mercado](#2-contexto-y-oportunidad-de-mercado)
3. [Filosofía de PULSO-H](#3-filosofía-de-pulso-h)
4. [Arquitectura de la Herramienta](#4-arquitectura-de-la-herramienta)
5. [Fundamentos Metodológicos](#5-fundamentos-metodológicos)
6. [Flujo de Experiencia del Usuario](#6-flujo-de-experiencia-del-usuario)
7. [Sistema de Gamificación](#7-sistema-de-gamificación)
8. [Valor Percibido y Entregables](#8-valor-percibido-y-entregables)
9. [Stack Técnico y Herramientas de Soporte](#9-stack-técnico-y-herramientas-de-soporte)
10. [Análisis Estratégico de Implementación](#10-análisis-estratégico-de-implementación)
11. [Consideraciones Éticas, Legales y de Privacidad](#11-consideraciones-éticas-legales-y-de-privacidad)
12. [Roadmap de Desarrollo](#12-roadmap-de-desarrollo)
13. [KPIs y Métricas de Éxito](#13-kpis-y-métricas-de-éxito)

---

## 1. VISIÓN ESTRATÉGICA

### 1.1 Declaración de Propósito

**PULSO-H** es el diagnóstico de bienestar laboral y burnout de ACRUX Consultores. Diseñado por psicólogos organizacionales y trabajadores sociales con más de 20 años de experiencia combinada, esta herramienta transforma la evaluación del riesgo psicosocial en una experiencia humana, accesible y accionable.

A diferencia de los cuestionarios tradicionales que miden para catalogar, **PULSO-H mide para sanar**. Cada pregunta, cada resultado y cada recomendación están pensados no como un veredicto, sino como el primer paso de un camino hacia el bienestar organizacional sostenible.

> *"El burnout no es una falla del individuo. Es el síntoma de un sistema que olvidó que las personas son su razón de ser."* — Mercedes Restrepo, Psicóloga Organizacional ACRUX

### 1.2 Posicionamiento como Lead Magnet

PULSO-H cumple cuatro funciones estratégicas simultáneas:

| Función | Descripción | Métrica de Éxito |
|---------|-------------|-----------------|
| **Captura de Leads** | Captura emails de tomadores de decisión en RRHH, Gerencia y Dirección | 500+ diagnósticos completados en los primeros 90 días |
| **Demostración de Expertise** | Exhibe la profundidad metodológica de ACRUX como diferenciador | 40%+ de leads calificados que solicitan conversación de seguimiento |
| **Puerta de Entrada a Servicios** | Conecta directamente con los servicios de consultoria de ACRUX (Fase 1: Diagnóstico Sistémico) | 15%+ de conversion a servicio de consultoria pagado |
| **Activador de Conversación** | Genera datos anonimizados que alimentan webinars, artículos y contenido de valor | 3+ piezas de contenido derivado por mes |

### 1.3 Diferenciadores frente al mercado

- **Basado en evidencia, adaptado a LATAM**: Utiliza el MBI-HSS (gold standard mundial) con puntos de corte validados para poblaciones latinoamericanas, no directrices genéricas anglosajonas.
- **Doble perspectiva**: Evalúa tanto al empleado individual (autopercepción) como al sistema organizacional (análisis agregado por áreas, cargos, antigüedad).
- **Intervención inmediata**: No solo diagnostica; entrega un **Plan de Acción Personalizado (PAP)** con ejercicios, rutinas y recomendaciones específicas por perfil de riesgo.
- **Procesamiento local**: Los datos se procesan en el navegador del usuario. ACRUX nunca ve respuestas individuales sin consentimiento explícito — un compromiso de privacidad real, no solo legal.
- **Gamificación con propósito**: Sistema de niveles, insignias y progreso que reduce la ansiedad del diagnóstico y aumenta la tasa de finalización.

---

## 2. CONTEXTO Y OPORTUNIDAD DE MERCADO

### 2.1 El Burnout en Latinoamérica: Una Crisis Silenciosa

Los datos regionales revelan una emergencia de salud pública laboral:

| País | Prevalencia de Burnout | Fuente |
|------|------------------------|--------|
| **Argentina** | 94% | Burnout 2023, Bumeran |
| **Chile** | 89% | Laborum 2024 |
| **Perú** | 82% | Bumeran 2024 |
| **México** | 75% | UNAM Global / INEGI |
| **Colombia** | 60% | Change América |
| **Regional (LATAM)** | 46% experimentaron burnout al menos una vez en 2024 | Buk 2025 (5.700 colaboradores) |

**Hallazgos críticos del estudio Burnout 2025 de Buk:**

- El **14%** de los trabajadores lo vive con **frecuencia o de forma constante**.
- **Generación Z**: 17% de burnout frecuente (vs. 8% Baby Boomers).
- **Mujeres**: 15% frecuente (vs. 12% hombres). El 83.3% de los casos totales son femeninos.
- **Gerencia media**: 17% frecuente — el cargo más afectado.
- **Personas neurodivergentes**: 24% frecuente.
- **Personas LGBTQ+**: 19% frecuente.
- Cuando el burnout es bajo, el **86%** de los empleados recomendaría su lugar de trabajo.
- El **41%** de millennials y el **42%** de Gen Z afirman que la sobrecarga laboral afecta directamente su productividad.

### 2.2 El Marco Regulatorio como Impulsor

La creciente regulación en riesgos psicosociales convierte el diagnóstico de burnout de una "buena práctica" a una **obligación legal**:

| País | Normativa | Requerimiento |
|------|-----------|---------------|
| **México** | NOM-035-STPS-2018 | Identificación y análisis de factores de riesgo psicosocial; evaluación del entorno organizacional |
| **Colombia** | Decreto 2090 de 2021 | Medidas de prevención del estrés laboral; evaluación periódica obligatoria |
| **Perú** | Ley 29783 / DS 005-2012-TR | Gestión de riesgos psicosociales; evaluaciones anuales |
| **Chile** | Ley 21.643 (2023) | Incluye burnout como enfermedad profesional; obligación de prevención |
| **Internacional** | ISO 45003:2021 | Marco global para gestión de salud mental en el trabajo |

**Oportunidad para ACRUX**: Las empresas necesitan cumplir, pero la mayoría no tiene ni las herramientas ni el expertise. PULSO-H se posiciona como el punto de entrada de menor fricción: gratuito, rápido (8-10 minutos), y con un informe que puede usarse como evidencia de "evaluación inicial" ante auditorías.

### 2.3 Tamaño del Mercado Direccionable

- **Mercado de diagnósticos de burnout en LATAM**: Estimado en USD 280 millones anuales (2025), creciendo al 18% CAGR.
- **PYMEs sin diagnóstico formal**: El 73% de las empresas con 20-200 empleados en Colombia, México y Chile no han realizado ninguna evaluación de riesgos psicosociales.
- **Costo de no actuar**: Según la OMS, cada dólar invertido en salud mental laboral genera un retorno de USD 4 en productividad recuperada.

---

## 3. FILOSOFÍA DE PULSO-H

### 3.1 Los 5 Principios de Diseño

PULSO-H no es un cuestionario. Es una **conversación estructurada** entre la organización y su gente. Se rige por cinco principios:

**1. HUMANIDAD SOBRE METRICIDAD**
Cada número es una persona. El diseño visual evita semáforos agresivos (rojo/amarillo/verde) que estigmatizan. Usa una paleta de "estados de energía":
- **Floreciente** (alta realización, bajo agotamiento)
- **Resiliente** (agotamiento moderado, realización alta)
- **Requete** (alto agotamiento, realización baja)
- **Sobrecargadx** (agotamiento severo, despersonalización alta)

**2. DIAGNÓSTICO SIN DIAGNOSIS**
PULSO-H no diagnostica enfermedades. Identifica **patrones de riesgo** y **fortalezas de protección**. La narrativa está construida en lenguaje de "tendencias" y "áreas de atención", no de "patologías".

**3. ACCIÓN INMEDIATA**
El peor resultado de un diagnóstico es la parálisis. Cada perfil de resultado incluye 3 acciones concretas que el usuario puede implementar hoy mismo — desde una técnica de respiración de 2 minutos hasta una conversación estructurada con su líder.

**4. PRIVACIDAD COMO VALOR, NO COMO CUMPLIMIENTO**
Los datos se procesan localmente en el navegador mediante WebAssembly. ACRUX no tiene acceso a respuestas individuales a menos que el usuario explícitamente opte por compartir un informe agregado. Esto se comunica de forma transparente en cada paso.

**5. CO-CREACIÓN CONTINUA**
PULSO-H se mejora con cada uso. El sistema incorpora retroalimentación de usuarios y validación psicométrica continua. Es una herramienta viva, no un producto estático.

### 3.2 El Nombre: PULSO-H

- **PULSO**: Lo que mide, lo que late, lo que está vivo. Un diagnóstico que respira con la organización.
- **H**: Humanidad. También representa la **H** de Bienestar, la **H** de ACRUX (como DIGITAL-H), y la **H** de "Hagámoslo juntos".

---

## 4. ARQUITECTURA DE LA HERRAMIENTA

### 4.1 Estructura del Diagnóstico

PULSO-H consta de **6 módulos** que evalúan 5 dimensiones del bienestar laboral. Cada módulo contiene entre 5 y 8 ítems, para un total de **36 preguntas** que toman **8-10 minutos** en completarse.

| Módulo | Dimensión | Ítems | Inspiración Metodológica | Tiempo Est. |
|--------|-----------|-------|-------------------------|-------------|
| **1. Mi Energía** | Agotamiento Emocional (AE) | 6 | MBI-HSS Subescala AE (í­tems seleccionados y adaptados) | 1.5 min |
| **2. Mi Conexión** | Despersonalización / Cinismo (DP) | 5 | MBI-HSS Subescala DP + í­tems de conexión interpersonal | 1.5 min |
| **3. Mi Propósito** | Realización Personal (RP) | 6 | MBI-HSS Subescala RP + sentido de propósito laboral | 1.5 min |
| **4. Mi Entorno** | Factores Organizacionales de Riesgo | 7 | NOM-035 (México), Decreto 2090 (Colombia), ISO 45003 | 2 min |
| **5. Mi Equilibrio** | Conciliación Vida-Trabajo | 6 | Escalas de balance trabajo-vida personal + carga laboral percibida | 1.5 min |
| **6. Mi Fortaleza** | Recursos de Resiliencia Individual | 6 | Escala de Resiliencia Laboral + coping strategies validados | 1.5 min |
| **TOTAL** | | **36 ítems** | | **8-10 min** |

### 4.2 Escala de Respuesta

Todos los ítems utilizan una **escala Likert visual de 7 puntos** con anclajes semánticos diseñados para reducir sesgo de tendencia central:

```
0 — Nunca / En absoluto
1 — Casi nunca / Muy levemente  
2 — Raramente / Levemente
3 — A veces / Moderadamente
4 — Frecuentemente / Bastante
5 — Muy frecuentemente / Mucho
6 — Siempre / Extremadamente
```

**Diseño UX de la escala**: En lugar de botones de radio tradicionales, PULSO-H utiliza una **barra deslizante táctil** con emojis de estado emocional que cambian según la posición:
- 0-1: 😌 (Sereno)
- 2-3: 😐 (Neutral)
- 4: 😟 (Preocupado)
- 5-6: 😫 (Agotado)

### 4.3 Flujo de Navegación por Módulos

```
┌─────────────────────────────────────────────────────────────┐
│  LANDING PAGE                                               │
│  "Descubre el pulso de tu bienestar laboral"                │
│  [Comenzar diagnóstico gratuito →]                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  PANTALLA 1: Bienvenida + Consentimiento                    │
│  - Explicación de 8-10 minutos                              │
│  - Confirmación de privacidad (procesamiento local)         │
│  - Captura de email (opcional, para recibir informe)       │
│  - Campo: Nombre, Empresa, Cargo, Área (opcional)          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 1: Mi Energía (6 ítems)                             │
│  Barra de progreso: 17%                                     │
│  [Anterior] [Siguiente]                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 2: Mi Conexión (5 ítems)                            │
│  Barra de progreso: 33%                                     │
│  [Anterior] [Siguiente]                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 3: Mi Propósito (6 ítems)                           │
│  Barra de progreso: 50%                                     │
│  [Anterior] [Siguiente]                                     │
│  ═══════════════════════════════════════                    │
│  MENSAJE DE ÁNIMO: "¡Ya vas por la mitad!" + Badge         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 4: Mi Entorno (7 ítems)                             │
│  Barra de progreso: 67%                                     │
│  [Anterior] [Siguiente]                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 5: Mi Equilibrio (6 ítems)                          │
│  Barra de progreso: 83%                                     │
│  [Anterior] [Siguiente]                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  MÓDULO 6: Mi Fortaleza (6 ítems)                           │
│  Barra de progreso: 100%                                    │
│  [Anterior] [Finalizar]                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  PANTALLA DE PROCESAMIENTO                                  │
│  "Analizando tu pulso..." + Animación de latido             │
│  (2-3 segundos de procesamiento local)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  PÁGINA DE RESULTADOS                                       │
│  - Perfil de bienestar (Floreciente / Resiliente /          │
│    Requete / Sobrecargadx)                                  │
│  - Radar de 5 dimensiones                                   │
│  - Índice de Riesgo Psicosocial (IRP) 0-100                │
│  - Comparativa por sector (benchmark anónimo)                │
│  - Plan de Acción Personalizado (3 acciones)              │
│  - CTA: "Recibir informe completo por email"               │
│  - CTA: "Agendar conversación con ACRUX"                   │
│  - CTA: "Descargar informe PDF"                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. FUNDAMENTOS METODOLÓGICOS

### 5.1 Base Psicométrica: MBI-HSS como Fundamento

El **Maslach Burnout Inventory — Human Services Survey (MBI-HSS)** es el instrumento de evaluación de burnout más validado, utilizado y citado a nivel mundial desde su creación en 1981 por Christina Maslach y Susan E. Jackson. PULSO-H integra sus tres dimensiones fundamentales como núcleo del diagnóstico:

#### Subescala 1: Agotamiento Emocional (AE)
- **Definición**: Sensación de estar emocionalmente exhausto y sobrepasado por las demandas del trabajo.
- **Ítems representativos en PULSO-H**:
  - "Me siento emocionalmente agotado/a por mi trabajo"
  - "Siento que trabajar todo el día me exige un gran esfuerzo"
  - "Me siento frustrado/a por mi trabajo"
  - "Siento que estoy al límite de mis posibilidades"
- **Rango**: 0-54 (en PULSO-H: 0-36 por selección de 6 ítems clave)
- **Interpretación**: Mayor puntuación = mayor agotamiento

#### Subescala 2: Despersonalización (DP)
- **Definición**: Desarrollo de actitudes cínicas, distantes e impersonales hacia las personas a las que se debe atención o servicio.
- **Ítems representativos en PULSO-H**:
  - "Siento que trato a algunas personas en el trabajo como si fueran objetos impersonales"
  - "He perdido interés en conectar genuinamente con mis colegas/clientes"
  - "Me he vuelto más cínico/a sobre si mi trabajo realmente importa"
- **Rango**: 0-30 (en PULSO-H: 0-30 por 5 ítems)
- **Interpretación**: Mayor puntuación = mayor despersonalización

#### Subescala 3: Realización Personal (RP)
- **Definición**: Sentimientos de competencia, logro y eficacia en el trabajo.
- **Ítems representativos en PULSO-H**:
  - "Siento que puedo crear un clima agradable en mi trabajo"
  - "Siento que consigo muchas cosas valiosas en este trabajo"
  - "Me siento estimulado/a después de haber trabajado en algo importante"
- **Rango**: 0-48 (en PULSO-H: 0-36 por 6 ítems)
- **Interpretación**: **Menor** puntuación = **mayor** burnout (escala invertida)

### 5.2 Puntos de Corte y Perfiles de Riesgo

PULSO-H utiliza los puntos de corte del MBI-HSS validados en poblaciones latinoamericanas (Olivares-Faúndez & Gil-Monte, 2009; Meda-Lara et al., 2008):

| Subescala | Bajo (Saludable) | Moderado (Atención) | Alto (Riesgo) |
|-----------|-----------------|---------------------|---------------|
| **AE** (máx 54) | ≤ 18 | 19-26 | ≥ 27 |
| **DP** (máx 30) | ≤ 5 | 6-9 | ≥ 10 |
| **RP** (máx 48) | ≥ 40 (bajo burnout) | 34-39 | ≤ 33 (alto burnout) |

**Matriz de Perfiles de Burnout (combinación de las 3 subescalas):**

| AE | DP | RP | Perfil PULSO-H | Prevalencia Est. | Intervención Sugerida |
|----|----|----|----------------|------------------|----------------------|
| Bajo | Bajo | Alto | **Floreciente** | ~15% | Mantenimiento + mentoría de pares |
| Bajo | Bajo | Moderado | **Estable** | ~20% | Prevención + fortalecimiento de recursos |
| Moderado | Bajo | Alto | **Resiliente** | ~18% | Gestión de carga + coaching de energía |
| Moderado | Moderado | Moderado | **Requete** | ~22% | Intervención focalizada + redesign de rol |
| Alto | Alto | Bajo | **Sobrecargadx** | ~15% | Intervención urgente + descanso estructurado |
| Alto | Alto | Alto | **Funcional pero Frágil** | ~10% | Evaluación clínica + ajuste organizacional |

### 5.3 Dimensiones Adicionales Propias de PULSO-H

Además de las tres dimensiones del MBI, PULSO-H incorpora tres evaluaciones que el MBI no cubre pero que son críticas para el contexto latinoamericano:

#### Dimensión 4: Factores Organizacionales de Riesgo (FOR)
Basada en la NOM-035 (México), Decreto 2090 (Colombia) e ISO 45003, evalúa:
- Carga laboral y ritmo de trabajo
- Jornadas y descansos
- Liderazgo y relaciones de trabajo
- Violencia laboral y acoso
- Recompensa y reconocimiento
- Control sobre el trabajo
- Clarity de roles

#### Dimensión 5: Conciliación Vida-Trabajo (CVT)
Evalúa el balance percibido entre las demandas laborales y las responsabilidades personales/familiares — un factor crítico en LATAM donde las mujeres llevan el 73% de la carga de cuidados no remunerados.

#### Dimensión 6: Recursos de Resiliencia Individual (RRI)
Identifica los activos de protección del individuo: red de apoyo social, prácticas de autocuidado, sentido de coherencia, y habilidades de recuperación del estrés.

### 5.4 Índice de Riesgo Psicosocial (IRP)

PULSO-H calcula un **Índice de Riesgo Psicosocial global** de 0 a 100, que integra las 6 dimensiones con pesos diferenciados:

```
IRP = (AE × 0.25) + (DP × 0.20) + ((48-RP) × 0.20) + 
      (FOR × 0.20) + ((42-CVT) × 0.10) + (RRI × 0.05)

Donde:
- AE normalizado 0-100
- DP normalizado 0-100
- (48-RP) normalizado 0-100 (invertido porque RP bajo = riesgo)
- FOR normalizado 0-100
- (42-CVT) normalizado 0-100 (invertido porque CVT bajo = riesgo)
- RRI normalizado 0-100
```

**Clasificación del IRP:**
- **0-25**: Zona Verde — Bienestar óptimo
- **26-50**: Zona Amarilla — Atención preventiva recomendada
- **51-75**: Zona Naranja — Intervención organizacional necesaria
- **76-100**: Zona Roja — Intervención urgente obligatoria

---

## 6. FLUJO DE EXPERIENCIA DEL USUARIO

### 6.1 Para el Empleado que Diligencia

#### Antes del Diagnóstico
El empleado recibe un enlace de su organización o encuentra PULSO-H en acrux.life. El landing page transmite:
- **Tiempo**: "8 minutos para entender tu bienestar laboral"
- **Privacidad**: "Tus respuestas se procesan en tu dispositivo. Nadie más las vee."
- **Valor**: "Al finalizar, recibirás un plan de acción personalizado con 3 estrategias que puedes aplicar hoy."
- **Credibilidad**: "Desarrollado por psicólogos organizacionales de ACRUX Consultores"

#### Durante el Diagnóstico
- **Navegación por módulos**: Un módulo a la vez, sin desplazamiento infinito. Cada módulo tiene su propia identidad visual (color, icono, mensaje de contexto).
- **Barra de progreso**: Circular con porcentaje y tiempo restante estimado.
- **Guardado automático**: Si el usuario cierra el navegador, sus respuestas se guardan en localStorage y pueden continuar al regresar.
- **Retroalimentación emocional**: Después del módulo 3 (mitad del diagnóstico), un mensaje de ánimo: "¡Ya vas por la mitad! Estás dando un paso valiente hacia tu bienestar."
- **Opción de omitir**: Cualquier ítem puede omitirse si el usuario se siente incómodo. El sistema adapta el cálculo.

#### Después del Diagnóstico
La página de resultados es el corazón de la experiencia:

**Componentes de la Página de Resultados:**

1. **Perfil Visual Principal**
   - Tarjeta grande con el nombre del perfil (Floreciente, Resiliente, Requete, Sobrecargadx)
   - Ilustración personalizada que representa el estado (no iconos de semáforo)
   - Frase de validación: "Tu pulso indica que estás en un momento de [estado]. Esto no es un veredicto, es una invitación."

2. **Radar de 5 Dimensiones**
   - Gráfico radar interactivo (Chart.js) que muestra las 6 dimensiones
   - Línea del usuario vs. línea del promedio sectorial (anónimo)
   - Tooltips explicativos al pasar el mouse

3. **Índice de Riesgo Psicosocial (IRP)**
   - Gauge semicircular animado con color sutil
   - Número grande (0-100) con interpretación en lenguaje humano
   - "Tu IRP es 42, lo que significa que hay áreas donde la organización puede apoyarte mejor."

4. **Plan de Acción Personalizado (PAP)**
   - 3 tarjetas de acción con:
     - Emoji representativo
     - Título de la acción (ej: "La técnica del 4-7-8")
     - Descripción en 2 líneas
     - Tiempo requerido ("2 minutos")
     - Botón "Ver cómo hacerlo" (despliega instrucciones paso a paso)

5. **Recomendaciones por Dimensión**
   - Para cada dimensión con puntuación de riesgo, una recomendación específica
   - Ejemplo: "Tu puntuación en Agotamiento Emocional sugiere que podrías beneficiarte de establecer límites claros de disponibilidad después de tu jornada."

6. **CTAs Estratégicos**
   - **Primario**: "Recibir mi informe completo por email" (captura de lead)
   - **Secundario**: "Descargar mi informe en PDF" (engagement + compartible)
   - **Terciario**: "Agendar una conversación gratuita con ACRUX" (pipeline de consultoria)
   - **Cuaternario**: "Compartir PULSO-H con mi equipo" (viralidad orgánica)

### 6.2 Para la Organización que Adquiere

Cuando una empresa contrata el servicio de diagnóstico organizacional completo (servicio asociado a PULSO-H), recibe acceso al **Dashboard de Bienestar Organizacional**:

#### Dashboard Organizacional

| Sección | Contenido | Valor para la Organización |
|---------|-----------|---------------------------|
| **Visión General** | IRP promedio de la organización, distribución de perfiles, tendencia temporal | Snapshot ejecutivo del estado de bienestar |
| **Análisis por Área** | IRP por departamento/área con ranking de riesgo | Identificar áreas que necesitan intervención prioritaria |
| **Análisis por Demografía** | IRP por género, edad, antigüedad, cargo | Detectar brechas de equidad y grupos vulnerables |
| **Mapa de Riesgo** | Matriz de calor (heatmap) que cruza factores organizacionales vs. resultados de burnout | Encontrar las palancas organizacionales de mayor impacto |
| **Clustering de Perfiles** | Segmentación automática de empleados en 4-5 perfiles de bienestar | Diseñar intervenciones diferenciadas por segmento |
| **Benchmark Sectorial** | Comparación anónima con empresas del mismo sector y tamaño | Contextualizar los resultados |
| **Tendencias Temporales** | Evolución del IRP si se realiza seguimiento trimestral | Medir el impacto de las intervenciones |
| **Informe Ejecutivo** | PDF auto-generado con narrativa, gráficos y recomendaciones | Documento listo para presentar a dirección/junta |
| **Plan de Intervención** | Recomendaciones priorizadas por impacto y viabilidad | Roadmap concreto de acción |

**Nota crítica de privacidad**: El dashboard organizacional NUNCA muestra respuestas individuales. Todos los análisis son agregados con mínimo de 5 personas por celda (regla de privacidad diferencial).

---

## 7. SISTEMA DE GAMIFICACIÓN

### 7.1 Filosofía de Gamificación en PULSO-H

La gamificación en PULSO-H no busca convertir el diagnóstico en un juego. Busca **reducir la resistencia natural al diagnóstico** (ansiedad por la evaluación, miedo al estigma, fatiga del cuestionario) y **aumentar la motivación intrínseca** para completar y actuar sobre los resultados.

Los principios de diseño gamificado siguen el framework **Octalysis** de Yu-kai Chou, adaptado al contexto de salud mental:

| Núcleo Octalysis | Aplicación en PULSO-H |
|-----------------|----------------------|
| **Epic Meaning** | "Al completar PULSO-H, contribuyes a construir un lugar de trabajo más humano para todos" |
| **Accomplishment** | Badges por completitud, progreso por módulos, niveles de bienestar |
| **Creativity** | Plan de Acción Personalizado que el usuario puede personalizar |
| **Ownership** | "Mi PULSO", "Mi informe", "Mi plan" — lenguaje de propiedad |
| **Social Influence** | Benchmark anónimo por sector; opción de compartir logro (sin datos) |
| **Scarcity** | "Solo el 12% logra el nivel 'Guardián del Bienestar' en su primera evaluación" |
| **Unpredictability** | Recomendaciones sorpresa, micro-aprendizajes al completar |
| **Loss & Avoidance** | Mensaje suave: "Tu progreso se guarda automáticamente" |

### 7.2 Elementos Gamíficos Específicos

#### A. Sistema de Puntos "ENERGÍA"

Cada respuesta genera puntos de ENERGÍA:
- Completar un ítem: +10 pts
- Completar un módulo: +50 pts (bonus)
- Completar todo el diagnóstico: +200 pts (bonus)
- Tiempo óptimo (sin apresuramiento): +25 pts
- Revisar una recomendación: +15 pts
- Descargar el informe: +30 pts

#### B. Sistema de Insignias (Badges)

| Badge | Cómo Obtener | Visual |
|-------|-------------|--------|
| **Primer Paso** | Completar el módulo 1 | 🌱 Brote verde |
| **Mitad del Camino** | Completar el módulo 3 | 🌿 Planta creciendo |
| **Finisher** | Completar los 6 módulos | 🌳 Árbol completo |
| **Reflexivo** | Tomar más de 10 min (sin prisa) | 🐢 Tortuga sabia |
| **Explorador** | Revisar todas las recomendaciones | 🔭 Lupa |
| **Guardián del Bienestar** | Obtener perfil "Floreciente" + completar diagnóstico | 🛡️ Escudo dorado |
| **Resiliente** | Obtener perfil "Resiliente" | 🌈 Arcoíris |
| **Constructor de Cambio** | Agendar llamada con ACRUX desde resultados | 🔨 Martillo |
| **Embajador** | Compartir PULSO-H con 3+ colegas | 📢 Megáfono |
| **Seguidor** | Completar diagnóstico de seguimiento (90 días) | 🔄 Círculo de renovación |

#### C. Niveles de Usuario

| Nivel | Nombre | Requisito | Beneficio |
|-------|--------|-----------|-----------|
| 1 | **Observador** | Completar 1 diagnóstico | Acceso a informe básico |
| 2 | **Consciente** | 2 diagnósticos + revisar 5 recomendaciones | Acceso a minicurso "3 técnicas para tu bienestar" |
| 3 | **Practicante** | 3 diagnósticos + 1 llamada con ACRUX | Descuento 10% en consultoria |
| 4 | **Embajador** | 5 diagnósticos + 3 referidos | Acceso a webinar exclusivo mensual |
| 5 | **Guardián** | 8 diagnósticos + 5 referidos + 1 contrato de consultoria | Membresía gratuita ACRUX Academy por 1 año |

#### D. Barra de Progreso Visual

- Barra circular con animación de llenado suave
- Color que evoluciona según el módulo (de azul claro a verde bosque)
- Mensajes motivacionales contextuales:
  - 17%: "Estás tomando el control de tu bienestar"
  - 33%: "La conciencia es el primer paso del cambio"
  - 50%: "¡Mitad del camino! Tu futuro yo te lo agradece"
  - 67%: "Estos minutos pueden cambiar tu relación con el trabajo"
  - 83%: "Casi listo. Respira profundo."
  - 100%: "Listo. Tu pulso ha sido registrado."

#### E. Micro-Recompensas (Micro-rewards)

- **Al completar cada módulo**: Una animación de celebración sutil (confeti digital biodegradable, 1 segundo)
- **Al completar el diagnóstico**: Un mensaje de gratitud personalizado según el perfil
- **Al descubrir un insight**: Un "Aha!" visual (bombillo que se enciende)
- **Al alcanzar un badge**: Notificación tipo toast con sonido suave (opcional)

### 7.3 Gamificación para la Organización

El dashboard organizacional también incorpora elementos gamíficos para incentivar la participación colectiva:

- **Meta colectiva**: "Si el 80% del equipo completa PULSO-H esta semana, desbloqueamos el informe comparativo de benchmark"
- **Ranking de áreas** (opcional y configurable): Áreas con mayor participación reciben reconocimiento
- **Desafío de bienestar**: "Reduce el IRP de tu área en 10 puntos en 90 días y gana el sello 'Área Saludable ACRUX'"
- **Visibilidad del progreso**: Gráfico de "km recorridos hacia el bienestar" que muestra el avance colectivo

---

## 8. VALOR PERCIBIDO Y ENTREGABLES

### 8.1 Valor para el Empleado Individual

| Entregable | Descripción | Formato |
|------------|-------------|---------|
| **Perfil de Bienestar Personal** | Nombre del perfil + narrativa empática de 3 párrafos | Visual + texto |
| **Radar de Dimensiones** | Gráfico radar comparativo (usuario vs. promedio sector) | Gráfico interactivo |
| **Índice de Riesgo Psicosocial (IRP)** | Puntuación 0-100 con interpretación en lenguaje humano | Gauge + número |
| **Plan de Acción Personalizado (PAP)** | 3 acciones concretas con instrucciones paso a paso | Tarjetas interactivas |
| **Recomendaciones por Dimensión** | 1 recomendación específica por dimensión de riesgo | Lista expandible |
| **Recursos de Apoyo** | Links a técnicas de relajación, líneas de apoyo, artículos ACRUX | Lista curada |
| **Informe PDF** | Documento descargable con todo lo anterior + explicación metodológica | PDF generado client-side |
| **Seguimiento** | Invitación a repetir el diagnóstico en 90 días para medir evolución | Email programado |

### 8.2 Valor para la Organización

| Entregable | Descripción | Requiere Contrato |
|------------|-------------|-------------------|
| **Dashboard de Bienestar Organizacional** | IRP promedio, distribución de perfiles, análisis por área | Sí |
| **Mapa de Calor de Riesgo** | Heatmat cruzando factores organizacionales vs. resultados | Sí |
| **Análisis de Clustering** | Segmentación de empleados en perfiles homogéneos (K-Means) | Sí |
| **Informe Ejecutivo PDF** | Documento de 15-20 páginas listo para presentación a dirección | Sí |
| **Plan de Intervención Priorizado** | Roadmap de acciones por impacto y viabilidad | Sí |
| **Benchmark Sectorial** | Comparación anónima con empresas similares | Sí |
| **Presentación para Dirección** | Slide deck auto-generado con hallazgos clave | Sí (servicio premium) |
| **Consultoria de Interpretación** | Sesión de 2 horas con psicóloga ACRUX para analizar resultados | Sí (servicio premium) |

### 8.3 Matriz de Precios

| Producto/Servicio | Descripción | Precio | Público |
|-------------------|-------------|--------|---------|
| **PULSO-H Individual** | Diagnóstico personal + informe básico | **Gratis** | Cualquier persona |
| **PULSO-H Organizacional (Básico)** | Dashboard + informe ejecutivo (hasta 100 empleados) | **$1,500 USD** | Empresas |
| **PULSO-H Organizacional (Profesional)** | Todo lo anterior + clustering + benchmark + plan de intervención (hasta 500 empleados) | **$4,500 USD** | Empresas medianas |
| **PULSO-H Organizacional (Enterprise)** | Todo lo anterior + consultoria de interpretación + presentación a dirección + seguimiento trimestral (empleados ilimitados) | **$12,000 USD/año** | Grandes empresas |
| **Servicio de Consultoria Asociado** | Fase 1: Diagnóstico Sistémico completo (que incluye PULSO-H como herramienta) | **$5,000-$15,000 USD** | Clientes de consultoria |

---

## 9. STACK TÉCNICO Y HERRAMIENTAS DE SOPORTE

### 9.1 Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   React     │  │  Tailwind   │  │   Framer Motion     │ │
│  │   18+       │  │   CSS v3    │  │   (animaciones)     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Chart.js   │  │  html2pdf   │  │   LocalStorage      │ │
│  │  (radar,    │  │  (export    │  │   (guardado         │ │
│  │   barras)   │  │   PDF)      │  │   progreso)         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    CAPA DE LÓGICA                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              WebAssembly (WASM) / JavaScript               ││
│  │  - Cálculo de subescalas (AE, DP, RP, FOR, CVT, RRI)     ││
│  │  - Normalización de puntuaciones                         ││
│  │  - Algoritmo K-Means para clustering (implementado       ││
│  │    en JS con librería ml-kmeans)                          ││
│  │  - Generación de perfiles automáticos                     ││
│  │  - Cálculo de IRP                                       ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                    CAPA DE DATOS                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              PROCESAMIENTO LOCAL (Client-Side)           ││
│  │  - CSV upload (PapaParse)                                ││
│  │  - Parseo de respuestas Likert                           ││
│  │  - NO hay base de datos externa para respuestas        ││
│  │    individuales                                        ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                    BACKEND (solo para leads)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  HubSpot    │  │  Brevo      │  │   Google Analytics  │ │
│  │  CRM        │  │  (email     │  │   4 + Tag Manager   │ │
│  │  (captura   │  │   nurturing)│  │                     │ │
│  │   leads)    │  │             │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Tecnologías Detalladas

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| **Frontend Framework** | React 18+ | Componentes reutilizables, estado manejable, SPA fluida |
| **Estilos** | Tailwind CSS v3 | Desarrollo rápido, diseño consistente, responsive nativo |
| **Animaciones** | Framer Motion | Transiciones suaves, animaciones de progreso, micro-interacciones |
| **Gráficos** | Chart.js v4 | Radar charts, barras, gauges — ligero y bien documentado |
| **Procesamiento CSV** | PapaParse v5 | Parser CSV robusto, manejo de delimitadores, codificación UTF-8 |
| **Clustering** | ml-kmeans (JS) | Algoritmo K-Means implementado en JavaScript, sin backend |
| **Exportación PDF** | html2pdf.js | Generación client-side de PDFs a partir del DOM |
| **Persistencia local** | localStorage | Guardado de progreso del usuario en su propio navegador |
| **Analytics** | GA4 + GTM | Tracking de eventos: inicio, completitud, descarga, CTA clicks |
| **CRM** | HubSpot (gratuito) | Captura de leads, pipeline de conversión, email nurturing |
| **Email** | Brevo (Sendinblue) | Envío de informes, secuencias de nurturing, newsletters |
| **Hosting** | Vercel / Netlify | Deploy continuo, CDN global, HTTPS gratis, edge functions |
| **Dominio** | pulso-h.acrux.life | Subdominio de marca principal |

### 9.3 Procesamiento Local vs. Cloud

**Filosofía de privacidad de PULSO-H**: Todo el procesamiento de datos sensibles ocurre en el navegador del usuario. Esto significa:

| Operación | Dónde ocurre | Datos que salen del dispositivo |
|-----------|-------------|--------------------------------|
| Responder preguntas | Navegador del usuario | Ninguno |
| Calcular subescalas | Navegador del usuario | Ninguno |
| Generar gráficos | Navegador del usuario | Ninguno |
| Crear PDF | Navegador del usuario | Ninguno |
| Clustering (si aplica) | Navegador del usuario | Ninguno |
| Enviar email con informe | Backend HubSpot/Brevo | Solo: email, nombre, perfil de riesgo (NO respuestas individuales) |
| Dashboard organizacional | Backend ACRUX | Solo: puntuaciones agregadas por área, mínimo 5 personas por celda |

---

## 10. ANÁLISIS ESTRATÉGICO DE IMPLEMENTACIÓN

### 10.1 Funnel de Conversión PULSO-H

```
AWARENESS
├── SEO: "diagnóstico burnout gratis", "evaluación riesgos psicosociales Colombia"
├── Contenido: Artículos de blog en acrux.life/el-radar
├── Redes sociales: LinkedIn posts con datos de burnout LATAM
├── Partnerships: Co-marketing con plataformas de RRHH (Buk, Runa, etc.)
└── Referidos: Empleados que comparten con colegas
    │
    ▼
VISIT (Landing PULSO-H)
├── Copy: "8 minutos para entender tu bienestar laboral"
├── Social proof: "2,847 personas ya conocen su pulso"
├── Credibilidad: "Desarrollado por psicólogos organizacionales de ACRUX"
└── CTA: [Comenzar diagnóstico gratuito →]
    │
    ▼
START (Pantalla 1 - Captura email opcional)
├── Campo email (opcional): "Guarda tu progreso y recibe tu informe"
├── Checkbox: "Quiero recibir El Radar semanal de ACRUX"
├── Microcopy: "Sin spam. Solo valor humano."
└── Avance al módulo 1
    │
    ▼
ENGAGEMENT (Módulos 1-6)
├── Gamificación: puntos, badges, progreso visual
├── Retención: guardado automático, mensajes de ánimo
└── Completitud: 82% meta de finalización
    │
    ▼
RESULTS (Página de resultados)
├── Valor inmediato: perfil, radar, plan de acción
├── Lead capture: "Recibir informe por email" (requiere email si no se dio antes)
├── Descarga PDF: engagement adicional
├── CTA consultoria: "Hablemos de tu bienestar organizacional"
└── CTA viral: "Compartir con mi equipo"
    │
    ▼
NURTURING (Secuencia de 5 emails en 14 días)
├── Email 1 (inmediato): Informe completo + bienvenida
├── Email 2 (día 3): Artículo relacionado con el perfil del usuario
├── Email 3 (día 6): Caso de éxito de intervención de burnout
├── Email 4 (día 10): Invitación a webinar "Cómo liderar equipos sin burnout"
└── Email 5 (día 14): Oferta de consultoría de diagnóstico con descuento 15%
    │
    ▼
CONVERSION
├── Llamada de calificación (30 min, gratuita)
├── Propuesta de diagnóstico organizacional
├── Cierre de contrato de consultoría
└── Retención: seguimiento trimestral con PULSO-H re-aplicado
```

### 10.2 Estrategia de Contenido Derivado

Cada 100 diagnósticos completados generan datos suficientes para:

| Pieza de Contenido | Frecuencia | Fuente de Datos |
|-------------------|-----------|----------------|
| **Infografía sectorial** | Mensual | IRP promedio por sector (anónimo) |
| **Reporte de estado del bienestar LATAM** | Trimestral | Agregación de todos los diagnósticos |
| **Artículo de blog** | Semanal | Insights de patrones de burnout por perfil |
| **Webinar** | Mensual | "Lo que los datos de PULSO-H nos enseñan sobre [tema]" |
| **Press release** | Trimestral | "Burnout en [país]: cifras alarmantes según PULSO-H" |
| **White paper** | Semestral | "El estado del bienestar laboral en Latinoamérica 202X" |

### 10.3 Estrategia de Partnerships

| Tipo de Partner | Ejemplo | Valor Mutuo |
|-----------------|---------|-------------|
| **Plataformas de RRHH** | Buk, Runa, Factorial | Integración de PULSO-H como módulo de bienestar; co-marketing |
| **Aseguradoras de salud** | Sura, Colpatria, AXA | PULSO-H como herramienta de prevención para clientes corporativos |
| **Cámaras de comercio** | Cámara de Comercio de Bogotá, CANACO | Ofrecer PULSO-H gratuito a asociados; ACRUX como consultor preferido |
| **Universidades** | Universidad de los Andes, UNAM | Validación psicométrica, prácticas profesionales, investigación conjunta |
| **Comunidades de RRHH** | SHRM Colombia, ACRIP | Webinars conjuntos, posicionamiento de thought leadership |

---

## 11. CONSIDERACIONES ÉTICAS, LEGALES Y DE PRIVACIDAD

### 11.1 Marco Ético

PULSO-H está diseñado bajo los principios de la **Declaración de Helsinki** y las **Directrices Éticas para la Investigación en Psicología** (APA):

1. **Consentimiento informado**: El usuario debe aceptar explícitamente que comprende la naturaleza del diagnóstico antes de comenzar.
2. **Voluntariedad**: La participación es completamente voluntaria. En el contexto organizacional, las empresas deben garantizar que no haya represalias por resultados.
3. **Anonimidad**: Las respuestas individuales nunca se comparten con la organización sin consentimiento explícito.
4. **No maleficencia**: El diseño evita el estigma. Los perfiles usan lenguaje no patologizante.
5. **Beneficencia**: Cada resultado incluye recursos de ayuda (líneas de crisis, si aplica).

### 11.2 Cumplimiento Legal

| Normativa | Aplicación en PULSO-H |
|-----------|----------------------|
| **Ley 1581 de 2012 (Colombia)** | Política de privacidad clara; datos personales solo con consentimiento; derecho a supresión |
| **NOM-035-STPS-2018 (México)** | PULSO-H cumple función de "identificación y análisis de factores de riesgo psicosocial" |
| **ISO 45003:2021** | Marco de gestión de riesgos psicosociales; PULSO-H como herramienta de evaluación |
| **Ley 21.643 (Chile)** | Reconocimiento del burnout como enfermedad profesional; PULSO-H como herramienta de prevención |
| **GDPR (si aplica a europeos)** | Derecho al olvido, portabilidad de datos, consentimiento explícito |

### 11.3 Mensajes Legales en la Interfaz

**Pantalla de Bienvenida:**
> "Tus respuestas son importantes y privadas. Este diagnóstico se procesa completamente en tu dispositivo — ACRUX no tiene acceso a tus respuestas individuales. Solo si decides compartir tu informe resumido, enviaremos los resultados agregados (sin datos personales) al equipo de bienestar de tu organización."

**Página de Resultados:**
> "Este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico. Si tus resultados te preocupan, te recomendamos hablar con un profesional de salud mental. Aquí tienes recursos de apoyo: [Línea de crisis] [Directorio de psicólogos]"

---

## 12. ROADMAP DE DESARROLLO

### Fase 1: MVP (Semanas 1-4)

| Semana | Entregable |
|--------|-----------|
| 1 | Diseño UI/UX en Figma (landing, flujo de 6 módulos, página de resultados) |
| 2 | Desarrollo frontend React + Tailwind. Implementación de los 36 ítems en 6 módulos. |
| 3 | Lógica de cálculo client-side (subescalas, IRP, perfiles). Gráficos Chart.js. |
| 4 | Exportación PDF. Integración con HubSpot (captura email). Testing interno. |

**Entregable Fase 1**: PULSO-H funcional, gratuito, con informe básico por email.

### Fase 2: Gamificación + Optimización (Semanas 5-8)

| Semana | Entregable |
|--------|-----------|
| 5 | Sistema de puntos ENERGÍA. Badges visuales. Animaciones Framer Motion. |
| 6 | localStorage para guardado de progreso. Página de resultados mejorada. |
| 7 | Email nurturing (5 emails en Brevo). Integración GA4 + event tracking. |
| 8 | SEO básico. Landing page optimizada. Soft launch con 50 usuarios de prueba. |

**Entregable Fase 2**: PULSO-H gamificado, con nurturing automatizado, listo para tráfico real.

### Fase 3: Dashboard Organizacional (Semanas 9-14)

| Semana | Entregable |
|--------|-----------|
| 9 | Backend para agregación de datos (supabase/firebase). Autenticación de organizaciones. |
| 10 | Dashboard con IRP promedio, distribución de perfiles, análisis por área. |
| 11 | Clustering K-Means en backend. Segmentación automática de empleados. |
| 12 | Mapa de calor. Benchmark sectorial. Informe ejecutivo auto-generado. |
| 13 | Testing con 2-3 empresas piloto. Recopilación de feedback. |
| 14 | Lanzamiento oficial del servicio organizacional. Documentación comercial. |

**Entregable Fase 3**: Servicio organizacional completo, con pricing definido.

### Fase 4: Escala + Internacionalización (Meses 4-6)

- Localización para México, Chile, Perú (adaptación regulatoria)
- Integración con plataformas de RRHH (APIs)
- App móvil (PWA)
- Certificación psicométrica formal
- Partnerships estratégicos

---

## 13. KPIs Y MÉTRICAS DE ÉXITO

### 13.1 Métricas de Producto (PULSO-H como herramienta)

| KPI | Meta (90 días) | Meta (12 meses) | Herramienta de Medición |
|-----|---------------|-----------------|------------------------|
| Usuarios que inician diagnóstico | 1,000 | 8,000 | GA4 |
| Tasa de completitud | 70% | 82% | GA4 + base de datos |
| Tasa de captura de email | 55% | 65% | HubSpot |
| Descargas de PDF | 40% de completados | 50% | GA4 event |
| Tiempo promedio de completitud | 9 minutos | 8.5 minutos | GA4 |
| Tasa de retorno (re-diagnóstico en 90 días) | 15% | 25% | Base de datos |
| NPS de la herramienta | > 40 | > 50 | Encuesta post-diagnóstico |

### 13.2 Métricas de Negocio (Pipeline de Consultoría)

| KPI | Meta (90 días) | Meta (12 meses) | Herramienta de Medición |
|-----|---------------|-----------------|------------------------|
| Leads generados | 500 | 4,000 | HubSpot |
| Leads calificados (MQL) | 100 | 800 | HubSpot scoring |
| Llamadas de calificación agendadas | 25 | 200 | Calendly + HubSpot |
| Propuestas enviadas | 8 | 60 | HubSpot pipeline |
| Contratos cerrados desde PULSO-H | 2 | 15 | HubSpot + contabilidad |
| Ingresos atribuibles a PULSO-H | $10,000 | $80,000 | HubSpot attribution |
| Tasa de conversión leads → clientes | 3% | 5% | HubSpot |

### 13.3 Métricas de Marca y Posicionamiento

| KPI | Meta (90 días) | Meta (12 meses) |
|-----|---------------|-----------------|
| Tráfico orgánico a pulso-h.acrux.life | 500/mes | 3,000/mes |
| Menciones de "PULSO-H ACRUX" en redes | 20 | 150 |
| Artículos derivados de datos PULSO-H | 3 | 15 |
| Empresas que solicitan demo organizacional | 10 | 80 |
| Partnerships activos | 1 | 5 |

---

## ANEXO A: ÍTEMS DE PULSO-H (Muestra Representativa)

### Módulo 1: Mi Energía (Agotamiento Emocional)

1. Me siento emocionalmente agotado/a por mi trabajo.
2. Siento que trabajar todo el día me exige un gran esfuerzo.
3. Me siento frustrado/a por mi trabajo.
4. Siento que estoy al límite de mis posibilidades.
5. Me siento quemado/a al final de la jornada laboral.
6. Me cuesta recuperarme emocionalmente después de un día de trabajo intenso.

### Módulo 2: Mi Conexión (Despersonalización)

7. Siento que he perdido interés en conectar genuinamente con mis colegas.
8. Me he vuelto más cínico/a sobre si mi trabajo realmente importa.
9. Siento que trato a algunas personas en el trabajo como si fueran objetos impersonales.
10. Me cuesta empatizar con los problemas de quienes dependen de mi trabajo.
11. Siento que me he vuelto indiferente a los logros de mi equipo.

### Módulo 3: Mi Propósito (Realización Personal)

12. Siento que consigo muchas cosas valiosas en este trabajo.
13. Me siento estimulado/a después de haber trabajado en algo importante.
14. Siento que puedo crear un clima agradable en mi trabajo.
15. Creo que resuelvo problemas de forma efectiva en mi trabajo.
16. Me siento lleno/a de energía cuando pienso en lo que hago bien.
17. Siento que mi trabajo tiene un propósito claro.

### Módulo 4: Mi Entorno (Factores Organizacionales)

18. Mi carga de trabajo es manejable en mi jornada habitual.
19. Tengo claridad sobre lo que se espera de mí en mi trabajo.
20. Recibo reconocimiento cuando hago un buen trabajo.
21. Siento que puedo expresar preocupaciones sin temor a represalias.
22. Mi líder directo me apoya cuando enfrento dificultades.
23. Los procesos de mi organización me ayudan, no me obstaculizan.
24. Tengo control sobre cómo organizo mi trabajo diario.

### Módulo 5: Mi Equilibrio (Conciliación)

25. Puedo desconectarme del trabajo después de mi jornada.
26. Tengo tiempo suficiente para mi vida personal, familia y descanso.
27. Mi trabajo respeta mis compromisos personales y familiares.
28. Siento que tengo un balance saludable entre trabajo y vida personal.
29. Mi organización valora el tiempo de descanso de sus empleados.
30. Puedo tomar pausas durante la jornada cuando las necesito.

### Módulo 6: Mi Fortaleza (Resiliencia)

31. Tengo personas en mi trabajo en quienes puedo confiar.
32. Practico alguna actividad que me ayuda a relajarme regularmente.
33. Puedo ver los desafíos del trabajo como oportunidades de aprendizaje.
34. Tengo estrategias que me funcionan para manejar momentos de estrés.
35. Siento que puedo influir en decisiones que me afectan en el trabajo.
36. Mantengo una perspectiva positiva incluso cuando las cosas son difíciles.

---

## ANEXO B: GLOSARIO DE TÉRMINOS

| Término | Definición |
|---------|-----------|
| **Burnout** | Síndrome de desgaste profesional resultante del estrés laboral crónico no gestionado, caracterizado por agotamiento emocional, despersonalización y baja realización personal. |
| **MBI-HSS** | Maslach Burnout Inventory — Human Services Survey. Inventario de 22 ítems desarrollado por Christina Maslach y Susan Jackson. Gold standard mundial para evaluación de burnout. |
| **Agotamiento Emocional (AE)** | Dimensión del burnout que refleja la sensación de estar emocionalmente exhausto por las demandas del trabajo. |
| **Despersonalización (DP)** | Dimensión del burnout que describe actitudes cínicas, distantes e impersonales hacia las personas objeto del trabajo. |
| **Realización Personal (RP)** | Dimensión del burnout que evalúa sentimientos de competencia y logro. Puntuaciones *bajas* indican mayor burnout. |
| **IRP** | Índice de Riesgo Psicosocial. Métrica global de PULSO-H (0-100) que integra las 6 dimensiones evaluadas. |
| **PAP** | Plan de Acción Personalizado. Conjunto de 3 acciones concretas entregadas al usuario según su perfil de riesgo. |
| **K-Means** | Algoritmo de clustering que agrupa individuos en perfiles homogéneos según sus puntuaciones en las dimensiones de burnout. |
| **Punto de corte** | Valor umbral que determina si una puntuación se clasifica como baja, moderada o alta. |

---

## ANEXO C: EJEMPLO DE INFORME PDF GENERADO

---

**INFORME DE BIENESTAR LABORAL — PULSO-H**

*Generado el [fecha] para [Nombre]*
*Organización: [Empresa] | Cargo: [Cargo]*

---

### Tu Perfil: RESILIENTE

Tu pulso indica que estás en un momento de **resiliencia activa**. Sientes agotamiento moderado, pero mantienes un sentido de propósito y conexión con tu trabajo. Esto es una fortaleza — y también una señal de atención.

Las personas con perfil Resiliente suelen ser las que "aguantan todo" en sus equipos. Esa capacidad de resistencia es valiosa, pero puede convertirse en una trampa si no recargas tus baterías a tiempo.

### Tu Índice de Riesgo Psicosocial (IRP): 48/100

Tu IRP se encuentra en la **Zona Amarilla** (Atención Preventiva Recomendada). Esto significa que hay áreas donde pequeños cambios pueden generar un impacto significativo en tu bienestar.

### Tu Radar de Dimensiones

[Gráfico radar con las 6 dimensiones]

**Dimensiones de fortaleza:**
- Realización Personal (72/100): Mantienes un sentido claro de propósito.
- Recursos de Resiliencia (68/100): Tienes herramientas personales que te ayudan.

**Dimensiones de atención:**
- Agotamiento Emocional (58/100): Tu energía emocional necesita recarga.
- Conciliación Vida-Trabajo (45/100): El balance entre trabajo y vida personal requiere ajustes.

### Tu Plan de Acción Personalizado (PAP)

**Acción 1: La técnica del 4-7-8 (2 minutos)**
Inhala por 4 segundos, mantén 7, exhala 8. Repite 4 veces antes de una reunión difícil o al final de la jornada.

**Acción 2: El límite de la hora de cierre**
Establece una alarma 30 minutos antes de terminar tu jornada. Usa esos 30 minutos para cerrar tareas, no para abrir nuevas.

**Acción 3: La conversación de 15 minutos**
Agenda una conversación de 15 minutos esta semana con tu líder directo. El tema: "Estas son las 3 cosas que me están ayudando, y esta es una donde podría usar apoyo."

### Recursos Recomendados

- Artículo ACRUX: "5 señales de que tu equipo está en modo 'resiliente' (y por qué eso no es siempre bueno)"
- Técnica: Respiración diafragmática guiada (link a audio 5 min)
- Línea de apoyo: [Línea de crisis nacional]

---

*Este informe es una herramienta de autoevaluación, no un diagnóstico clínico. Si tus resultados te preocupan, te recomendamos consultar con un profesional de salud mental.*

*PULSO-H es una herramienta de ACRUX Consultores. Para una evaluación organizacional completa, escríbenos a hola@acrux.life*

---

**Fin del documento**

---

*Documento elaborado por ACRUX Consultores | Equipo: Diego Toro, Mercedes Restrepo, Carolina Arango, Sandra Olano*
*Armenia, Quindío, Colombia | acrux.life*
*© 2026 ACRUX Consultores — Todos los derechos reservados*
