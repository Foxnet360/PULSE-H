# PULSE-H (Herramienta de Bienestar Laboral)

PULSE-H es el leadmagnet de la división de Bienestar Laboral y Cultura Organizacional de **Acrux Consultores**. Esta aplicación funciona como una herramienta de autodiagnóstico sobre el clima y bienestar dentro de las empresas.

En el ecosistema productivo de Acrux, PULSE-H está desplegado en el subdirectorio `acrux.life/pulso-h`.

## Características Principales

- **Diagnóstico Interactivo (36 preguntas):** Evaluación MBI-HSS completa con progreso por pregunta y psicología del costo hundido.
- **Captura de Leads Post-Evaluación:** Modal obligatorio después de la pregunta 36 con consentimiento GDPR/marketing.
- **Thank You Page Intermedia:** Página `/gracias` que muestra perfil, pérdida de productividad estimada y CTA de urgencia.
- **Resultados Optimizados:** Página `/resultados` con jerarquía de CTAs (agendar > descargar PDF > compartir), testimonios dinámicos por perfil, y tracking de eventos.
- **Sistema de Agendamiento Propio:** Calendario embebido en `/agendar` con slots de 30 minutos, formulario pre-poblado y confirmación por email.
- **Email Nurturing Automatizado:** Secuencia de 5 emails (bienvenida, recordatorio 48h, caso de éxito, seguimiento 14d, re-evaluación 30d) vía Resend API.
- **Analytics GA4:** Instrumentación completa del funnel (landing → start → progress → complete → capture → thankyou → results → schedule).
- **Admin Dashboard:** Panel de administración con gestión de citas, hot leads (top 20%), funnel de conversión, historial de eventos por lead, y gestión de disponibilidad.
- **Sistema de Tokens de Diseño Compartidos:** Utiliza los design tokens base de `acrux.life` para garantizar homogeneidad visual en todo el ecosistema.

## Desarrollo Local

Este proyecto está construido con React, Vite y Tailwind CSS (v4).

### Requisitos

- Node.js 18+
- npm

### Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo local
npm run dev

# Compilar para producción
npm run build

# Correr los tests unitarios
npm run test:run
```

## Backend API (PHP)

El backend proporciona endpoints REST para persistencia de datos:

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/lead.php` | POST/GET | CRUD de leads, eventos y scoring |
| `/api/booking.php` | POST/GET/PUT | Gestión de citas (appointments) |
| `/api/availability.php` | GET/PUT | Consulta y gestión de disponibilidad |
| `/api/send-email.php` | POST | Envío de emails vía Resend API |
| `/api/cron/send-emails.php` | CLI | Procesamiento de secuencias de email (cron) |
| `/api/stats.php` | GET | Analytics del funnel de conversión |
| `/api/dashboard.php` | GET | Datos para el admin dashboard |
| `/api/unsubscribe.php` | GET | Handler de baja de emails |

### Configuración Requerida

- **Base de datos MySQL:** Ejecutar `api/schema.sql` para crear tablas
- **Resend API Key:** Configurar `RESEND_API_KEY` en variables de entorno
- **Cron Job:** Configurar en Hostinger para ejecutar `api/cron/send-emails.php` cada hora

## Flujo de Conversión (Funnel)

```
Landing Page (/)
    ↓
Assessment (/evaluar) - 36 preguntas con progreso y sunk cost
    ↓
Lead Capture Modal (obligatorio: email + consentimientos)
    ↓
Thank You Page (/gracias) - Perfil + pérdida de productividad + CTA urgente
    ↓
Results (/resultados) - Informe completo + CTAs + testimonios
    ↓
Schedule (/agendar) - Calendario propio con slots de 30min
    ↓
Confirmation + Email nurturing (5-sequence)
```

## Testing

### Tests Unitarios
```bash
npm run test:run
```

### Tests E2E (Playwright)
```bash
# Instalar browsers (primera vez)
npx playwright install chromium

# Ejecutar tests E2E
npx playwright test
```

### Tests de API (curl)
```bash
# Ejecutar suite de tests del backend
chmod +x api/test-api.sh
./api/test-api.sh https://tu-dominio.com/api
```

### Testing Manual
Ver `TESTING.md` para checklist completo de testing manual incluyendo:
- Flujo E2E del assessment (36 preguntas)
- Lead capture (valid/invalid emails)
- Thank You Page (6 perfiles)
- Results Page CTAs
- Scheduling flow
- Responsive design
- GA4 events verification

## Despliegue

### Deploy Automatizado
```bash
# Deploy a beta
./deploy.sh beta

# Deploy a producción
./deploy.sh production
```

### Pasos Manuales
1. Compilar frontend: `npm run build`
2. Subir `dist/` al servidor
3. Subir `api/` al servidor
4. Aplicar schema SQL si es primera vez: `mysql -u user -p database < api/schema.sql`
5. Configurar variables de entorno (Resend API key)
6. Configurar cron job en Hostinger

### Rollback
En caso de emergencia, ver `ROLLBACK.md` para plan de rollback con feature flags.

## Arquitectura de Despliegue

- **Frontend:** Single Page Application (SPA) en React.
- **Distribución:** Se compila estáticamente y se sirve bajo el directorio `acrux.life/public_html/pulso-h` del servidor principal.
- **CI/CD:** El despliegue de PULSE-H se administra desde los GitHub Actions en el repositorio `acrux.life` (monorepo pipeline de despliegue a través del repositorio raíz).

---
© Acrux Consultores
