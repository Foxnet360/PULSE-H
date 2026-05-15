import { useState, useEffect, useCallback, useRef } from 'react'

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const useAssessmentTimer = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (isRunning) return
    
    setIsRunning(true)
    startTimeRef.current = Date.now() - (elapsedSeconds * 1000)
    
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setElapsedSeconds(elapsed)
      }
    }, 1000)
  }, [isRunning, elapsedSeconds])

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setElapsedSeconds(0)
    startTimeRef.current = null
  }, [])

  const formattedTime = formatTime(elapsedSeconds)
  const minutesElapsed = Math.floor(elapsedSeconds / 60)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    elapsedSeconds,
    isRunning,
    formattedTime,
    minutesElapsed,
    start,
    pause,
    reset,
  }
}

export default useAssessmentTimer
