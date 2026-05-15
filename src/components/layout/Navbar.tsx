import React, { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/evaluar', label: 'Evaluar' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/admin', label: 'Admin' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-accent" />
            <span className="font-display text-xl font-bold text-primary-900">
              PULSO-H
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-accent'
                    : 'text-primary-700 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://acrux.life"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-700 hover:text-accent transition-colors"
            >
              ACRUX
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary-900" />
            ) : (
              <Menu className="w-6 h-6 text-primary-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-primary-100 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-accent bg-accent/5'
                    : 'text-primary-700 hover:bg-primary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://acrux.life"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
            >
              ACRUX
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
