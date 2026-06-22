import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CONTACT_PHONE', '+57 300 123 4567')
    vi.stubEnv('VITE_CONTACT_EMAIL', 'hola@acrux.life')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders real contact phone from env var', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.getByText('+57 300 123 4567')).toBeInTheDocument()
  })

  it('renders real contact email from env var', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.getByText('hola@acrux.life')).toBeInTheDocument()
  })

  it('does not render placeholder phone number', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    expect(screen.queryByText('+57 (XXX) XXX-XXXX')).not.toBeInTheDocument()
  })
})
