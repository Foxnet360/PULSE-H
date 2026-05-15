import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Users } from 'lucide-react'

interface SocialProofBadgeProps {
  className?: string
}

const SocialProofBadge: React.FC<SocialProofBadgeProps> = ({ className = '' }) => {
  const [count, setCount] = useState(2847)

  useEffect(() => {
    const stored = localStorage.getItem('pulso-h-diagnostic-count')
    const lastUpdate = localStorage.getItem('pulso-h-diagnostic-last-update')
    
    if (stored) {
      const baseCount = parseInt(stored, 10)
      const now = Date.now()
      const last = lastUpdate ? parseInt(lastUpdate, 10) : now
      const hoursPassed = (now - last) / (1000 * 60 * 60)
      const increment = Math.floor(hoursPassed * 12)
      setCount(baseCount + increment)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100 text-sm ${className}`}
    >
      <Users className="w-4 h-4 text-accent" />
      <span className="text-primary-700">
        <span className="font-bold text-primary-900">{count.toLocaleString()}</span>
        {' '}profesionales ya evaluaron su bienestar
      </span>
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    </motion.div>
  )
}

export default SocialProofBadge
