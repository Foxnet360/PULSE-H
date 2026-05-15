import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Link2, Copy, Check, Building2, Users, Calendar, MessageSquare } from 'lucide-react'
import type { EvaluationConfig } from '../../types/assessment'

interface LinkGeneratorProps {
  onCreate: (config: Omit<EvaluationConfig, 'id' | 'hash' | 'createdAt'>) => Promise<EvaluationConfig>
  isLoading: boolean
}

const LinkGenerator: React.FC<LinkGeneratorProps> = ({ onCreate, isLoading }) => {
  const [organizationName, setOrganizationName] = useState('')
  const [sector, setSector] = useState('')
  const [expectedParticipants, setExpectedParticipants] = useState(10)
  const [customMessage, setCustomMessage] = useState('')
  const [deadline, setDeadline] = useState('')
  const [createdLink, setCreatedLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const sectors = [
    'Tecnología',
    'Salud',
    'Finanzas',
    'Educación',
    'Manufactura',
    'Retail',
    'Consultoría',
    'Otro',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const evaluation = await onCreate({
      organizationName,
      sector: sector || undefined,
      expectedParticipants,
      demographicFields: ['area', 'role', 'seniority'],
      customMessage: customMessage || undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      status: 'active',
    })

    const baseUrl = window.location.origin
    setCreatedLink(`${baseUrl}/evaluar/${evaluation.hash}`)
  }

  const copyToClipboard = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setOrganizationName('')
    setSector('')
    setExpectedParticipants(10)
    setCustomMessage('')
    setDeadline('')
    setCreatedLink(null)
    setCopied(false)
  }

  if (createdLink) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-8 h-8 text-green-600" />
        </div>

        <h3 className="font-display text-xl font-bold text-green-800 mb-2">
          ¡Link creado exitosamente!
        </h3>

        <p className="text-green-700 mb-6">
          Comparte este link con los participantes de tu evaluación.
        </p>

        <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-3">
          <code className="flex-1 text-sm text-primary-700 break-all text-left">
            {createdLink}
          </code>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0"
            aria-label={copied ? 'Copiado' : 'Copiar link'}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-primary-400" />
            )}
          </button>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-primary-700 font-medium rounded-xl border border-primary-200 hover:border-accent transition-colors"
          >
            Crear otro link
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-primary-700">
            <Building2 className="w-4 h-4" />
            Nombre de la organización *
          </label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            placeholder="Ej: ACME Corp"
            className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-primary-700">
            Sector
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
          >
            <option value="">Seleccionar sector</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-primary-700">
            <Users className="w-4 h-4" />
            Número estimado de participantes *
          </label>
          <input
            type="number"
            min="1"
            max="10000"
            value={expectedParticipants}
            onChange={(e) => setExpectedParticipants(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-primary-700">
            <Calendar className="w-4 h-4" />
            Fecha límite
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-primary-700">
          <MessageSquare className="w-4 h-4" />
          Mensaje personalizado (opcional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Mensaje que verán los participantes al iniciar la evaluación..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
        />
      </div>

      <div className="bg-primary-50 rounded-xl p-4">
        <h4 className="font-medium text-primary-900 mb-2">Campos demográficos incluidos</h4>
        <div className="flex flex-wrap gap-2">
          {['Área', 'Cargo', 'Antigüedad'].map((field) => (
            <span
              key={field}
              className="px-3 py-1 bg-white text-primary-700 text-sm rounded-full border border-primary-200"
            >
              {field}
            </span>
          ))}
        </div>
        <p className="text-xs text-primary-500 mt-2">
          Estos campos son opcionales para los participantes y se usan solo para análisis agregados.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !organizationName}
        className="w-full px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98] motion-reduce:active:scale-100"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generando link...
          </>
        ) : (
          <>
            <Link2 className="w-5 h-5" />
            Generar link de evaluación
          </>
        )}
      </button>
    </form>
  )
}

export default LinkGenerator
