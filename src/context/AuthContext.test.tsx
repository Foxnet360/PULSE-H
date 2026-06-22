import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import React from 'react'

describe('AuthContext', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  it('initializes as unauthenticated when status returns not authenticated', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ authenticated: false }), { status: 200 })
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.isAuthenticated).toBe(false))
  })

  it('initializes as authenticated when status returns authenticated', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ authenticated: true }), { status: 200 })
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.isAuthenticated).toBe(true))
  })

  it('returns true and updates state on successful login', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: true }), { status: 200 })
      )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.isAuthenticated).toBe(false))

    let loginResult = false
    await act(async () => {
      loginResult = await result.current.login('correct-password')
    })

    expect(loginResult).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/auth.php',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'correct-password' }),
        credentials: 'include',
      })
    )
  })

  it('returns false and keeps state unauthenticated on failed login', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
      )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.isAuthenticated).toBe(false))

    let loginResult = true
    await act(async () => {
      loginResult = await result.current.login('wrong-password')
    })

    expect(loginResult).toBe(false)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('clears authentication on logout', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: true }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ authenticated: false }), { status: 200 })
      )

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => expect(result.current.isAuthenticated).toBe(true))

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/auth.php',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      })
    )
  })

  it('does not use localStorage for authentication', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ authenticated: false }), { status: 200 })
    )

    renderHook(() => useAuth(), { wrapper })

    expect(localStorage.setItem).not.toHaveBeenCalled()
    expect(localStorage.getItem).not.toHaveBeenCalled()
  })
})
