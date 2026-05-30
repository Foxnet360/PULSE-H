# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 2.10 - Complete funnel: assessment → capture → thank you → results
- Location: e2e/pulso-h.spec.ts:169:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Para generar tu informe')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Para generar tu informe')

```

```yaml
- text: The server is configured with a public base URL of /pulso-h/ - did you mean to visit
- link "/pulso-h/evaluar":
  - /url: /pulso-h/evaluar
- text: instead?
```

# Test source

```ts
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
  123 |     await expect(scheduleCta.first()).toBeVisible()
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
> 187 |     await expect(page.locator('text=Para generar tu informe')).toBeVisible({ timeout: 5000 })
      |                                                                ^ Error: expect(locator).toBeVisible() failed
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
  224 |   
  225 |   test('5.10 - Booking flow end-to-end', async ({ page }) => {
  226 |     await page.addInitScript(() => {
  227 |       sessionStorage.setItem('lead_id', '123')
  228 |       sessionStorage.setItem('lead_email', 'booking-test@example.com')
  229 |     })
  230 |     
  231 |     await navigate(page, '/agendar')
  232 |     
  233 |     // Wait for calendar
  234 |     await expect(page.locator('text=Selecciona un horario')).toBeVisible({ timeout: 10000 })
  235 |     
  236 |     // Find and select a slot
  237 |     const slots = await page.locator('button[data-available="true"]').all()
  238 |     if (slots.length > 0) {
  239 |       await slots[0].click()
  240 |       
  241 |       // Form should appear
  242 |       await expect(page.locator('text=Confirmar cita')).toBeVisible()
  243 |       
  244 |       // Fill form
  245 |       await page.fill('input[name="name"]', 'Booking Test')
  246 |       await page.fill('input[name="company"]', 'Test Corp')
  247 |       
  248 |       // Submit
  249 |       await page.click('button[type="submit"]')
  250 |       
  251 |       // Should show confirmation
  252 |       await expect(page.locator('text=Cita confirmada')).toBeVisible({ timeout: 10000 })
  253 |     }
  254 |     
  255 |     console.log('✓ Booking flow E2E test passed')
  256 |   })
  257 |   
  258 |   test('8.10 - Admin dashboard features', async ({ page }) => {
  259 |     await navigate(page, '/admin')
  260 |     
  261 |     // Verify analytics tab loads
  262 |     await expect(page.locator('text=Panel de Administración')).toBeVisible()
  263 |     
  264 |     // Check appointments tab
  265 |     await page.click('text=Citas')
  266 |     await expect(page.locator('text=Citas Agendadas')).toBeVisible()
  267 |     
  268 |     // Check leads tab
  269 |     await page.click('text=Leads')
  270 |     await expect(page.locator('text=Hot Leads')).toBeVisible()
  271 |     
  272 |     // Check availability tab
  273 |     await page.click('text=Disponibilidad')
  274 |     await expect(page.locator('text=Gestión de Disponibilidad')).toBeVisible()
  275 |     
  276 |     console.log('✓ Admin dashboard features accessible')
  277 |   })
  278 |   
  279 | })
  280 | 
```