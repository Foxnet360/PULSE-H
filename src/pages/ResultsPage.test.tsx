import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ResultsPage from './ResultsPage'

const mockResult = {
  id: 'result-1',
  profile: 'sobrecargado',
  profileName: 'Sobrecargadx',
  profileDescription: 'Alto riesgo de burnout',
  irp: 67,
  irpZone: 'naranja',
  irpLabel: 'Alto',
  irpDescription: 'Tu nivel de riesgo es alto.',
  dimensions: {},
  subscales: {
    ae: { score: 20, rawScore: 20, level: 'alto', label: 'AE', description: '' },
    dp: { score: 15, rawScore: 15, level: 'alto', label: 'DP', description: '' },
    rp: { score: 10, rawScore: 10, level: 'bajo', label: 'RP', description: '' },
  },
  customDimensions: {
    for: { score: 60, rawScore: 60, level: 'alto', label: 'FOR', description: '' },
    cvt: { score: 50, rawScore: 50, level: 'moderado', label: 'CVT', description: '' },
    rri: { score: 40, rawScore: 40, level: 'bajo', label: 'RRI', description: '' },
  },
  timestamp: new Date().toISOString(),
}

describe('ResultsPage', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  it('redirects to /evaluar when no lead id is present', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/resultados']}>
        <ResultsPage />
      </MemoryRouter>
    )

    expect(container.textContent).toContain('No hay resultados disponibles')
  })

  it('renders result and links to internal /agendar', () => {
    sessionStorage.setItem('pulso-h-lead-id', '123')
    sessionStorage.setItem('pulso-h-result', JSON.stringify(mockResult))

    render(
      <MemoryRouter initialEntries={['/resultados']}>
        <ResultsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Sobrecargadx')).toBeInTheDocument()

    const scheduleLink = screen.getByRole('link', { name: /agendar ahora/i })
    expect(scheduleLink).toHaveAttribute('href', '/agendar')
  })

  it('renders the lazy-loaded PDF download button', async () => {
    sessionStorage.setItem('pulso-h-lead-id', '123')
    sessionStorage.setItem('pulso-h-result', JSON.stringify(mockResult))

    render(
      <MemoryRouter initialEntries={['/resultados']}>
        <ResultsPage />
      </MemoryRouter>
    )

    const pdfButton = await screen.findByRole('button', { name: /descargar informe/i }, { timeout: 5000 })
    expect(pdfButton).toBeInTheDocument()
  })
})
