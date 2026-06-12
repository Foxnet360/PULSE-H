# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 9.10 - Responsive design on mobile
- Location: e2e/pulso-h.spec.ts:321:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/PULSO-H|Bienestar|evaluación/i')
Expected: visible
Error: strict mode violation: locator('text=/PULSO-H|Bienestar|evaluación/i') resolved to 4 elements:
    1) <span class="block font-display font-bold tracking-tight text-white text-xl leading-7">Acrux | PULSO-H</span> aka getByRole('link', { name: 'ACRUX Acrux | PULSO-H' })
    2) <p class="text-primary-700 font-medium">Cargando PULSO-H...</p> aka getByText('Cargando PULSO-H...')
    3) <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">PULSO-H</h4> aka getByRole('heading', { name: 'PULSO-H' })
    4) <a href="/evaluar" class="hover:text-white transition-colors">Evaluar bienestar</a> aka getByRole('link', { name: 'Evaluar bienestar' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/PULSO-H|Bienestar|evaluación/i')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "ACRUX Acrux | PULSO-H" [ref=e8] [cursor=pointer]:
        - /url: https://acrux.life
        - img "ACRUX" [ref=e9]
        - generic [ref=e10]: Acrux | PULSO-H
      - link [ref=e12] [cursor=pointer]:
        - /url: https://acrux.life
        - img [ref=e13]
  - main [ref=e16]:
    - generic [ref=e17]:
      - img [ref=e18]
      - paragraph [ref=e20]: Cargando PULSO-H...
  - contentinfo [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - link "Acrux Consultores" [ref=e25] [cursor=pointer]:
            - /url: https://acrux.life
            - generic [ref=e26]: Acrux Consultores
          - paragraph [ref=e27]: Parte de ACRUX Consultores
          - paragraph [ref=e28]: Arquitectos de Sistemas Humanos
        - generic [ref=e29]:
          - heading "PULSO-H" [level=4] [ref=e30]
          - list [ref=e31]:
            - listitem [ref=e32]:
              - link "Inicio" [ref=e33] [cursor=pointer]:
                - /url: /
            - listitem [ref=e34]:
              - link "Evaluar bienestar" [ref=e35] [cursor=pointer]:
                - /url: /evaluar
            - listitem [ref=e36]:
              - link "Nuestros servicios" [ref=e37] [cursor=pointer]:
                - /url: https://acrux.life/soluciones
        - generic [ref=e38]:
          - heading "Legal" [level=4] [ref=e39]
          - list [ref=e40]:
            - listitem [ref=e41]:
              - link "Política de Privacidad" [ref=e42] [cursor=pointer]:
                - /url: https://acrux.life/privacidad
            - listitem [ref=e43]:
              - link "Términos y Condiciones" [ref=e44] [cursor=pointer]:
                - /url: https://acrux.life/terminos
            - listitem [ref=e45]:
              - link "Política de Cookies" [ref=e46] [cursor=pointer]:
                - /url: https://acrux.life/cookies
        - generic [ref=e47]:
          - heading "Confianza" [level=4] [ref=e48]
          - list [ref=e49]:
            - listitem [ref=e50]:
              - img [ref=e51]
              - text: Datos encriptados
            - listitem [ref=e53]:
              - img [ref=e54]
              - text: GDPR compliant
            - listitem [ref=e57]:
              - img [ref=e58]
              - text: ISTAS-21 validado
      - paragraph [ref=e62]: © 2026 ACRUX Consultores. Todos los derechos reservados.
```

# Test source

```ts
  227 |   })
  228 |   
  229 |   test('9.7 + 5.10 - Scheduling flow: select slot → fill form → confirm', async ({ page }) => {
  230 |     await page.addInitScript(() => {
  231 |       sessionStorage.setItem('pulso-h-lead-id', '123')
  232 |       sessionStorage.setItem('pulso-h-lead-email', 'test@example.com')
  233 |     })
  234 |     
  235 |     await navigate(page, '/agendar')
  236 |     
  237 |     // Wait for calendar to load
  238 |     await expect(page.locator('text=/Lunes|Martes|Miércoles|Jueves|Viernes/i')).toBeVisible({ timeout: 15000 })
  239 |     
  240 |     // Find and select an available slot
  241 |     const slots = await page.locator('button:not([disabled])').filter({ hasText: /:/ }).all()
  242 |     if (slots.length > 0) {
  243 |       await slots[0].click()
  244 |       
  245 |       // Form should appear or modal should open
  246 |       const formVisible = await page.locator('input[name="name"], input[placeholder*="nombre"], text=Confirmar cita').isVisible().catch(() => false)
  247 |       
  248 |       if (formVisible) {
  249 |         // Fill booking form
  250 |         await page.fill('input[name="name"]', 'Test User')
  251 |         await page.fill('textarea[name="notes"], textarea[placeholder*="notas"]', 'Test appointment notes')
  252 |         
  253 |         // Submit form
  254 |         const submitButton = page.locator('button[type="submit"], button:has-text("Confirmar")')
  255 |         await submitButton.click()
  256 |         
  257 |         // Should show confirmation
  258 |         await expect(page.locator('text=/confirmada|éxito|confirmado/i')).toBeVisible({ timeout: 10000 })
  259 |       }
  260 |     } else {
  261 |       console.log('⚠ No available slots found for testing')
  262 |     }
  263 |     
  264 |     console.log('✓ Scheduling flow works')
  265 |   })
  266 |   
  267 |   test('2.10 - Complete funnel: assessment → capture → thank you → results', async ({ page }) => {
  268 |     test.setTimeout(180000) // 3 minutes
  269 |     
  270 |     // Start from landing
  271 |     await navigate(page, '/')
  272 |     
  273 |     // Click start assessment
  274 |     await page.click('text=Comenzar evaluación')
  275 |     await expect(page).toHaveURL(/.*evaluar/)
  276 |     
  277 |     // Check consent and start
  278 |     await page.check('input[type="checkbox"]')
  279 |     await page.click('button:has-text("Comenzar evaluación")')
  280 |     
  281 |     // Complete all 36 questions
  282 |     for (let moduleIndex = 0; moduleIndex < 6; moduleIndex++) {
  283 |       const sliders = await page.locator('input[type="range"]').all()
  284 |       for (const slider of sliders) {
  285 |         await slider.evaluate(el => {
  286 |           (el as HTMLInputElement).value = '3'
  287 |           el.dispatchEvent(new Event('change', { bubbles: true }))
  288 |         })
  289 |       }
  290 |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Finalizar")')
  291 |       await nextButton.click()
  292 |       await page.waitForTimeout(300)
  293 |     }
  294 |     
  295 |     // Lead capture modal should appear
  296 |     await expect(page.locator('text=/email|correo|lead/i')).toBeVisible({ timeout: 10000 })
  297 |     
  298 |     // Fill and submit with unique email
  299 |     const timestamp = Date.now()
  300 |     await page.fill('input[type="email"]', `funnel-test-${timestamp}@example.com`)
  301 |     await page.check('input[name="gdpr_consent"], input[type="checkbox"]')
  302 |     await page.click('button[type="submit"], button:has-text("Enviar"), button:has-text("Continuar")')
  303 |     
  304 |     // Should reach thank you page
  305 |     await expect(page).toHaveURL(/.*gracias/, { timeout: 15000 })
  306 |     
  307 |     // Verify Thank You page content
  308 |     await expect(page.locator('text=/perfil|resultado|informe/i')).toBeVisible()
  309 |     
  310 |     // Click to see results
  311 |     const resultsButton = page.locator('text=Ver mi informe completo')
  312 |     await resultsButton.click()
  313 |     
  314 |     // Should reach results
  315 |     await expect(page).toHaveURL(/.*resultados/, { timeout: 15000 })
  316 |     await expect(page.locator('text=/resultado|recomendación|intervención/i')).toBeVisible()
  317 |     
  318 |     console.log('✓ Complete funnel test passed: assessment → capture → thank you → results')
  319 |   })
  320 |   
  321 |   test('9.10 - Responsive design on mobile', async ({ page }) => {
  322 |     // Set viewport to mobile size
  323 |     await page.setViewportSize({ width: 375, height: 667 })
  324 |     
  325 |     // Test landing page
  326 |     await navigate(page, '/')
> 327 |     await expect(page.locator('text=/PULSO-H|Bienestar|evaluación/i')).toBeVisible()
      |                                                                        ^ Error: expect(locator).toBeVisible() failed
  328 |     
  329 |     // Test assessment page
  330 |     await navigate(page, '/evaluar')
  331 |     await expect(page.locator('text=Bienvenido a PULSO-H')).toBeVisible()
  332 |     
  333 |     // Start assessment
  334 |     await page.check('input[type="checkbox"]')
  335 |     await page.click('button:has-text("Comenzar evaluación")')
  336 |     
  337 |     // Verify no horizontal overflow on assessment
  338 |     const body = page.locator('body')
  339 |     const bodyWidth = await body.evaluate(el => el.scrollWidth)
  340 |     const viewportWidth = await page.evaluate(() => window.innerWidth)
  341 |     expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // Allow 1px rounding
  342 |     
  343 |     // Test results page
  344 |     await page.addInitScript(() => {
  345 |       sessionStorage.setItem('pulso-h-lead-id', '123')
  346 |       sessionStorage.setItem('pulso-h-result', JSON.stringify({
  347 |         profileName: 'equilibradx',
  348 |         irp: 45,
  349 |         irpLabel: 'Riesgo Moderado',
  350 |         irpZone: 'yellow',
  351 |         dimensions: {},
  352 |         timestamp: new Date().toISOString()
  353 |       }))
  354 |     })
  355 |     
  356 |     await navigate(page, '/resultados')
  357 |     await expect(page.locator('text=/resultado|recomendación/i')).toBeVisible()
  358 |     
  359 |     console.log('✓ Responsive design works on mobile (375x667)')
  360 |   })
  361 |   
  362 |   test('9.11 - Offline behavior during assessment', async ({ page }) => {
  363 |     test.setTimeout(120000)
  364 |     
  365 |     await navigate(page, '/evaluar')
  366 |     
  367 |     // Start assessment
  368 |     await page.check('input[type="checkbox"]')
  369 |     await page.click('button:has-text("Comenzar evaluación")')
  370 |     
  371 |     // Answer first 2 modules (12 questions)
  372 |     for (let moduleIndex = 0; moduleIndex < 2; moduleIndex++) {
  373 |       const sliders = await page.locator('input[type="range"]').all()
  374 |       for (const slider of sliders) {
  375 |         await slider.evaluate(el => {
  376 |           (el as HTMLInputElement).value = '3'
  377 |           el.dispatchEvent(new Event('change', { bubbles: true }))
  378 |         })
  379 |       }
  380 |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Finalizar")')
  381 |       await nextButton.click()
  382 |       await page.waitForTimeout(300)
  383 |     }
  384 |     
  385 |     // Simulate offline
  386 |     await page.context().setOffline(true)
  387 |     
  388 |     // Continue answering questions offline
  389 |     const offlineSliders = await page.locator('input[type="range"]').all()
  390 |     for (const slider of offlineSliders) {
  391 |       await slider.evaluate(el => {
  392 |         (el as HTMLInputElement).value = '3'
  393 |         el.dispatchEvent(new Event('change', { bubbles: true }))
  394 |       })
  395 |     }
  396 |     const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Finalizar")')
  397 |     await nextButton.click()
  398 |     
  399 |     // Go back online
  400 |     await page.context().setOffline(false)
  401 |     
  402 |     // Verify assessment continues without data loss
  403 |     await page.waitForTimeout(1000)
  404 |     
  405 |     // Progress should show more than 12 answered (localStorage persistence)
  406 |     const progressText = await page.locator('text=/respondidas|de 36/i').textContent().catch(() => '')
  407 |     const answeredMatch = progressText.match(/(\d+)\s+de\s+36/)
  408 |     if (answeredMatch) {
  409 |       const answered = parseInt(answeredMatch[1])
  410 |       expect(answered).toBeGreaterThanOrEqual(12)
  411 |     }
  412 |     
  413 |     console.log('✓ Offline behavior works - progress saved locally')
  414 |   })
  415 |   
  416 |   test('9.9 + 7.13 - GA4 events fire correctly', async ({ page }) => {
  417 |     test.setTimeout(120000)
  418 |     
  419 |     const events: string[] = []
  420 |     
  421 |     // Listen for GA4 events
  422 |     await page.route('**/*', route => {
  423 |       const url = route.request().url()
  424 |       if (url.includes('google-analytics') || url.includes('gtag')) {
  425 |         events.push(url)
  426 |       }
  427 |       route.continue()
```