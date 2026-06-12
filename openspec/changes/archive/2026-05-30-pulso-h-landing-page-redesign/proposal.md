## Why

El landing page actual de PULSO-H carece de elementos críticos de conversión identificados en la auditoría UX comparativa con DIGITAL-H. La tasa de inicio de diagnóstico está por debajo del 15% debido a: (1) ausencia de social proof y prueba de valor, (2) falta de visualización de los 4 perfiles de bienestar que actúan como hook emocional, (3) no se muestran los entregables concretos que el usuario recibirá, y (4) insuficiente manejo de objeciones sobre privacidad. Estos gaps representan una pérdida estimada del 60-70% de leads potenciales.

## What Changes

- **Hero Section Redesign**: Agregar social proof badge (contador dinámico de usuarios), personalización UTM por fuente de tráfico, múltiples CTAs estratégicos (primario/secundario/terciario) y trust badges visuales
- **Los 4 Perfiles de Bienestar**: Nueva sección visual con tarjetas para Floreciente, Resiliente, Requete y Sobrecargadx, con ilustraciones y descripciones empáticas
- **Los 6 Módulos**: Sección educativa que muestra las 6 dimensiones evaluadas (Mi Energía, Conexión, Propósito, Entorno, Equilibrio, Fortaleza) con tiempo estimado por módulo
- **Entregables Preview**: Sección "Lo que recibirás" con mockup visual del informe, mostrando radar de dimensiones, IRP, Plan de Acción Personalizado y PDF descargable
- **Privacidad y Ética**: Nueva sección detallada que aborda el procesamiento local, anonimato, consentimiento explícito y disclaimer clínico
- **Metodología MBI-HSS**: Sección de credibilidad mostrando la base científica, validación en LATAM y marcos regulatorios (NOM-035, Decreto 2090, ISO 45003)
- **Social Proof**: Testimonios de usuarios reales, contador de diagnósticos completados, logos de empresas que usan PULSO-H
- **Comparativa Individual vs Organizacional**: Tabla comparativa de planes con pricing (Gratuito, Básico $1,500, Profesional $4,500, Enterprise $12,000/año)
- **Gamificación Preview**: Muestra de badges disponibles, sistema de puntos ENERGÍA y barra de progreso
- **FAQ**: Sección de preguntas frecuentes que reduce objeciones
- **Urgencia/Escasez**: Badge de urgencia contextual ("Oferta de lanzamiento: Primeros 500 diagnósticos gratis")
- **Footer Redesign**: Links de navegación, contacto, redes sociales, disclaimer legal
- **CTAs Optimizados**: Jerarquía visual clara - Primario (Comenzar diagnóstico), Secundario (Ver demo), Terciario (Agendar consultoría)

## Capabilities

### New Capabilities
- `social-proof-integration`: Sistema de testimonios, contador de usuarios y logos de empresas
- `profile-visualization`: Visualización de los 4 perfiles de bienestar con tarjetas interactivas
- `modules-education`: Sección educativa de los 6 módulos con progreso visual
- `deliverables-preview`: Preview de entregables con mockup del informe
- `privacy-trust-section`: Sección detallada de privacidad, ética y disclaimers
- `methodology-credibility`: Sección de metodología científica MBI-HSS y validación
- `pricing-comparison`: Tabla comparativa Individual vs Organizacional con pricing
- `gamification-preview`: Preview del sistema de gamificación (badges, puntos, niveles)
- `faq-section`: Sección de preguntas frecuentes
- `urgency-scarcity`: Sistema de urgencia contextual
- `enhanced-hero`: Hero section con múltiples CTAs, UTM tracking y social proof
- `redesigned-footer**: Footer completo con navegación, contacto y legal

### Modified Capabilities
- `landing-page`: Reestructuración completa del layout y flujo visual

## Impact

- **Affected files**:
  - `src/pages/LandingPage.tsx` - Rediseño completo
  - `src/components/` - Nuevos componentes para cada sección
  - `src/styles/` - Posibles ajustes de CSS
  - `public/assets/` - Nuevas imágenes/ilustraciones
- **Dependencies**: Recharts (para radar), Framer Motion (para animaciones)
- **No breaking changes**: Todo es aditivo al layout existente
- **Analytics**: Nuevos eventos de tracking para cada sección y CTA
