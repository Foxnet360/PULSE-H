import React, { useState, useCallback } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { AssessmentResult, Intervention } from '../../types/assessment'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface PDFReportGeneratorProps {
  result: AssessmentResult
  interventions?: {
    immediate: Intervention
    short: Intervention
    medium: Intervention
  } | null
  watermark?: boolean
}

const PDFReportGenerator: React.FC<PDFReportGeneratorProps> = ({
  result,
  interventions,
  watermark = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const generatePDF = useCallback(async () => {
    setIsGenerating(true)
    setProgress(0)

    try {
      // Create a temporary div for rendering
      const tempDiv = document.createElement('div')
      tempDiv.style.width = '794px' // A4 width in pixels at 96 DPI
      tempDiv.style.padding = '40px'
      tempDiv.style.backgroundColor = 'white'
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '0'
      
      // Build PDF content
      tempDiv.innerHTML = `
        <div style="font-family: 'Inter', sans-serif; color: #1b2a4a;">
          ${watermark ? '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 48px; color: rgba(0,0,0,0.05); font-weight: bold; pointer-events: none;">PULSO-H Free</div>' : ''}
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #f5a623; padding-bottom: 20px;">
            <h1 style="font-family: 'Exo 2', sans-serif; font-size: 32px; color: #1b2a4a; margin: 0;">PULSO-H</h1>
            <p style="font-size: 14px; color: #5c7565; margin: 5px 0 0 0;">Diagnóstico de Bienestar Laboral y Burnout</p>
            <p style="font-size: 12px; color: #829ab1; margin: 5px 0 0 0;">Desarrollado por ACRUX Consultores</p>
          </div>

          <!-- Profile Section -->
          <div style="background-color: #f0f4f8; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h2 style="font-family: 'Exo 2', sans-serif; font-size: 24px; color: #1b2a4a; margin: 0 0 16px 0;">Tu Perfil: ${result.profileName}</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334e68; margin: 0;">${result.profileDescription}</p>
          </div>

          <!-- IRP Section -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-family: 'Exo 2', sans-serif; font-size: 20px; color: #1b2a4a; margin: 0 0 16px 0;">Índice de Riesgo Psicosocial (IRP)</h2>
            <div style="display: flex; align-items: center; gap: 20px;">
              <div style="width: 120px; height: 120px; border-radius: 50%; border: 8px solid ${getIRPColor(result.irpZone)}; display: flex; align-items: center; justify-content: center;">
                <span style="font-family: 'Exo 2', sans-serif; font-size: 36px; font-weight: bold; color: ${getIRPColor(result.irpZone)};">${result.irp}</span>
              </div>
              <div>
                <p style="font-size: 18px; font-weight: bold; color: ${getIRPColor(result.irpZone)}; margin: 0;">${result.irpLabel}</p>
                <p style="font-size: 14px; color: #334e68; margin: 4px 0 0 0;">${result.irpDescription}</p>
              </div>
            </div>
          </div>

          <!-- Dimensions -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-family: 'Exo 2', sans-serif; font-size: 20px; color: #1b2a4a; margin: 0 0 16px 0;">Dimensiones Evaluadas</h2>
            
            ${Object.entries(result.dimensions).map(([key, dim]: [string, any]) => `
              <div style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-size: 13px; font-weight: 500; color: #1b2a4a;">${getDimensionLabel(key)}</span>
                  <span style="font-size: 13px; color: #334e68;">${Math.round(dim.score)}%</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${dim.score}%; height: 100%; background-color: ${getRiskColor(dim.level)}; border-radius: 4px;"></div>
                </div>
              </div>
            `).join('')}
          </div>

          ${interventions ? `
          <!-- Action Plan -->
          <div style="margin-bottom: 24px;">
            <h2 style="font-family: 'Exo 2', sans-serif; font-size: 20px; color: #1b2a4a; margin: 0 0 16px 0;">Plan de Acción Personalizado</h2>
            
            ${[
              { label: 'Acción Inmediata', intervention: interventions.immediate },
              { label: 'Acción Corto Plazo', intervention: interventions.short },
              { label: 'Acción Medio Plazo', intervention: interventions.medium },
            ].map(({ label, intervention }) => `
              <div style="background-color: #f8f6f3; border-left: 4px solid #f5a623; padding: 16px; margin-bottom: 12px; border-radius: 0 8px 8px 0;">
                <span style="display: inline-block; background-color: #f5a623; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-bottom: 8px;">${label}</span>
                <h3 style="font-size: 16px; color: #1b2a4a; margin: 0 0 8px 0;">${intervention.title}</h3>
                <p style="font-size: 13px; color: #334e68; margin: 0 0 8px 0; line-height: 1.5;">${intervention.description}</p>
                <p style="font-size: 12px; color: #5c7565; margin: 0;">⏱️ ${intervention.duration} | 📊 ${intervention.evidence}</p>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Disclaimer -->
          <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 11px; color: #829ab1; line-height: 1.5; text-align: center; margin: 0;">
              <strong>Aviso importante:</strong> Este diagnóstico es una herramienta de autoevaluación, 
              no un diagnóstico médico o psicológico clínico. Si tus resultados te preocupan, 
              te recomendamos hablar con un profesional de salud mental.
            </p>
            <p style="font-size: 11px; color: #829ab1; text-align: center; margin: 8px 0 0 0;">
              © ${new Date().getFullYear()} PULSO-H — Una iniciativa de ACRUX Consultores
            </p>
          </div>
        </div>
      `

      document.body.appendChild(tempDiv)

      setProgress(30)

      // Wait for fonts to load
      await document.fonts.ready

      setProgress(50)

      // Render to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      setProgress(70)

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      setProgress(90)

      // Download PDF
      pdf.save(`PULSO-H-Informe-${result.profileName}-${new Date().toISOString().split('T')[0]}.pdf`)

      setProgress(100)
      
      // Cleanup
      document.body.removeChild(tempDiv)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error al generar el PDF. Por favor, intenta de nuevo.')
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setProgress(0)
      }, 1000)
    }
  }, [result, interventions, watermark])

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="w-full px-6 py-4 bg-white text-primary-900 font-medium rounded-xl border-2 border-primary-200 hover:border-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generando PDF... {progress}%
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Descargar informe PDF
          </>
        )}
      </button>

      {isGenerating && (
        <div className="mt-4 w-full bg-primary-100 rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

// Helper functions
function getIRPColor(zone: string): string {
  const colors: Record<string, string> = {
    verde: '#4a7c59',
    amarilla: '#e6a817',
    naranja: '#dd6b20',
    roja: '#c53030',
  }
  return colors[zone] || '#334e68'
}

function getRiskColor(level: string): string {
  const colors: Record<string, string> = {
    bajo: '#4a7c59',
    moderado: '#e6a817',
    alto: '#c53030',
  }
  return colors[level] || '#334e68'
}

function getDimensionLabel(key: string): string {
  const labels: Record<string, string> = {
    ae: 'Agotamiento Emocional',
    dp: 'Despersonalización',
    rp: 'Realización Personal',
    for: 'Factores Organizacionales',
    cvt: 'Conciliación Vida-Trabajo',
    rri: 'Resiliencia',
  }
  return labels[key] || key
}

export default PDFReportGenerator
