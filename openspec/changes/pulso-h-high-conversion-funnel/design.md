## Context

PULSO-H es un lead magnet React + PHP de ACRUX.life que evalúa bienestar laboral mediante 36 preguntas en 6 módulos. El backend PHP (`api/lead.php`, `api/evaluation.php`, `api/dashboard.php`) y la base de datos MySQL están completamente construidos pero desconectados del frontend. El frontend React funciona 100% en localStorage/sessionStorage sin persistencia backend.

El diagnóstico actual tiene un flujo lineal: Landing → Assessment (36 preguntas) → Results. No existe punto de captura de leads, no hay estrategia post-evaluación, y el CTA final es un link externo a Calendly que no pasa contexto del diagnóstico.

Este diseño transforma el flujo en un embudo de alta conversión con gates estratégicos, micro-compromisos, y un sistema de agendamiento propio que mantiene al usuario dentro del ecosistema de ACRUX.

## Goals / Non-Goals

**Goals:**
- Capturar leads cualificados al 100% de usuarios que completan el diagnóstico
- Reducir abandono en la segunda mitad del cuestionario mediante psicología del costo hundido
- Mostrar resultados con mensaje de pérdida de productividad y urgencia para agendar
- Reemplazar Calendly externo con sistema de agendamiento propio embebido
- Sincronizar todos los leads y eventos al backend PHP existente
- Activar secuencias de email nurturing automatizadas
- Instrumentar analytics GA4 para medir el funnel completo

**Non-Goals:**
- No cambiar el motor de cálculo MBI-HSS ni las 36 preguntas
- No modificar el sistema de evaluaciones organizacionales (hash-based)
- No construir un CRM completo (usar backend existente como "CRM lite" por 3-6 meses)
- No implementar autenticación de usuarios (sistema anónimo con email como identificador)
- No migrar a Typeform/ScoreApp (mantener stack React actual)
- No integrar HubSpot en esta fase (preparado para futuro con campo hubspot_id)

## Decisions

### 1. Arquitectura de Flujo: Gate de Lead Post-Evaluación

**Decisión:** El LeadCaptureModal se muestra obligatoriamente después de la pregunta 36, bloqueando el acceso a `/resultados` hasta que el usuario proporcione email válido y consentimiento GDPR.

**Rationale:** 
- Si pedimos email al inicio, perdemos 40-60% de usuarios antes de que vean valor
- Si no pedimos email, capturamos 0% de leads (estado actual)
- El punto óptimo es al final, cuando el usuario ya invirtió 6-8 minutos (sunk cost fallacy)
- El backend PHP ya tiene la tabla `leads` lista para recibir estos datos

**Alternativas consideradas:**
- Email al inicio: Rechazado por tasa de abandono del 60% (aprendizaje de DIGITAL-H)
- Email opcional al final: Rechazado porque captura <20% de leads
- Email en pregunta 24 (2/3): Rechazado porque interrumpe el flujo en punto de fricción máxima

### 2. Sincronización: Backend como Fuente de Verdad

**Decisión:** Los leads se envían inmediatamente al backend via POST `/api/lead.php`. El localStorage se mantiene solo como caché offline y respaldo.

**Rationale:**
- El backend ya está construido y probado
- Permite scoring automático, nurturing, y analytics server-side
- Múltiples dispositivos pueden acceder al mismo perfil si el usuario retorna
- Cumplimiento GDPR: datos centralizados para ejercicio de derechos ARCO

**Flujo de datos:**
```
Frontend React                          Backend PHP (Hostinger)
    │                                         │
    ├─ POST /api/lead.php ───────────────────▶│
    │  {email, profile, irp, consent}         │
    │◀─ {success: true, lead_id: 123}────────┤
    │                                         │
    ├─ sessionStorage.setItem('lead_id', 123) │
    │                                         │
    ├─ POST /api/lead.php (evento) ──────────▶│
    │  {lead_id, event: 'pdf_download'}       │
    │◀─ {success: true}───────────────────────┤
```

### 3. Páginas de Resultados: Thank You Page como Gate Intermedio

**Decisión:** Crear `/gracias` como página intermedia entre Assessment y Results. El usuario ve su resultado dinámico + pérdida de productividad + CTA de agendamiento. Debe hacer click explícito para acceder a `/resultados` con el informe completo.

**Rationale:**
- La Thank You Page es el punto de máxima tensión emocional (acabo de descubrir que estoy en riesgo)
- Mostrar el resultado parcial crea "gancho" sin satisfacer completamente la curiosidad
- El CTA de agendamiento es más efectivo aquí que en la página de resultados detallados
- Los usuarios que no agenden aún pueden ver resultados completos (no es bloqueo total)

