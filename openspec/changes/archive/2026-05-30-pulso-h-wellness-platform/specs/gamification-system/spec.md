## ADDED Requirements

### Requirement: Sistema de puntos ENERGÍA
El sistema SHALL otorgar puntos de ENERGÍA por acciones dentro del diagnóstico.

#### Scenario: Acumulación de puntos
- **WHEN** el empleado completa un ítem → +10 pts
- **WHEN** completa un módulo → +50 pts (bonus)
- **WHEN** completa todo el diagnóstico → +200 pts (bonus)
- **WHEN** toma >10 min (sin prisa) → +25 pts "Reflexivo"
- **WHEN** revisa recomendación → +15 pts
- **WHEN** descarga PDF → +30 pts

#### Scenario: Persistencia de puntos
- **WHEN** el empleado regresa
- **THEN** sus puntos ENERGÍA se recuperan de localStorage
- **AND** se muestra en header/navbar

### Requirement: Sistema de Badges
El sistema SHALL otorgar badges visuales por logros específicos.

#### Scenario: Badges de completitud
- **WHEN** completa módulo 1 → Badge "Primer Paso" 🌱
- **WHEN** completa módulo 3 → Badge "Mitad del Camino" 🌿
- **WHEN** completa módulo 6 → Badge "Finisher" 🌳
- **WHEN** toma >10 min → Badge "Reflexivo" 🐢

#### Scenario: Badges de perfil
- **WHEN** obtiene perfil "Floreciente" → Badge "Guardián del Bienestar" 🛡️
- **WHEN** obtiene perfil "Resiliente" → Badge "Resiliente" 🌈
- **WHEN** agenda llamada ACRUX → Badge "Constructor de Cambio" 🔨

#### Scenario: Badges sociales
- **WHEN** comparte PULSO-H con 3+ colegas → Badge "Embajador" 📢
- **WHEN** completa re-evaluación (90 días) → Badge "Seguidor" 🔄

#### Scenario: Visualización de badges
- **WHEN** el empleado gana un badge
- **THEN** aparece toast notification con animación
- **AND** se añade a colección visible en perfil

### Requirement: Niveles de Usuario
El sistema SHALL implementar 5 niveles de usuario con beneficios progresivos.

#### Scenario: Progresión de niveles
| Nivel | Nombre | Requisito | Beneficio |
|-------|--------|-----------|-----------|
| 1 | Observador | 1 diagnóstico | Informe básico |
| 2 | Consciente | 2 diagnósticos + 5 recomendaciones | Minicurso "3 técnicas" |
| 3 | Practicante | 3 diagnósticos + 1 llamada ACRUX | Descuento 10% consultoría |
| 4 | Embajador | 5 diagnósticos + 3 referidos | Webinar exclusivo mensual |
| 5 | Guardián | 8 diagnósticos + 5 referidos + 1 contrato | Membresía ACRUX Academy 1 año |

#### Scenario: Notificación de nivel
- **WHEN** el usuario alcanza un nuevo nivel
- **THEN** aparece modal de celebración con nuevo beneficio
- **AND** se envía email de felicitación

### Requirement: Barra de progreso visual
El sistema SHALL mostrar progreso del diagnóstico con elementos visuales motivacionales.

#### Scenario: Progreso circular
- **WHEN** el empleado avanza en el diagnóstico
- **THEN** una barra circular se llena con animación suave
- **AND** el color evoluciona: azul claro → verde bosque
- **AND** muestra mensaje contextual:
  - 17%: "Estás tomando el control de tu bienestar"
  - 50%: "¡Mitad del camino! Tu futuro yo te lo agradece"
  - 100%: "Listo. Tu pulso ha sido registrado."

### Requirement: Micro-recompensas
El sistema SHALL incluir micro-interacciones de celebración.

#### Scenario: Celebraciones sutiles
- **WHEN** completa un módulo → Confeti biodegradable (1s)
- **WHEN** descubre insight → "Aha!" visual (bombillo 💡)
- **WHEN** alcanza badge → Toast con sonido suave (opcional)
- **AND** todo respeta `prefers-reduced-motion`

### Requirement: Gamificación organizacional
El sistema SHALL incluir elementos gamíficos para motivar participación colectiva.

#### Scenario: Meta colectiva
- **WHEN** la organización crea evaluación
- **THEN** puede establecer meta: "Si 80% completa esta semana, desbloqueamos benchmark"
- **AND** muestra progreso colectivo en tiempo real

#### Scenario: Desafío de bienestar
- **WHEN** se realizan evaluaciones periódicas
- **THEN** se lanza desafío: "Reduce IRP de tu área 10 pts en 90 días"
- **AND** área ganadora recibe sello "Área Saludable ACRUX"
