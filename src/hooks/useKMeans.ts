import { useState, useEffect, useCallback } from 'react'
import type { DataPoint, KMeansResult } from '../workers/kmeans.worker'

interface UseKMeansOptions {
  points: DataPoint[]
  k?: number
  findOptimal?: boolean
  enabled?: boolean
}

export const useKMeans = ({
  points,
  k = 3,
  findOptimal = false,
  enabled = true,
}: UseKMeansOptions) => {
  const [result, setResult] = useState<KMeansResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runClustering = useCallback(() => {
    if (!enabled || points.length < 5) return

    setLoading(true)
    setError(null)

    const worker = new Worker(
      new URL('../workers/kmeans.worker.ts', import.meta.url),
      { type: 'module' }
    )

    worker.onmessage = (e) => {
      const { type, data, error: workerError } = e.data
      
      if (type === 'success') {
        if (findOptimal) {
          // Find optimal k result
          const optimalResult = data.results.find((r: KMeansResult) => r.k === data.k)
          setResult(optimalResult || data.results[0])
        } else {
          setResult(data)
        }
      } else {
        setError(workerError || 'Error en clustering')
      }
      
      setLoading(false)
      worker.terminate()
    }

    worker.onerror = (err) => {
      setError(err.message || 'Error en worker')
      setLoading(false)
      worker.terminate()
    }

    worker.postMessage({ points, k, findOptimal })
  }, [points, k, findOptimal, enabled])

  useEffect(() => {
    runClustering()
  }, [runClustering])

  return { result, loading, error, rerun: runClustering }
}

export default useKMeans
