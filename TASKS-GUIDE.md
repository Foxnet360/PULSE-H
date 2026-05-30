# PULSO-H - Guía de Tareas Pendientes

## Resumen
**Progreso actual:** 90/111 tareas completadas (81%)
**Tareas restantes:** 21 tareas que requieren acción manual

---

## Tareas Restantes por Categoría

### 1. Configuración de Resend (Email) - 6 tareas

#### 6.1 Sign up for Resend.com account and verify acrux.life domain
**Pasos:**
1. Visitar https://resend.com
2. Crear cuenta gratuita (hasta 100 emails/día)
3. Añadir dominio `acrux.life`
4. Seguir instrucciones de verificación DNS
5. Verificar dominio en el dashboard de Resend

**Tiempo estimado:** 15-30 minutos

#### 6.2 Configure Resend API key in backend environment variables
**Pasos:**
1. En Resend dashboard, ir a API Keys
2. Generar nueva API key
3. Añadir a variables de entorno del servidor:
   ```bash
   export RESEND_API_KEY="re_xxxxxxxx"
   ```
4. Para Hostinger, añadir en `.env` o configurar en panel de control

**Archivo afectado:** `api/config.php` (ya tiene la lógica, solo falta la key)

#### 6.5 Test email sending with all 5 templates
**Prueba rápida con curl:**
```bash
curl -X POST https://TU-DOMINIO.com/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "to": "tu-email@acrux.life",
    "subject": "Test Email",
    "html": "<h1>Test</h1>",
    "text": "Test",
    "lead_id": 1
  }'
```

**Templates a probar:**
1. Welcome (bienvenida)
2. Reminder 48h (recordatorio)
3. Case study (caso de éxito)
4. Follow-up (seguimiento)
5. Re-evaluation (re-evaluación)

#### 6.7 Set up Hostinger cron job
**Pasos:**
1. Acceder a panel de control de Hostinger
2. Ir a "Cron Jobs" o "Tareas Programadas"
3. Crear nuevo cron job:
   - **Comando:** `php /home/u123456789/public_html/pulso-h/api/cron/send-emails.php`
   - **Frecuencia:** Cada hora (`0 * * * *`)
4. Guardar y verificar que se ejecuta correctamente

#### 6.9 Test complete email sequence timing
**Prueba:**
1. Crear lead de prueba
2. Verificar que se crea registro en `email_sequences`
3. Ejecutar cron job manualmente: `php api/cron/send-emails.php`
4. Verificar que emails se envían según timing:
   - Welcome: inmediato
   - Reminder: +48 horas
   - Case study: +7 días
   - Follow-up: +14 días
   - Re-evaluation: +30 días

#### 6.10 Monitor Resend dashboard
**Métricas a verificar:**
- Delivery rate > 95%
- Bounce rate < 5%
- Spam complaint rate < 0.1%

---

### 2. Deploy a Servidores - 10 tareas

#### 1.14, 10.1-10.2 Deploy a Beta
**Requisitos:**
- Acceso SSH a servidor beta
- Credenciales FTP/SCP
- Base de datos MySQL en beta

**Pasos:**
1. Backup actual
2. Subir archivos backend (`api/`)
3. Subir archivos frontend (`dist/`)
4. Ejecutar `api/schema.sql` si es primera vez
5. Configurar variables de entorno
6. Verificar endpoints responden

#### 10.3-10.4 Testing en Beta
- Probar flujo completo con email real
- Verificar Sentry no reporta errores

#### 10.6-10.11 Deploy a Producción
**Checklist:**
- [ ] Schedule deploy en horario de bajo tráfico
- [ ] Backup producción
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Verificar endpoints
- [ ] Monitorear GA4 real-time
- [ ] Monitorear Resend dashboard

---

### 3. Guía de Admin Dashboard para Equipo (10.13)

Ya documentado en código. Características disponibles:

#### Analytics Tab
- Métricas de conversión: leads, citas, hot leads
- Funnel visualization: landing → start → complete → capture → schedule
- Tasas de conversión por etapa

#### Citas Tab
- Lista de citas agendadas
- Filtrado por estado: pending, confirmed, completed, cancelled
- Actualización de estado con un click
- Visualización de lead info

#### Leads Tab
- Hot Leads: Top 20% por score de engagement
- Todos los leads con búsqueda y filtrado
- Click en lead para ver:
  - Historial de eventos (timeline)
  - Estado de secuencia de emails
  - Score y perfil

#### Disponibilidad Tab
- Gestión de slots de 30 minutos
- Click para bloquear/desbloquear
- Vista semanal

---

## Próximos Pasos Recomendados

1. **Prioridad 1:** Configurar Resend (6.1, 6.2)
   - Sin esto, no hay emails funcionando

2. **Prioridad 2:** Deploy a beta (1.14, 10.1, 10.2)
   - Probar en ambiente de staging primero

3. **Prioridad 3:** Configurar cron job (6.7)
   - Activar secuencias de email

4. **Prioridad 4:** Testing completo en beta (10.3, 6.5, 6.9)

5. **Prioridad 5:** Deploy a producción (10.6-10.11)

---

## Scripts de Ayuda

### Verificar estado del sistema
```bash
# Check API endpoints
./api/test-api.sh https://beta.pulso-h.acrux.life/api

# Run E2E tests
npx playwright test

# Check database
mysql -u user -p -e "SELECT COUNT(*) FROM leads; SELECT COUNT(*) FROM appointments;"
```

### Rollback de emergencia
```bash
# Revertir a versión anterior
git revert --no-commit HEAD
git checkout HEAD~1 -- dist/ api/
```

---

## Contactos y Soporte

- **Documentación técnica:** README.md, ROLLBACK.md, TESTING.md
- **Tests E2E:** `e2e/pulso-h.spec.ts`
- **Tests API:** `api/test-api.sh`

**Última actualización:** $(date)
