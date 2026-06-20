/**
 * Sentry Error Tracking Configuration
 * Initialize in main.tsx
 */

import * as Sentry from '@sentry/react'

export const initSentry = () => {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env
  const dsn = env?.VITE_SENTRY_DSN
  
  if (!dsn) {
    console.warn('Sentry DSN not configured. Error tracking disabled.')
    return
  }

  Sentry.init({
    dsn,
    environment: env?.MODE || 'production',
    release: env?.VITE_APP_VERSION || '1.0.0',
    
    // Performance monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Tracing
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/acrux\.life\/pulso-h/],
    
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Before sending, filter out PII
    beforeSend(event) {
      // Remove any potentially sensitive data
      if (event.exception && event.exception.values && event.exception.values[0]) {
        // Don't send assessment responses
        const errorMessage = event.exception.values[0].value || ''
        if (errorMessage.includes('response') || errorMessage.includes('assessment')) {
          event.exception.values[0].value = '[Filtered: Assessment data]'
        }
      }
      return event
    },
  })
}

export default initSentry
