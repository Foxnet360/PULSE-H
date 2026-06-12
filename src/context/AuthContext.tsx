import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const AUTH_TOKEN_KEY = 'pulso-h-auth-token'
const FALLBACK_PASSWORD = 'acrux-pulso-admin-2024'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  })

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem(AUTH_TOKEN_KEY))
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const login = useCallback((password: string) => {
    const expected = ((import.meta as any).env?.VITE_PULSO_ADMIN_PASSWORD) || FALLBACK_PASSWORD
    if (password === expected) {
      localStorage.setItem(AUTH_TOKEN_KEY, 'authenticated')
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
