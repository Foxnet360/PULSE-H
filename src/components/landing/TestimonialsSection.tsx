import React from 'react'
import { motion } from 'motion/react'
import { Star, Quote, ArrowRight } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'María García',
    role: 'Directora de RRHH',
    company: 'TechCorp Colombia',
    content: 'PULSO-H nos permitió identificar áreas de riesgo que no veíamos. En 2 semanas implementamos cambios que redujeron el absentismo en 30%.',
    rating: 5,
  },
  {
    name: 'Carlos Mendoza',
    role: 'Gerente de Operaciones',
    company: 'Logística Express',
    content: 'La evaluación anónima generó confianza en el equipo. Obtuvimos datos reales sobre el bienestar sin invasiones de privacidad.',
    rating: 5,
  },
  {
    name: 'Ana Torres',
    role: 'CEO',
    company: 'Startup Innovadora',
    content: 'Como empresa pequeña, no teníamos presupuesto para consultoría. PULSO-H nos dio insights profesionales gratis. Ahora somos clientes de ACRUX.',
    rating: 5,
  },
]

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Testimonios</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Empresas de diferentes sectores ya evaluaron el bienestar de sus equipos con PULSO-H.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-primary-200 absolute -top-2 -left-2" />
                <p className="text-primary-700 relative z-10 pl-4">{testimonial.content}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-primary-100">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">{testimonial.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-primary-900">{testimonial.name}</div>
                  <div className="text-sm text-primary-500">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
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
          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Únete a las empresas que ya evaluaron
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
