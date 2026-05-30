## Why

La auditoría de UX de DIGITAL-H reveló una tasa de abandono crítica del 40-60% en la segunda mitad del cuestionario (preguntas 25-48), causada principalmente por: (1) la aparición abrupta del LeadForm en la pregunta 31 que genera fricción en el punto de máxima inversión del usuario, (2) CTAs desalineados con el objetivo de negocio principal (agendar consultoría), y (3) resultados genéricos que no demuestran valor diferencial. Estos problemas reducen la conversión de leads cualificados y la percepción de valor del diagnóstico.

## What Changes

- **Reubicar LeadForm al final del flujo**: Mover la captura de datos del usuario de la pregunta 31 al final del cuestionario (post-pregunta 48), mostrando un preview del valor del reporte como incentivo para completar el registro
- **Jerarquizar CTAs en resultados**: Transformar "Agendar consultoría" en el CTA primario visual (gradiente, animación, posición prominente), rebajar "Descargar PDF" a secundario, y "Compartir LinkedIn" a terciario
- **Sistema de recomendaciones contextuales**: Generar next steps específicos basados en las 2-3 dimensiones con menor puntuación del usuario, en lugar de mostrar las mismas 4 recomendaciones genéricas para todos
- **Personalización por contexto de origen**: Extender la lógica de UTM para mostrar mensajes y urgency cues relevantes según el canal de adquisición (Instagram vs orgánico vs email)
- **Eliminar urgencia artificial hardcodeada**: Reemplazar "Solo quedan 12 diagnósticos" con métricas reales de valor social o eliminar si no es dinámico
- **Agregar guardar y continuar explícito**: Botón visible "Guardar y continuar después" durante el cuestionario con confirmación de sesión guardada
- **Enriquecer resultados con prueba social**: Incluir testimonios de empresas similares y casos de éxito segmentados por nivel de madurez alcanzado
- **Optimizar navegación de salida**: Hacer consistente el comportamiento del enlace "Volver a Acrux" en todas las pantallas (siempre con modal de confirmación si hay progreso no guardado)
- **Eliminar footer fijo durante cuestionario**: Ocultar el footer de copyright en las pantallas de cuestionario para maximizar espacio vertical y reducir distracciones

## Capabilities

### New Capabilities
- `adaptive-questionnaire-flow`: Flujo de cuestionario reestructurado con LeadForm al final, sistema de guardado explícito, y persistencia de sesión mejorada
- `contextual-recommendations-engine`: Sistema que genera recomendaciones y next steps personalizados basados en las respuestas del usuario y sus dimensiones débiles
- `conversion-cta-optimization`: Reestructuración visual y jerárquica de los CTAs en la pantalla de resultados para priorizar la agenda de consultoría
- `segmented-user-experience`: Personalización de mensajes, urgency cues y contenido según el canal de adquisición (UTM) y perfil del usuario
- `social-proof-integration`: Sistema de testimonios y casos de éxito dinámicos segmentados por nivel de madurez y tamaño de empresa

### Modified Capabilities
<!-- No existing spec-level requirement changes - all modifications are implementation-level UX improvements -->

## Impact

- **Affected files**:
  - `src/App.tsx` - Control de flujo entre pantallas, lógica de guardado
  - `src/components/Landing.tsx` - Urgencia cues, personalización por origen
  - `src/components/Questionnaire.tsx` - Botón de guardar, eliminar footer
  - `src/components/LeadForm.tsx` - Preview de valor del reporte, incentivos
  - `src/components/Results.tsx` - Jerarquía de CTAs, recomendaciones contextuales, testimonios
  - `src/constants.ts` - Posible extensión de estructuras de datos para recomendaciones
  - `src/utils.ts` - Lógica para identificar dimensiones débiles y generar recomendaciones
- **APIs/Backend**: Ningún cambio en API requerido (las recomendaciones se generan client-side)
- **Dependencies**: Ninguna nueva dependencia requerida
- **Breaking changes**: Ninguna - todos los cambios son mejoras UX backward-compatible
- **Analytics**: Se recomienda agregar eventos de tracking para: (1) tasa de completitud por pregunta, (2) conversión LeadForm, (3) clicks por CTA en resultados
