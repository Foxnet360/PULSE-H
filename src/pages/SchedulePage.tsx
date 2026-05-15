import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import { trackAppointmentBooked } from '../utils/analytics'

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

interface DaySlots {
  [date: string]: TimeSlot[]
}

const SchedulePage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [slots, setSlots] = useState<DaySlots>({})
  const [currentWeek, setCurrentWeek] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [appointmentData, setAppointmentData] = useState<any>(null)

  const leadEmail = sessionStorage.getItem('pulso-h-lead-email') || ''

  useEffect(() => {
    const leadId = sessionStorage.getItem('pulso-h-lead-id')
    if (!leadId) {
      navigate('/evaluar')
      return
    }

    fetchAvailability()
  }, [currentWeek, navigate])

  const fetchAvailability = async () => {
    setIsLoading(true)
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() + currentWeek * 7)
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 6)

      const response = await fetch(
        `/api/availability.php?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`
      )
      const data = await response.json()
      
      if (data.success) {
        setSlots(data.slots)
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getWeekDays = () => {
    const days = []
    const start = new Date()
    start.setDate(start.getDate() + currentWeek * 7)
    
    for (let i = 0; i < 5; i++) {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      days.push({
        date: day.toISOString().split('T')[0],
        dayName: day.toLocaleDateString('es-ES', { weekday: 'short' }),
        dayNumber: day.getDate(),
        month: day.toLocaleDateString('es-ES', { month: 'short' }),
      })
    }
    return days
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) return
    setSelectedSlot(slot)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) return

    const leadId = sessionStorage.getItem('pulso-h-lead-id')
    if (!leadId) {
      navigate('/evaluar')
      return
    }

    setIsBooking(true)
    try {
      const response = await fetch('/api/booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: parseInt(leadId),
          appointment_date: selectedDate,
          appointment_time: selectedSlot.time,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setAppointmentData(data)
        setBookingComplete(true)
        
        // Track appointment booked
        trackAppointmentBooked(selectedDate, selectedSlot.time)
      }
    } catch (error) {
      console.error('Failed to book appointment:', error)
    } finally {
      setIsBooking(false)
    }
  }

  const weekDays = getWeekDays()

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="font-display text-3xl font-bold text-primary-900 mb-4">
            ¡Cita confirmada!
          </h1>

          <div className="bg-primary-50 rounded-xl p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-primary-700">
                <strong>Fecha:</strong> {appointmentData?.appointment_date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-primary-700">
                <strong>Hora:</strong> {appointmentData?.appointment_time}
              </span>
            </div>
          </div>

          <p className="text-primary-600 mb-6">
            Te hemos enviado un email de confirmación a <strong>{leadEmail}</strong> con los detalles
            de tu cita y el enlace para unirte a la sesión.
          </p>

          <button
            onClick={() => navigate('/resultados')}
            className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors"
          >
            Ver mis resultados
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary-900 mb-2">
          Agenda tu revisión gratuita
        </h1>
        <p className="text-primary-600">
          Selecciona un horario de 30 minutos para tu sesión con un Psicólogo Organizacional
        </p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
          disabled={currentWeek === 0}
          className="p-2 hover:bg-primary-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-primary-700 font-medium">
          {currentWeek === 0 ? 'Esta semana' : `Semana ${currentWeek + 1}`}
        </span>
        <button
          onClick={() => setCurrentWeek(prev => prev + 1)}
          disabled={currentWeek >= 2}
          className="p-2 hover:bg-primary-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 mb-8">
          {weekDays.map((day) => (
            <div key={day.date} className="text-center">
              <div className="text-sm text-primary-500 mb-1">{day.dayName}</div>
              <div className="text-lg font-bold text-primary-900 mb-1">{day.dayNumber}</div>
              <div className="text-xs text-primary-400 mb-3">{day.month}</div>
              
              <div className="space-y-2">
                {slots[day.date]?.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => {
                      setSelectedDate(day.date)
                      handleSlotSelect(slot)
                    }}
                    disabled={!slot.available}
                    className={`w-full py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                      selectedDate === day.date && selectedSlot?.id === slot.id
                        ? 'bg-accent text-white shadow-md'
                        : slot.available
                        ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                )) || (
                  <div className="text-xs text-primary-400 py-2">No disponible</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Button */}
      {selectedSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-500 text-sm">Horario seleccionado:</p>
              <p className="text-primary-900 font-bold text-lg">
                {selectedDate} a las {selectedSlot.time}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary-500 text-sm">Duración:</p>
              <p className="text-primary-900 font-bold">30 minutos</p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={isBooking}
            className="w-full px-6 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirmando...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Confirmar cita gratuita
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default SchedulePage
