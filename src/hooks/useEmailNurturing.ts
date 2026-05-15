import { useState, useCallback } from 'react'
import { generateEmailSequence, type EmailPersonalization } from '../data/emailTemplates'

interface ScheduledEmail {
  id: string
  templateId: number
  subject: string
  scheduledDate: Date
  sent: boolean
  sentAt?: Date
  opened: boolean
  clicked: boolean
}

const STORAGE_KEY = 'pulso-h-email-schedule'

const getStoredSchedule = (): ScheduledEmail[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return parsed.map((e: any) => ({
      ...e,
      scheduledDate: new Date(e.scheduledDate),
      sentAt: e.sentAt ? new Date(e.sentAt) : undefined,
    }))
  } catch {
    return []
  }
}

const saveSchedule = (schedule: ScheduledEmail[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
}

export const useEmailNurturing = () => {
  const [schedule, setSchedule] = useState<ScheduledEmail[]>(getStoredSchedule)

  const scheduleEmails = useCallback((personalization: EmailPersonalization) => {
    const sequence = generateEmailSequence(personalization)
    
    const newSchedule: ScheduledEmail[] = sequence.map((item) => ({
      id: crypto.randomUUID(),
      templateId: item.template.id,
      subject: item.template.subject.replace('{{name}}', personalization.name || 'amigo'),
      scheduledDate: item.scheduledDate,
      sent: false,
      opened: false,
      clicked: false,
    }))

    setSchedule(newSchedule)
    saveSchedule(newSchedule)

    return newSchedule
  }, [])

  const markAsSent = useCallback((emailId: string) => {
    const updated = schedule.map((email) =>
      email.id === emailId
        ? { ...email, sent: true, sentAt: new Date() }
        : email
    )
    setSchedule(updated)
    saveSchedule(updated)
  }, [schedule])

  const markAsOpened = useCallback((emailId: string) => {
    const updated = schedule.map((email) =>
      email.id === emailId ? { ...email, opened: true } : email
    )
    setSchedule(updated)
    saveSchedule(updated)
  }, [schedule])

  const markAsClicked = useCallback((emailId: string) => {
    const updated = schedule.map((email) =>
      email.id === emailId ? { ...email, clicked: true } : email
    )
    setSchedule(updated)
    saveSchedule(updated)
  }, [schedule])

  const getPendingEmails = useCallback((): ScheduledEmail[] => {
    const now = new Date()
    return schedule.filter(
      (email) => !email.sent && email.scheduledDate <= now
    )
  }, [schedule])

  const getStats = useCallback(() => {
    const total = schedule.length
    const sent = schedule.filter((e) => e.sent).length
    const opened = schedule.filter((e) => e.opened).length
    const clicked = schedule.filter((e) => e.clicked).length

    return {
      total,
      sent,
      opened,
      clicked,
      openRate: sent > 0 ? (opened / sent) * 100 : 0,
      clickRate: sent > 0 ? (clicked / sent) * 100 : 0,
    }
  }, [schedule])

  return {
    schedule,
    scheduleEmails,
    markAsSent,
    markAsOpened,
    markAsClicked,
    getPendingEmails,
    getStats,
  }
}

export default useEmailNurturing
