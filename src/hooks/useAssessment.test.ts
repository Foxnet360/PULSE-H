import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAssessment } from '../hooks/useAssessment'
import { assessmentModules } from '../data/assessmentData'

describe('useAssessment Integration', () => {
  beforeEach(() => {
    // localStorage is mocked in setup.ts
  })

  it('initializes with null assessment', () => {
    const { result } = renderHook(() => useAssessment())
    
    expect(result.current.assessment).toBeNull()
    expect(result.current.responses).toEqual([])
    expect(result.current.currentModule).toBe(0)
    expect(result.current.isComplete).toBe(false)
    expect(result.current.progress).toBe(0)
  })

  it('starts a new assessment', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    expect(result.current.assessment).not.toBeNull()
    expect(result.current.assessment?.id).toBe('test-uuid-123')
    expect(result.current.assessment?.evaluationHash).toBe('individual')
    expect(result.current.responses.length).toBeGreaterThan(0)
    expect(result.current.currentModule).toBe(0)
  })

  it('sets response for an item', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    const firstItemId = result.current.responses[0].itemId
    
    act(() => {
      result.current.setResponse(firstItemId, 4)
    })
    
    const updatedResponse = result.current.responses.find(r => r.itemId === firstItemId)
    expect(updatedResponse?.value).toBe(4)
  })

  it('navigates between modules', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    expect(result.current.currentModule).toBe(0)
    
    act(() => {
      result.current.nextModule()
    })
    
    expect(result.current.currentModule).toBe(1)
    
    act(() => {
      result.current.prevModule()
    })
    
    expect(result.current.currentModule).toBe(0)
  })

  it('does not go below module 0', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    act(() => {
      result.current.prevModule()
    })
    
    expect(result.current.currentModule).toBe(0)
  })

  it('does not go above last module', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    // Try to go past last module
    for (let i = 0; i < assessmentModules.length + 2; i++) {
      act(() => {
        result.current.nextModule()
      })
    }
    
    expect(result.current.currentModule).toBe(assessmentModules.length - 1)
  })

  it('calculates progress correctly', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    // Initially 0 progress
    expect(result.current.progress).toBe(0)
    
    // Answer half the items
    const halfItems = Math.floor(result.current.responses.length / 2)
    for (let i = 0; i < halfItems; i++) {
      act(() => {
        result.current.setResponse(result.current.responses[i].itemId, 3)
      })
    }
    
    expect(result.current.progress).toBeGreaterThan(0)
    expect(result.current.progress).toBeLessThan(100)
  })

  it('generates result when all items answered', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    // Answer all items
    result.current.responses.forEach((response) => {
      act(() => {
        result.current.setResponse(response.itemId, 3)
      })
    })
    
    const assessmentResult = result.current.getResult()
    
    expect(assessmentResult).not.toBeNull()
    expect(assessmentResult?.profile).toBeDefined()
    expect(assessmentResult?.irp).toBeGreaterThanOrEqual(0)
    expect(assessmentResult?.irp).toBeLessThanOrEqual(100)
  })

  it('returns null result when assessment not started', () => {
    const { result } = renderHook(() => useAssessment())
    
    const assessmentResult = result.current.getResult()
    expect(assessmentResult).toBeNull()
  })

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    act(() => {
      result.current.setResponse(result.current.responses[0].itemId, 4)
    })
    
    expect(localStorage.setItem).toHaveBeenCalled()
    const lastCall = (localStorage.setItem as any).mock.calls[(localStorage.setItem as any).mock.calls.length - 1]
    expect(lastCall[0]).toBe('pulso-h-assessment')
    
    const saved = JSON.parse(lastCall[1])
    expect(saved.assessment).toBeDefined()
    expect(saved.responses).toBeDefined()
    expect(saved.currentModule).toBeDefined()
  })

  it('loads from localStorage', () => {
    const savedData = {
      assessment: {
        id: 'saved-uuid',
        evaluationHash: 'test-hash',
        startedAt: new Date().toISOString(),
      },
      responses: [
        { itemId: 'ae-1', value: 3 },
        { itemId: 'ae-2', value: 4 },
      ],
      currentModule: 2,
    }
    
    ;(localStorage.getItem as any).mockReturnValue(JSON.stringify(savedData))
    
    const { result } = renderHook(() => useAssessment())
    
    // Wait for useEffect to run
    expect(result.current.assessment).not.toBeNull()
    expect(result.current.currentModule).toBe(2)
    expect(result.current.responses.length).toBe(2)
  })

  it('clears assessment', () => {
    const { result } = renderHook(() => useAssessment())
    
    act(() => {
      result.current.startAssessment()
    })
    
    expect(result.current.assessment).not.toBeNull()
    
    act(() => {
      result.current.clearAssessment()
    })
    
    expect(result.current.assessment).toBeNull()
    expect(result.current.responses).toEqual([])
    expect(result.current.currentModule).toBe(0)
  })
})
