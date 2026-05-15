import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  showArrow?: boolean
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  showArrow = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100'
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dark active:bg-accent-dark shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white text-primary-900 border-2 border-primary-200 hover:border-accent hover:text-accent active:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-primary-700 hover:text-accent hover:bg-accent/5 active:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="w-5 h-5" />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  )
}

export default CTAButton
