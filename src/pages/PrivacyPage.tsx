import React from 'react'
import DataDeletionRequest from '../components/privacy/DataDeletionRequest'
import { Shield, Lock, Eye, FileText, Globe, Scale } from 'lucide-react'

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
          <Shield className="w-4 h-4" />
          Tu privacidad es nuestra prioridad
        </div>
        <h1 className="font-display text-4xl font-bold text-primary-900 mb-4">
          Política de Privacidad
        </h1>
        <p className="text-primary-600 text-lg max-w-2xl mx-auto">
          En PULSO-H, protegemos tu información con los más altos estándares. 
          Este diagnóstico se procesa completamente en tu dispositivo.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {/* Principios */}
        <section className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-full">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-primary-900">
              Principios de Privacidad
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Procesamiento Local</h3>
                  <p className="text-sm text-primary-600">
                    Tus respuestas nunca salen de tu dispositivo. Todo el análisis ocurre en tu navegador mediante JavaScript.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Anonimato</h3>
                  <p className="text-sm text-primary-600">
                    No recopilamos datos personales identificables. La información demográfica es opcional y agregada.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Consentimiento</h3>
                  <p className="text-sm text-primary-600">
                    Requerimos tu aprobación explícita antes de procesar cualquier dato. Puedes retirarlo en cualquier momento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Derecho al Olvido</h3>
                  <p className="text-sm text-primary-600">
                    Puedes solicitar la eliminación completa de tus datos. Procesamos la solicitud en 30 días hábiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Datos Recopilados */}
        <section className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-full">
              <Eye className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-primary-900">
              Datos que Recopilamos
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <h3 className="font-medium text-green-800">Resultados Agregados</h3>
                <p className="text-sm text-green-700">Promedios por área, distribuciones de riesgo</p>
              </div>
              <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-medium rounded-full">
                Anónimo
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div>
                <h3 className="font-medium text-yellow-800">Datos Demográficos</h3>
                <p className="text-sm text-yellow-700">Área, cargo, antigüedad (opcional)</p>
              </div>
              <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-medium rounded-full">
                Opcional
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div>
                <h3 className="font-medium text-red-800">Respuestas Individuales</h3>
                <p className="text-sm text-red-700">Tus respuestas a cada ítem</p>
              </div>
              <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-medium rounded-full">
                No recopilamos
              </span>
            </div>
          </div>
        </section>

        {/* Cumplimiento Normativo */}
        <section className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-full">
              <Scale className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-primary-900">
              Cumplimiento Normativo
            </h2>
          </div>

          <p className="text-primary-600 mb-6">
            Cumplimos con las normativas de protección de datos y salud mental laboral aplicables en Latinoamérica:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.mintrabajo.gov.co/normatividad/leyes/2012/ley-1581"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-primary-200 rounded-xl hover:border-accent transition-colors group"
            >
              <FileText className="w-5 h-5 text-primary-400 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary-900">Ley 1581 de 2012</h3>
                <p className="text-sm text-primary-600">Colombia — Protección de datos personales</p>
              </div>
            </a>

            <a
              href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-primary-200 rounded-xl hover:border-accent transition-colors group"
            >
              <FileText className="w-5 h-5 text-primary-400 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary-900">NOM-035-STPS-2018</h3>
                <p className="text-sm text-primary-600">México — Factores de riesgo psicosocial</p>
              </div>
            </a>

            <a
              href="https://www.iso.org/standard/64298.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-primary-200 rounded-xl hover:border-accent transition-colors group"
            >
              <Globe className="w-5 h-5 text-primary-400 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary-900">ISO 45003:2021</h3>
                <p className="text-sm text-primary-600">Internacional — Gestión psicosocial en el trabajo</p>
              </div>
            </a>

            <a
              href="https://www.bcn.cl/leychile/navegar?idNorma=1177343"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 border border-primary-200 rounded-xl hover:border-accent transition-colors group"
            >
              <Scale className="w-5 h-5 text-primary-400 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary-900">Ley 21.643</h3>
                <p className="text-sm text-primary-600">Chile — Protección de la salud mental</p>
              </div>
            </a>
          </div>
        </section>

        {/* K-Anonymity */}
        <section className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-full">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-primary-900">
              Privacidad Diferencial (K-Anonimato)
            </h2>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-accent text-white text-sm font-bold rounded-full">
                k ≥ 5
              </span>
              <span className="text-primary-700 font-medium">Regla de oro</span>
            </div>
            <p className="text-primary-600">
              Solo mostramos resultados organizacionales cuando al menos <strong>5 personas</strong> 
              comparten las mismas características demográficas. Esto garantiza que nadie pueda 
              ser identificado por sus respuestas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent mb-1">≥5</div>
              <div className="text-sm text-primary-600">Personas mínimas por grupo</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent mb-1">0%</div>
              <div className="text-sm text-primary-600">Respuestas individuales expuestas</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm text-primary-600">Anonimato garantizado</div>
            </div>
          </div>
        </section>

        {/* Data Deletion Request */}
        <DataDeletionRequest />
      </div>

      <div className="text-center mt-12 pb-8">
        <p className="text-sm text-primary-500">
          Última actualización: Mayo 2026
        </p>
      </div>
    </div>
  )
}

export default PrivacyPage
