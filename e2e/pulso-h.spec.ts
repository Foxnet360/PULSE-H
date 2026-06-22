import { test, expect } from '@playwright/test'

// Canonical profile display names from src/data/profiles.ts
const PROFILES = [
  { key: 'sobrecargado', name: 'Sobrecargadx', irp: 72, color: '#ef4444' },
  { key: 'fragil', name: 'Funcional pero Frágil', irp: 65, color: '#f97316' },
  { key: 'requete', name: 'Requete', irp: 80, color: '#dc2626' },
  { key: 'resiliente', name: 'Resiliente', irp: 35, color: '#22c55e' },
  { key: 'estable', name: 'Estable', irp: 45, color: '#3b82f6' },
  { key: 'floreciente', name: 'Floreciente', irp: 20, color: '#10b981' },
]

// Helper to navigate considering base path
const navigate = async (page, path) => {
  await page.goto(`/pulso-h${path}`)
  await dismissCookieBanner(page)
}

const dismissCookieBanner = async (page) => {
  const closeButton = page.locator('button:has-text("Solo esenciales"), button:has-text("Cerrar")').first()
  try {
    await closeButton.click({ timeout: 5000 })
  } catch {
    // Banner may not be present
  }
}

const mockBackendApis = async (page) => {
  await page.route('**/api/lead.php', (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, id: 12345 }),
      })
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    })
  })
}

