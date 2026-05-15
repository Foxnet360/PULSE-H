import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAssessmentTimer } from './useAssessmentTimer'

describe('useAssessmentTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should start timer and count elapsed seconds', () => {
    const { result } = renderHook(() => useAssessmentTimer())

    expect(result.current.isRunning).toBe(false)
    expect(result.current.elapsedSeconds).toBe(0)

    act(() => {
      result.current.start()
    })

    expect(result.current.isRunning).toBe(true)

    // Advance 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.elapsedSeconds).toBe(5)
    expect(result.current.formattedTime).toBe('00:05')
  })

  it('should pause timer', () => {
    const { result } = renderHook(() => useAssessmentTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    act(() => {
      result.current.pause()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.elapsedSeconds).toBe(3)

    // Advance more time - should not count
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.elapsedSeconds).toBe(3)
  })

  it('should reset timer', () => {
    const { result } = renderHook(() => useAssessmentTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.elapsedSeconds).toBe(0)
    expect(result.current.formattedTime).toBe('00:00')
  })

  it('should calculate minutes elapsed', () => {
    const { result } = renderHook(() => useAssessmentTimer())

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(125000) // 2 minutes 5 seconds
    })

    expect(result.current.minutesElapsed).toBe(2)
    expect(result.current.formattedTime).toBe('02:05')
  })

  it('should format time correctly for various durations', () => {
    const { result } = renderHook(() => useAssessmentTimer())

    act(() => {
      result.current.start()
    })

    // Test 0 seconds
    expect(result.current.formattedTime).toBe('00:00')

    // Test 59 seconds
    act(() => {
      vi.advanceTimersByTime(59000)
    })
    expect(result.current.formattedTime).toBe('00:59')

    // Test 60 seconds (1 minute)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.formattedTime).toBe('01:00')

    // Test 90 seconds (1 minute 30)
    act(() => {
      vi.advanceTimersByTime(30000)
    })
    expect(result.current.formattedTime).toBe('01:30')
  })
})