**Flujo de navegación:**
```
Assessment complete
    │
    ▼
LeadCaptureModal (obligatorio: email + GDPR)
    │
    ▼
/gracias (Thank You Page)
    ├─ Resultado dinámico (perfil + IRP)
    ├─ Mensaje de pérdida: "Estás perdiendo ~X horas semanales"
    ├─ Benchmark: "El Y% en tu sector tiene mejor bienestar"
    ├─ CTA primario: "Agendar revisión gratuita de 30 min"
    └─ CTA secundario: "Ver mi informe completo" → /resultados
    │
    ▼
/agendar (Sistema de agendamiento propio)
    │
    ▼
Confirmación + Email de confirmación
```

### 4. Progreso Visual: Por Pregunta Individual, No Por Módulo

**Decisión:** Reemplazar el progreso actual (6 módulos) con contador de pregunta 1-36, manteniendo la barra de progreso lineal por ítem.

**Rationale:**
- 36 pasos pequeños generan más micro-compromisos que 6 pasos grandes
- El usuario siente avance continuo, no saltos entre módulos
- Facilita los mensajes de sunk cost en hitos específicos (pregunta 18, 27)
- No requiere cambios en la estructura de datos (las preguntas ya tienen IDs únicos)

**Implementación:**
```typescript
const currentQuestion = responses.filter(r => r.value !== null).length;
const totalQuestions = 36;
const progress = (currentQuestion / totalQuestions) * 100;

// Display: "Pregunta 23 de 36" en lugar de "Módulo 4 de 6"
```

### 5. Sistema de Agendamiento Propio vs. Calendly

**Decisión:** Construir calendario propio embebido en React en lugar de usar Calendly externo.

**Rationale:**
- Mantener al usuario dentro del ecosistema de ACRUX (no cambiar de dominio)
- Pre-fill automático con datos del diagnóstico (perfil, IRP, dimensiones débiles)
- No requiere suscripción mensual a Calendly Pro ($12-15/mes)
- Control total sobre la experiencia UX y branding
- Los slots se gestionan en base de datos propia (tabla `availability_slots`)

**Alternativas consideradas:**
- Calendly embed (gratis): Rechazado porque no permite pre-fill de datos del diagnóstico
- Calendly Pro: Rechazado por costo recurrente y falta de integración con backend propio
- Google Calendar API: Rechazado por complejidad innecesaria para MVP

**Arquitectura del calendario:**
```
Frontend: React Calendar Component (semana actual + siguiente)
    │
    ├─ GET /api/availability.php?date=2024-01-15
    │◀─ [{slot: "09:00", available: true}, {slot: "09:30", available: false}...]
    │
    ├─ POST /api/booking.php
    │  {lead_id, date, time, name, email, notes}
    │◀─ {success: true, appointment_id: 456, meeting_link: "..."}
```

### 6. Email Service: Resend.com

**Decisión:** Usar Resend.com como servicio de email transaccional y nurturing.

**Rationale:**
- Gratis hasta 100 emails/día (suficiente para fase inicial)
- API simple, SDK para JavaScript/PHP disponible
- Excelente deliverability (dominio propio: @acrux.life)
- No requiere configuración DNS compleja inicial (puede enviar desde dominio verificado)
- Facilita migración futura a HubSpot (export de contactos)

**Secuencias implementadas:**
1. **Bienvenida** (inmediato): "Gracias por completar PULSO-H. Tu informe está listo."
2. **Recordatorio 48h** (+48h): "Tu diagnóstico expira en 24h. Agenda tu revisión gratuita."
3. **Caso de éxito** (+7 días): Testimonio de empresa similar que mejoró bienestar
4. **Seguimiento** (+14 días): "¿Cómo va tu plan de acción? Recursos adicionales."
5. **Re-evaluación** (+30 días): "Re-evalúa tu bienestar. ¿Has mejorado?"

### 7. Analytics: GA4 + Backend Events

**Decisión:** Instrumentar GA4 para tracking client-side y backend para tracking server-side de leads.

