## ADDED Requirements

### Requirement: Informe PDF individual
El sistema SHALL generar un PDF profesional con resultados individuales.

#### Scenario: Contenido del informe individual
- **WHEN** el empleado solicita descarga PDF
- **THEN** se genera documento con:
  1. Portada con branding ACRUX
  2. Perfil de bienestar con narrativa empática
  3. Radar de 6 dimensiones
  4. IRP con interpretación
  5. Plan de Acción Personalizado (3 acciones)
  6. Recomendaciones por dimensión
  7. Explicación metodológica (1 página)
  8. Disclaimer legal

#### Scenario: Calidad visual
- **WHEN** se genera el PDF
- **THEN** usa colores institucionales ACRUX
- **AND** incluye tipografías Exo 2 (títulos) e Inter (cuerpo)
- **AND** gráficos son vectores de alta calidad

### Requirement: Informe ejecutivo organizacional
El sistema SHALL generar PDF ejecutivo de 15-20 páginas para organizaciones (plan pago).

#### Scenario: Contenido ejecutivo
- **WHEN** administrador solicita informe ejecutivo
- **THEN** PDF incluye:
  1. Resumen ejecutivo (1 página)
  2. Metodología y muestra
  3. IRP global y distribución de perfiles
  4. Análisis por dimensión con gráficos
  5. Análisis por área/demografía
  6. Clusters identificados
  7. Mapa de calor
  8. Benchmark sectorial
  9. Recomendaciones priorizadas
  10. Plan de intervención (roadmap)
  11. Anexos metodológicos

#### Scenario: Generación client-side vs server
- **WHEN** el informe es individual (< 5 páginas)
- **THEN** se genera completamente client-side con jsPDF
- **WHEN** el informe es ejecutivo (15-20 páginas)
- **THEN** puede usarse server-side generation para mejor performance

### Requirement: Diseño responsive en PDF
El sistema SHALL optimizar PDF para diferentes usos.

#### Scenario: Versión para imprimir
- **WHEN** se genera PDF
- **THEN** existe opción "Versión imprimible" (fondo blanco, sin animaciones)
- **AND** tamaño A4 optimizado

#### Scenario: Versión digital
- **WHEN** se genera PDF
- **THEN** existe opción "Versión digital" (con color, interactiva si el reader lo soporta)
- **AND** incluye enlaces clickeables a recursos

### Requirement: Generación asíncrona
El sistema SHALL manejar la generación de PDF sin bloquear UI.

#### Scenario: Indicador de progreso
- **WHEN** el usuario solicita PDF grande
- **THEN** aparece modal con: "Generando tu informe..." + barra de progreso
- **AND** se estima tiempo restante
- **AND** el usuario puede cancelar

#### Scenario: Notificación de completitud
- **WHEN** el PDF está listo
- **THEN** se inicia descarga automática
- **AND** aparece toast: "Informe descargado exitosamente"

### Requirement: Watermark en versión gratuita
El sistema SHALL incluir marca de agua en PDFs gratuitos.

#### Scenario: Watermark free
- **WHEN** empleado descarga PDF individual (plan Free)
- **THEN** incluye watermark sutil: "Generado con PULSO-H Free - Actualiza para eliminar"
- **AND** CTA al pie: "Tu organización puede acceder al informe ejecutivo completo"

#### Scenario: Sin watermark pago
- **WHEN** organización descarga informe ejecutivo (plan Growth/Pro/Enterprise)
- **THEN** no hay watermark
- **AND** incluye branding ACRUX profesional
