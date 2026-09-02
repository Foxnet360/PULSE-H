import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ArrowRight, ShieldCheck, Building2, UserCheck, Clock, BarChart3 } from 'lucide-react';
import SocialProofBadge from './SocialProofBadge';

interface HeroSectionProps {
  onOpenCompanyModal?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCompanyModal }) => {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-surface to-primary-100 overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge principal */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/15 border border-accent/30 rounded-full text-primary-900 text-xs sm:text-sm font-bold mb-6 shadow-xs">
            <Heart className="w-4 h-4 text-accent fill-accent/20" />
            <span>Diagnóstico Científico de Bienestar &amp; Riesgo Psicosocial • MBI-HSS</span>
          </div>
        </motion.div>

        {/* Social Proof */}
        <div className="mb-6">
          <SocialProofBadge />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight tracking-tight"
        >
          Diagnostica el <span className="text-primary-900 underline decoration-accent decoration-4">bienestar real</span> y previene el burnout en tu empresa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-primary-700 max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
        >
          <strong>100% confidencial</strong> para tus colaboradores, <strong>100% estratégico</strong> para la alta dirección.
          Medí el desgaste emocional, compromiso y clima laboral con respaldo de psicología organizacional.
        </motion.p>

        {/* Dual CTAs (B2B vs B2C) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12"
        >
          {/* B2B Option: Líder / Admin RRHH */}
          <div className="bg-white p-6 rounded-2xl border-2 border-accent/40 shadow-xl hover:border-accent transition-all flex flex-col justify-between text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-accent text-primary-900 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-bl-xl font-mono">
              Para Empresas &amp; RRHH
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-primary-50 rounded-xl text-primary-900">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-primary-900">Crear Diagnóstico de Empresa</h3>
              </div>
              <p className="text-xs text-primary-700 leading-relaxed mb-4">
                Generá un enlace único para tu equipo (hasta 10 enlaces gratis) y accedé a la analítica de clima.
              </p>
            </div>
            <button
              onClick={() => onOpenCompanyModal ? onOpenCompanyModal() : null}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-primary-900 font-bold text-sm rounded-xl hover:bg-accent-dark transition-all shadow-md group-hover:shadow-lg cursor-pointer"
            >
              <span>Configurar Evaluación de Empresa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* B2C Option: Colaborador / Empleado */}
          <div className="bg-white p-6 rounded-2xl border-2 border-primary-100 shadow-md hover:border-primary-300 transition-all flex flex-col justify-between text-left group">
            <div className="absolute top-0 right-0 bg-primary-100 text-primary-800 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-bl-xl font-mono">
              Para Colaboradores
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-primary-50 rounded-xl text-primary-900">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-primary-900">Evaluación Personal Anónima</h3>
              </div>
              <p className="text-xs text-primary-700 leading-relaxed mb-4">
                Completá el test en 8 minutos de forma 100% privada y obtené tu informe personal con recomendaciones.
              </p>
            </div>
            <Link
              to="/evaluar"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-900 text-white font-bold text-sm rounded-xl hover:bg-primary-800 transition-all"
            >
              <span>Hacer Test Individual (8 min)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-sans"
        >
          {[
            { icon: ShieldCheck, label: 'Garantía 100% Confidencial', sublabel: 'Respuestas protegidas' },
            { icon: Clock, label: '8 Minutos de Duración', sublabel: 'Rápido y ágil' },
            { icon: BarChart3, label: 'Modelo MBI-HSS Validado', sublabel: 'Psicología científica' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-primary-100 shadow-xs">
              <item.icon className="w-5 h-5 text-primary-900 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-primary-900">{item.label}</div>
                <div className="text-primary-500 text-[11px]">{item.sublabel}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
