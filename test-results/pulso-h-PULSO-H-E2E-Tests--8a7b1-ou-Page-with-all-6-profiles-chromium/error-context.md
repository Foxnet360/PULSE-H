# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 9.5 - Thank You Page with all 6 profiles
- Location: e2e/pulso-h.spec.ts:156:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=sobrecargadx')
Expected: visible
Error: strict mode violation: locator('text=sobrecargadx') resolved to 2 elements:
    1) <div class="inline-block px-4 py-2 rounded-full text-white text-sm font-bold mb-4">sobrecargadx</div> aka getByText('sobrecargadx', { exact: true })
    2) <h1 class="font-display text-3xl font-bold text-primary-900 mb-4">Perfil de prueba: sobrecargadx</h1> aka getByRole('heading', { name: 'Perfil de prueba: sobrecargadx' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=sobrecargadx')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "ACRUX | Acrux | PULSO-H" [ref=e8] [cursor=pointer]:
        - /url: https://acrux.life
        - img "ACRUX" [ref=e9]
        - generic [ref=e10]: "|"
        - generic [ref=e11]: Acrux | PULSO-H
      - generic [ref=e12]:
        - link "Volver a Acrux" [ref=e13] [cursor=pointer]:
          - /url: https://acrux.life
        - link "Contactar consultor" [ref=e14] [cursor=pointer]:
          - /url: https://acrux.life/contacto
  - main [ref=e16]:
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: sobrecargadx
        - 'heading "Perfil de prueba: sobrecargadx" [level=1] [ref=e21]'
        - generic [ref=e22]:
          - generic [ref=e23]: "72"
          - generic [ref=e24]: /100 Riesgo Alto
      - generic [ref=e26]:
        - img [ref=e27]
        - generic [ref=e29]:
          - heading "⚠️ Pérdida de Productividad" [level=2] [ref=e30]
          - paragraph [ref=e31]:
            - text: Con un IRP de 72, estás perdiendo aproximadamente
            - strong [ref=e32]: 9 horas semanales
            - text: de productividad por agotamiento emocional.
          - paragraph [ref=e33]: Tu equipo muestra signos de agotamiento que requieren atención.
      - paragraph [ref=e35]:
        - strong [ref=e36]: El 73% de empresas en tu sector tienen mejor bienestar laboral
        - text: . Las empresas que invierten en bienestar laboral ven un retorno de $4 por cada $1 invertido.
      - generic [ref=e37]:
        - generic [ref=e38]:
          - img [ref=e39]
          - generic [ref=e42]: "Oferta de diagnóstico válida por:"
        - generic [ref=e43]: 47:59:59
        - paragraph [ref=e44]: Después de este tiempo, tu informe expirará y necesitarás completar la evaluación de nuevo.
      - generic [ref=e45]:
        - button "Agendar mi revisión gratuita de 30 min" [ref=e46]:
          - img [ref=e47]
          - text: Agendar mi revisión gratuita de 30 min
          - img [ref=e49]
        - button "Ver mi informe completo" [ref=e51]:
          - img [ref=e52]
          - text: Ver mi informe completo
  - contentinfo [ref=e55]:
    - generic [ref=e56]:
      - generic [ref=e57]:
        - generic [ref=e58]:
          - link "Acrux Consultores" [ref=e59] [cursor=pointer]:
            - /url: https://acrux.life
            - generic [ref=e60]: Acrux Consultores
          - paragraph [ref=e61]: Parte de ACRUX Consultores
          - paragraph [ref=e62]: Arquitectos de Sistemas Humanos
        - generic [ref=e63]:
          - heading "PULSO-H" [level=4] [ref=e64]
          - list [ref=e65]:
            - listitem [ref=e66]:
              - link "Inicio" [ref=e67] [cursor=pointer]:
                - /url: /
            - listitem [ref=e68]:
              - link "Evaluar bienestar" [ref=e69] [cursor=pointer]:
                - /url: /evaluar
            - listitem [ref=e70]:
              - link "Nuestros servicios" [ref=e71] [cursor=pointer]:
                - /url: https://acrux.life/soluciones
        - generic [ref=e72]:
          - heading "Legal" [level=4] [ref=e73]
          - list [ref=e74]:
            - listitem [ref=e75]:
              - link "Política de Privacidad" [ref=e76] [cursor=pointer]:
                - /url: https://acrux.life/privacidad
            - listitem [ref=e77]:
              - link "Términos y Condiciones" [ref=e78] [cursor=pointer]:
                - /url: https://acrux.life/terminos
            - listitem [ref=e79]:
              - link "Política de Cookies" [ref=e80] [cursor=pointer]:
                - /url: https://acrux.life/cookies
        - generic [ref=e81]:
          - heading "Confianza" [level=4] [ref=e82]
          - list [ref=e83]:
            - listitem [ref=e84]:
              - img [ref=e85]
              - text: Datos encriptados
            - listitem [ref=e87]:
              - img [ref=e88]
              - text: GDPR compliant
            - listitem [ref=e91]:
              - img [ref=e92]
              - text: ISTAS-21 validado
      - paragraph [ref=e96]: © 2026 ACRUX Consultores. Todos los derechos reservados.
  - generic [ref=e99]:
    - generic [ref=e100]:
      - img [ref=e102]
      - generic [ref=e104]:
        - paragraph [ref=e105]:
          - strong [ref=e106]: Tu privacidad importa
          - text: — Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.
        - link "Más información" [ref=e107] [cursor=pointer]:
          - /url: /privacidad
          - text: Más información
          - img [ref=e108]
    - generic [ref=e110]:
      - button "Solo esenciales" [ref=e111]
      - button "Aceptar todas" [ref=e112]
      - button "Cerrar" [ref=e113]:
        - img [ref=e114]
```

# Test source

```ts
  85  |   test('9.4 - Lead capture with invalid email shows error', async ({ page }) => {
  86  |     test.setTimeout(120000)
  87  |     
  88  |     await navigate(page, '/evaluar')
  89  |     
  90  |     // Complete assessment quickly
  91  |     await page.check('input[type="checkbox"]')
  92  |     await page.click('button:has-text("Comenzar evaluación")')
  93  |     
  94  |     for (let moduleIndex = 0; moduleIndex < 6; moduleIndex++) {
  95  |       const sliders = await page.locator('input[type="range"]').all()
  96  |       for (const slider of sliders) {
  97  |         await slider.evaluate(el => {
  98  |           (el as HTMLInputElement).value = '3'
  99  |           el.dispatchEvent(new Event('change', { bubbles: true }))
  100 |         })
  101 |       }
  102 |       const nextButton = page.locator('button:has-text("Siguiente"), button:has-text("Finalizar")')
  103 |       await nextButton.click()
  104 |       await page.waitForTimeout(300)
  105 |     }
  106 |     
  107 |     // Try invalid email
  108 |     await page.fill('input[type="email"]', 'invalid-email')
  109 |     await page.check('input[name="gdpr_consent"]')
  110 |     await page.click('button[type="submit"]')
  111 |     
  112 |     // Should show validation error (either HTML5 or custom)
  113 |     const errorVisible = await page.locator('text=/email no válido|valid email|formato/i').isVisible().catch(() => false)
  114 |     const inputInvalid = await page.locator('input[type="email"]:invalid').count() > 0
  115 |     
  116 |     expect(errorVisible || inputInvalid).toBeTruthy()
  117 |     
  118 |     console.log('✓ Lead capture with invalid email shows error')
  119 |   })
  120 |   
  121 |   test('9.5 - Thank You Page displays profile and productivity loss', async ({ page }) => {
  122 |     // Set session data to simulate completed assessment
  123 |     await page.addInitScript(() => {
  124 |       sessionStorage.setItem('pulso-h-lead-id', '123')
  125 |       sessionStorage.setItem('pulso-h-result', JSON.stringify({
  126 |         profileName: 'sobrecargadx',
  127 |         profileDescription: 'Te sientes abrumado por la carga laboral',
  128 |         profileColor: '#ef4444',
  129 |         irp: 72,
  130 |         irpLabel: 'Riesgo Alto',
  131 |         irpZone: 'red',
  132 |         dimensions: {},
  133 |         timestamp: new Date().toISOString()
  134 |       }))
  135 |     })
  136 |     
  137 |     await navigate(page, '/gracias')
  138 |     
  139 |     // Verify profile is displayed
  140 |     await expect(page.locator('text=sobrecargadx')).toBeVisible()
  141 |     
  142 |     // Verify IRP is displayed - check page contains the IRP value
  143 |     const pageContent = await page.content()
  144 |     expect(pageContent).toContain('72')
  145 |     expect(pageContent).toContain('/100')
  146 |     
  147 |     // Verify productivity loss calculation (floor(72/8) = 9 hours)
  148 |     expect(pageContent).toContain('9 horas semanales')
  149 |     
  150 |     // Verify countdown timer or CTA exists
  151 |     await expect(page.locator('text=Ver mi informe completo')).toBeVisible()
  152 |     
  153 |     console.log('✓ Thank You Page displays correctly with profile and productivity loss')
  154 |   })
  155 |   
  156 |   test('9.5 - Thank You Page with all 6 profiles', async ({ page }) => {
  157 |     const profiles = [
  158 |       { name: 'sobrecargadx', irp: 72, color: '#ef4444' },
  159 |       { name: 'desconectadx', irp: 65, color: '#f97316' },
  160 |       { name: 'agotadx', irp: 80, color: '#dc2626' },
  161 |       { name: 'resiliente', irp: 35, color: '#22c55e' },
  162 |       { name: 'equilibradx', irp: 45, color: '#3b82f6' },
  163 |       { name: 'floreciente', irp: 20, color: '#10b981' },
  164 |     ]
  165 |     
  166 |     for (const profile of profiles) {
  167 |       await page.addInitScript((profileData) => {
  168 |         sessionStorage.setItem('pulso-h-lead-id', '123')
  169 |         sessionStorage.setItem('pulso-h-result', JSON.stringify({
  170 |           profileName: profileData.name,
  171 |           profileDescription: `Perfil de prueba: ${profileData.name}`,
  172 |           profileColor: profileData.color,
  173 |           irp: profileData.irp,
  174 |           irpLabel: profileData.irp > 60 ? 'Riesgo Alto' : profileData.irp > 40 ? 'Riesgo Moderado' : 'Bienestar',
  175 |           irpZone: profileData.irp > 60 ? 'red' : profileData.irp > 40 ? 'yellow' : 'green',
  176 |           dimensions: {},
  177 |           timestamp: new Date().toISOString()
  178 |         }))
  179 |       }, profile)
  180 |       
  181 |       await navigate(page, '/gracias')
  182 |       await page.waitForLoadState('networkidle')
  183 |       
  184 |       // Verify profile name is displayed
> 185 |       await expect(page.locator(`text=${profile.name}`)).toBeVisible()
      |                                                          ^ Error: expect(locator).toBeVisible() failed
  186 |       
  187 |       // Verify productivity loss calculation
  188 |       const hoursLost = Math.floor(profile.irp / 8)
  189 |       await expect(page.locator(`text=/.*${hoursLost}.*horas.*/i`)).toBeVisible()
  190 |       
  191 |       console.log(`  ✓ Profile: ${profile.name} (IRP: ${profile.irp}, Loss: ${hoursLost}h)`)
  192 |     }
  193 |     
  194 |     console.log('✓ Thank You Page works with all 6 profiles')
  195 |   })
  196 |   
  197 |   test('9.6 - Results Page CTA tracking', async ({ page }) => {
  198 |     // Set required session data
  199 |     await page.addInitScript(() => {
  200 |       sessionStorage.setItem('pulso-h-lead-id', '123')
  201 |       sessionStorage.setItem('pulso-h-result', JSON.stringify({
  202 |         profileName: 'equilibradx',
  203 |         profileDescription: 'Estás en equilibrio',
  204 |         profileColor: '#3b82f6',
  205 |         irp: 45,
  206 |         irpLabel: 'Riesgo Moderado',
  207 |         irpZone: 'yellow',
  208 |         dimensions: {},
  209 |         timestamp: new Date().toISOString()
  210 |       }))
  211 |     })
  212 |     
  213 |     await navigate(page, '/resultados')
  214 |     
  215 |     // Verify page loads
  216 |     await expect(page.locator('text=Resultados')).toBeVisible()
  217 |     
  218 |     // Verify primary CTA (schedule)
  219 |     const scheduleCta = page.locator('a[href*="agendar"], button:has-text("Agendar"), a:has-text("Agendar")').first()
  220 |     await expect(scheduleCta).toBeVisible()
  221 |     
  222 |     // Verify secondary CTA (download PDF)
  223 |     const pdfCta = page.locator('button:has-text("PDF"), button:has-text("Descargar"), a:has-text("PDF")').first()
  224 |     await expect(pdfCta).toBeVisible()
  225 |     
  226 |     console.log('✓ Results Page CTAs are visible and tracked')
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
```