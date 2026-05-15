# Tasks

## Fase 1: Crítico (Conversion Core)

### T1: Enhanced Hero Section ✅
- **Priority**: P0
- **Scope**: Rediseñar hero con social proof badge, contador de usuarios, trust badges
- **File**: `src/components/landing/HeroSection.tsx`
- **Acceptance**:
  - [x] Badge "Desarrollado por psicólogos organizacionales" visible
  - [x] Contador dinámico de diagnósticos completados (2,847+)
  - [x] Trust badges: 8 minutos, 100% anónimo, Basado en evidencia
  - [x] CTA primario: "Comenzar diagnóstico gratuito"
  - [x] CTA secundario: "Ver cómo funciona"
  - [x] Responsive mobile-first

### T2: Social Proof Badge ✅
- **Priority**: P0
- **Scope**: Badge flotante con contador animado
- **File**: `src/components/landing/SocialProofBadge.tsx`
- **Acceptance**:
  - [x] Número animado con incremento progresivo
  - [x] Texto "2,847 profesionales ya evaluaron su bienestar"
  - [x] Se actualiza basado en localStorage
  - [x] Visible en hero y secciones clave

### T3: Los 4 Perfiles de Bienestar ✅
- **Priority**: P0
- **Scope**: Sección visual con 4 tarjetas interactivas
- **File**: `src/components/landing/ProfilesSection.tsx`
- **Acceptance**:
  - [x] 4 tarjetas: Floreciente, Resiliente, Requete, Sobrecargadx
  - [x] Cada tarjeta con color distintivo, icono y descripción
  - [x] Hover effects con Framer Motion
  - [x] Texto empático y no estigmatizante

### T4: Entregables Preview ✅
- **Priority**: P0
- **Scope**: Sección "Lo que recibirás" con mockup
- **File**: `src/components/landing/DeliverablesSection.tsx`
- **Acceptance**:
  - [x] Mockup visual del informe
  - [x] Lista de entregables: IRP, Radar, Plan de Acción, PDF
  - [x] Preview de dashboard
  - [x] CTA "Ver ejemplo de informe"

## Fase 2: Importante (Trust & Education)

### T5: Privacidad y Ética ✅
- **Priority**: P1
- **Scope**: Sección detallada de privacidad
- **File**: `src/components/landing/PrivacySection.tsx`
- **Acceptance**:
  - [x] Procesamiento local explicado
  - [x] Anonimato garantizado
  - [x] Consentimiento explícito
  - [x] Disclaimer clínico
  - [x] Iconos de seguridad (Shield, Lock)

### T6: Metodología MBI-HSS ✅
- **Priority**: P1
- **Scope**: Sección de credibilidad científica
- **File**: `src/components/landing/MethodologySection.tsx`
- **Acceptance**:
  - [x] Mención de Maslach Burnout Inventory
  - [x] Validación en LATAM
  - [x] Marcos regulatorios: NOM-035, Decreto 2090, ISO 45003
  - [x] Stats de confiabilidad (α = .89)

### T7: Los 6 Módulos ✅
- **Priority**: P1
- **Scope**: Sección educativa de dimensiones
- **File**: `src/components/landing/ModulesSection.tsx`
- **Acceptance**:
  - [x] 6 módulos: Mi Energía, Conexión, Propósito, Entorno, Equilibrio, Fortaleza
  - [x] Tiempo estimado por módulo (~1.3 min)
  - [x] Iconos representativos
  - [x] Barra de progreso visual

## Fase 3: Conversión (Objection Handling)

### T8: Testimonios ✅
- **Priority**: P1
- **Scope**: Carrusel de testimonios
- **File**: `src/components/landing/TestimonialsSection.tsx`
- **Acceptance**:
  - [x] 3-4 testimonios con foto, nombre, cargo
  - [x] Carrusel automático
  - [x] Estrellas de rating
  - [x] Responsive

### T9: Comparativa Individual vs Organizacional ✅
- **Priority**: P2
- **Scope**: Tabla comparativa de planes
- **File**: `src/components/landing/PricingSection.tsx`
- **Acceptance**:
  - [x] Plan Gratuito (1-5 empleados)
  - [x] Plan Básico $1,500/año
  - [x] Plan Profesional $4,500/año
  - [x] Plan Enterprise $12,000/año
  - [x] Feature comparison table

### T10: FAQ ✅
- **Priority**: P2
- **Scope**: Preguntas frecuentes
- **File**: `src/components/landing/FAQSection.tsx`
- **Acceptance**:
  - [x] 6-8 preguntas frecuentes
  - [x] Acordeón colapsable
  - [x] Categorías: General, Privacidad, Técnico, Pricing

## Fase 4: Optimización (Engagement)

### T11: Gamificación Preview ✅
- **Priority**: P2
- **Scope**: Preview de sistema de gamificación
- **File**: `src/components/landing/GamificationSection.tsx`
- **Acceptance**:
  - [x] Badges disponibles
  - [x] Sistema de puntos ENERGÍA
  - [x] Barra de progreso
  - [x] CTA "Descubre tu perfil"

### T12: Urgencia/Escasez ✅
- **Priority**: P2
- **Scope**: Badge de urgencia contextual
- **File**: `src/components/landing/UrgencySection.tsx`
- **Acceptance**:
  - [x] Contador descendente desde 500
  - [x] Texto "Oferta de lanzamiento"
  - [x] Se actualiza con localStorage
  - [x] Diseño no intrusivo

### T13: Footer Redesign ✅
- **Priority**: P2
- **Scope**: Footer completo
- **File**: `src/components/landing/FooterSection.tsx`
- **Acceptance**:
  - [x] Links de navegación
  - [x] Contacto ACRUX
  - [x] Redes sociales
  - [x] Disclaimer legal
  - [x] Copyright

## Integration

### T14: LandingPage Integration ✅
- **Priority**: P0
- **Scope**: Integrar todos los componentes en LandingPage.tsx
- **File**: `src/pages/LandingPage.tsx`
- **Acceptance**:
  - [x] Todos los componentes importados y renderizados
  - [x] Orden lógico de secciones
  - [x] Scroll suave entre secciones
  - [x] CTAs funcionales

### T15: Animations & Transitions ✅
- **Priority**: P1
- **Scope**: Animaciones con Framer Motion
- **File**: `src/components/landing/` (varios)
- **Acceptance**:
  - [x] Fade-in al entrar en viewport
  - [x] Stagger children
  - [x] Smooth scroll
  - [x] No bloquear renderizado

## Testing & Deploy

### T16: Testing ✅
- **Priority**: P1
- **Scope**: Verificar funcionamiento
- **Acceptance**:
  - [x] No errores de compilación
  - [x] Responsive en mobile/tablet/desktop
  - [x] CTAs navegan correctamente
  - [x] localStorage funciona

### T17: Deploy
- **Priority**: P1
- **Scope**: Despliegue a staging y producción
- **Acceptance**:
  - [ ] Deploy a staging (pulso-h-beta)
  - [ ] Verificar en mobile
  - [ ] Lighthouse score > 90
  - [ ] Deploy a producción
