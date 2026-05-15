## Context

DIGITAL-H es una aplicación React (TypeScript + Vite) que sirve como landing page interactiva para un diagnóstico de madurez digital de 48 preguntas. El flujo actual tiene 4 pantallas: Landing → LeadForm (pregunta 31) → Questionnaire → Results. La auditoría UX identificó pérdida masiva de usuarios en la segunda mitad del cuestionario debido a la interrupción del LeadForm y la falta de valor percibido en los resultados.

**Estado actual:**
- `App.tsx` controla el estado global del flujo con useState
- `sessionStorage` guarda progreso automáticamente cada 2 segundos
- `LeadForm.tsx` captura nombre, email, empresa, consentimiento GDPR
- `Results.tsx` muestra score IMD, gráfico radar, 4 next steps genéricos, roadmap estático
- No hay personalización basada en respuestas ni segmentación por canal

**Constraints:**
- Sin cambios en backend/API (client-side only)
- Sin nuevas dependencias externas
- Mantener compatibilidad backward con datos existentes en sessionStorage
- Mobile-first (60%+ del tráfico esperado desde Instagram)

## Goals / Non-Goals

**Goals:**
- Reducir tasa de abandono del cuestionario del 60% actual a <30%
- Aumentar tasa de conversión de LeadForm del punto de interrupción al final del flujo
- Incrementar clicks en CTA "Agendar consultoría" en resultados en 3x
- Generar recomendaciones accionables basadas en respuestas reales del usuario
- Personalizar experiencia según canal de adquisición sin fricción técnica

**Non-Goals:**
- No cambiar el cuestionario de 48 preguntas (el contenido se mantiene)
- No modificar el algoritmo de cálculo IMD (lógica de scoring intacta)
- No agregar backend o base de datos para testimonios (usar JSON estático)
- No implementar autenticación o cuentas de usuario
- No modificar el sistema de generación de PDFs existente

## Decisions

### 1. Mover LeadForm al final del flujo

**Decision:** Eliminar la interrupción en pregunta 31. El LeadForm aparece SOLO después de completar la pregunta 48.

**Rationale:**
- El usuario ya invirtió 15-20 minutos y tiene motivación intrínseca de ver resultados
- El costo de abandono en el final es menor que en la mitad
- Se puede usar "preview de resultados" como incentivo para completar el registro

**Implementación:**
- Eliminar condición `currentIdx === 31` en `App.tsx`
- Agregar transición automática `questionnaire → leadform` al completar pregunta 48
- Modificar `LeadForm.tsx` para mostrar preview del reporte (score parcial, dimensiones completadas)

### 2. Sistema de Recomendaciones Contextuales (Client-Side)

**Decision:** Generar recomendaciones dinámicas basadas en las 2-3 dimensiones con menor promedio de respuestas.

**Rationale:**
- No requiere backend ni ML complejo
- Responde inmediatamente a las respuestas del usuario
- Escalable: agregar más recomendaciones solo requiere extender un objeto JSON

**Implementación:**
- Crear `recommendations.ts` con mapa: `dimensionId → array de recomendaciones`
- Función `getWeakDimensions(answers)` que calcula promedio por dimensión y retorna las 2-3 más bajas
- Función `getRecommendations(weakDimensions)` que selecciona 4 recomendaciones (priorizando dimensiones débiles, completando con genéricas si es necesario)
- Componente `Results.tsx` consume estas funciones en lugar del array estático

**Alternativas consideradas:**
- Reglas basadas en IMD global (rechazado: no es granular)
- ML/IA para recomendaciones (rechazado: overkill, requiere backend)

### 3. Jerarquía Visual de CTAs en Resultados

**Decision:** "Agendar consultoría" es el CTA primario. "Descargar PDF" es secundario. "Compartir" es terciario.

**Rationale:**
- El objetivo de negocio principal es generar reuniones de consultoría
- El reporte PDF es un "lead magnet" que debería facilitar el CTA principal
- Compartir en LinkedIn es viralidad secundaria

**Implementación:**
- CSS: CTA primario usa gradiente + shadow + animación hover + tamaño más grande
- CTA secundario: outline style, más pequeño
- CTA terciario: icono + texto pequeño, sin fondo destacado
- Posición: Agendar primero, arriba y centrado. PDF debajo. Compartir al final.

