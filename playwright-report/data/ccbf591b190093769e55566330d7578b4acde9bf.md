# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 9.6 - Results Page CTA tracking
- Location: e2e/pulso-h.spec.ts:111:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href="/agendar"], button:has-text("Agendar")').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href="/agendar"], button:has-text("Agendar")').first()

```

```yaml
- navigation:
  - link "ACRUX | Acrux | PULSO-H":
    - /url: https://acrux.life
    - img "ACRUX"
    - text: "| Acrux | PULSO-H"
  - link "Volver a Acrux":
    - /url: https://acrux.life
  - link "Contactar consultor":
    - /url: https://acrux.life/contacto
- main:
  - img
  - heading "Bienvenido a PULSO-H" [level=1]
  - paragraph: Descubre el pulso de tu bienestar laboral en 8 minutos
  - text: "1"
  - heading "6 módulos de evaluación" [level=3]
  - paragraph: Cada uno evalúa una dimensión diferente de tu bienestar
  - text: "2"
  - heading "100% anónimo" [level=3]
  - paragraph: Tus respuestas se procesan en tu dispositivo. Nadie más las ve.
  - text: "3"
  - heading "Plan de acción personalizado" [level=3]
  - paragraph: Recibe recomendaciones específicas basadas en tu perfil
  - checkbox "Entiendo que este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico. Mis respuestas serán procesadas localmente en mi dispositivo."
  - text: Entiendo que este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico. Mis respuestas serán procesadas localmente en mi dispositivo.
  - button "Comenzar evaluación" [disabled]:
    - text: Comenzar evaluación
    - img
- contentinfo:
  - link "Acrux Consultores":
    - /url: https://acrux.life
  - paragraph: Parte de ACRUX Consultores
  - paragraph: Arquitectos de Sistemas Humanos
  - heading "PULSO-H" [level=4]
  - list:
    - listitem:
      - link "Inicio":
        - /url: /
    - listitem:
      - link "Evaluar bienestar":
        - /url: /evaluar
    - listitem:
      - link "Nuestros servicios":
        - /url: https://acrux.life/soluciones
  - heading "Legal" [level=4]
  - list:
    - listitem:
      - link "Política de Privacidad":
        - /url: https://acrux.life/privacidad
    - listitem:
      - link "Términos y Condiciones":
        - /url: https://acrux.life/terminos
    - listitem:
      - link "Política de Cookies":
        - /url: https://acrux.life/cookies
  - heading "Confianza" [level=4]
  - list:
    - listitem:
      - img
      - text: Datos encriptados
    - listitem:
      - img
      - text: GDPR compliant
    - listitem:
      - img
      - text: ISTAS-21 validado
  - paragraph: © 2026 ACRUX Consultores. Todos los derechos reservados.
- img
- paragraph:
  - strong: Tu privacidad importa
  - text: — Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.
- link "Más información":
  - /url: /privacidad
  - text: Más información
  - img
- button "Solo esenciales"
- button "Aceptar todas"
- button "Cerrar":
  - img
