import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { initSentry } from './utils/sentry.ts'

// Initialize error tracking (only in production)
// @ts-ignore - Vite env types
if (import.meta.env?.PROD) {
  initSentry()
}

// Detectar basename basado en la URL actual
const getBasename = () => {
  const path = window.location.pathname
  if (path.startsWith('/pulso-h-beta/')) return '/pulso-h-beta/'
  if (path.startsWith('/pulso-h/')) return '/pulso-h/'
  return '/'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
