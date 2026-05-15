import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Layout from './components/layout/Layout'
import LoadingScreen from './components/ui/LoadingScreen'

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'))
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'))
const OrganizationAssessmentPage = lazy(() => import('./pages/OrganizationAssessmentPage'))
const ResultsPage = lazy(() => import('./pages/ResultsPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const SchedulePage = lazy(() => import('./pages/SchedulePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Route guard for results - requires lead_id in sessionStorage
const RequireLead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const leadId = sessionStorage.getItem('pulso-h-lead-id')
  const location = useLocation()
  
  if (!leadId) {
    return <Navigate to="/evaluar" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}

// Page wrapper with animation
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
            <Route path="/evaluar" element={<PageWrapper><AssessmentPage /></PageWrapper>} />
            <Route path="/evaluar/:hash" element={<PageWrapper><OrganizationAssessmentPage /></PageWrapper>} />
            <Route path="/gracias" element={<PageWrapper><ThankYouPage /></PageWrapper>} />
            <Route path="/agendar" element={<PageWrapper><SchedulePage /></PageWrapper>} />
            <Route path="/resultados" element={
              <PageWrapper>
                <RequireLead>
                  <ResultsPage />
                </RequireLead>
              </PageWrapper>
            } />
            <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
            <Route path="/privacidad" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

export default App
