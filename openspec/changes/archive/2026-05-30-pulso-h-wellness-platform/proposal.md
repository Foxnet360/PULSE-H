# PULSO-H — Diagnóstico de Bienestar Laboral y Burnout

## Why

Las empresas latinoamericanas enfrentan una crisis de burnout con prevalencia del 60-94% (Buk 2025) y deben cumplir con normativas de riesgos psicosociales (NOM-035 México, Decreto 2090 Colombia, ISO 45003), pero carecen de herramientas accesibles, anónimas y basadas en evidencia. **PULSO-H** transforma la evaluación de burnout de un cuestionario estático en una plataforma de inteligencia organizacional sobre bienestar, posicionando a ACRUX Consultores como el referente en salud mental laboral de LATAM. El momento es crítico: el 73% de PYMEs con 20-200 empleados nunca han realizado una evaluación formal.

## What Changes

- **Rebrand completo**: Evoluciona "MindGuard" (HTML monolítico) a "PULSO-H" (React SPA profesional) con narrativa humana (mide para sanar, no para catalogar)
- **Arquitectura dual empleado-organización**:
  - **Empleado**: Formulario web anónimo de 36 ítems (6 módulos: Mi Energía, Mi Conexión, Mi Propósito, Mi Entorno, Mi Equilibrio, Mi Fortaleza) con gamificación constructiva
  - **Organización**: Dashboard de análisis agregado con IRP (Índice de Riesgo Psicosocial), clustering, benchmarks y plan de intervención priorizado
- **Modelo freemium**: Gratis hasta 5 empleados; análisis avanzados de pago (Growth/Pro/Enterprise)
- **Captura de leads inteligente**: Formulario previo a resultados + email nurturing de 5 pasos + descuento en consultoría ACRUX
- **Landing page al estilo DIGITAL-H**: Hereda paleta (`#1B2A4A`, `#5C7565`, `#F5A623`), tipografías (Exo 2 + Inter) y componentes de acrux.life
- **Procesamiento local con privacidad total**: Respuestas nunca salen del dispositivo; solo datos agregados con mínimo 5 personas por celda
- **Biblioteca de intervenciones evidence-based**: Recomendaciones por perfil de riesgo que entregan valor inmediato pero dejan espacio para consultoría ACRUX

## Capabilities

### New Capabilities
- `wellness-assessment`: Motor de evaluación de 36 ítems (MBI-HSS adaptado + dimensiones propias: Factores Organizacionales de Riesgo, Conciliación Vida-Trabajo, Recursos de Resiliencia Individual)
- `employee-form`: Formulario web anónimo con escala Likert visual de 7 puntos, validación en tiempo real, guardado en localStorage, 6 módulos progresivos
- `organizational-dashboard`: Dashboard para RRHH con IRP promedio, análisis por área/demografía, clustering K-Means con validación, benchmarks sectoriales anónimos
- `recommendation-engine`: Biblioteca de intervenciones evidence-based priorizadas por perfil de riesgo (individual: gratuito; organizacional: pago)
- `gamification-system`: Sistema de puntos ENERGÍA, badges constructivos (Primer Paso, Mitad del Camino, Finisher, Guardián del Bienestar), niveles de usuario (Observador → Guardián), progreso visual
- `pdf-report-generator`: Generación de informes PDF client-side (individual: perfil + radar + PAP; organizacional: ejecutivo 15-20 páginas)
- `lead-capture`: Captura de leads con consentimiento GDPR, email nurturing sequence de 5 emails en 14 días, integración con consultoría ACRUX (descuento 20% Pro)
- `landing-page`: Landing page PAS (Problem-Agitation-Solution) estilo DIGITAL-H con UTM tracking, social proof, credibilidad ACRUX
- `link-management`: Generación y gestión de links únicos por organización (`acrux.life/pulso-h/e/{hash}`), seguimiento de participación, umbral de 5 empleados para activar dashboard
- `privacy-compliance`: Procesamiento local WebAssembly, anonimato total, consentimiento informado, cumplimiento NOM-035/Decreto 2090/ISO 45003/GDPR

### Modified Capabilities
- *(Ninguna — proyecto greenfield)*

## Impact

- **Repositorio**: Transforma `/home/foxnet360/Documentos/dev/mindguard/` de HTML monolítico (1,567 líneas) a React SPA profesional
- **Stack tecnológico**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Recharts + jsPDF + PapaParse + Motion (Framer Motion successor)
- **Backend**: PHP (producción Hostinger) / Express (desarrollo local) — patrón dual heredado de DIGITAL-H
- **Deploy**: Subdirectorio de acrux.life (`/pulso-h/`) con rsync automatizado, protección de proyectos anidados
- **Base de datos**: MySQL para leads, configuraciones de evaluación y resultados agregados (nunca respuestas individuales)
- **Analytics**: GA4 con eventos personalizados (inicio, completitud, descarga, CTA clicks, conversión plan)
- **Integración marca**: Logo ACRUX, paleta institucional, tipografías Exo 2/Inter, navegación compartida con acrux.life
- **Nuevo ingreso**: Modelo freemium con conversión a consultoría ACRUX (meta: 15% conversión a servicio pagado)

## Referencias

- Documento rector: `/home/foxnet360/Documentos/dev/mindguard/referencia/Bournout.md` (especificación estratégica completa)
- Referencia técnica: `/home/foxnet360/Documentos/dev/mindguard/referencia/mindguar_ref.html` (implementación anterior)
- Patrón de arquitectura: DIGITAL-H (`/home/foxnet360/Documentos/dev/DIGITAL-H/`)
- Plataforma madre: acrux.life (`/home/foxnet360/Documentos/dev/acrux.life/`)
