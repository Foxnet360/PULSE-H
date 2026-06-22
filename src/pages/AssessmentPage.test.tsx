import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AssessmentPage from './AssessmentPage'

vi.mock('../hooks/useAssessmentTimer', () => ({
  useAssessmentTimer: () => ({
    formattedTime: '00:00',
    minutesElapsed: 0,
    start: vi.fn(),
  }),
}))

vi.mock('../utils/analytics', () => ({
  trackAssessmentStart: vi.fn(),
  trackQuestionAnswered: vi.fn(),
  trackAssessmentComplete: vi.fn(),
  trackLeadCaptureStart: vi.fn(),
  trackLeadCaptureComplete: vi.fn(),
}))

describe('AssessmentPage', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  it('shows success feedback when "Guardar progreso" is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/evaluar']}>
        <AssessmentPage />
      </MemoryRouter>
    )

    // Accept consents and start
    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => fireEvent.click(checkbox))

    const startButton = screen.getByRole('button', { name: /comenzar evaluación/i })
    fireEvent.click(startButton)

    // Wait for assessment form
    await waitFor(() => {
      expect(screen.getByText(/Guardar progreso/i)).toBeInTheDocument()
    })

    const saveButton = screen.getByRole('button', { name: /Guardar progreso/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /progreso guardado/i })).toBeInTheDocument()
    })
  })
})
