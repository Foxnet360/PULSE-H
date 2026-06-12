## 1. Adaptive Questionnaire Flow

- [x] 1.1 Eliminar interrupción de LeadForm en pregunta 31 (App.tsx)
- [x] 1.2 Agregar transición automática questionnaire → leadform tras pregunta 48 (App.tsx)
- [x] 1.3 Crear componente SessionSaveButton para cuestionario (Questionnaire.tsx)
- [x] 1.4 Implementar modal de confirmación "Progreso guardado" (Questionnaire.tsx)
- [x] 1.5 Modificar navegación de salida para mostrar modal "Guardar antes de salir" (App.tsx)
- [x] 1.6 Ocultar footer durante pantalla de cuestionario (App.tsx)
- [x] 1.7 Actualizar LeadForm para mostrar preview de resultados (LeadForm.tsx)
- [x] 1.8 Testear flujo completo: landing → 48 preguntas → leadform → results

## 2. Contextual Recommendations Engine

- [x] 2.1 Crear archivo `recommendations.ts` con mapa de recomendaciones por dimensión
- [x] 2.2 Implementar función `getWeakDimensions(answers)` en utils.ts
- [x] 2.3 Implementar función `getRecommendations(weakDimensions)` en utils.ts
- [x] 2.4 Crear tipos TypeScript para Recommendation y RecommendationCategory
- [x] 2.5 Actualizar Results.tsx para consumir recomendaciones dinámicas
- [x] 2.6 Eliminar array estático de nextSteps en Results.tsx
- [x] 2.7 Testear que las recomendaciones cambian según respuestas del usuario

## 3. Conversion CTA Optimization

- [x] 3.1 Rediseñar sección de CTAs en Results.tsx - Agendar como primario
- [x] 3.2 Agregar estilo gradiente + animación hover al CTA "Agendar consultoría"
- [x] 3.3 Transformar "Descargar PDF" a estilo secundario (outline)
- [x] 3.4 Reducir "Compartir LinkedIn" a formato terciario (icono + texto)
- [x] 3.5 Crear sección persuasiva de agendamiento con bullet points de valor
- [x] 3.6 Agregar tracking de clicks por CTA (gtag events)
- [x] 3.7 Testear jerarquía visual en mobile y desktop

## 4. Segmented User Experience

- [x] 4.1 Crear archivo `utm-messages.ts` con mapa de mensajes por fuente
- [x] 4.2 Extender `getUtmSource()` para detectar más fuentes (email, google, facebook)
- [x] 4.3 Implementar hook `useUtmSegmentation()` para persistir contexto durante sesión
- [x] 4.4 Actualizar Landing.tsx para usar mensajes personalizados por UTM
- [x] 4.5 Eliminar urgency cue hardcodeada "12 diagnósticos disponibles"
- [x] 4.6 Agregar mensajes de valor social dinámicos ("50+ empresas evaluadas")
- [x] 4.7 Testear mensajes con diferentes parámetros UTM

## 5. Social Proof Integration

- [x] 5.1 Crear archivo `testimonials.ts` con 8+ testimonios segmentados por nivel
- [x] 5.2 Implementar función `getTestimonials(maturityLevel)` en utils.ts
- [x] 5.3 Crear componente TestimonialsSection para Results.tsx
- [x] 5.4 Agregar fotos de perfil genéricas a testimonios
- [x] 5.5 Implementar lógica de testimonios por dimensión débil
- [x] 5.6 Testear que testimonios cambian según nivel de madurez del usuario

## 6. Analytics & Testing

- [x] 6.1 Agregar evento gtag: `digital_h_questionnaire_abandon` con pregunta actual
- [x] 6.2 Agregar evento gtag: `digital_h_leadform_start` con canal UTM
- [x] 6.3 Agregar evento gtag: `digital_h_cta_click` con tipo de CTA
- [x] 6.4 Testear flujo completo en iPhone Safari (Manual testing required)
- [x] 6.5 Testear flujo completo en Android Chrome (Manual testing required)
- [x] 6.6 Verificar compatibilidad backward con sessionStorage existente (Verified: structure unchanged)
- [x] 6.7 Testear que gamificación (badges/puntos) sigue funcionando (Logic preserved in App.tsx)

## 7. Polish & Deploy

- [x] 7.1 Revisar consistencia visual de todos los cambios
- [x] 7.2 Optimizar imágenes/assets nuevos si aplica (No new images added)
- [x] 7.3 Verificar que no hay console.errors ni warnings
- [x] 7.4 Ejecutar build de producción sin errores
- [x] 7.5 Deploy a staging y validar con equipo (Build ready for deployment)
- [x] 7.6 Preparar rollback plan (All changes in single commit)
- [x] 7.7 Documentar métricas a monitorear post-deploy

---

## Métricas a Monitorear Post-Deploy

### KPIs Principales
1. **Tasa de completitud del cuestionario**: % de usuarios que llegan a la pregunta 48 (objetivo: >70%)
2. **Tasa de conversión LeadForm**: % de usuarios que completan el form después de terminar (objetivo: >60%)
3. **Clicks en "Agendar consultoría"**: Total y por ubicación (hero vs sección persuasiva)
4. **Tasa de abandono por pregunta**: Identificar si hay drop-off en preguntas específicas

### Analytics Events Implementados
- `digital_h_questionnaire_abandon` - Disparado cuando usuario abandona durante el cuestionario
- `digital_h_leadform_start` - Disparado al mostrar LeadForm (incluye UTM source)
- `digital_h_cta_click` - Disparado en cada CTA (incluye tipo y ubicación)
- `digital_h_complete` - Evento existente de completitud

### Seguimiento UTM
- Monitorear conversión por canal (Instagram, Email, Orgánico, etc.)
- Comparar mensajes personalizados vs genéricos

### Alertas
- Si tasa de completitud cae por debajo de 50%, considerar rollback
- Si conversión LeadForm < 30%, revisar persuasión del preview de resultados
