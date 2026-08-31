import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Server, FileCheck, Building2, UserCheck } from 'lucide-react';

interface PrivacyFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const privacyFeatures: PrivacyFeature[] = [
  {
    icon: UserCheck,
    title: 'Anonimato 100% Garantizado para Colaboradores',
    description: 'Tus respuestas individuales son estrictamente privadas. Ningún jefe, directivo ni colega puede ver tus respuestas o perfil personal.',
  },
  {
    icon: Building2,
    title: 'Visión Agregada para la Dirección de RRHH',
    description: 'La empresa accede únicamente a datos consolidados y mapas de calor por área cuando se acumula un mínimo de 5 evaluaciones.',
  },
  {
    icon: Lock,
    title: 'Encriptación de Extremo a Extremo (SSL)',
    description: 'Protocolos de seguridad bancarios para proteger la integridad de los informes y evitar filtraciones de información.',
  },
  {
    icon: FileCheck,
    title: 'Cumplimiento Legal Habeas Data Ley 1581',
    description: 'Alineado con las normativas de protección de datos personales en Colombia y estándares internacionales de salud mental ocupacional.',
  },
];

const PrivacySection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-bold mb-6">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Garantía de Doble Confianza B2B &amp; B2C</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4 tracking-tight">
            Confidencialidad absoluta para el equipo, claridad estratégica para la dirección
          </h2>
          <p className="text-base sm:text-lg text-primary-600 max-w-3xl mx-auto font-sans leading-relaxed">
            Para obtener datos reales sobre el burnout y la salud mental, el colaborador debe responder sin temor a represalias.
            Por eso PULSO-H separa radicalmente los resultados individuales de la analítica organizacional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex gap-4 p-6 bg-primary-50 rounded-2xl"
            >
              <div className="p-3 bg-white rounded-xl h-fit">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              
              <div>
                <h3 className="font-display text-lg font-bold text-primary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Disclaimer importante</h4>
              <p className="text-amber-800 text-sm">
                PULSO-H es una herramienta de evaluación de bienestar laboral, no un diagnóstico médico.
                Los resultados no sustituyen la opinión de un profesional de la salud mental. Si experimentas
                síntomas severos de agotamiento, te recomendamos buscar ayuda profesional.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Evaluar con total privacidad
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default PrivacySection
