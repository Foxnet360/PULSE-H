/**
 * PULSO-H Analytics Utility
 * Centralized GA4 event tracking for the conversion funnel
 */

// GA4 Event Names
export const GA4_EVENTS = {
  LANDING_VIEW: 'pulso_h_landing_view',
  ASSESSMENT_START: 'pulso_h_assessment_start',
  QUESTION_ANSWERED: 'pulso_h_question_answered',
  ASSESSMENT_COMPLETE: 'pulso_h_assessment_complete',
  LEAD_CAPTURE_START: 'pulso_h_lead_capture_start',
  LEAD_CAPTURE_COMPLETE: 'pulso_h_lead_capture_complete',
  THANKYOU_VIEW: 'pulso_h_thankyou_view',
  RESULTS_VIEW: 'pulso_h_results_view',
  PDF_DOWNLOAD: 'pulso_h_pdf_download',
  CTA_CLICK: 'pulso_h_cta_click',
  APPOINTMENT_BOOKED: 'pulso_h_appointment_booked',
} as const

interface GA4EventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track a GA4 event
 */
export const trackEvent = (eventName: string, params?: GA4EventParams): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

/**
 * Track page view
 */
export const trackPageView = (pageName: string, params?: GA4EventParams): void => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
    ...params,
  })
}

/**
 * Funnel Events
 */
export const trackLandingView = (source?: string): void => {
  trackEvent(GA4_EVENTS.LANDING_VIEW, {
    source: source || 'direct',
    utm_source: getUtmParam('utm_source'),
    utm_medium: getUtmParam('utm_medium'),
    utm_campaign: getUtmParam('utm_campaign'),
  })
}

export const trackAssessmentStart = (): void => {
  trackEvent(GA4_EVENTS.ASSESSMENT_START)
}

export const trackQuestionAnswered = (questionNumber: number, moduleId: string): void => {
  trackEvent(GA4_EVENTS.QUESTION_ANSWERED, {
    question_number: questionNumber,
    module_id: moduleId,
  })
}

export const trackAssessmentComplete = (durationMinutes: number, profile: string, irp: number): void => {
  trackEvent(GA4_EVENTS.ASSESSMENT_COMPLETE, {
    duration_minutes: durationMinutes,
    profile,
    irp,
  })
}

export const trackLeadCaptureStart = (): void => {
  trackEvent(GA4_EVENTS.LEAD_CAPTURE_START)
}

export const trackLeadCaptureComplete = (profile: string, marketingConsent: boolean): void => {
  trackEvent(GA4_EVENTS.LEAD_CAPTURE_COMPLETE, {
    profile,
    marketing_consent: marketingConsent,
  })
  // Standard GA4 conversion event for unified ecosystem tracking
  trackEvent('generate_lead', {
    lead_source: 'pulse-h',
    profile,
  })
}

export const trackThankYouView = (irp: number): void => {
  trackEvent(GA4_EVENTS.THANKYOU_VIEW, {
    irp,
  })
}

export const trackResultsView = (): void => {
  trackEvent(GA4_EVENTS.RESULTS_VIEW)
}

export const trackPDFDownload = (): void => {
  trackEvent(GA4_EVENTS.PDF_DOWNLOAD)
}

export const trackCTAClick = (type: string): void => {
  trackEvent(GA4_EVENTS.CTA_CLICK, {
    type,
  })
}

export const trackAppointmentBooked = (date: string, time: string): void => {
  trackEvent(GA4_EVENTS.APPOINTMENT_BOOKED, {
    date,
    time,
  })
}

// Helper to get UTM parameters
function getUtmParam(param: string): string | undefined {
  if (typeof window === 'undefined') return undefined
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param) || undefined
}

export default {
  trackEvent,
  trackPageView,
  trackLandingView,
  trackAssessmentStart,
  trackQuestionAnswered,
  trackAssessmentComplete,
  trackLeadCaptureStart,
  trackLeadCaptureComplete,
  trackThankYouView,
  trackResultsView,
  trackPDFDownload,
  trackCTAClick,
  trackAppointmentBooked,
}
