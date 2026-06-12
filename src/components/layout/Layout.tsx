import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieBanner from '../privacy/CookieBanner'
import { useAuth } from '../../context/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar showInternalLinks={isAuthenticated} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default Layout
