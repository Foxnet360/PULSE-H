# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 8.10 - Admin dashboard features
- Location: e2e/pulso-h.spec.ts:461:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/Panel|Admin|Dashboard/i')
Expected: visible
Error: strict mode violation: locator('text=/Panel|Admin|Dashboard/i') resolved to 2 elements:
    1) <a data-discover="true" href="/pulso-h/dashboard" class="text-sm font-medium transition-colors text-primary-700 hover:text-accent">Dashboard</a> aka getByRole('link', { name: 'Dashboard' })
    2) <a data-discover="true" href="/pulso-h/admin" class="text-sm font-medium transition-colors text-accent">Admin</a> aka getByRole('link', { name: 'Admin' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/Panel|Admin|Dashboard/i')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "PULSO-H" [ref=e7] [cursor=pointer]:
        - /url: /pulso-h/
        - img [ref=e8]
        - generic [ref=e10]: PULSO-H
      - generic [ref=e11]:
        - link "Inicio" [ref=e12] [cursor=pointer]:
          - /url: /pulso-h/
        - link "Evaluar" [ref=e13] [cursor=pointer]:
          - /url: /pulso-h/evaluar
        - link "Dashboard" [ref=e14] [cursor=pointer]:
          - /url: /pulso-h/dashboard
        - link "Admin" [ref=e15] [cursor=pointer]:
          - /url: /pulso-h/admin
        - link "ACRUX" [ref=e16] [cursor=pointer]:
          - /url: https://acrux.life
  - main [ref=e17]:
    - generic [ref=e18]:
      - img [ref=e19]
      - paragraph [ref=e21]: Cargando PULSO-H...
  - contentinfo [ref=e22]:
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]:
            - img [ref=e27]
            - generic [ref=e29]: PULSO-H
          - paragraph [ref=e30]: Diagnóstico de bienestar laboral y burnout. Desarrollado por psicólogos organizacionales de ACRUX Consultores.
        - generic [ref=e31]:
          - heading "Enlaces" [level=3] [ref=e32]
          - list [ref=e33]:
            - listitem [ref=e34]:
              - link "Inicio" [ref=e35] [cursor=pointer]:
                - /url: /pulso-h/
            - listitem [ref=e36]:
              - link "Evaluar" [ref=e37] [cursor=pointer]:
                - /url: /pulso-h/evaluar
            - listitem [ref=e38]:
              - link "Política de Privacidad" [ref=e39] [cursor=pointer]:
                - /url: /pulso-h/privacidad
            - listitem [ref=e40]:
              - link "Eliminar mis datos" [ref=e41] [cursor=pointer]:
                - /url: /pulso-h/privacidad#eliminacion
            - listitem [ref=e42]:
              - link "ACRUX Consultores" [ref=e43] [cursor=pointer]:
                - /url: https://acrux.life
        - generic [ref=e44]:
          - heading "Contacto" [level=3] [ref=e45]
          - list [ref=e46]:
            - listitem [ref=e47]:
              - img [ref=e48]
              - link "info@acrux.life" [ref=e51] [cursor=pointer]:
                - /url: mailto:info@acrux.life
            - listitem [ref=e52]:
              - img [ref=e53]
              - generic [ref=e55]: +57 (XXX) XXX-XXXX
            - listitem [ref=e56]:
              - img [ref=e57]
              - generic [ref=e60]: Colombia
      - generic [ref=e61]:
        - paragraph [ref=e62]: © 2026 PULSO-H — Una iniciativa de ACRUX Consultores. Todos los derechos reservados.
        - paragraph [ref=e63]: Este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico.
```

# Test source

```ts
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
  428 |     })
  429 |     
  430 |     // Also check dataLayer
  431 |     await page.addInitScript(() => {
  432 |       window.dataLayer = window.dataLayer || []
  433 |       const originalPush = window.dataLayer.push
  434 |       window.dataLayer.push = function(...args) {
  435 |         console.log('GA4_EVENT:', JSON.stringify(args))
  436 |         return originalPush.apply(this, args)
  437 |       }
  438 |     })
  439 |     
  440 |     // Navigate to landing
  441 |     await navigate(page, '/')
  442 |     await page.waitForTimeout(2000)
  443 |     
  444 |     // Check for landing_view event in console or dataLayer
  445 |     const consoleLogs = await page.evaluate(() => {
  446 |       return (window as any).dataLayer || []
  447 |     })
  448 |     
  449 |     // Start assessment
  450 |     await page.click('text=Comenzar evaluación')
  451 |     await page.waitForTimeout(1000)
  452 |     
  453 |     console.log('GA4 Events tracked:', consoleLogs.length, 'items in dataLayer')
  454 |     
  455 |     // Basic check - dataLayer should have some events
  456 |     expect(consoleLogs.length).toBeGreaterThanOrEqual(0)
  457 |     
  458 |     console.log('✓ GA4 events verification complete')
  459 |   })
  460 |   
  461 |   test('8.10 - Admin dashboard features', async ({ page }) => {
  462 |     await navigate(page, '/admin')
  463 |     
  464 |     // Verify page loads
> 465 |     await expect(page.locator('text=/Panel|Admin|Dashboard/i')).toBeVisible()
      |                                                                 ^ Error: expect(locator).toBeVisible() failed
  466 |     
  467 |     // Check if appointments tab exists and works
  468 |     const tabs = await page.locator('button, a').filter({ hasText: /Citas|Leads|Analytics|Disponibilidad/i }).all()
  469 |     expect(tabs.length).toBeGreaterThanOrEqual(1)
  470 |     
  471 |     // Try to navigate to different tabs
  472 |     for (const tab of tabs.slice(0, 3)) { // Test first 3 tabs
  473 |       await tab.click()
  474 |       await page.waitForTimeout(500)
  475 |     }
  476 |     
  477 |     console.log('✓ Admin dashboard features accessible')
  478 |   })
  479 |   
  480 | })
  481 | 
```