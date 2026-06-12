import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Settings, Link2, BarChart3, Calendar, Users, TrendingUp, Star, ChevronDown, Filter } from 'lucide-react'
import { useLinkManagement } from '../hooks/useLinkManagement'
import { useAuth } from '../context/AuthContext'
import LinkGenerator from '../components/admin/LinkGenerator'
import EvaluationList from '../components/admin/EvaluationList'

type Tab = 'create' | 'active' | 'closed' | 'appointments' | 'leads' | 'analytics' | 'availability'

interface Appointment {
  id: number
  lead_id: number
  appointment_date: string
  appointment_time: string
  status: string
  lead_email: string
  lead_name: string
  lead_profile: string
}

interface Lead {
  id: number
  email: string
  name: string | null
  profile: string | null
  score: number
  status: string
  created_at: string
}

interface LeadEvent {
  id: number
  event_type: string
  event_data: string | null
  score_value: number
  created_at: string
}

interface EmailSequence {
  id: number
  lead_id: number
  email_1_sent: boolean
  email_1_sent_at: string | null
  email_2_sent: boolean
  email_2_sent_at: string | null
  email_3_sent: boolean
  email_3_sent_at: string | null
  email_4_sent: boolean
  email_4_sent_at: string | null
  email_5_sent: boolean
  email_5_sent_at: string | null
}

interface AvailabilitySlot {
  id: number
  slot_date: string
  slot_time: string
  is_available: boolean
}

interface Stats {
  total_leads: number
  total_appointments: number
  hot_leads_count: number
}

interface FunnelData {
  total_leads: string
  completed_assessment: string
  downloaded_pdf: string
  clicked_cta: string
  booked_appointment: string
}

