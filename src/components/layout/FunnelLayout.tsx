import React from 'react'
import FunnelHeader from './FunnelHeader'
import FunnelFooter from './FunnelFooter'
import CookieBanner from '../privacy/CookieBanner'

interface FunnelLayoutProps {
  children: React.ReactNode
  title?: string
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({ children, title = "Acrux | PULSO-H" }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <FunnelHeader title={title} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <FunnelFooter />
      <CookieBanner />
    </div>
  )
}

export default FunnelLayout