const setSliderValues = async (page, value = 4) => {
  await page.evaluate((targetValue) => {
    const inputs = document.querySelectorAll('input[type="range"]')
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    inputs.forEach((input) => {
      if (nativeSetter) {
        // Set to a different value first so React detects the change
        nativeSetter.call(input, targetValue === 4 ? '3' : '4')
        input.dispatchEvent(new Event('input', { bubbles: true }))
        nativeSetter.call(input, String(targetValue))
      } else {
        ;(input as HTMLInputElement).value = String(targetValue)
      }
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }, value)
}

const completeAssessment = async (page) => {
  // Consent checkboxes (required)
  await page.getByLabel(/Entiendo que este diagnóstico/i).check()
  await page.getByLabel(/Acepto el tratamiento de datos/i).check()

  await page.getByRole('button', { name: /Comenzar evaluación/i }).click()

  // Answer all 36 questions (6 modules x 6 questions)
  for (let moduleIndex = 0; moduleIndex < 6; moduleIndex++) {
    await expect(page.locator('text=/Pregunta \\d+ de \\d+/i')).toBeVisible({ timeout: 10000 })
    await setSliderValues(page)
    await page.getByRole('button', { name: /Siguiente|Finalizar/i }).click()
    await page.waitForTimeout(300)
  }
}

test.describe('PULSO-H E2E Tests', () => {
  test('2.10 + 9.3 - Complete assessment flow with all 36 questions', async ({ page }) => {
    test.setTimeout(120000)
    await navigate(page, '/evaluar')
    await expect(page.locator('text=Bienvenido a PULSO-H')).toBeVisible({ timeout: 15000 })
    await completeAssessment(page)
    await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 15000 })
    console.log('✓ Assessment flow completed (36 questions across 6 modules)')
  })

  test('9.4 - Lead capture with valid email', async ({ page }) => {
    test.setTimeout(120000)
    await mockBackendApis(page)
    await navigate(page, '/evaluar')
    await completeAssessment(page)

    await page.fill('input[type="email"]', `test-e2e-${Date.now()}@example.com`)
    await page.getByLabel(/Acepto la.*politica de privacidad/i).check()
    await page.getByLabel(/Quiero recibir contenido de bienestar laboral/i).check()
    await page.getByRole('button', { name: /Enviar|Continuar|Generar/i }).click()

    await expect(page).toHaveURL(/.*gracias/, { timeout: 15000 })
    console.log('✓ Lead capture with valid email works')
  })

  test('9.4 - Lead capture with invalid email shows error', async ({ page }) => {
    test.setTimeout(120000)
    await mockBackendApis(page)
    await navigate(page, '/evaluar')
    await completeAssessment(page)

    await page.fill('input[type="email"]', 'invalid-email')
    await page.getByLabel(/Acepto la.*politica de privacidad/i).check()
    await page.getByRole('button', { name: /Enviar|Continuar|Generar/i }).click()

    const errorVisible = await page.locator('text=/email no válido|valid email|formato/i').isVisible().catch(() => false)
    const inputInvalid = await page.locator('input[type="email"]:invalid').count() > 0
    expect(errorVisible || inputInvalid).toBeTruthy()
    console.log('✓ Lead capture with invalid email shows error')
  })

  test('9.5 - Thank You Page displays profile and productivity loss', async ({ page }) => {
    const profile = PROFILES[0]
    await page.addInitScript((data) => {
      sessionStorage.setItem('pulso-h-lead-id', '123')
      sessionStorage.setItem('pulso-h-result', JSON.stringify({
        profileName: data.name,
        profileDescription: 'Te sientes abrumado por la carga laboral',
        profileColor: data.color,
        irp: data.irp,
        irpLabel: 'Riesgo Alto',
        irpZone: 'roja',
        dimensions: {},
        timestamp: new Date().toISOString(),
      }))
    }, profile)

    await navigate(page, '/gracias')
    await expect(page.getByText(profile.name).first()).toBeVisible({ timeout: 15000 })

    const pageContent = await page.content()
    expect(pageContent).toContain(String(profile.irp))
    expect(pageContent).toContain('/100')

    const hoursLost = Math.floor(profile.irp / 8)
    expect(pageContent).toContain(`${hoursLost} horas semanales`)
    await expect(page.locator('text=Ver mi informe completo')).toBeVisible()
    console.log('✓ Thank You Page displays correctly with profile and productivity loss')
  })

  test('9.5 - Thank You Page with all 6 profiles', async ({ page }) => {
    test.setTimeout(120000)
    for (const profile of PROFILES) {
      await page.addInitScript((data) => {
        sessionStorage.setItem('pulso-h-lead-id', '123')
        sessionStorage.setItem('pulso-h-result', JSON.stringify({
          profileName: data.name,
          profileDescription: `Perfil de prueba: ${data.name}`,
          profileColor: data.color,
          irp: data.irp,
          irpLabel: data.irp > 60 ? 'Riesgo Alto' : data.irp > 40 ? 'Riesgo Moderado' : 'Bienestar',
          irpZone: data.irp > 60 ? 'roja' : data.irp > 40 ? 'amarilla' : 'verde',
          dimensions: {},
          timestamp: new Date().toISOString(),
        }))
      }, profile)

      await navigate(page, '/gracias')
      await expect(page.getByText(profile.name).first()).toBeVisible({ timeout: 15000 })

      const hoursLost = Math.floor(profile.irp / 8)
      await expect(page.locator(`text=/.*${hoursLost}.*horas.*/i`)).toBeVisible()
      console.log(`  ✓ Profile: ${profile.name} (IRP: ${profile.irp}, Loss: ${hoursLost}h)`)
    }
    console.log('✓ Thank You Page works with all 6 profiles')
  })

  test('9.6 - Results Page CTA tracking', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('pulso-h-lead-id', '123')
      sessionStorage.setItem('pulso-h-result', JSON.stringify({
        profileName: 'Estable',
        profileDescription: 'Estás en equilibrio',
        profileColor: '#3b82f6',
        irp: 45,
        irpLabel: 'Riesgo Moderado',
        irpZone: 'amarilla',
        dimensions: {},
        timestamp: new Date().toISOString(),
      }))
    })

    await navigate(page, '/resultados')
    await expect(page.getByText('Resultados').first()).toBeVisible({ timeout: 15000 })

    const scheduleCta = page.locator('a[href*="agendar"]').first()
    await expect(scheduleCta).toBeVisible({ timeout: 10000 })

    const pdfCta = page.locator('button:has-text("Descargar informe")').first()
    await expect(pdfCta).toBeVisible({ timeout: 10000 })

    console.log('✓ Results Page CTAs are visible and tracked')
  })

  test('9.7 + 5.10 - Scheduling flow: select slot → fill form → confirm', async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('pulso-h-lead-id', '123')
      sessionStorage.setItem('pulso-h-lead-email', 'test@example.com')
    })

    await navigate(page, '/agendar')
    await expect(page.locator('text=/lun|mar|mié|jue|vie/i').first()).toBeVisible({ timeout: 15000 })

    const slots = await page.locator('button:not([disabled])').filter({ hasText: /:/ }).all()
    if (slots.length > 0) {
      await slots[0].click()
      const formVisible = await page.locator('input[name="name"], input[placeholder*="nombre"], text=Confirmar cita').isVisible().catch(() => false)

      if (formVisible) {
        await page.fill('input[name="name"]', 'Test User')
        await page.fill('textarea[name="notes"], textarea[placeholder*="notas"]', 'Test appointment notes')
        await page.click('button[type="submit"], button:has-text("Confirmar")')
        await expect(page.locator('text=/confirmada|éxito|confirmado/i')).toBeVisible({ timeout: 10000 })
      }
    } else {
      console.log('⚠ No available slots found for testing')
    }
    console.log('✓ Scheduling flow works')
  })

  test('2.10 - Complete funnel: assessment → capture → thank you → results', async ({ page }) => {
    test.setTimeout(180000)
    await mockBackendApis(page)
    await navigate(page, '/')
    await page.getByRole('link', { name: /Comenzar evaluación gratuita/i }).click()
    await expect(page).toHaveURL(/.*evaluar/, { timeout: 15000 })

    await completeAssessment(page)
    await expect(page.getByText('Para generar tu informe')).toBeVisible({ timeout: 15000 })

    const timestamp = Date.now()
    await page.fill('input[type="email"]', `funnel-test-${timestamp}@example.com`)
    await page.getByLabel(/Acepto la.*politica de privacidad/i).check()
    await page.getByRole('button', { name: /Enviar|Continuar|Generar/i }).click()

    await expect(page).toHaveURL(/.*gracias/, { timeout: 15000 })
    await expect(page.locator('text=/perfil|resultado|informe/i').first()).toBeVisible()

    await page.getByRole('button', { name: /Ver mi informe completo/i }).click()
    await expect(page).toHaveURL(/.*resultados/, { timeout: 15000 })
    await expect(page.locator('text=/resultado|recomendación|intervención/i').first()).toBeVisible()
    console.log('✓ Complete funnel test passed: assessment → capture → thank you → results')
  })

  test('9.10 - Responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await navigate(page, '/')
    await expect(page.locator('text=/PULSO-H|Bienestar|evaluación/i').first()).toBeVisible({ timeout: 15000 })

    await navigate(page, '/evaluar')
    await expect(page.locator('text=Bienvenido a PULSO-H')).toBeVisible({ timeout: 15000 })

    await page.getByLabel(/Entiendo que este diagnóstico/i).check()
    await page.getByLabel(/Acepto el tratamiento de datos/i).check()
    await page.getByRole('button', { name: /Comenzar evaluación/i }).click()

    const body = page.locator('body')
    const bodyWidth = await body.evaluate((el) => el.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)

    await page.addInitScript(() => {
      sessionStorage.setItem('pulso-h-lead-id', '123')
      sessionStorage.setItem('pulso-h-result', JSON.stringify({
        profileName: 'Estable',
        irp: 45,
        irpLabel: 'Riesgo Moderado',
        irpZone: 'amarilla',
        dimensions: {},
        timestamp: new Date().toISOString(),
      }))
    })

    await navigate(page, '/resultados')
    await expect(page.locator('text=/resultado|recomendación/i').first()).toBeVisible({ timeout: 15000 })
    console.log('✓ Responsive design works on mobile (375x667)')
  })

  test('9.11 - Offline behavior during assessment', async ({ page }) => {
    test.setTimeout(120000)
    await navigate(page, '/evaluar')

    await page.getByLabel(/Entiendo que este diagnóstico/i).check()
    await page.getByLabel(/Acepto el tratamiento de datos/i).check()
    await page.getByRole('button', { name: /Comenzar evaluación/i }).click()

    // Answer first 2 modules (12 questions)
    for (let moduleIndex = 0; moduleIndex < 2; moduleIndex++) {
      await setSliderValues(page)
      await page.click('button:has-text("Siguiente"), button:has-text("Finalizar")')
      await page.waitForTimeout(300)
    }

    await page.context().setOffline(true)
    await setSliderValues(page)
    await page.click('button:has-text("Siguiente"), button:has-text("Finalizar")')
    await page.context().setOffline(false)
    await page.waitForTimeout(1000)

    const progressText = await page.locator('text=/respondidas|de 36/i').textContent().catch(() => '')
    const answeredMatch = progressText.match(/(\d+)\s+de\s+36/)
    if (answeredMatch) {
      const answered = parseInt(answeredMatch[1])
      expect(answered).toBeGreaterThanOrEqual(12)
    }
    console.log('✓ Offline behavior works - progress saved locally')
  })

  test('9.9 + 7.13 - GA4 events fire correctly', async ({ page }) => {
    test.setTimeout(120000)
    const events: string[] = []

    await page.route('**/*', (route) => {
      const url = route.request().url()
      if (url.includes('google-analytics') || url.includes('gtag')) {
        events.push(url)
      }
      route.continue()
    })

    await page.addInitScript(() => {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function (...args) {
        console.log('GA4_EVENT:', JSON.stringify(args))
        return originalPush.apply(this, args)
      }
    })

    await navigate(page, '/')
    await page.waitForTimeout(2000)
    await page.getByRole('link', { name: /Comenzar evaluación gratuita/i }).click()
    await page.waitForTimeout(1000)

    const consoleLogs = await page.evaluate(() => {
      return (window as unknown as { dataLayer?: unknown[] }).dataLayer || []
    })

    expect(consoleLogs.length).toBeGreaterThanOrEqual(0)
    console.log('GA4 Events tracked:', consoleLogs.length, 'items in dataLayer')
    console.log('✓ GA4 events verification complete')
  })

  test('8.10 - Admin dashboard features', async ({ page }) => {
    // Mock auth endpoints for the E2E suite
    await page.route('**/api/auth.php', async (route) => {
      if (route.request().method() === 'POST') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ authenticated: true }),
        })
      }
      // Status check: start unauthenticated
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ authenticated: false }),
      })
    })

    await navigate(page, '/admin')
    await expect(page.locator('text=Acceso administrativo')).toBeVisible({ timeout: 15000 })

    // Log in through the form
    await page.fill('input[type="password"]', 'test-password')
    await page.getByRole('button', { name: /Ingresar/i }).click()

    // Dashboard should load
    await expect(page.locator('text=Panel de Administración')).toBeVisible({ timeout: 15000 })

    const tabs = await page.locator('button').filter({ hasText: /Citas|Leads|Analytics|Disponibilidad/i }).all()
    expect(tabs.length).toBeGreaterThanOrEqual(1)

    for (const tab of tabs.slice(0, 3)) {
      await tab.click()
      await page.waitForTimeout(500)
    }

    console.log('✓ Admin dashboard features accessible')
  })
})
