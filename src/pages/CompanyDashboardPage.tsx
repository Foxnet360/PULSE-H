import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Copy, Check, Users, ShieldCheck, Sparkles, BarChart3, AlertCircle, Calendar, Lock } from 'lucide-react';
import DimensionRadarChart from '../components/dashboard/DimensionRadarChart';

interface CompanyData {
  id: string;
  hash: string;
  companyName: string;
  leaderName: string;
  workEmail: string;
  sector: string;
  maxParticipants: number;
  createdAt: string;
}

export const CompanyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [copied, setCopied] = useState(false);
  const [respondentsCount, setRespondentsCount] = useState(4); // Demo 4 out of 10 completed

  useEffect(() => {
    const stored = localStorage.getItem('pulso-h-company-dashboard');
    if (stored) {
      setCompany(JSON.parse(stored));
    } else {
      // Default demo company if directly accessing URL
      const mockCompany: CompanyData = {
        id: 'emp-demo-company-123',
        hash: 'emp-demo-company-123',
        companyName: 'Organización Demo S.A.S.',
        leaderName: 'Director de Talento Humano',
        workEmail: 'rrhh@empresa-demo.com',
        sector: 'Tecnología',
        maxParticipants: 10,
        createdAt: new Date().toISOString(),
      };
      setCompany(mockCompany);
    }
  }, []);

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 font-sans text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const shareableUrl = `${window.location.origin}/pulso-h/evaluar?company=${company.hash}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock aggregated company dimension data for 4 respondents
  const aggregatedDimensions = [
    { key: 'energia', label: 'Mi Energía', score: 62 },
    { key: 'conexion', label: 'Mi Conexión', score: 74 },
    { key: 'proposito', label: 'Mi Propósito', score: 81 },
    { key: 'entorno', label: 'Mi Entorno', score: 58 },
    { key: 'equilibrio', label: 'Mi Equilibrio', score: 49 },
    { key: 'fortaleza', label: 'Mi Fortaleza', score: 76 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24 font-sans space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-accent" />
              Portal B2B de Clima &amp; Bienestar
            </div>
            <h1 className="font-display text-3xl font-black text-slate-900 tracking-tight">
              {company.companyName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Líder Responsable: <strong className="text-slate-800 font-bold">{company.leaderName}</strong> ({company.workEmail}) • Sector: {company.sector}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center min-w-[180px]">
            <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Plan Freemium</span>
            <div className="text-xl font-black text-primary-700 font-mono">
              {respondentsCount} / {company.maxParticipants} Usados
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1.5 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{ width: `${(respondentsCount / company.maxParticipants) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Shareable Link Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary-600" />
              Enlace Único de Evaluación para Colaboradores (Cupo: 10)
            </label>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
              100% Anónimo
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-xs sm:text-sm text-slate-800 select-all outline-hidden"
            />
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Aggregated Heatmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Analítica Organizacional Agregada
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Procesamiento anonimizado del nivel de fatiga, propósito y equilibrio de tu equipo.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            Umbral de Anonimato Satisfecho ({respondentsCount} respuestas)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Radar Chart Component */}
          <div className="flex justify-center p-4 bg-slate-50/60 rounded-2xl border border-slate-100">
            <DimensionRadarChart dimensions={aggregatedDimensions} size={340} />
          </div>

          {/* Aggregated Dimension Health Cards */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">🌱 Salud &amp; Energía del Equipo</span>
                <span className="text-xs font-bold text-amber-600 font-mono">62% (Moderado)</span>
              </div>
              <p className="text-xs text-slate-600">Se identifican indicios de fatiga digital al cierre de semana en el 40% del equipo.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">🤝 Conexión &amp; Clima de Equipo</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">74% (Bueno)</span>
              </div>
              <p className="text-xs text-slate-600">Alta empatía y colaboración entre pares para resolver bloqueos de proyectos.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">⚖️ Equilibrio Vida - Trabajo</span>
                <span className="text-xs font-bold text-red-600 font-mono">49% (Atención Requerida)</span>
              </div>
              <p className="text-xs text-slate-600">Oportunidad clave para normar la desconexión fuera del horario hábil.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade & Consultation CTA */}
      <div className="bg-gradient-to-br from-[#0D111A] via-[#1B2A4A] to-[#0D111A] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-accent/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 font-bold text-xs uppercase tracking-wider">
            Transformación Organizacional ACRUX
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">¿Necesitás evaluar más de 10 colaboradores?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Desbloqueá diagnósticos grupales ilimitados, segmentación por áreas y taller de liderazgo con especialistas.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://acrux.life/agendar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-primary-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-accent-dark transition-all shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Sesión Corporativa</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
