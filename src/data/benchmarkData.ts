/**
 * Benchmark Database for PULSO-H
 * Sector averages for organizational comparison
 */

import type { BenchmarkData } from '../types/assessment'

export const benchmarkDatabase: BenchmarkData[] = [
  {
    sector: 'Tecnologia',
    averageIRP: 52.3,
    percentile25: 35.0,
    percentile50: 52.3,
    percentile75: 68.5,
    sampleSize: 1247,
  },
  {
    sector: 'Salud',
    averageIRP: 61.2,
    percentile25: 45.0,
    percentile50: 61.2,
    percentile75: 75.8,
    sampleSize: 2156,
  },
  {
    sector: 'Finanzas',
    averageIRP: 58.7,
    percentile25: 42.0,
    percentile50: 58.7,
    percentile75: 73.2,
    sampleSize: 982,
  },
  {
    sector: 'Educacion',
    averageIRP: 55.4,
    percentile25: 38.0,
    percentile50: 55.4,
    percentile75: 70.1,
    sampleSize: 1567,
  },
  {
    sector: 'Manufactura',
    averageIRP: 48.9,
    percentile25: 32.0,
    percentile50: 48.9,
    percentile75: 63.5,
    sampleSize: 1876,
  },
  {
    sector: 'Retail',
    averageIRP: 53.1,
    percentile25: 36.0,
    percentile50: 53.1,
    percentile75: 69.2,
    sampleSize: 1432,
  },
  {
    sector: 'Consultoria',
    averageIRP: 59.8,
    percentile25: 44.0,
    percentile50: 59.8,
    percentile75: 74.1,
    sampleSize: 756,
  },
  {
    sector: 'General',
    averageIRP: 54.2,
    percentile25: 37.0,
    percentile50: 54.2,
    percentile75: 70.5,
    sampleSize: 10016,
  },
]

export const getBenchmarkForSector = (sector: string): BenchmarkData | undefined => {
  return benchmarkDatabase.find(
    (b) => b.sector.toLowerCase() === sector.toLowerCase()
  )
}

export const calculatePercentile = (
  value: number,
  benchmark: BenchmarkData
): number => {
  if (value <= benchmark.percentile25) return 25
  if (value <= benchmark.percentile50) return 50
  if (value <= benchmark.percentile75) return 75
  return 90 // Above 75th percentile
}

export const getPercentileMessage = (percentile: number): string => {
  if (percentile <= 25) return 'Tu organizacion esta en el percentil 25 de tu sector'
  if (percentile <= 50) return 'Tu organizacion esta en la media de tu sector'
  if (percentile <= 75) return 'Tu organizacion esta por encima del promedio'
  return 'Tu organizacion esta en el top 10% de tu sector en bienestar laboral'
}

export const getAllSectors = (): string[] => {
  return benchmarkDatabase.map((b) => b.sector)
}
