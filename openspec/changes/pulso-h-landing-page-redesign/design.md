## Context

El landing page de PULSO-H es una SPA React construida con Vite + Tailwind CSS. El diseño actual tiene una estructura de 4 secciones (Hero, Stats, How it Works, CTA Final) que se ha demostrado insuficiente para la conversión. La auditoría comparativa con DIGITAL-H reveló 12 gaps críticos que se agrupan en: social proof, visual hooks, entregables, privacidad, gamificación y urgencia.

**Estado actual:**
- LandingPage.tsx: 140 líneas, 4 secciones básicas
- No hay componentes reutilizables para secciones complejas
- Sin sistema de contadores dinámicos
- Sin integración de testimonios
- Analytics básico con gtag

**Constraints:**
- Sin backend propio (procesamiento local)
- Sin CMS para contenido dinámico
- Dependencias existentes: React Router, Framer Motion, Recharts
- Mobile-first (60%+ tráfico esperado desde móvil)

## Goals / Non-Goals

**Goals:**
- Incrementar tasa de inicio de diagnóstico de 15% a 40%
- Reducir bounce rate del landing de 65% a 35%
- Aumentar captura de emails del 8% al 25%
- Establecer credibilidad científica inmediata
- Manejar objeciones principales (privacidad, tiempo, valor)

**Non-Goals:**
- No modificar el flujo del cuestionario (módulos 1-6)
- No cambiar el algoritmo de cálculo IRP
- No agregar backend ni base de datos
- No modificar el dashboard organizacional
- No implementar sistema de pagos

## Decisions

### 1. Arquitectura de Componentes

**Decision:** Crear componentes modulares reutilizables para cada sección del landing.

**Rationale:**
- Facilita testing unitario
- Permite A/B testing por sección
- Mejora mantenibilidad
- Reutilizable en otros proyectos Acrux

**Implementación:**
```
components/landing/
├── HeroSection.tsx
├── StatsSection.tsx
├── ProfilesSection.tsx
├── ModulesSection.tsx
├── DeliverablesSection.tsx
├── PrivacySection.tsx
├── MethodologySection.tsx
├── TestimonialsSection.tsx
├── PricingSection.tsx
├── GamificationSection.tsx
├── FAQSection.tsx
├── UrgencySection.tsx
└── CTASection.tsx
```

### 2. Contador Dinámico de Usuarios

**Decision:** Simular contador con animación progresiva basada en fecha.

**Rationale:**
- No hay backend para conteo real-time
- El contador debe parecer vivo sin API
- Fácil de implementar y mantener

**Implementación:**
- Valor base: 2,847 (fecha de referencia)
- Incremento: +1 cada 3-5 minutos (aleatorio)
- Almacenar en localStorage la última actualización
- Al cargar, calcular incrementos basados en tiempo transcurrido

### 3. Testimonios Estáticos vs Dinámicos

**Decision:** Usar testimonios estáticos en JSON por ahora.

**Rationale:**
- Sin backend/CMS para gestionar testimonios dinámicos
- Los testimonios no cambian frecuentemente
- Fácil de actualizar manualmente cada mes

**Alternativas consideradas:**
- Google Reviews API (rechazado: requiere setup complejo)
- CMS headless (rechazado: overkill para 3-4 testimonios)
- Firebase Firestore (rechazado: agrega dependencia innecesaria)

### 4. Urgencia/Escasez

**Decision:** "Oferta de lanzamiento: Primeros 500 diagnósticos gratis" en lugar de contador falso.

**Rationale:**
- Más ético que "quedan 12"
- Crear verdadera escasez limitada
- Fácil de implementar con localStorage
- Puede convertirse en oferta real

**Implementación:**
- Contador descendente desde 500
- Decrementar en 1 cada vez que alguien inicia diagnóstico
- Guardar en localStorage
- Mostrar mensaje cuando llegue a 0 ("Oferta finalizada")

### 5. Animaciones con Framer Motion

**Decision:** Usar Framer Motion (ya en dependencias) para animaciones de entrada.

**Rationale:**
- Ya está en el proyecto
- Buen rendimiento
- Fácil de implementar
- Mejora percepción de calidad

**Implementación:**
- Fade-in + slide-up para cada sección
- Stagger children para elementos dentro de sección
- Trigger cuando elemento entra en viewport (Intersection Observer)

## Risks / Trade-offs

**[RISK]** Landing page muy largo puede aumentar tiempo de carga
→ **Mitigation:** Lazy load de imágenes, code splitting por sección, priorizar above-the-fold

**[RISK]** Demasiada información puede abrumar al usuario
→ **Mitigation:** Progresive disclosure, colapsar secciones secundarias, scroll suave

**[RISK]** Contador falso puede dañar reputación si se descubre
→ **Mitigation:** Usar oferta real limitada (500) en lugar de contador fake

**[RISK]** Testimonios estáticos pueden parecer poco auténticos
→ **Mitigation:** Usar nombres y empresas reales (con permiso), incluir foto genérica

**[RISK]** Pricing puede alienar usuarios individuales
→ **Mitigation:** Enfatizar "gratis para individuos", pricing solo visible en sección organizacional

## Migration Plan

**Deploy steps:**
1. Deploy en staging (pulso-h-beta)
2. Verificar renderizado en mobile (iPhone + Android)
3. Testear velocidad de carga (Lighthouse > 90)
4. Verificar analytics events funcionen
5. Deploy a producción con feature flag
6. Monitorear métricas: bounce rate, time on page, scroll depth
7. Si bounce rate < 40%, quitar feature flag

**Rollback:**
- Revertir a versión anterior del LandingPage.tsx
- Todo es aditivo, no hay breaking changes

## Open Questions

1. **¿Tenemos permiso de testimonios reales?** Necesitamos confirmar si podemos usar nombres reales
2. **¿Oferta de 500 es real o simulada?** Decidir si limitamos realmente o es solo para crear urgencia
3. **¿Fotos de perfiles?** ¿Usamos ilustraciones o fotos genéricas de stock?
4. **¿Videos?** ¿Incluir video explicativo en hero o sección?
