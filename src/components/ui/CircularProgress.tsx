import React from 'react'
import { motion } from 'motion/react'

interface CircularProgressProps {
  progress: number
  total?: number
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  showPercentage?: boolean
  className?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  total = 100,
  size = 120,
  strokeWidth = 8,
  color = '#f5a623',
  bgColor = '#e2e8f0',
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold text-primary-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

export default CircularProgress
