/**
 * PULSO-H Email Templates
 * 5-sequence email nurturing campaign
 */

export interface EmailTemplate {
  id: number
  subject: string
  html: string
  text: string
  delayHours: number
}

const brandColors = {
  primary: '#1B2A4A',
  accent: '#f5a623',
  white: '#ffffff',
  lightGray: '#f8fafc',
}

const emailWrapper = (content: string, previewText: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PULSO-H - Diagnóstico de Bienestar Laboral</title>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: ${brandColors.primary}; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${brandColors.primary}; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: ${brandColors.white}; margin: 0; font-size: 24px; }
    .content { background: ${brandColors.white}; padding: 40px 30px; border: 1px solid #e2e8f0; }
    .cta-button { display: inline-block; background: ${brandColors.accent}; color: ${brandColors.primary}; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { background: ${brandColors.lightGray}; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 12px 12px; }
    .urgency { background: #fef3c7; border-left: 4px solid ${brandColors.accent}; padding: 15px; margin: 20px 0; }
    .profile-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;">${previewText}</div>
  <div class="container">
    <div class="header">
      <h1>🔥 PULSO-H</h1>
      <p style="color: #94a3b8; margin: 10px 0 0 0;">Diagnóstico de Bienestar Laboral</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© 2024 ACRUX Consultores. Todos los derechos reservados.</p>
      <p>¿No quieres recibir más emails? <a href="{{unsubscribe_url}}">Cancelar suscripción</a></p>
    </div>
  </div>
</body>
</html>
`

export const emailTemplates: EmailTemplate[] = [
  {
    id: 1,
    subject: 'Tu informe de bienestar laboral está listo 📊',
    delayHours: 0, // Immediate
    html: emailWrapper(`
      <h2>¡Hola {{name}}! 👋</h2>
      
      <p>Gracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div class="profile-badge" style="background: {{profile_color}}20; color: {{profile_color}};">
          Tu perfil: <strong>{{profile_name}}</strong>
        </div>
      </div>
      
      <p><strong>Tu Índice de Riesgo Psicosocial (IRP): {{irp}}/100</strong></p>
      
      <p>Hemos analizado tus respuestas en 6 dimensiones del bienestar laboral y preparado recomendaciones personalizadas para ti.</p>
      
      <div style="text-align: center;">
        <a href="{{results_url}}" class="cta-button">Ver mi informe completo</a>
      </div>
      
      <p style="font-size: 14px; color: #64748b;">💡 <strong>Siguiente paso recomendado:</strong> Agenda una revisión gratuita de 30 minutos con uno de nuestros Psicólogos Organizacionales para interpretar tus resultados y crear un plan de acción.</p>
      
      <div style="text-align: center;">
        <a href="{{schedule_url}}" style="color: ${brandColors.accent}; font-weight: 600;">Agendar revisión gratuita →</a>
      </div>
    `, 'Tu informe de bienestar laboral está listo. Ver resultados y agendar revisión gratuita.'),
    text: `Hola {{name}},

Gracias por completar el diagnóstico PULSO-H. Tu informe personalizado está listo.

Tu perfil: {{profile_name}}
Tu IRP: {{irp}}/100

Ver informe completo: {{results_url}}

Siguiente paso recomendado: Agenda una revisión gratuita de 30 minutos con nuestro Psicólogo Organizacional.

Agendar: {{schedule_url}}

Saludos,
Equipo ACRUX`,
  },
  {
    id: 2,
    subject: '⏰ Tu diagnóstico expira en 24 horas',
    delayHours: 48,
    html: emailWrapper(`
      <h2>{{name}}, tu diagnóstico expira pronto ⏰</h2>
      
      <div class="urgency">
        <p><strong>⚠️ Importante:</strong> Tu informe personalizado de PULSO-H expirará en 24 horas. Después de eso, perderás acceso a tus resultados y recomendaciones.</p>
      </div>
      
      <p>No dejes pasar esta oportunidad de entender el bienestar de tu equipo y tomar acción.</p>
      
      <p><strong>Recuerda tu perfil:</strong> {{profile_name}} (IRP: {{irp}})</p>
      
      <div style="text-align: center;">
        <a href="{{results_url}}" class="cta-button">Ver mi informe antes de que expire</a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
      
      <p>¿Quieres profundizar en tus resultados?</p>
      
      <p>Nuestros Psicólogos Organizacionales están disponibles para una revisión gratuita de 30 minutos donde:</p>
      
      <ul>
        <li>Interpretaremos tus resultados en detalle</li>
        <li>Identificaremos las áreas de mayor riesgo</li>
        <li>Diseñaremos un plan de acción personalizado</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="{{schedule_url}}" class="cta-button">Agendar mi revisión gratuita</a>
      </div>
    `, 'Tu diagnóstico expira en 24 horas. Ver resultados y agendar revisión gratuita.'),
    text: `Hola {{name}},

Tu diagnóstico PULSO-H expirará en 24 horas. Después perderás acceso a tus resultados.

Tu perfil: {{profile_name}} (IRP: {{irp}})

Ver informe: {{results_url}}

¿Quieres profundizar? Agenda una revisión gratuita de 30 minutos con nuestro Psicólogo Organizacional.

Agendar: {{schedule_url}}

Equipo ACRUX`,
  },
  {
    id: 3,
    subject: 'Cómo [Empresa similar] mejoró su bienestar laboral en 3 meses 📈',
    delayHours: 168, // 7 days
    html: emailWrapper(`
      <h2>Historia de éxito: De {{profile_name}} a Floreciente 🌱</h2>
      
      <p>Hola {{name}},</p>
      
      <p>Queremos compartirte una historia que podría inspirar tu camino hacia el bienestar laboral.</p>
      
      <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
        <p><strong>Caso de éxito:</strong> Una empresa de consultoría en CDMX con un perfil similar al tuyo ({{profile_name}}, IRP: 58) implementó un programa de bienestar basado en PULSO-H.</p>
        
        <p><strong>Resultados en 3 meses:</strong></p>
        <ul>
          <li>✅ Reducción del 40% en ausentismo</li>
          <li>✅ Aumento del 25% en satisfacción laboral</li>
          <li>✅ Mejora del 30% en productividad</li>
          <li>✅ 85% de empleados reportan mejor balance vida-trabajo</li>
        </ul>
      </div>
      
      <p><strong>¿Cómo lo lograron?</strong></p>
      
      <ol>
        <li>Realizaron el diagnóstico PULSO-H con todo el equipo</li>
        <li>Implementaron las recomendaciones personalizadas</li>
        <li>Establecieron checkpoints mensuales de bienestar</li>
        <li>Capacitaron a líderes en gestión del bienestar</li>
      </ol>
      
      <p>Tú también puedes lograr resultados similares. ¿Te gustaría saber cómo?</p>
      
      <div style="text-align: center;">
        <a href="{{schedule_url}}" class="cta-button">Agendar revisión gratuita</a>
      </div>
    `, 'Caso de éxito: Cómo una empresa mejoró su bienestar laboral en 3 meses.'),
    text: `Hola {{name}},

Te compartimos una historia de éxito:

Una empresa de consultoría con perfil similar al tuyo ({{profile_name}}) implementó PULSO-H y en 3 meses logró:
- 40% reducción en ausentismo
- 25% aumento en satisfacción
- 30% mejora en productividad

¿Quieres saber cómo? Agenda una revisión gratuita:
{{schedule_url}}

Equipo ACRUX`,
  },
  {
    id: 4,
    subject: '¿Cómo va tu plan de acción? Te enviamos recursos adicionales 📚',
    delayHours: 336, // 14 days
    html: emailWrapper(`
      <h2>Hola {{name}} 👋</h2>
      
      <p>Han pasado 2 semanas desde tu diagnóstico PULSO-H. ¿Has tenido oportunidad de implementar alguna de las recomendaciones?</p>
      
      <p>Sabemos que el día a día puede ser abrumador, pero cada pequeño paso cuenta hacia el bienestar de tu equipo.</p>
      
      <div style="background: ${brandColors.lightGray}; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Recursos gratuitos que podrían interesarte:</strong></p>
        <ul>
          <li>📄 Guía: "10 señales de alerta de burnout en tu equipo"</li>
          <li>📄 Checklist: "Evaluación rápida de bienestar laboral"</li>
          <li>🎥 Webinar: "Cómo implementar un programa de bienestar con poco presupuesto"</li>
        </ul>
      </div>
      
      <p>¿Necesitas ayuda para crear un plan de acción efectivo?</p>
      
      <div style="text-align: center;">
        <a href="{{schedule_url}}" class="cta-button">Agendar revisión gratuita</a>
      </div>
      
      <p style="font-size: 14px; color: #64748b; margin-top: 30px;">Si ya has implementado cambios, ¡nos encantaría saber cómo te va! Responde a este email y cuéntanos tu experiencia.</p>
    `, 'Recursos adicionales de bienestar laboral y oferta de revisión gratuita.'),
    text: `Hola {{name}},

¿Cómo va tu plan de acción después del diagnóstico PULSO-H?

Te compartimos recursos gratuitos:
- Guía: "10 señales de alerta de burnout"
- Checklist de evaluación rápida
- Webinar sobre programas de bienestar

¿Necesitas ayuda? Agenda una revisión gratuita:
{{schedule_url}}

Equipo ACRUX`,
  },
  {
    id: 5,
    subject: 'Re-evalúa tu bienestar: ¿Has mejorado? 🔄',
    delayHours: 720, // 30 days
    html: emailWrapper(`
      <h2>Hola {{name}} 🌟</h2>
      
      <p>Han pasado 30 días desde tu último diagnóstico PULSO-H. Mucho puede haber cambiado en este tiempo.</p>
      
      <div class="urgency">
        <p><strong>¿Por qué re-evaluar?</strong></p>
        <ul>
          <li>🔄 Medir el impacto de las intervenciones implementadas</li>
          <li>📊 Comparar tu progreso con el diagnóstico anterior</li>
          <li>🎯 Ajustar el plan de acción según resultados actuales</li>
          <li>💪 Celebrar los avances y identificar nuevas áreas de mejora</li>
        </ul>
      </div>
      
      <p><strong>Tu perfil anterior:</strong> {{profile_name}} (IRP: {{irp}})</p>
      
      <p>¿Estás listo para descubrir cómo ha cambiado tu bienestar laboral?</p>
      
      <div style="text-align: center;">
        <a href="{{assessment_url}}" class="cta-button">Realizar nueva evaluación</a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
      
      <p>¿Prefieres hablar con un experto primero?</p>
      
      <div style="text-align: center;">
        <a href="{{schedule_url}}" style="color: ${brandColors.accent}; font-weight: 600;">Agendar revisión gratuita →</a>
      </div>
    `, 'Re-evalúa tu bienestar laboral después de 30 días. Compara tu progreso.'),
    text: `Hola {{name}},

Han pasado 30 días desde tu diagnóstico PULSO-H. ¿Has mejorado?

Tu perfil anterior: {{profile_name}} (IRP: {{irp}})

Beneficios de re-evaluar:
- Medir impacto de intervenciones
- Comparar progreso
- Ajustar plan de acción

Realizar nueva evaluación: {{assessment_url}}

O agenda una revisión gratuita: {{schedule_url}}

Equipo ACRUX`,
  },
]

export const getEmailTemplate = (id: number): EmailTemplate | undefined => {
  return emailTemplates.find(t => t.id === id)
}

export const getAllTemplates = (): EmailTemplate[] => {
  return emailTemplates
}

export interface EmailPersonalization {
  name?: string;
  profile_name?: string;
  profile_color?: string;
  irp?: number | string;
  results_url?: string;
  schedule_url?: string;
  unsubscribe_url?: string;
  assessment_url?: string;
}

export const generateEmailSequence = (_personalization: EmailPersonalization) => {
  const now = new Date()
  return emailTemplates.map(template => ({
    template,
    scheduledDate: new Date(now.getTime() + template.delayHours * 60 * 60 * 1000)
  }))
}

export default emailTemplates
