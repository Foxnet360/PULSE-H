# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 9.6 - Results Page CTA tracking
- Location: e2e/pulso-h.spec.ts:197:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Resultados')
Expected: visible
Error: strict mode violation: locator('text=Resultados') resolved to 2 elements:
    1) <h1 class="font-display text-2xl font-bold text-primary-900 mb-4">No hay resultados disponibles</h1> aka getByRole('heading', { name: 'No hay resultados disponibles' })
    2) <p class="text-primary-700 mb-6">Completa la evaluación para ver tus resultados.</p> aka getByText('Completa la evaluación para')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Resultados')

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
        - generic [ref=e20]: equilibradx
        - heading "Estás en equilibrio" [level=1] [ref=e21]
        - paragraph [ref=e22]: Tu pulso indica que estás en un momento de equilibradx. Esto no es un veredicto, es una invitación.
      - generic [ref=e23]:
        - heading "Índice de Riesgo Psicosocial" [level=2] [ref=e24]
        - generic [ref=e26]:
          - img [ref=e27]
          - generic [ref=e30]:
            - generic [ref=e31]: "45"
            - generic [ref=e32]: Riesgo Moderado
        - paragraph
      - heading "Dimensiones Evaluadas" [level=2] [ref=e34]
      - generic [ref=e35]:
        - heading "Plan de Acción Personalizado" [level=2] [ref=e36]
        - generic [ref=e37]:
          - button "Acción Inmediata Respiración 4-7-8" [ref=e39]:
            - generic [ref=e40]:
              - generic [ref=e41]: Acción Inmediata
              - generic [ref=e42]: Respiración 4-7-8
            - img [ref=e43]
          - button "Acción Corto Plazo Micro-pausas Estructuradas" [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]: Acción Corto Plazo
              - generic [ref=e49]: Micro-pausas Estructuradas
            - img [ref=e50]
          - button "Acción Medio Plazo Job Crafting Personal" [ref=e53]:
            - generic [ref=e54]:
              - generic [ref=e55]: Acción Medio Plazo
              - generic [ref=e56]: Job Crafting Personal
            - img [ref=e57]
      - generic [ref=e59]:
        - heading "¿Quieres profundizar en tus resultados?" [level=2] [ref=e60]
        - generic [ref=e61]:
          - link "Agendar consultoría 30 minutos gratuitos para interpretar tus resultados de bienestar. Agendar ahora" [ref=e62] [cursor=pointer]:
            - /url: https://calendly.com/acrux-consultores/30min
            - img [ref=e64]
            - heading "Agendar consultoría" [level=3] [ref=e66]
            - paragraph [ref=e67]: 30 minutos gratuitos para interpretar tus resultados de bienestar.
            - generic [ref=e68]:
              - text: Agendar ahora
              - img [ref=e69]
          - link "Ver soluciones Conoce cómo ayudamos a mejorar el bienestar de equipos como el tuyo. Explorar" [ref=e71] [cursor=pointer]:
            - /url: https://acrux.life/soluciones
            - img [ref=e73]
            - heading "Ver soluciones" [level=3] [ref=e76]
            - paragraph [ref=e77]: Conoce cómo ayudamos a mejorar el bienestar de equipos como el tuyo.
            - generic [ref=e78]:
              - text: Explorar
              - img [ref=e79]
          - button "Descargar informe Obtén tu reporte completo en PDF para compartir con tu equipo. Descargar" [ref=e81]:
            - img [ref=e83]
            - heading "Descargar informe" [level=3] [ref=e86]
            - paragraph [ref=e87]: Obtén tu reporte completo en PDF para compartir con tu equipo.
            - generic [ref=e88]:
              - text: Descargar
              - img [ref=e89]
  - contentinfo [ref=e91]:
    - generic [ref=e92]:
      - generic [ref=e93]:
        - generic [ref=e94]:
          - link "Acrux Consultores" [ref=e95] [cursor=pointer]:
            - /url: https://acrux.life
            - generic [ref=e96]: Acrux Consultores
          - paragraph [ref=e97]: Parte de ACRUX Consultores
          - paragraph [ref=e98]: Arquitectos de Sistemas Humanos
        - generic [ref=e99]:
          - heading "PULSO-H" [level=4] [ref=e100]
          - list [ref=e101]:
            - listitem [ref=e102]:
              - link "Inicio" [ref=e103] [cursor=pointer]:
                - /url: /
            - listitem [ref=e104]:
              - link "Evaluar bienestar" [ref=e105] [cursor=pointer]:
                - /url: /evaluar
            - listitem [ref=e106]:
              - link "Nuestros servicios" [ref=e107] [cursor=pointer]:
                - /url: https://acrux.life/soluciones
        - generic [ref=e108]:
          - heading "Legal" [level=4] [ref=e109]
          - list [ref=e110]:
            - listitem [ref=e111]:
              - link "Política de Privacidad" [ref=e112] [cursor=pointer]:
                - /url: https://acrux.life/privacidad
            - listitem [ref=e113]:
              - link "Términos y Condiciones" [ref=e114] [cursor=pointer]:
                - /url: https://acrux.life/terminos
            - listitem [ref=e115]:
              - link "Política de Cookies" [ref=e116] [cursor=pointer]:
                - /url: https://acrux.life/cookies
        - generic [ref=e117]:
          - heading "Confianza" [level=4] [ref=e118]
          - list [ref=e119]:
            - listitem [ref=e120]:
              - img [ref=e121]
              - text: Datos encriptados
            - listitem [ref=e123]:
              - img [ref=e124]
              - text: GDPR compliant
            - listitem [ref=e127]:
              - img [ref=e128]
              - text: ISTAS-21 validado
      - paragraph [ref=e132]: © 2026 ACRUX Consultores. Todos los derechos reservados.
  - generic [ref=e135]:
    - generic [ref=e136]:
      - img [ref=e138]
      - generic [ref=e140]:
        - paragraph [ref=e141]:
          - strong [ref=e142]: Tu privacidad importa
          - text: — Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.
        - link "Más información" [ref=e143] [cursor=pointer]:
          - /url: /privacidad
          - text: Más información
          - img [ref=e144]
    - generic [ref=e146]:
      - button "Solo esenciales" [ref=e147]
      - button "Aceptar todas" [ref=e148]
      - button "Cerrar" [ref=e149]:
        - img [ref=e150]
```

# Test source

```ts
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
  185 |       await expect(page.locator(`text=${profile.name}`)).toBeVisible()
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
> 216 |     await expect(page.locator('text=Resultados')).toBeVisible()
      |                                                   ^ Error: expect(locator).toBeVisible() failed
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
```