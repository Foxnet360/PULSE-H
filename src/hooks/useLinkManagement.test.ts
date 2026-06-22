import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useLinkManagement } from './useLinkManagement'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('useLinkManagement', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches evaluations on mount', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '1',
          hash: 'abc12345',
          organization_name: 'ACME',
          sector: 'Tecnología',
          expected_participants: 50,
          demographic_fields: JSON.stringify(['area']),
          custom_message: null,
          deadline: null,
          status: 'active',
          created_at: '2026-06-21T00:00:00Z',
        },
      ],
    } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockFetch).toHaveBeenCalledWith('/api/evaluation.php')
    expect(result.current.evaluations).toHaveLength(1)
    expect(result.current.evaluations[0].organizationName).toBe('ACME')
    expect(result.current.activeEvaluations).toHaveLength(1)
    expect(result.current.closedEvaluations).toHaveLength(0)
  })

  it('creates an evaluation via POST', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: '2',
          hash: 'xyz98765',
          organization_name: 'NewOrg',
          sector: 'Salud',
          expected_participants: 20,
          demographic_fields: JSON.stringify(['area', 'role']),
          custom_message: 'Hola',
          deadline: '2026-07-01',
          status: 'active',
          created_at: '2026-06-21T00:00:00Z',
        }),
      } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let created
    await act(async () => {
      created = await result.current.createEvaluation({
        organizationName: 'NewOrg',
        sector: 'Salud',
        expectedParticipants: 20,
        demographicFields: ['area', 'role'],
        customMessage: 'Hola',
        deadline: new Date('2026-07-01'),
        status: 'active',
      })
    })

    expect(created?.hash).toBe('xyz98765')
    expect(result.current.evaluations).toHaveLength(1)
    expect(result.current.evaluations[0].organizationName).toBe('NewOrg')
  })

  it('finds evaluation by hash via GET', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: '3',
        hash: 'findme12',
        organization_name: 'FindMe',
        sector: 'Educación',
        expected_participants: 10,
        demographic_fields: JSON.stringify([]),
        custom_message: null,
        deadline: null,
        status: 'active',
        created_at: '2026-06-21T00:00:00Z',
      }),
    } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    let found
    await act(async () => {
      found = await result.current.getEvaluationByHash('findme12')
    })

    expect(mockFetch).toHaveBeenCalledWith('/api/evaluation.php?hash=findme12')
    expect(found?.organizationName).toBe('FindMe')
  })

  it('closes an evaluation via PUT', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: '4',
            hash: 'closeme1',
            organization_name: 'CloseMe',
            sector: '',
            expected_participants: 10,
            demographic_fields: JSON.stringify([]),
            custom_message: null,
            deadline: null,
            status: 'active',
            created_at: '2026-06-21T00:00:00Z',
          },
        ],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.closeEvaluation('4')
    })

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/evaluation.php?id=4',
      expect.objectContaining({
        method: 'PUT',
        body: expect.stringContaining('closed'),
      })
    )
    expect(result.current.activeEvaluations).toHaveLength(0)
    expect(result.current.closedEvaluations).toHaveLength(1)
  })

  it('deletes an evaluation via DELETE', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: '5',
            hash: 'deleteme',
            organization_name: 'DeleteMe',
            sector: '',
            expected_participants: 10,
            demographic_fields: JSON.stringify([]),
            custom_message: null,
            deadline: null,
            status: 'active',
            created_at: '2026-06-21T00:00:00Z',
          },
        ],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.deleteEvaluation('5')
    })

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/evaluation.php?id=5',
      expect.objectContaining({ method: 'DELETE' })
    )
    expect(result.current.evaluations).toHaveLength(0)
  })

  it('saves a response via POST action=save_response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, id: 99 }),
    } as Response)

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    const mockResult = {
      id: 'result-1',
      profile: 'sobrecargado' as const,
      profileName: 'Sobrecargadx',
      profileDescription: '',
      irp: 67,
      irpZone: 'naranja' as const,
      irpLabel: 'Alto',
      irpDescription: '',
      dimensions: {},
      subscales: {
        ae: { score: 20, rawScore: 20, level: 'alto' as const, label: 'AE', description: '' },
        dp: { score: 15, rawScore: 15, level: 'alto' as const, label: 'DP', description: '' },
        rp: { score: 10, rawScore: 10, level: 'bajo' as const, label: 'RP', description: '' },
      },
      customDimensions: {
        for: { score: 60, rawScore: 60, level: 'alto' as const, label: 'FOR', description: '' },
        cvt: { score: 50, rawScore: 50, level: 'moderado' as const, label: 'CVT', description: '' },
        rri: { score: 40, rawScore: 40, level: 'bajo' as const, label: 'RRI', description: '' },
      },
      timestamp: new Date(),
    }

    let saved
    await act(async () => {
      saved = await result.current.saveResponse('abc12345', mockResult, { area: 'TI' })
    })

    expect(saved).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/evaluation.php',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('save_response'),
      })
    )

    const lastCall = mockFetch.mock.calls[mockFetch.mock.calls.length - 1]
    const body = JSON.parse(lastCall[1].body)
    expect(body.action).toBe('save_response')
    expect(body.hash).toBe('abc12345')
    expect(body.irp).toBe(67)
    expect(body.profile).toBe('sobrecargado')
  })

  it('handles fetch errors without crashing', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useLinkManagement())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.evaluations).toEqual([])
  })
})
