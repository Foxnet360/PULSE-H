import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Copy, Check, Users, ShieldCheck, Sparkles, BarChart3, AlertCircle, Calendar, Lock, TrendingUp, Download, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';
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
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200/80 space-y-6">
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
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* HR Executive KPI Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Índice IRP Organizacional</span>
          <div className="text-2xl font-black text-amber-600 font-mono">56% <span className="text-xs font-normal text-slate-500 font-sans">(Moderado)</span></div>
          <p className="text-[11px] text-slate-500">Nivel de desgaste controlado en zona de alerta preventiva.</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Benchmark Sectorial ({company.sector})</span>
          <div className="text-2xl font-black text-emerald-600 font-mono flex items-center gap-1">
            +8.2% <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-500">Tu equipo supera la media en resiliencia vs competidores.</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Palanca de Retención</span>
          <div className="text-2xl font-black text-primary-600 font-mono">81%</div>
          <p className="text-[11px] text-slate-500">Alta identificación con el propósito y misión del rol.</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Punto de Atención Prioritaria</span>
          <div className="text-2xl font-black text-red-500 font-mono">49%</div>
          <p className="text-[11px] text-slate-500">Falta de desconexión digital al finalizar la jornada.</p>
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
          <div className="flex justify-center p-4 bg-slate-50/60 rounded-2xl border border-slate-100">
            <DimensionRadarChart dimensions={aggregatedDimensions} size={340} />
          </div>

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

      {/* Premium Features & Conversion Gateways */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary-900 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Funcionalidades Avanzadas de Gestión B2B
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Herramientas Premium para la Dirección de RRHH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Premium Feature 1: Filter by Department */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-primary-100 rounded-xl text-primary-900">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-mono">
                <Lock className="w-3 h-3" /> Premium
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">Segmentación por Áreas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filtra los resultados por Tecnología, Operaciones, Ventas o Seniority para identificar focos de burnout especificos.
            </p>

            <a
              href="https://acrux.life/agendar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-900 pt-2"
            >
              <span>Desbloquear en Plan Enterprise</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Premium Feature 2: PDF Executive C-Suite Report */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-900">
                <Download className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-mono">
                <Lock className="w-3 h-3" /> Premium
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">Informe para Junta Directiva</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Descarga una presentación lista en PDF con métricas ejecutivas, benchmarks de industria y plan estratégico de clima.
            </p>

            <a
              href="https://acrux.life/agendar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-900 pt-2"
            >
              <span>Solicitar Demo de Informe C-Suite</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Premium Feature 3: Expand Evaluation Seats */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-900">
                <Users className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-mono">
                <Lock className="w-3 h-3" /> Ampliación
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">Ampliación de Enlaces (+50)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amplía el cupo a 50, 100 o ilimitados colaboradores con seguimiento trimestral continuo de evolución de clima.
            </p>

            <a
              href="https://acrux.life/agendar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-primary-700 hover:text-primary-900 pt-2"
            >
              <span>Consultar Licencia Corporativa</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Upgrade & Consultation CTA */}
      <div className="bg-gradient-to-br from-[#0D111A] via-[#1B2A4A] to-[#0D111A] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-accent/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 font-bold text-xs uppercase tracking-wider">
            Transformación Organizacional ACRUX
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">¿Querés presentar estos hallazgos a tu comité ejecutivo?</h3>
          <p className="text-xs sm:text-sm text-slate-300">Agendá una sesión de consultoría estratégica de 30 minutos con los expertos de ACRUX.</p>
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
