## Why

PULSO-H es un lead magnet de ACRUX.life que evalúa bienestar laboral y burnout. La auditoría del embudo reveló que **0% de los usuarios que completan el diagnóstico se convierten en leads capturados**: el componente `LeadCaptureModal` existe pero nunca se integró al flujo, el backend PHP (`api/lead.php`) está completamente construido pero desconectado del frontend, y no existe una estrategia de conversión post-evaluación. Esto representa una pérdida total de oportunidades de negocio para la consultora.

Este cambio transforma PULSO-H de una herramienta de autoevaluación anónima en un **embudo de alta conversión** que: captura leads cualificados al final del cuestionario (no al inicio), aplica psicología del costo hundido para reducir abandono, muestra una página de resultados con urgencia y pérdida de productividad, y culmina con un sistema de agendamiento propio hacia la consultoría de ACRUX.

## What Changes

- **Lead Capture Gateway**: Mover la captura de email del inicio (nunca implementado) al final del cuestionario, bloqueando el acceso a resultados hasta que el usuario proporcione email y consentimiento GDPR. El LeadCaptureModal existente se integra finalmente al flujo post-pregunta 36.
- **Sincronización Backend-Frontend**: Conectar `useLeadCapture` (que hoy solo usa localStorage) con `api/lead.php` existente. Los leads se envían al backend MySQL con scoring automático basado en eventos (assessment_complete, pdf_download, cta_click, call_scheduled).
- **Arquitectura de Micro-compromisos**: Reemplazar el progreso por módulo (6 pasos) con progreso por pregunta individual (1-36), agregar timer visible de tiempo invertido, y mensajes de sunk cost en el 50% y 75% del cuestionario.
- **Thank You Page de Alta Conversión**: Crear una página intermedia `/gracias` que muestre el resultado dinámico (perfil + IRP), un mensaje de pérdida de productividad estimada en horas semanales, benchmark por sector, y cuenta regresiva de urgencia antes de permitir acceso a resultados completos.
- **Optimización de ResultsPage**: Reestructurar jerarquía de CTAs (primario: agendar revisión, secundario: descargar PDF, terciario: compartir), agregar testimonios dinámicos segmentados por perfil de bienestar, e integrar tracking de eventos GA4.
- **Sistema de Agendamiento Propio**: Reemplazar el link externo a Calendly con un calendario propio embebido en `/agendar` con slots de 30 minutos, formulario de captura contextual (con datos del diagnóstico pre-cargados), y backend PHP para gestionar disponibilidad y citas.
- **Email Nurturing Funcional**: Activar la secuencia de 5 emails existente en base de datos mediante integración con servicio de email (Resend) y cron job en Hostinger.

## Capabilities

### New Capabilities
- `lead-capture-gateway`: Sistema de captura de leads post-evaluación con modal obligatorio, validación de email, consentimientos GDPR/marketing, y gate de acceso a resultados.
- `backend-sync`: Sincronización bidireccional entre frontend React y backend PHP para persistencia de leads, eventos de engagement, y secuencias de email.
- `sunk-cost-progress`: Sistema de micro-compromisos visuales incluyendo progreso por pregunta individual (1-36), timer de inversión de tiempo, mensajes contextuales de sunk cost, y handler beforeunload para prevención de abandono.
- `thank-you-page`: Página de resultados intermedia que muestra perfil dinámico, mensaje de pérdida de productividad, benchmark comparativo, y CTA de urgencia antes de acceder al informe completo.
- `conversion-results-page`: Reestructuración de la página de resultados con jerarquía de CTAs optimizada, testimonios dinámicos por perfil, tracking de eventos, y estimación de costo de oportunidad.
- `scheduling-system`: Sistema de agendamiento propio con calendario visual, gestión de slots de disponibilidad, formulario contextual pre-poblado, confirmación por email, y dashboard administrativo de citas.
- `email-nurturing`: Sistema de secuencias de email automatizadas (bienvenida, recordatorio 48h, caso de éxito, seguimiento, re-evaluación) con integración Resend y cron job de envío.
- `analytics-tracking`: Instrumentación de eventos GA4 para funnel completo (landing → start → progress → complete → capture → thankyou → results → schedule) y dashboard de conversión en admin.

### Modified Capabilities
- `assessment-flow`: Modificación del flujo de evaluación para integrar LeadCaptureModal al final del cuestionario en lugar de redirigir directamente a resultados.
- `lead-management`: Extensión del sistema existente de leads para incluir sincronización backend, scoring automático por eventos, y secuencias de nurturing.

## Impact

**Affected files (Frontend):**
- `src/hooks/useLeadCapture.ts` — Conectar a backend, agregar event tracking
- `src/hooks/useAssessment.ts` — Agregar timer, persistencia mejorada
- `src/pages/AssessmentPage.tsx` — Integrar LeadCaptureModal, progreso por pregunta
- `src/pages/ResultsPage.tsx` — Reestructurar CTAs, agregar urgencia, testimonios
- `src/App.tsx` — Agregar rutas /gracias, /agendar, guards de autenticación de lead
- `src/components/leads/LeadCaptureModal.tsx` — Ajustes de integración
- Nuevo: `src/pages/ThankYouPage.tsx`
- Nuevo: `src/pages/SchedulePage.tsx`
- Nuevo: `src/hooks/useAssessmentTimer.ts`
- Nuevo: `src/data/testimonials.ts`

**Affected files (Backend):**
- `api/lead.php` — Extender para aceptar array de eventos
- `api/config.php` — Agregar función de envío de email
- Nuevo: `api/availability.php` — Slots disponibles
- Nuevo: `api/booking.php` — CRUD de citas
- Nuevo: `api/send-email.php` — Envío vía Resend API
- Nuevo: `api/cron/send-emails.php` — Cron job de secuencias
- Actualizar: `api/schema.sql` — Tablas appointments, availability_slots

**Dependencies:**
- Ninguna nueva dependencia npm (usa React Router, motion/lucide existentes)
- Servicio externo: Resend.com (gratis hasta 100 emails/día) para email nurturing
- Infraestructura: Cron job en Hostinger para envío automático de emails

**Breaking Changes:**
- **BREAKING**: Los resultados ya no serán accesibles sin proporcionar email. Usuarios con resultados en sessionStorage previos necesitarán completar el flujo de captura.
- **BREAKING**: La ruta de Calendly externo será reemplazada por `/agendar` propio. Links existentes a Calendly quedarán obsoletos.

**No Breaking Changes:**
- El motor de cálculo MBI-HSS y las 36 preguntas permanecen intactas
- Los perfiles de bienestar (6 perfiles) y dimensiones (6 módulos) no cambian
- El procesamiento 100% local de respuestas se mantiene
- El modelo freemium y evaluaciones organizacionales permanecen operativos
