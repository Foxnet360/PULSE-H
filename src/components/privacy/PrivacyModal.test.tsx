import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PrivacyModal from './PrivacyModal'

describe('PULSO-H PrivacyModal Approval Tests', () => {
  it('does not render when isOpen is false', () => {
    render(<PrivacyModal isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByText('Política de Privacidad')).not.toBeInTheDocument()
  })

  it('renders content when isOpen is true', () => {
    render(<PrivacyModal isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Política de Privacidad')).toBeInTheDocument()
    expect(screen.getByText('Compromiso de privacidad:')).toBeInTheDocument()
    expect(screen.getByText('1. Procesamiento Local')).toBeInTheDocument()
  })

  it('calls onClose when clicking close buttons', () => {
    const handleClose = vi.fn()
    render(<PrivacyModal isOpen={true} onClose={handleClose} />)
    
    // Close button (X icon)
    const closeBtn = screen.getByLabelText('Cerrar modal')
    fireEvent.click(closeBtn)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