**Eventos GA4:**
```javascript
// Funnel completo
gtag('event', 'pulso_h_landing_view');
gtag('event', 'pulso_h_assessment_start');
gtag('event', 'pulso_h_question_answered', { question_number: 23, module: 'energia' });
gtag('event', 'pulso_h_assessment_complete', { duration_minutes: 8, profile: 'sobrecargadx' });
gtag('event', 'pulso_h_lead_capture_start');
gtag('event', 'pulso_h_lead_capture_complete', { profile: 'sobrecargadx', marketing_consent: true });
gtag('event', 'pulso_h_thankyou_view', { irp: 67 });
gtag('event', 'pulso_h_results_view');
gtag('event', 'pulso_h_pdf_download');
gtag('event', 'pulso_h_cta_click', { type: 'schedule' });
gtag('event', 'pulso_h_appointment_booked', { date: '2024-01-20', time: '10:00' });
```

**Backend tracking (tabla lead_events):**
```sql
INSERT INTO lead_events (lead_id, event_type, event_data, score_value) 
VALUES (123, 'assessment_complete', '{"irp": 67, "profile": "sobrecargadx"}', 10);
```

### 8. Estado de Lead: SessionStorage como Token Temporal

**Decisión:** Usar `sessionStorage` (no localStorage) para almacenar el `lead_id` temporalmente durante la sesión.

**Rationale:**
- sessionStorage se limpia al cerrar pestaña (mejor privacidad)
- Si el usuario retorna días después, puede re-identificarse con su email
- No requiere JWT ni sistema de autenticación complejo
- El backend valida que el lead_id existe y está activo en cada request

## Risks / Trade-offs

**[RISK] Bloqueo de results puede generar frustración y abandono**
→ Mitigación: El usuario SIEMPRE puede acceder a resultados después de dar email (no es paywall). El modal explica claramente el valor: "Para generar tu informe personalizado y enviártelo por email". La Thank You Page muestra el resultado principal inmediatamente.

**[RISK] Backend PHP en Hostinger compartido puede ser lento para POST síncronos**
→ Mitigación: Los POST a lead.php son asíncronos (fetch con .catch() silencioso). Si falla, el usuario no se bloquea; se reintenta en background. localStorage funciona como fallback.

**[RISK] Email nurturing puede ser marcado como spam**
→ Mitigación: Resend.com tiene buena reputación. Se implementará double opt-in (consentimiento explícito en checkbox). Unsubscribe link en cada email. Warm-up progresivo (empezar con 10 emails/día, escalar).

**[RISK] Usuarios existentes con resultados en sessionStorage se verán afectados**
→ Mitigación: Período de transición de 30 días donde `/resultados` acepta tanto lead_id como resultados legacy en sessionStorage. Banner informativo: "Para guardar tus resultados permanentemente, proporciona tu email."

**[RISK] Sistema de agendamiento propio requiere gestión manual de disponibilidad**
→ Mitigación: MVP con slots hardcodeados (Lun-Mie 9:00-17:00, 30min). Tabla `availability_slots` permite escalar a gestión dinámica por admin más adelante. Calendly link de fallback si el sistema propio falla.

**[RISK] Costo de Resend.com al escalar más de 100 emails/día**
→ Mitigación: Plan gratuito es suficiente para <3000 leads/mes. A $0.0001/email en plan Starter ($20/mes para 50,000 emails). Migración a HubSpot email nativo cuando se integre CRM.

## Migration Plan

**Fase 1: Deploy (Semana 1)**
1. Backup de base de datos actual
2. Ejecutar migración SQL (tablas appointments, availability_slots)
3. Deploy frontend con feature flags (nuevas rutas desactivadas inicialmente)
4. Activar LeadCaptureModal en flujo (feature flag: `lead_capture_enabled`)
5. Verificar POST /api/lead.php recibe datos correctamente

**Fase 2: Validación (Semana 2)**
1. Testing manual del flujo completo
2. Verificar emails de bienvenida se envían
3. Revisar funnel en GA4 Real-time
4. A/B test: comparar conversión con/sin Thank You Page

**Fase 3: Rollback**
- Si conversión cae >20%: desactivar feature flag `lead_capture_enabled`
- Si backend falla: frontend usa localStorage como fallback (comportamiento actual)
- Revertir deploy con `./deploy.sh beta` y luego producción

## Open Questions

1. ¿Cuántos slots de agendamiento disponibles por semana? (determina tamaño de tabla availability_slots)
2. ¿Quién recibe las notificaciones de nuevas citas? ¿Email al psicólogo o dashboard admin?
3. ¿Zoom, Google Meet, o sin link virtual para las sesiones de 30 min?
4. ¿La secuencia de nurturing incluye ofertas/promociones o solo contenido educativo?
5. ¿Se requiere doble opt-in para emails de marketing o solo el checkbox inicial es suficiente?