```

# Test source

```ts
  23  |       // Click next or submit
  24  |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
  25  |       if (await nextButton.isVisible().catch(() => false)) {
  26  |         await nextButton.click()
  27  |       }
  28  |       
  29  |       // Wait for transition
  30  |       await page.waitForTimeout(300)
  31  |     }
  32  |     
  33  |     // After question 36, should see LeadCaptureModal
  34  |     await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 5000 })
  35  |     
  36  |     console.log('✓ Assessment flow completed (36 questions)')
  37  |   })
  38  |   
  39  |   test('9.4 - Lead capture with valid email', async ({ page }) => {
  40  |     await navigate(page, '/evaluar')
  41  |     
  42  |     // Complete assessment quickly
  43  |     for (let i = 0; i < 36; i++) {
  44  |       const options = await page.locator('button[role="radio"]').all()
  45  |       if (options.length > 0) await options[2].click()
  46  |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
  47  |       if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
  48  |       await page.waitForTimeout(200)
  49  |     }
  50  |     
  51  |     // Fill lead capture form
  52  |     await page.fill('input[type="email"]', 'test-e2e@example.com')
  53  |     await page.check('input[name="gdpr_consent"]')
  54  |     await page.check('input[name="marketing_consent"]')
  55  |     await page.click('button[type="submit"]')
  56  |     
  57  |     // Should redirect to thank you page
  58  |     await expect(page).toHaveURL(/.*gracias/)
  59  |     
  60  |     console.log('✓ Lead capture with valid email works')
  61  |   })
  62  |   
  63  |   test('9.4 - Lead capture with invalid email shows error', async ({ page }) => {
  64  |     await navigate(page, '/evaluar')
  65  |     
  66  |     // Complete assessment quickly
  67  |     for (let i = 0; i < 36; i++) {
  68  |       const options = await page.locator('button[role="radio"]').all()
  69  |       if (options.length > 0) await options[2].click()
  70  |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
  71  |       if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
  72  |       await page.waitForTimeout(200)
  73  |     }
  74  |     
  75  |     // Try invalid email
  76  |     await page.fill('input[type="email"]', 'invalid-email')
  77  |     await page.check('input[name="gdpr_consent"]')
  78  |     await page.click('button[type="submit"]')
  79  |     
  80  |     // Should show validation error
  81  |     await expect(page.locator('text=email no válido')).toBeVisible()
  82  |     
  83  |     console.log('✓ Lead capture with invalid email shows error')
  84  |   })
  85  |   
  86  |   test('9.5 - Thank You Page displays profile and productivity loss', async ({ page }) => {
  87  |     // Set session data to simulate completed assessment
  88  |     await page.addInitScript(() => {
  89  |       sessionStorage.setItem('lead_id', '123')
  90  |       sessionStorage.setItem('assessment_profile', 'sobrecargadx')
  91  |       sessionStorage.setItem('assessment_irp', '72')
  92  |     })
  93  |     
  94  |     await navigate(page, '/gracias')
  95  |     
  96  |     // Verify profile is displayed
  97  |     await expect(page.locator('text=sobrecargadx')).toBeVisible()
  98  |     
  99  |     // Verify IRP is displayed
  100 |     await expect(page.locator('text=72')).toBeVisible()
  101 |     
  102 |     // Verify productivity loss calculation (floor(72/8) = 9 hours)
  103 |     await expect(page.locator('text=9 horas')).toBeVisible()
  104 |     
  105 |     // Verify countdown timer exists
  106 |     await expect(page.locator('text=Ver mi informe completo')).toBeVisible()
  107 |     
  108 |     console.log('✓ Thank You Page displays correctly')
  109 |   })
  110 |   
  111 |   test('9.6 - Results Page CTA tracking', async ({ page }) => {
  112 |     // Set required session data
  113 |     await page.addInitScript(() => {
  114 |       sessionStorage.setItem('lead_id', '123')
  115 |       sessionStorage.setItem('assessment_profile', 'equilibradx')
  116 |       sessionStorage.setItem('assessment_irp', '45')
  117 |     })
  118 |     
  119 |     await navigate(page, '/resultados')
  120 |     
  121 |     // Verify primary CTA (schedule)
  122 |     const scheduleCta = page.locator('a[href="/agendar"], button:has-text("Agendar")')
> 123 |     await expect(scheduleCta.first()).toBeVisible()
      |                                       ^ Error: expect(locator).toBeVisible() failed
  124 |     
  125 |     // Verify secondary CTA (download PDF)
  126 |     const pdfCta = page.locator('button:has-text("PDF"), button:has-text("Descargar")')
  127 |     await expect(pdfCta.first()).toBeVisible()
  128 |     
  129 |     // Click on schedule CTA and verify navigation
  130 |     await scheduleCta.first().click()
  131 |     await expect(page).toHaveURL(/.*agendar/)
  132 |     
  133 |     console.log('✓ Results Page CTAs work correctly')
  134 |   })
  135 |   
  136 |   test('9.7 - Scheduling flow: select slot → fill form → confirm', async ({ page }) => {
  137 |     // Set lead data
  138 |     await page.addInitScript(() => {
  139 |       sessionStorage.setItem('lead_id', '123')
  140 |       sessionStorage.setItem('lead_email', 'test@example.com')
  141 |     })
  142 |     
  143 |     await navigate(page, '/agendar')
  144 |     
  145 |     // Wait for calendar to load
  146 |     await expect(page.locator('text=Lun')).toBeVisible({ timeout: 10000 })
  147 |     
  148 |     // Select an available slot
  149 |     const availableSlot = page.locator('button[data-available="true"]').first()
  150 |     if (await availableSlot.isVisible().catch(() => false)) {
  151 |       await availableSlot.click()
  152 |       
  153 |       // Fill booking form
  154 |       await page.fill('input[name="name"]', 'Test User')
  155 |       await page.fill('textarea[name="notes"]', 'Test appointment notes')
  156 |       
  157 |       // Submit form
  158 |       await page.click('button[type="submit"]')
  159 |       
  160 |       // Verify confirmation screen
  161 |       await expect(page.locator('text=Confirmación')).toBeVisible({ timeout: 5000 })
  162 |     } else {
  163 |       console.log('⚠ No available slots found for testing')
  164 |     }
  165 |     
  166 |     console.log('✓ Scheduling flow works')
  167 |   })
  168 |   
  169 |   test('2.10 - Complete funnel: assessment → capture → thank you → results', async ({ page }) => {
  170 |     // Start from landing
  171 |     await navigate(page, '/')
  172 |     
  173 |     // Click start assessment
  174 |     await page.click('text=Comenzar evaluación')
  175 |     await expect(page).toHaveURL(/.*evaluar/)
  176 |     
  177 |     // Complete all 36 questions
  178 |     for (let i = 0; i < 36; i++) {
  179 |       const options = await page.locator('button[role="radio"]').all()
  180 |       if (options.length > 0) await options[2].click()
  181 |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Enviar")')
  182 |       if (await nextButton.isVisible().catch(() => false)) await nextButton.click()
  183 |       await page.waitForTimeout(200)
  184 |     }
  185 |     
  186 |     // Lead capture modal should appear
  187 |     await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 5000 })
  188 |     
  189 |     // Fill and submit
  190 |     await page.fill('input[type="email"]', 'funnel-test@example.com')
  191 |     await page.check('input[name="gdpr_consent"]')
  192 |     await page.click('button[type="submit"]')
  193 |     
  194 |     // Should reach thank you page
  195 |     await expect(page).toHaveURL(/.*gracias/, { timeout: 10000 })
  196 |     
  197 |     // Click to see results
  198 |     await page.click('text=Ver mi informe completo')
  199 |     await expect(page).toHaveURL(/.*resultados/, { timeout: 10000 })
  200 |     
  201 |     console.log('✓ Complete funnel test passed')
  202 |   })
  203 |   
  204 |   test('9.10 - Responsive design on mobile', async ({ page }) => {
  205 |     // Set viewport to mobile size
  206 |     await page.setViewportSize({ width: 375, height: 667 })
  207 |     
  208 |     // Test landing page
  209 |     await navigate(page, '/')
  210 |     await expect(page.locator('text=PULSO-H')).toBeVisible()
  211 |     
  212 |     // Test assessment page
  213 |     await navigate(page, '/evaluar')
  214 |     await expect(page.locator('text=Pregunta')).toBeVisible()
  215 |     
  216 |     // Verify no horizontal overflow
  217 |     const body = page.locator('body')
  218 |     const bodyWidth = await body.evaluate(el => el.scrollWidth)
  219 |     const viewportWidth = await page.evaluate(() => window.innerWidth)
  220 |     expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // Allow 1px rounding
  221 |     
  222 |     console.log('✓ Responsive design works on mobile')
  223 |   })
```