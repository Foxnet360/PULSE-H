import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: '¿Cuánto tiempo toma completar el diagnóstico?',
    answer: 'El diagnóstico completo toma aproximadamente 8 minutos. Está dividido en 6 módulos con 36 preguntas en total. Puedes pausar y continuar después si es necesario.',
    category: 'General',
  },
  {
    question: '¿Es realmente anónimo?',
    answer: 'Sí, 100% anónimo. No requiere registro ni datos personales. No solicitamos nombre, email ni ninguna información identificable. Los resultados se procesan localmente en tu navegador y nunca salen de tu dispositivo.',
    category: 'Privacidad',
  },
  {
    question: '¿Qué es el Índice de Riesgo Psicosocial (IRP)?',
    answer: 'El IRP es una métrica global de 0 a 100 que integra las 6 dimensiones evaluadas. Un score bajo (0-33) indica bienestar óptimo, moderado (34-66) requiere atención, y alto (67-100) sugiere intervención urgente.',
    category: 'General',
  },
  {
    question: '¿Puedo usar PULSO-H para cumplir con la NOM-035?',
    answer: 'PULSO-H evalúa factores de riesgo psicosocial contemplados en la NOM-035 (México), Decreto 2090 (Colombia) y otros marcos regulatorios. Sin embargo, para cumplimiento legal formal recomendamos complementar con una evaluación presencial de ACRUX.',
    category: 'Técnico',
  },
  {
    question: '¿Cómo se procesan los datos?',
    answer: 'Todo el procesamiento es local. Cuando subes un CSV o completas el cuestionario, los cálculos se realizan en tu navegador usando JavaScript. No enviamos datos a servidores externos. Puedes verificarlo desconectando internet después de cargar la página.',
    category: 'Privacidad',
  },
  {
    question: '¿Cuál es la diferencia entre individual y organizacional?',
    answer: 'El modo individual evalúa tu bienestar personal y entrega un informe con tu perfil y recomendaciones. El modo organizacional permite evaluar múltiples empleados, agregar resultados y obtener un dashboard con análisis por áreas, cargos y antigüedad.',
    category: 'General',
  },
  {
    question: '¿Hay costo para evaluaciones individuales?',
    answer: 'No. Las evaluaciones individuales son gratuitas para siempre. Los planes de pago son solo para organizaciones que necesitan evaluar múltiples empleados y acceder al dashboard agregado.',
    category: 'Pricing',
  },
  {
    question: '¿Qué pasa si un empleado tiene un perfil "Sobrecargadx"?',
    answer: 'El informe incluye recomendaciones específicas para cada perfil. Para perfiles críticos sugerimos: (1) conversación con su líder, (2) revisión de carga laboral, (3) considerar descanso programado, y (4) evaluación con profesional de salud mental si los síntomas persisten.',
    category: 'Técnico',
  },
]

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-primary-600">
            Resolvemos tus dudas sobre PULSO-H
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-full">
                    {faq.category}
                  </span>
                  <span className="font-semibold text-primary-900">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-24">
                      <p className="text-primary-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-primary-600 mb-4">
            ¿Tienes más preguntas?
          </p>
          <a
            href="mailto:contacto@acruxconsultores.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Contactar soporte
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