### 4. Segmentación por UTM (Sin Cookies)

**Decision:** Usar URLSearchParams en tiempo real para personalizar contenido. No persistir preferencias.

**Rationale:**
- Simplifica implementación
- Respeta privacidad (no cookies)
- El contexto de origen no cambia durante la sesión

**Implementación:**
- Extender `getUtmSource()` para detectar más fuentes (email, google, facebook)
- Crear mapa de mensajes por fuente en `utm-messages.ts`
- Componentes `Landing.tsx` y `Results.tsx` consumen estos mensajes condicionalmente

### 5. Guardar y Continuar Explícito

**Decision:** Agregar botón visible "Guardar y salir" durante el cuestionario con modal de confirmación.

**Rationale:**
- El auto-save existe pero es invisible → el usuario no confía
- Un botón explícito reduce ansiedad y permite pausas planificadas
- La sesión ya se guarda automáticamente, el botón solo hace visible este comportamiento

**Implementación:**
- Agregar botón en `Questionnaire.tsx` header (junto a barra de progreso)
- Al hacer click: guarda sesión inmediatamente + muestra modal "Sesión guardada. Puedes cerrar esta pestaña y continuar después."
- El botón de "Volver a Acrux" en cuestionario debe preguntar "¿Guardar progreso antes de salir?"

### 6. Prueba Social en Resultados

**Decision:** JSON estático de testimonios segmentados por nivel de madurez. Mostrar 1-2 testimonios relevantes.

**Rationale:**
- Sin backend requerido
- Fácil de mantener y actualizar
- Segmentación simple por nivel de madurez (Inicial/Emergente vs Desarrollo/Optimización)

**Implementación:**
- Crear `testimonials.ts` con array de testimonios estructurados: `{ quote, author, company, industry, maturityLevel, metric }`
- Función `getTestimonials(maturityLevel)` retorna 2 testimonios del nivel correspondiente
- Componente en `Results.tsx` muestra testimonios debajo del score hero

## Risks / Trade-offs

**[RISK]** LeadForm al final puede reducir captura total de emails vs. interrupción en mitad
→ **Mitigation:** A/B test durante 2 semanas. Métrica: tasa de completitud * tasa de conversión LeadForm. Si el producto baja, rollback a interrupción en pregunta 31 pero con mejor UX (preview de valor antes del form).

**[RISK]** Usuarios abandonan al ver que necesitan datos personales para ver resultados
→ **Mitigation:** Hacer el LeadForm visualmente ligero (solo 2 campos obligatorios: nombre, email). Mostrar preview del reporte como "teaser" para motivar completar.

**[RISK]** Recomendaciones contextuales pueden sentirse genéricas si el usuario tiene baja madurez en muchas dimensiones
→ **Mitigation:** Priorizar las 2 dimensiones MÁS débiles (no las 3). Incluir siempre 1 recomendación "quick win" de bajo esfuerzo/alto impacto.

**[RISK]** Testimonios estáticos pueden sentirse poco auténticos
→ **Mitigation:** Incluir fotos genéricas de stock con nombres realistas. Rotar testimonios periódicamente. Considerar integrar testimonios reales de clientes Acrux en futuro.

## Migration Plan

**Deploy steps:**
1. Deploy en staging
2. Verificar que sessionStorage existente no se corrompe (usuarios con sesiones guardadas)
3. Test mobile (iPhone Safari + Android Chrome)
4. Deploy a producción
5. Monitorear métricas: tasa de completitud, tasa de conversión LeadForm, clicks en "Agendar"
6. A/B test opcional: 50% usuarios ven LeadForm al final, 50% en pregunta 31 (si se decide comparar)

**Rollback:**
- Todos los cambios son client-side. Rollback = revert commit + redeploy.
- Datos de sessionStorage no se ven afectados (estructura compatible).

## Open Questions

1. **¿Incluir phone en LeadForm?** Actualmente se envía vacío. ¿Agregar campo opcional para mejorar calificación de leads?
2. **¿Frecuencia de rotación de testimonios?** ¿Mensual o por deploy?
3. **¿Implementar sistema de badges extendido?** La auditoría sugiere que la gamificación funciona. ¿Agregar badges por dimensiones específicas además de los actuales?
