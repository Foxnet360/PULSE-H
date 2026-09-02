import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Shield, BarChart3, Building2, UserCheck } from 'lucide-react';
import { trackLandingView } from '../utils/analytics';
import HeroSection from '../components/landing/HeroSection';
import ProfilesSection from '../components/landing/ProfilesSection';
import ModulesSection from '../components/landing/ModulesSection';
import DeliverablesSection from '../components/landing/DeliverablesSection';
import PrivacySection from '../components/landing/PrivacySection';
import MethodologySection from '../components/landing/MethodologySection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import SocialProofBadge from '../components/landing/SocialProofBadge';

import CompanyRegistrationModal from '../components/landing/CompanyRegistrationModal';

const LandingPage: React.FC = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = React.useState(false);

  useEffect(() => {
    trackLandingView();
  }, []);

  return (
    <div className="space-y-0 font-sans">
      {/* Hero Section con Doble Entrada (B2B vs B2C) */}
      <HeroSection onOpenCompanyModal={() => setIsCompanyModalOpen(true)} />

      {/* Modal B2B Empresa */}
      <CompanyRegistrationModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
      />

      {/* Context Bridge */}
      <section className="bg-primary-50 py-4 border-y border-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-700 text-xs sm:text-sm">
            <span className="font-semibold">Parte de ACRUX Consultores.</span>{' '}
            La evaluación de bienestar laboral es un pilar fundamental de nuestra{' '}
            <a href="https://acrux.life/soluciones/transformacion-cultural" target="_blank" rel="noopener noreferrer" className="text-primary-900 font-bold underline">
              Metodología de Transformación Cultural
            </a>.
          </p>
        </div>
      </section>

      {/* Stats Section: El Desafío del Burnout en LATAM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SocialProofBadge className="mb-6" />
            <h2 className="font-display text-3xl font-bold text-primary-900 tracking-tight">
              El burnout es una crisis silenciosa en las organizaciones
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '60-94%', label: 'Prevalencia de desgaste emocional en LATAM', source: 'Estudios Buk 2025' },
              { number: '73%', label: 'Empresas sin evaluación formal de riesgo psicosocial', source: 'Estudios Sectoriales' },
              { number: '4x', label: 'Retorno de inversión por cada $ dedicado a bienestar', source: 'OMS' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-primary-50 rounded-2xl border border-primary-100"
              >
                <div className="font-display text-5xl font-bold text-primary-900 mb-3">{stat.number}</div>
                <div className="text-primary-900 font-semibold mb-2">{stat.label}</div>
                <div className="text-primary-500 text-xs">Fuente: {stat.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacidad & Garantía de Doble Confianza B2B/B2C */}
      <PrivacySection />

      {/* Los 4 Perfiles de Bienestar */}
      <ProfilesSection />

      {/* Módulos de Evaluación Científica MBI-HSS */}
      <ModulesSection />

      {/* Cómo Funciona en 3 Pasos */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4 tracking-tight">
              ¿Cómo funciona PULSO-H?
            </h2>
            <p className="text-base sm:text-lg text-primary-600 max-w-2xl mx-auto">
              Tres pasos simples para medir el clima y tomar acción oportuna
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Evalúa de Forma Anónima',
                description: 'Los colaboradores responden el test de 8 minutos desde cualquier dispositivo sin necesidad de crear cuenta.',
                icon: Clock,
              },
              {
                step: '2',
                title: 'Consolida la Información',
                description: 'El sistema agrega las respuestas y calcula el Mapa de Calor de Riesgo Psicosocial por área de la empresa.',
                icon: BarChart3,
              },
              {
                step: '3',
                title: 'Toma Acción Estratégica',
                description: 'Accedé al informe ejecutivo con recomendaciones científicas para mejorar el clima y retener el talento.',
                icon: Shield,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary-100 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary-900" />
                      </div>
                      <div className="text-4xl font-display font-black text-primary-300 font-mono">
                        0{item.step}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-primary-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregables: Dashboard RRHH + Reporte PDF */}
      <DeliverablesSection />

      {/* Metodología MBI-HSS */}
      <MethodologySection />

      {/* Testimonios de Directivos */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final Dual CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-700/50 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Impulsá la salud mental y el desempeño de tu organización
            </h2>
            
            <p className="text-primary-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Descubrí el estado real de tu equipo hoy mismo. Generá el enlace de tu empresa o realizá tu evaluación personal anónima.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-900 font-bold rounded-xl hover:bg-accent-dark transition-all shadow-lg text-sm sm:text-base"
              >
                <Building2 className="w-5 h-5" />
                Configurar Diagnóstico de Empresa
              </Link>

              <Link
                to="/evaluar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/20 transition-all text-sm sm:text-base"
              >
                <UserCheck className="w-5 h-5 text-accent" />
                Hacer Test Individual Anónimo
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