const AdminPage: React.FC = () => {
  const {
    activeEvaluations,
    closedEvaluations,
    isLoading: evalLoading,
    createEvaluation,
    closeEvaluation,
  } = useLinkManagement()

  const [activeTab, setActiveTab] = useState<Tab>('analytics')
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  
  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [appointmentFilter, setAppointmentFilter] = useState('all')
  
  // Leads state
  const [leads, setLeads] = useState<Lead[]>([])
  const [hotLeads, setHotLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [leadEvents, setLeadEvents] = useState<LeadEvent[]>([])
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>([])
  
  // Availability state
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
  const [availabilityDate, setAvailabilityDate] = useState(new Date().toISOString().split('T')[0])
  
  // Analytics state
  const [stats, setStats] = useState<Stats | null>(null)
  const [funnel, setFunnel] = useState<FunnelData | null>(null)
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({})
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    fetchAppointments()
    fetchLeads()
    fetchAnalytics()
    fetchEmailSequences()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/booking.php')
      const data = await response.json()
      if (data.success) {
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    }
  }

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/lead.php?hot=true')
      const data = await response.json()
      if (Array.isArray(data)) {
        setHotLeads(data)
      }
      
      const allResponse = await fetch('/api/lead.php')
      const allData = await allResponse.json()
      if (Array.isArray(allData)) {
        setLeads(allData)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/stats.php')
      const data = await response.json()
      if (data.success) {
        setStats(data.summary)
        setFunnel(data.funnel.raw)
        setConversionRates(data.funnel.conversion_rates)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  const fetchLeadEvents = async (leadId: number) => {
    try {
      const response = await fetch(`/api/lead.php?events=${leadId}`)
      const data = await response.json()
      if (data.success) {
        setLeadEvents(data.events)
      }
    } catch (error) {
      console.error('Failed to fetch lead events:', error)
    }
  }

  const fetchEmailSequences = async () => {
    try {
      const response = await fetch('/api/lead.php?sequences=true')
      const data = await response.json()
      if (data.success) {
        setEmailSequences(data.sequences)
      }
    } catch (error) {
      console.error('Failed to fetch email sequences:', error)
    }
  }

  const fetchAvailability = async () => {
    try {
      const response = await fetch(`/api/availability.php?date=${availabilityDate}`)
      const data = await response.json()
      if (data.success) {
        setAvailabilitySlots(data.slots)
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error)
    }
  }

  const updateAvailability = async (slotId: number, isAvailable: boolean) => {
    try {
      const response = await fetch(`/api/availability.php?id=${slotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: isAvailable }),
      })
      
      if (response.ok) {
        fetchAvailability()
      }
    } catch (error) {
      console.error('Failed to update availability:', error)
    }
  }

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/booking.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      
      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Failed to update appointment:', error)
    }
  }

  const handleCopyLink = (hash: string) => {
    const url = `${window.location.origin}/evaluar/${hash}`
    navigator.clipboard.writeText(url)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!login(password)) {
      setLoginError('Contraseña incorrecta. Intenta de nuevo.')
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    if (appointmentFilter === 'all') return true
    return apt.status === appointmentFilter
  })

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'appointments', label: 'Citas', icon: <Calendar className="w-4 h-4" />, count: appointments.filter(a => a.status === 'pending').length },
    { id: 'leads', label: 'Leads', icon: <Users className="w-4 h-4" />, count: leads.length },
    { id: 'availability', label: 'Disponibilidad', icon: <Calendar className="w-4 h-4" /> },
    { id: 'create', label: 'Crear evaluación', icon: <Link2 className="w-4 h-4" /> },
    { id: 'active', label: 'Activas', icon: <BarChart3 className="w-4 h-4" />, count: activeEvaluations.length },
    { id: 'closed', label: 'Cerradas', icon: <Settings className="w-4 h-4" />, count: closedEvaluations.length },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'confirmed': return 'Confirmada'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 pt-24 bg-surface">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <h1 className="font-display text-2xl font-bold text-primary-900 mb-2">
            Acceso administrativo
          </h1>
          <p className="text-primary-600 mb-6">
            Ingresa la contraseña para continuar.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
            />
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary-900 mb-2">
          Panel de Administración
        </h1>
        <p className="text-primary-600">
          Gestiona leads, citas, evaluaciones y visualiza métricas de conversión.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-primary-50 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-600 hover:text-primary-900'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-500 mb-1">Total Leads</p>
                    <p className="text-3xl font-bold text-primary-900">{stats?.total_leads || 0}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-500 mb-1">Citas Agendadas</p>
                    <p className="text-3xl font-bold text-primary-900">{stats?.total_appointments || 0}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-500 mb-1">Hot Leads</p>
                    <p className="text-3xl font-bold text-primary-900">{stats?.hot_leads_count || 0}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-6">
                Embudo de Conversión
              </h2>
              
              {funnel && (
                <div className="space-y-4">
                  {[
                    { label: 'Leads Capturados', value: parseInt(funnel.total_leads), rate: 100 },
                    { label: 'Completaron Evaluación', value: parseInt(funnel.completed_assessment), rate: conversionRates['leads_to_assessment'] },
                    { label: 'Descargaron PDF', value: parseInt(funnel.downloaded_pdf), rate: conversionRates['assessment_to_pdf'] },
                    { label: 'Clickearon CTA', value: parseInt(funnel.clicked_cta), rate: conversionRates['assessment_to_cta'] },
                    { label: 'Agendaron Cita', value: parseInt(funnel.booked_appointment), rate: conversionRates['leads_to_appointment'] },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-primary-600">{step.label}</div>
                      <div className="flex-1">
                        <div className="w-full bg-primary-100 rounded-full h-4">
                          <div
                            className="bg-accent h-4 rounded-full transition-all"
                            style={{ width: `${step.rate}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-20 text-right">
                        <span className="font-bold text-primary-900">{step.value}</span>
                        <span className="text-sm text-primary-500 ml-1">({step.rate}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900">Citas Agendadas</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary-500" />
                <select
                  value={appointmentFilter}
                  onChange={(e) => setAppointmentFilter(e.target.value)}
                  className="text-sm border border-primary-200 rounded-lg px-3 py-2"
                >
                  <option value="all">Todas</option>
                  <option value="pending">Pendientes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="completed">Completadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">{apt.lead_name || apt.lead_email}</p>
                        <p className="text-sm text-primary-500">{apt.appointment_date} a las {apt.appointment_time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {apt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        Marcar como completada
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredAppointments.length === 0 && (
                <div className="text-center py-12 text-primary-500">
                  No hay citas {appointmentFilter !== 'all' ? 'con este filtro' : ''}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-2">Hot Leads</h2>
              <p className="text-primary-600">Top 20% de leads por engagement</p>
            </div>

            <div className="space-y-4 mb-8">
              {hotLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6 cursor-pointer hover:border-accent transition-colors"
                  onClick={() => {
                    if (selectedLead?.id === lead.id) {
                      setSelectedLead(null)
                      setLeadEvents([])
                    } else {
                      setSelectedLead(lead)
                      fetchLeadEvents(lead.id)
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">{lead.email}</p>
                        <p className="text-sm text-primary-500">Score: {lead.score} | Perfil: {lead.profile || 'N/A'}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-primary-400 transition-transform ${selectedLead?.id === lead.id ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Lead Detail View */}
                  {selectedLead?.id === lead.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t border-primary-100"
                    >
                      <h3 className="font-medium text-primary-900 mb-3">Historial de Eventos</h3>
                      {leadEvents.length > 0 ? (
                        <div className="space-y-2">
                          {leadEvents.map((event) => (
                            <div key={event.id} className="flex items-center justify-between text-sm p-2 bg-primary-50 rounded-lg">
                              <div>
                                <span className="font-medium text-primary-700">{event.event_type}</span>
                                {event.score_value > 0 && (
                                  <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">+{event.score_value} pts</span>
                                )}
                              </div>
                              <span className="text-primary-500 text-xs">{new Date(event.created_at).toLocaleDateString('es-ES')} {new Date(event.created_at).toLocaleTimeString('es-ES')}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-primary-500">Sin eventos registrados</p>
                      )}
                      
                      {/* Email Sequence Status */}
                      <div className="mt-4">
                        <h3 className="font-medium text-primary-900 mb-3">Secuencia de Emails</h3>
                        {(() => {
                          const sequence = emailSequences.find(s => s.lead_id === lead.id)
                          if (!sequence) return <p className="text-sm text-primary-500">Sin secuencia activa</p>
                          
                          const emails = [
                            { label: 'Bienvenida', sent: sequence.email_1_sent, date: sequence.email_1_sent_at },
                            { label: 'Recordatorio 48h', sent: sequence.email_2_sent, date: sequence.email_2_sent_at },
                            { label: 'Caso de éxito', sent: sequence.email_3_sent, date: sequence.email_3_sent_at },
                            { label: 'Seguimiento', sent: sequence.email_4_sent, date: sequence.email_4_sent_at },
                            { label: 'Re-evaluación', sent: sequence.email_5_sent, date: sequence.email_5_sent_at },
                          ]
                          
                             return (
                             <div className="grid grid-cols-5 gap-2">
                              {emails.map((email, idx) => (
                                <div key={idx} className={`text-center p-2 rounded-lg ${email.sent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  <div className="text-xs font-medium">{email.label}</div>
                                  <div className="text-xs mt-1">{email.sent ? '✓ Enviado' : 'Pendiente'}</div>
                                  {email.date && (
                                    <div className="text-xs mt-1 opacity-75">{new Date(email.date).toLocaleDateString('es-ES')}</div>
                                  )}
                                </div>
                              ))}
                             </div>
                             )
                         })()}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-2">Todos los Leads</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-primary-700">Email</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-primary-700">Perfil</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-primary-700">Score</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-primary-700">Estado</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-primary-700">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-100">
                    {leads.slice(0, 50).map((lead) => (
                      <tr key={lead.id} className="hover:bg-primary-50/50">
                        <td className="px-6 py-4 text-sm text-primary-900">{lead.email}</td>
                        <td className="px-6 py-4 text-sm text-primary-600">{lead.profile || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">{lead.score}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-primary-600">{lead.status}</td>
                        <td className="px-6 py-4 text-sm text-primary-500">{new Date(lead.created_at).toLocaleDateString('es-ES')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900">Gestión de Disponibilidad</h2>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={availabilityDate}
                  onChange={(e) => {
                    setAvailabilityDate(e.target.value)
                    fetchAvailability()
                  }}
                  className="text-sm border border-primary-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {availabilitySlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => updateAvailability(slot.id, !slot.is_available)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      slot.is_available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    <div>{slot.slot_time}</div>
                    <div className="text-xs mt-1">{slot.is_available ? 'Disponible' : 'Bloqueado'}</div>
                  </button>
                ))}
              </div>
              
              {availabilitySlots.length === 0 && (
                <div className="text-center py-12 text-primary-500">
                  No hay slots configurados para esta fecha
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-sm text-primary-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 rounded"></div>
                <span>Bloqueado</span>
              </div>
              <p className="ml-auto">Haz click en un slot para cambiar su estado</p>
            </div>
          </div>
        )}

        {/* Existing tabs */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-2">Nueva evaluación</h2>
              <p className="text-primary-600">Crea un link único para tu organización y compártelo con tus empleados.</p>
            </div>
            <LinkGenerator onCreate={createEvaluation} isLoading={evalLoading} />
          </div>
        )}

        {activeTab === 'active' && (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-2">Evaluaciones activas</h2>
              <p className="text-primary-600">Gestiona las evaluaciones actualmente abiertas.</p>
            </div>
            <EvaluationList
              evaluations={activeEvaluations}
              onCopyLink={handleCopyLink}
              onClose={closeEvaluation}
              copiedHash={copiedHash}
            />
          </div>
        )}

        {activeTab === 'closed' && (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-primary-900 mb-2">Evaluaciones cerradas</h2>
              <p className="text-primary-600">Historial de evaluaciones finalizadas.</p>
            </div>
            <EvaluationList
              evaluations={closedEvaluations}
              onCopyLink={handleCopyLink}
              onClose={() => {}}
              copiedHash={copiedHash}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminPage
