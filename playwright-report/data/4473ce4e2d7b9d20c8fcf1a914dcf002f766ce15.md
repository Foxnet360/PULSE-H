# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulso-h.spec.ts >> PULSO-H E2E Tests >> 9.4 - Lead capture with invalid email shows error
- Location: e2e/pulso-h.spec.ts:63:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]')

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
    - generic [ref=e19]:
      - generic [ref=e20]:
        - img [ref=e21]
        - heading "Bienvenido a PULSO-H" [level=1] [ref=e23]
        - paragraph [ref=e24]: Descubre el pulso de tu bienestar laboral en 8 minutos
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e28]: "1"
          - generic [ref=e29]:
            - heading "6 módulos de evaluación" [level=3] [ref=e30]
            - paragraph [ref=e31]: Cada uno evalúa una dimensión diferente de tu bienestar
        - generic [ref=e32]:
          - generic [ref=e34]: "2"
          - generic [ref=e35]:
            - heading "100% anónimo" [level=3] [ref=e36]
            - paragraph [ref=e37]: Tus respuestas se procesan en tu dispositivo. Nadie más las ve.
        - generic [ref=e38]:
          - generic [ref=e40]: "3"
          - generic [ref=e41]:
            - heading "Plan de acción personalizado" [level=3] [ref=e42]
            - paragraph [ref=e43]: Recibe recomendaciones específicas basadas en tu perfil
      - generic [ref=e44]:
        - generic [ref=e45] [cursor=pointer]:
          - checkbox "Entiendo que este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico. Mis respuestas serán procesadas localmente en mi dispositivo." [ref=e46]
          - generic [ref=e47]: Entiendo que este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico. Mis respuestas serán procesadas localmente en mi dispositivo.
        - button "Comenzar evaluación" [disabled] [ref=e48]:
          - text: Comenzar evaluación
          - img [ref=e49]
  - contentinfo [ref=e51]:
    - generic [ref=e52]:
      - generic [ref=e53]:
        - generic [ref=e54]:
          - link "Acrux Consultores" [ref=e55] [cursor=pointer]:
            - /url: https://acrux.life
            - generic [ref=e56]: Acrux Consultores
          - paragraph [ref=e57]: Parte de ACRUX Consultores
          - paragraph [ref=e58]: Arquitectos de Sistemas Humanos
        - generic [ref=e59]:
          - heading "PULSO-H" [level=4] [ref=e60]
          - list [ref=e61]:
            - listitem [ref=e62]:
              - link "Inicio" [ref=e63] [cursor=pointer]:
                - /url: /
            - listitem [ref=e64]:
              - link "Evaluar bienestar" [ref=e65] [cursor=pointer]:
                - /url: /evaluar
            - listitem [ref=e66]:
              - link "Nuestros servicios" [ref=e67] [cursor=pointer]:
                - /url: https://acrux.life/soluciones
        - generic [ref=e68]:
          - heading "Legal" [level=4] [ref=e69]
          - list [ref=e70]:
            - listitem [ref=e71]:
              - link "Política de Privacidad" [ref=e72] [cursor=pointer]:
                - /url: https://acrux.life/privacidad
            - listitem [ref=e73]:
              - link "Términos y Condiciones" [ref=e74] [cursor=pointer]:
                - /url: https://acrux.life/terminos
            - listitem [ref=e75]:
              - link "Política de Cookies" [ref=e76] [cursor=pointer]:
                - /url: https://acrux.life/cookies
        - generic [ref=e77]:
          - heading "Confianza" [level=4] [ref=e78]
          - list [ref=e79]:
            - listitem [ref=e80]:
              - img [ref=e81]
              - text: Datos encriptados
            - listitem [ref=e83]:
              - img [ref=e84]
              - text: GDPR compliant
            - listitem [ref=e87]:
              - img [ref=e88]
              - text: ISTAS-21 validado
      - paragraph [ref=e92]: © 2026 ACRUX Consultores. Todos los derechos reservados.
  - generic [ref=e95]:
    - generic [ref=e96]:
      - img [ref=e98]
      - generic [ref=e100]:
        - paragraph [ref=e101]:
          - strong [ref=e102]: Tu privacidad importa
          - text: — Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.
        - link "Más información" [ref=e103] [cursor=pointer]:
          - /url: /privacidad
          - text: Más información
          - img [ref=e104]
    - generic [ref=e106]:
      - button "Solo esenciales" [ref=e107]
      - button "Aceptar todas" [ref=e108]
      - button "Cerrar" [ref=e109]:
        - img [ref=e110]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | // Helper to navigate considering base path
  4   | const navigate = (page, path) => page.goto(`/pulso-h${path}`)
  5   | 
  6   | test.describe('PULSO-H E2E Tests', () => {
  7   |   
  8   |   test('9.3 - Complete assessment flow with all 36 questions', async ({ page }) => {
  9   |     // Navigate to assessment
  10  |     await navigate(page, '/evaluar')
  11  |     
  12  |     // Verify assessment page loads
  13  |     await expect(page.locator('text=Pregunta')).toBeVisible()
  14  |     
  15  |     // Answer all 36 questions
  16  |     for (let i = 0; i < 36; i++) {
  17  |       // Select an option (1-5 scale)
  18  |       const options = await page.locator('button[role="radio"]').all()
  19  |       if (options.length > 0) {
  20  |         await options[2].click() // Select middle option
  21  |       }
  22  |       
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
> 76  |     await page.fill('input[type="email"]', 'invalid-email')
      |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
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
```