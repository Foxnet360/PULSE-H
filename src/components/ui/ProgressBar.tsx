import React from 'react'

interface ProgressBarProps {
  progress: number
  total?: number
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total = 100,
  showPercentage = true,
  size = 'md',
  color = '#f5a623',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100))
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-primary-100 rounded-full ${sizes[size]} overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between mt-1 text-sm text-primary-600">
          <span>{Math.round(percentage)}%</span>
          <span>{progress} / {total}</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
