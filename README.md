# PULSE-H (Herramienta de Bienestar Laboral)

PULSE-H es el leadmagnet de la división de Bienestar Laboral y Cultura Organizacional de **Acrux Consultores**. Esta aplicación funciona como una herramienta de autodiagnóstico sobre el clima y bienestar dentro de las empresas.

En el ecosistema productivo de Acrux, PULSE-H está desplegado en el subdirectorio `acrux.life/pulso-h`.

## Características Principales

- **Diagnóstico Interactivo:** Formulario diseñado para captar rápidamente la percepción del colaborador/líder.
- **Resultados en Tiempo Real:** Análisis del pulso de la organización y entrega de estrategias/recomendaciones en base al resultado.
- **Captura de Leads (Leadmagnet):** Sistema integrado para que empresas interesadas soliciten asesoría de ACRUX.
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

## Arquitectura de Despliegue

- **Frontend:** Single Page Application (SPA) en React.
- **Distribución:** Se compila estáticamente y se sirve bajo el directorio `acrux.life/public_html/pulso-h` del servidor principal.
- **CI/CD:** El despliegue de PULSE-H se administra desde los GitHub Actions en el repositorio `acrux.life` (monorepo pipeline de despliegue a través del repositorio raíz).

---
© Acrux Consultores
