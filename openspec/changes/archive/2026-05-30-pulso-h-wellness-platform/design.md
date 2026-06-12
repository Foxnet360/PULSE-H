# Design: PULSO-H — Arquitectura Técnica

## Context

PULSO-H evoluciona desde MindGuard (HTML monolítico de 1,567 líneas) hacia una SPA React profesional que mantiene el procesamiento client-side por privacidad pero añade arquitectura moderna, gamificación y modelo freemium.

**Restricciones clave**:
- Debe deployarse como subdirectorio de acrux.life (`/pulso-h/`)
- Procesamiento local: respuestas nunca tocan servidor
- Heredar estilos de DIGITAL-H/acrux.life
- PHP en producción (Hostinger), Express en desarrollo

## Goals / Non-Goals

**Goals:**
- Arquitectura modular que soporte 6 módulos de evaluación (36 ítems)
- Procesamiento completamente local con Web Workers para cálculos pesados
- Gamificación con localStorage (sin backend para datos sensibles)
- Dashboard organizacional con datos agregados (solo metadata en servidor)
- Landing PAS con conversión optimizada
- Generación PDF client-side

**Non-Goals:**
- Backend real-time (no websockets)
- App nativa móvil (PWA puede venir luego)
- Integración con plataformas HR en MVP
- Machine learning avanzado (K-Means básico es suficiente)

## Decisions

### ADR-1: React 19 + Vite (no Next.js)
**Rationale**: SPA estática que no necesita SSR. Vite es más rápido que CRA y genera build optimizado para static hosting. DIGITAL-H ya usa este patrón.

**Alternatives**: Next.js (overkill para SPA), Remix (mismo problema)

### ADR-2: Tailwind CSS v4 (no v3)
**Rationale**: v4 tiene mejor performance, nuevo engine CSS-first, y theme configuración más limpia. Alineado con DIGITAL-H upgrade path.

**Alternatives**: v3 (legacy), CSS Modules (más verbose)

### ADR-3: Recharts (no Chart.js)
**Rationale**: Integración nativa con React, declarative API, tree-shakeable. Chart.js requiere wrappers imperativos. Radar charts y gauges se implementan más limpio.

**Alternatives**: Chart.js (usado en MindGuard original), D3.js (too low-level)

### ADR-4: jsPDF + html2canvas (no pdfmake)
**Rationale**: DIGITAL-H ya usa jsPDF + autotable. Consistencia de stack. Permite generar PDFs complejos con tablas y gráficos.

**Alternatives**: pdfmake (más verbose), Puppeteer (requiere servidor)

### ADR-5: Dual Backend PHP/Express
**Rationale**: Hostinger shared hosting solo soporta PHP. Para desarrollo local usamos Express + MySQL. Mismo patrón que DIGITAL-H.

### ADR-6: localStorage (no IndexedDB)
**Rationale**: Para guardado de progreso y gamificación, localStorage es suficiente. Datos estructurados simples (< 5MB). IndexedDB añade complejidad innecesaria.

**Alternatives**: IndexedDB (overkill), sessionStorage (no persiste entre sesiones)

### ADR-7: K-Means JS puro (no ml-kmeans)
**Rationale**: Biblioteca ml-kmeans añade dependencia. Implementación K-Means es trivial (~100 líneas) y evitamos bundle bloat.

### ADR-8: Web Workers para Clustering
**Rationale**: K-Means con 500+ empleados puede bloquear UI. Web Worker mantiene 60fps durante análisis.

## Risks / Trade-offs

**[Riesgo]** Client-side processing limita datasets grandes (> 1000 empleados)
→ **Mitigación**: Para Enterprise, ofrecer procesamiento server-side opcional con consentimiento explícito

**[Riesgo]** Safari localStorage limitado a 5MB
→ **Mitigación**: Compress datos con lz-string. Fallback a sessionStorage si excede.

**[Riesgo]** Generación PDF en mobile es lenta
→ **Mitigación**: Mostrar spinner con progreso. Opción "recibir por email" para mobile.

**[Riesgo]** Bypass de límite freemium (5 empleados)
→ **Mitigación**: Server-side validation en link-management. Hash rate-limiting.

**[Trade-off]** No usar WebAssembly (mencionado en Bournout.md)
→ js puro es suficiente para cálculos. WASM añade complejidad de build.

## Migration Plan

1. **Bootstrap** (semana 1): Crear estructura React + Vite + Tailwind v4
2. **Motor** (semana 2): Implementar wellness-assessment engine (36 ítems)
3. **UI** (semana 3): Employee-form + landing-page + gamification-system
4. **Dashboard** (semana 4): Organizational-dashboard + recommendation-engine
5. **Export** (semana 5): PDF-report-generator + lead-capture
6. **Backend** (semana 6): PHP API + link-management + email nurturing
7. **Polish** (semana 7): Animaciones, responsive, testing, deploy

**Rollback**: Deploy a subdirectorio nuevo (`/pulso-h-beta/`) antes de migrar `/pulso-h/`.

## Open Questions

1. ¿Usar Zustand o React Context para estado global? (Context es suficiente para MVP)
2. ¿Implementar PWA desde el inicio o post-MVP? (Post-MVP)
3. ¿Usar React Router o SPA manual hash-based? (React Router para futura escalabilidad)
