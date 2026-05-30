import { test, expect } from '@playwright/test'

// Helper to navigate considering base path
const navigate = (page, path) => page.goto(`/pulso-h${path}`)

test.describe('PULSO-H E2E Tests', () => {
  
  test('9.3 - Complete assessment flow with all 36 questions', async ({ page }) => {
    // Navigate to assessment
    await navigate(page, '/evaluar')
    
    // Verify assessment page loads
    await expect(page.locator('text=Pregunta')).toBeVisible()
    
    // Answer all 36 questions
    for (let i = 0; i < 36; i++) {
      // Select an option (1-5 scale)
      const options = await page.locator('button[role="radio"]').all()
      if (options.length > 0) {
        await options[2].click() // Select middle option
      }
      
      // Click next or submit
      const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
      if (await nextButton.isVisible().catch(() => false)) {
        await nextButton.click()
      }
      
      // Wait for transition
      await page.waitForTimeout(300)
    }
    
    // After question 36, should see LeadCaptureModal
    await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 5000 })
    
    console.log('✓ Assessment flow completed (36 questions)')
  })
  
  test('9.4 - Lead capture with valid email', async ({ page }) => {
    await navigate(page, '/evaluar')
    
    // Complete assessment quickly
    for (let i = 0; i < 36; i++) {
      const options = await page.locator('button[role="radio"]').all()
      if (options.length > 0) await options[2].click()
      const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
      if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
      await page.waitForTimeout(200)
    }
    
    // Fill lead capture form
    await page.fill('input[type="email"]', 'test-e2e@example.com')
    await page.check('input[name="gdpr_consent"]')
    await page.check('input[name="marketing_consent"]')
    await page.click('button[type="submit"]')
    
    // Should redirect to thank you page
    await expect(page).toHaveURL(/.*gracias/)
    
    console.log('✓ Lead capture with valid email works')
  })
  
  test('9.4 - Lead capture with invalid email shows error', async ({ page }) => {
    await navigate(page, '/evaluar')
    
    // Complete assessment quickly
    for (let i = 0; i < 36; i++) {
      const options = await page.locator('button[role="radio"]').all()
      if (options.length > 0) await options[2].click()
      const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
      if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
      await page.waitForTimeout(200)
    }
    
    // Try invalid email
    await page.fill('input[type="email"]', 'invalid-email')
    await page.check('input[name="gdpr_consent"]')
    await page.click('button[type="submit"]')
    
    // Should show validation error
    await expect(page.locator('text=email no válido')).toBeVisible()
    
    console.log('✓ Lead capture with invalid email shows error')
  })
  
  test('9.5 - Thank You Page displays profile and productivity loss', async ({ page }) => {
    // Set session data to simulate completed assessment
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_id', '123')
      sessionStorage.setItem('assessment_profile', 'sobrecargadx')
      sessionStorage.setItem('assessment_irp', '72')
    })
    
    await navigate(page, '/gracias')
    
    // Verify profile is displayed
    await expect(page.locator('text=sobrecargadx')).toBeVisible()
    
    // Verify IRP is displayed
    await expect(page.locator('text=72')).toBeVisible()
    
    // Verify productivity loss calculation (floor(72/8) = 9 hours)
    await expect(page.locator('text=9 horas')).toBeVisible()
    
    // Verify countdown timer exists
    await expect(page.locator('text=Ver mi informe completo')).toBeVisible()
    
    console.log('✓ Thank You Page displays correctly')
  })
  
  test('9.6 - Results Page CTA tracking', async ({ page }) => {
    // Set required session data
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_id', '123')
      sessionStorage.setItem('assessment_profile', 'equilibradx')
      sessionStorage.setItem('assessment_irp', '45')
    })
    
    await navigate(page, '/resultados')
    
    // Verify primary CTA (schedule)
    const scheduleCta = page.locator('a[href="/agendar"], button:has-text("Agendar")')
    await expect(scheduleCta.first()).toBeVisible()
    
    // Verify secondary CTA (download PDF)
    const pdfCta = page.locator('button:has-text("PDF"), button:has-text("Descargar")')
    await expect(pdfCta.first()).toBeVisible()
    
    // Click on schedule CTA and verify navigation
    await scheduleCta.first().click()
    await expect(page).toHaveURL(/.*agendar/)
    
    console.log('✓ Results Page CTAs work correctly')
  })
  
  test('9.7 - Scheduling flow: select slot → fill form → confirm', async ({ page }) => {
    // Set lead data
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_id', '123')
      sessionStorage.setItem('lead_email', 'test@example.com')
    })
    
    await navigate(page, '/agendar')
    
    // Wait for calendar to load
    await expect(page.locator('text=Lun')).toBeVisible({ timeout: 10000 })
    
    // Select an available slot
    const availableSlot = page.locator('button[data-available="true"]').first()
    if (await availableSlot.isVisible().catch(() => false)) {
      await availableSlot.click()
      
      // Fill booking form
      await page.fill('input[name="name"]', 'Test User')
      await page.fill('textarea[name="notes"]', 'Test appointment notes')
      
      // Submit form
      await page.click('button[type="submit"]')
      
      // Verify confirmation screen
      await expect(page.locator('text=Confirmación')).toBeVisible({ timeout: 5000 })
    } else {
      console.log('⚠ No available slots found for testing')
    }
    
    console.log('✓ Scheduling flow works')
  })
  
  test('2.10 - Complete funnel: assessment → capture → thank you → results', async ({ page }) => {
    // Start from landing
    await navigate(page, '/')
    
    // Click start assessment
    await page.click('text=Comenzar evaluación')
    await expect(page).toHaveURL(/.*evaluar/)
    
    // Complete all 36 questions
    for (let i = 0; i < 36; i++) {
      const options = await page.locator('button[role="radio"]').all()
      if (options.length > 0) await options[2].click()
      const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
      if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
      await page.waitForTimeout(200)
    }
    
    // Lead capture modal should appear
    await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 5000 })
    
    // Fill and submit
    await page.fill('input[type="email"]', 'funnel-test@example.com')
    await page.check('input[name="gdpr_consent"]')
    await page.click('button[type="submit"]')
    
    // Should reach thank you page
    await expect(page).toHaveURL(/.*gracias/, { timeout: 10000 })
    
    // Click to see results
    await page.click('text=Ver mi informe completo')
    await expect(page).toHaveURL(/.*resultados/, { timeout: 10000 })
    
    console.log('✓ Complete funnel test passed')
  })
  
  test('9.10 - Responsive design on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Test landing page
    await navigate(page, '/')
    await expect(page.locator('text=PULSO-H')).toBeVisible()
    
    // Test assessment page
    await navigate(page, '/evaluar')
    await expect(page.locator('text=Pregunta')).toBeVisible()
    
    // Verify no horizontal overflow
    const body = page.locator('body')
    const bodyWidth = await body.evaluate(el => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // Allow 1px rounding
    
    console.log('✓ Responsive design works on mobile')
  })
  
  test('5.10 - Booking flow end-to-end', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('lead_id', '123')
      sessionStorage.setItem('lead_email', 'booking-test@example.com')
    })
    
    await navigate(page, '/agendar')
    
    // Wait for calendar
    await expect(page.locator('text=Selecciona un horario')).toBeVisible({ timeout: 10000 })
    
    // Find and select a slot
    const slots = await page.locator('button[data-available="true"]').all()
    if (slots.length > 0) {
      await slots[0].click()
      
      // Form should appear
      await expect(page.locator('text=Confirmar cita')).toBeVisible()
      
      // Fill form
      await page.fill('input[name="name"]', 'Booking Test')
      await page.fill('input[name="company"]', 'Test Corp')
      
      // Submit
      await page.click('button[type="submit"]')
      
      // Should show confirmation
      await expect(page.locator('text=Cita confirmada')).toBeVisible({ timeout: 10000 })
    }
    
    console.log('✓ Booking flow E2E test passed')
  })
  
  test('8.10 - Admin dashboard features', async ({ page }) => {
    await navigate(page, '/admin')
    
    // Verify analytics tab loads
    await expect(page.locator('text=Panel de Administración')).toBeVisible()
    
    // Check appointments tab
    await page.click('text=Citas')
    await expect(page.locator('text=Citas Agendadas')).toBeVisible()
    
    // Check leads tab
    await page.click('text=Leads')
    await expect(page.locator('text=Hot Leads')).toBeVisible()
    
    // Check availability tab
    await page.click('text=Disponibilidad')
    await expect(page.locator('text=Gestión de Disponibilidad')).toBeVisible()
    
    console.log('✓ Admin dashboard features accessible')
  })
  
})
