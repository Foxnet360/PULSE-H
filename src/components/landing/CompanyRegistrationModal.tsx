import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, User, Mail, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyRegistrationModal: React.FC<CompanyRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [sector, setSector] = useState('Tecnología');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const companyHash = `emp-${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(100 + Math.random() * 900)}`;

    const companyData = {
      id: companyHash,
      hash: companyHash,
      companyName,
      leaderName,
      workEmail,
      sector,
      maxParticipants: 10,
      createdAt: new Date().toISOString(),
    };

    // Save locally for B2B portal access
    localStorage.setItem('pulso-h-company-dashboard', JSON.stringify(companyData));
    sessionStorage.setItem('pulso-h-company-hash', companyHash);

    // Save lead to local storage fallback for admin
    try {
      const storedLeads = localStorage.getItem('pulso-h-leads') || '[]';
      const parsed = JSON.parse(storedLeads);
      parsed.push({
        email: workEmail,
        name: leaderName,
        company: companyName,
        profile: 'B2B Company Admin',
        score: 0,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('pulso-h-leads', JSON.stringify(parsed));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      navigate('/empresa/dashboard');
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-accent" />
              Programa B2B Freemium • 10 Enlaces Gratis
            </div>

            <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight">
              Configurar Diagnóstico de Empresa
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Recibirás un portal privado de analítica y <strong>10 enlaces gratuitos</strong> para evaluar el pulso de tu equipo con resguardo de confidencialidad.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-primary-600" />
                Nombre de la Empresa u Organización *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Grupo Innovación S.A.S."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-slate-900 outline-hidden transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary-600" />
                  Tu Nombre y Cargo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Laura Gómez - Director RRHH"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-slate-900 outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary-600" />
                  Correo Corporativo *
                </label>
                <input
                  type="email"
                  required
                  placeholder="laura@empresa.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-slate-900 outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Sector Industrial</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-slate-900 outline-hidden bg-white"
              >
                <option value="Tecnología">Tecnología &amp; Software</option>
                <option value="Salud">Salud &amp; Farmacéutica</option>
                <option value="Finanzas">Finanzas &amp; Banca</option>
                <option value="Consultoría">Consultoría &amp; Servicios</option>
                <option value="Manufactura">Manufactura &amp; Industria</option>
                <option value="Retail">Retail &amp; Comercio</option>
                <option value="Otro">Otro Sector</option>
              </select>
            </div>

            {/* Privacy Guarantee Pill */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 leading-normal">
                <strong className="text-slate-900 font-bold">Garantía de Confidencialidad:</strong> Los resultados individuales de tus colaboradores nunca serán revelados. Recibirás un mapa de calor anonimizado y agregado.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-accent hover:bg-accent-dark text-primary-900 font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creando Portal B2B...' : 'Crear Dashboard & Obtener 10 Enlaces'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompanyRegistrationModal;
