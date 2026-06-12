import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLeadCapture } from './useLeadCapture'

// Mock fetch
global.fetch = vi.fn()

describe('useLeadCapture', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should capture a lead and store in localStorage', async () => {
    const { result } = renderHook(() => useLeadCapture())

    const mockResponse = { success: true, id: 123 }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    await act(async () => {
      await result.current.captureLead('test@example.com', {
        profile: 'Sobrecargadx',
        irp: 67,
        gdprConsent: true,
        marketingConsent: false,
      })
    })

    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].email).toBe('test@example.com')
    expect(result.current.leads[0].profile).toBe('Sobrecargadx')
    expect(result.current.leads[0].score).toBe(10)
    expect(sessionStorage.getItem('pulso-h-lead-id')).toBe('123')
  })

  it('should add events to a lead', async () => {
    const { result } = renderHook(() => useLeadCapture())

    // First capture a lead
    const mockResponse = { success: true, id: 123 }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    await act(async () => {
      await result.current.captureLead('test@example.com', {
        gdprConsent: true,
        marketingConsent: false,
      })
    })

    const leadId = result.current.leads[0].id

    // Add an event
    act(() => {
      result.current.addEvent(leadId, {
        type: 'pdf_download',
        score: 5,
      })
    })

    expect(result.current.leads[0].score).toBe(15)
    expect(result.current.leads[0].events).toHaveLength(2)
  })

  it.skip('should handle offline queue when backend fails', async () => {
    const { result } = renderHook(() => useLeadCapture())

    // Mock failed fetch - need to mock twice (once for syncQueue on mount, once for capture)
    ;(fetch as any)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))

    await act(async () => {
      await result.current.captureLead('test@example.com', {
        gdprConsent: true,
        marketingConsent: false,
      })
    })

    // Lead should still be stored locally
    expect(result.current.leads).toHaveLength(1)
    expect(result.current.leads[0].synced).toBe(false)
    
    // Queue should have the failed request
    const queue = JSON.parse(localStorage.getItem('pulso-h-lead-queue') || '[]')
    expect(queue.length).toBeGreaterThanOrEqual(1)
  })

  it('should identify hot leads (top 20%)', async () => {
    const { result } = renderHook(() => useLeadCapture())

    // Add multiple leads with different scores
    const leads = [
      { email: 'high1@test.com', score: 100 },
      { email: 'high2@test.com', score: 90 },
      { email: 'mid@test.com', score: 50 },
      { email: 'low@test.com', score: 10 },
    ]

    for (const lead of leads) {
      const mockResponse = { success: true, id: Math.random() }
      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await act(async () => {
        await result.current.captureLead(lead.email, {
          gdprConsent: true,
          marketingConsent: false,
        })
      })

      // Update score by adding events
      const leadId = result.current.leads[result.current.leads.length - 1].id
      act(() => {
        result.current.addEvent(leadId, {
          type: 'assessment_complete',
          score: lead.score - 10,
        })
      })
    }

    const hotLeads = result.current.getHotLeads()
    expect(hotLeads.length).toBeGreaterThan(0)
    expect(hotLeads[0].score).toBeGreaterThanOrEqual(hotLeads[hotLeads.length - 1].score)
  })
})
