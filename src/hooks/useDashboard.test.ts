import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDashboard } from './useDashboard'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns idle state when no evaluation hash is provided', () => {
    const { result } = renderHook(() => useDashboard())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.dashboardData.totalParticipants).toBe(0)
    expect(result.current.dashboardData.isActive).toBe(false)
  })

  it('fetches dashboard data when evaluation hash is provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        evaluation_id: 1,
        is_active: true,
        responses_needed: 0,
        stats: {
          total_responses: 12,
          average_irp: 45.5,
        },
        irp_distribution: [
          { zone: 'verde', count: 2 },
          { zone: 'amarilla', count: 5 },
          { zone: 'naranja', count: 4 },
          { zone: 'roja', count: 1 },
        ],
        profile_distribution: [
          { profile: 'floreciente', count: 3 },
          { profile: 'estable', count: 2 },
          { profile: 'resiliente', count: 1 },
          { profile: 'requete', count: 1 },
          { profile: 'sobrecargado', count: 3 },
          { profile: 'fragil', count: 2 },
        ],
        area_results: [
          { area: 'Ventas', participant_count: 5, average_irp: 52.3 },
          { area: 'TI', participant_count: 7, average_irp: 38.1 },
        ],
      }),
    } as Response)

    const { result } = renderHook(() => useDashboard('abc12345'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(mockFetch).toHaveBeenCalledWith('/api/dashboard.php?hash=abc12345')
    expect(result.current.dashboardData.totalParticipants).toBe(12)
    expect(result.current.dashboardData.averageIRP).toBe(45.5)
    expect(result.current.dashboardData.isActive).toBe(true)
    expect(result.current.dashboardData.responsesNeeded).toBe(0)
    expect(result.current.dashboardData.irpDistribution).toEqual({
      verde: 2,
      amarilla: 5,
      naranja: 4,
      roja: 1,
    })
    expect(result.current.dashboardData.profileDistribution).toEqual({
      floreciente: 3,
      estable: 2,
      resiliente: 1,
      requete: 1,
      sobrecargado: 3,
      fragil: 2,
    })
    expect(result.current.dashboardData.areaResults).toHaveLength(2)
    expect(result.current.dashboardData.areaResults[0].area).toBe('Ventas')
  })

  it('sets error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useDashboard('abc12345'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.message).toBe('Network error')
    expect(result.current.dashboardData.totalParticipants).toBe(0)
  })

  it('sets error state when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Evaluation not found' }),
    } as Response)

    const { result } = renderHook(() => useDashboard('invalid'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).not.toBeNull()
    expect(result.current.error?.message).toContain('404')
  })

  it('fills missing distribution buckets with zero', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        evaluation_id: 2,
        is_active: false,
        responses_needed: 5,
        stats: {
          total_responses: 0,
          average_irp: 0,
        },
        irp_distribution: [],
        profile_distribution: [],
        area_results: [],
      }),
    } as Response)

    const { result } = renderHook(() => useDashboard('empty123'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.dashboardData.irpDistribution).toEqual({
      verde: 0,
      amarilla: 0,
      naranja: 0,
      roja: 0,
    })
    expect(result.current.dashboardData.profileDistribution).toEqual({
      floreciente: 0,
      estable: 0,
      resiliente: 0,
      requete: 0,
      sobrecargado: 0,
      fragil: 0,
    })
    expect(result.current.dashboardData.isActive).toBe(false)
    expect(result.current.dashboardData.responsesNeeded).toBe(5)
  })
})
