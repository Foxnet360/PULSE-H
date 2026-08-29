import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CTAButton as SharedCTAButton } from '@acrux/design-tokens'

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
  const Icon = showArrow ? ArrowRight : undefined

  return (
    <SharedCTAButton
      variant={variant}
      size={size}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      theme="pulso"
      icon={Icon}
    >
      {children}
    </SharedCTAButton>
  )
}

export default CTAButton
