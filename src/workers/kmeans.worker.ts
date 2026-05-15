/**
 * K-Means Clustering Algorithm
 * Pure JavaScript implementation for Web Worker
 */

export interface DataPoint {
  id: string
  values: number[]
  [key: string]: any
}

export interface Cluster {
  id: number
  centroid: number[]
  points: DataPoint[]
  size: number
}

export interface KMeansResult {
  clusters: Cluster[]
  k: number
  iterations: number
  inertia: number
  silhouette: number
}

// Calculate Euclidean distance between two points
function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i]
    sum += diff * diff
  }
  return Math.sqrt(sum)
}

// Initialize centroids using k-means++
function initializeCentroids(points: DataPoint[], k: number): number[][] {
  const centroids: number[][] = []
  const used = new Set<number>()
  
  // First centroid: random
  let firstIndex = Math.floor(Math.random() * points.length)
  centroids.push([...points[firstIndex].values])
  used.add(firstIndex)
  
  // Remaining centroids
  for (let i = 1; i < k; i++) {
    const distances = points.map((point) => {
      let minDist = Infinity
      for (const centroid of centroids) {
        const dist = euclideanDistance(point.values, centroid)
        if (dist < minDist) minDist = dist
      }
      return minDist * minDist
    })
    
    const totalDistance = distances.reduce((sum, d) => sum + d, 0)
    let random = Math.random() * totalDistance
    
    let selectedIndex = 0
    for (let j = 0; j < distances.length; j++) {
      random -= distances[j]
      if (random <= 0) {
        selectedIndex = j
        break
      }
    }
    
    if (!used.has(selectedIndex)) {
      centroids.push([...points[selectedIndex].values])
      used.add(selectedIndex)
    } else {
      // Fallback: pick first unused
      for (let j = 0; j < points.length; j++) {
        if (!used.has(j)) {
          centroids.push([...points[j].values])
          used.add(j)
          break
        }
      }
    }
  }
  
  return centroids
}

// Run K-Means clustering
function kmeans(points: DataPoint[], k: number, maxIterations = 100): KMeansResult {
  if (points.length < k) {
    throw new Error('Not enough points for k clusters')
  }
  
  let centroids = initializeCentroids(points, k)
  let iterations = 0
  let converged = false
  let clusters: Cluster[] = []
  
  while (!converged && iterations < maxIterations) {
    // Assign points to nearest centroid
    clusters = centroids.map((centroid, id) => ({
      id,
      centroid: [...centroid],
      points: [],
      size: 0,
    }))
    
    for (const point of points) {
      let minDist = Infinity
      let clusterId = 0
      
      for (let i = 0; i < centroids.length; i++) {
        const dist = euclideanDistance(point.values, centroids[i])
        if (dist < minDist) {
          minDist = dist
          clusterId = i
        }
      }
      
      clusters[clusterId].points.push(point)
      clusters[clusterId].size++
    }
    
    // Update centroids
    const newCentroids = clusters.map((cluster) => {
      if (cluster.points.length === 0) {
        return cluster.centroid
      }
      
      const newCentroid = new Array(cluster.points[0].values.length).fill(0)
      for (const point of cluster.points) {
        for (let i = 0; i < point.values.length; i++) {
          newCentroid[i] += point.values[i]
        }
      }
      
      for (let i = 0; i < newCentroid.length; i++) {
        newCentroid[i] /= cluster.points.length
      }
      
      return newCentroid
    })
    
    // Check convergence
    converged = true
    for (let i = 0; i < centroids.length; i++) {
      if (euclideanDistance(centroids[i], newCentroids[i]) > 0.0001) {
        converged = false
        break
      }
    }
    
    centroids = newCentroids
    iterations++
  }
  
  // Calculate inertia (sum of squared distances to nearest centroid)
  let inertia = 0
  for (const cluster of clusters) {
    for (const point of cluster.points) {
      inertia += Math.pow(euclideanDistance(point.values, cluster.centroid), 2)
    }
  }
  
  // Calculate silhouette score (simplified)
  let silhouetteSum = 0
  let silhouetteCount = 0
  
  for (const cluster of clusters) {
    for (const point of cluster.points) {
      const a = cluster.points.reduce((sum, p) => {
        if (p.id === point.id) return sum
        return sum + euclideanDistance(point.values, p.values)
      }, 0) / (cluster.points.length - 1 || 1)
      
      let minB = Infinity
      for (const otherCluster of clusters) {
        if (otherCluster.id === cluster.id) continue
        const b = otherCluster.points.reduce((sum, p) => {
          return sum + euclideanDistance(point.values, p.values)
        }, 0) / (otherCluster.points.length || 1)
        if (b < minB) minB = b
      }
      
      if (minB !== Infinity) {
        silhouetteSum += (minB - a) / Math.max(a, minB)
        silhouetteCount++
      }
    }
  }
  
  const silhouette = silhouetteCount > 0 ? silhouetteSum / silhouetteCount : 0
  
  return {
    clusters,
    k,
    iterations,
    inertia,
    silhouette,
  }
}

// Elbow method to find optimal k
export function findOptimalK(points: DataPoint[], minK = 2, maxK = 5): { k: number; results: KMeansResult[] } {
  const results: KMeansResult[] = []
  
  for (let k = minK; k <= maxK && k <= points.length; k++) {
    try {
      const result = kmeans(points, k)
      results.push(result)
    } catch (e) {
      break
    }
  }
  
  if (results.length === 0) {
    throw new Error('Could not cluster data')
  }
  
  // Find elbow point
  let optimalK = minK
  let maxCurvature = -Infinity
  
  for (let i = 1; i < results.length - 1; i++) {
    const prev = results[i - 1].inertia
    const curr = results[i].inertia
    const next = results[i + 1].inertia
    
    const curvature = Math.abs(prev - 2 * curr + next)
    if (curvature > maxCurvature) {
      maxCurvature = curvature
      optimalK = results[i].k
    }
  }
  
  return { k: optimalK, results }
}

// Worker message handler
self.onmessage = function(e: MessageEvent) {
  const { points, k, findOptimal } = e.data
  
  try {
    if (findOptimal) {
      const result = findOptimalK(points)
      self.postMessage({ type: 'success', data: result })
    } else {
      const result = kmeans(points, k)
      self.postMessage({ type: 'success', data: result })
    }
  } catch (error) {
    self.postMessage({ type: 'error', error: (error as Error).message })
  }
}

export { kmeans }
