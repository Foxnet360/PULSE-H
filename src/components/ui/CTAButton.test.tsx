import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CTAButton from './CTAButton'

describe('PULSO-H CTAButton Approval Tests', () => {
  it('renders children correctly', () => {
    render(<CTAButton>Click Me</CTAButton>)
    const element = screen.getByText('Click Me')
    expect(element).toBeInTheDocument()
  })

  it('renders as anchor when href is provided', () => {
    render(<CTAButton href="https://example.com">Visit Link</CTAButton>)
    const element = screen.getByText('Visit Link')
    expect(element.tagName).toBe('A')
    expect(element.getAttribute('href')).toBe('https://example.com')
  })

  it('renders as button when no href is provided', () => {
    render(<CTAButton>Button Action</CTAButton>)
    const element = screen.getByText('Button Action')
    expect(element.tagName).toBe('BUTTON')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<CTAButton onClick={handleClick}>Clickable</CTAButton>)
    const element = screen.getByText('Clickable')
    fireEvent.click(element)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
