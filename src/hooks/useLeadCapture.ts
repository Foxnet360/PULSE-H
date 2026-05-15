import { useState, useCallback, useEffect } from 'react'

export interface Lead {
  id: string
  email: string
  profile?: string
  irp?: number
  score: number
  gdprConsent: boolean
  marketingConsent: boolean
  createdAt: Date
  events: LeadEvent[]
  synced: boolean
  backendId?: number
}

export interface LeadEvent {
  type: 'assessment_complete' | 'pdf_download' | 'email_open' | 'cta_click' | 'call_scheduled'
  timestamp: Date
  score: number
  data?: Record<string, any>
}

const STORAGE_KEY = 'pulso-h-leads'
const OFFLINE_QUEUE_KEY = 'pulso-h-lead-queue'
const API_BASE_URL = '/api'

const getStoredLeads = (): Lead[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return parsed.map((l: any) => ({
      ...l,
      createdAt: new Date(l.createdAt),
      events: l.events?.map((e: any) => ({
        ...e,
        timestamp: new Date(e.timestamp),
      })) || [],
    }))
  } catch {
    return []
  }
}

const saveLeads = (leads: Lead[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

const getOfflineQueue = (): any[] => {
  try {
    const stored = localStorage.getItem(OFFLINE_QUEUE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveOfflineQueue = (queue: any[]) => {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
}

export const useLeadCapture = () => {
  const [leads, setLeads] = useState<Lead[]>(getStoredLeads)
  const [isSyncing, setIsSyncing] = useState(false)

  // Sync offline queue on mount
  useEffect(() => {
    const syncQueue = async () => {
      const queue = getOfflineQueue()
      if (queue.length === 0) return

      setIsSyncing(true)
      const remainingQueue = []

      for (const item of queue) {
        try {
          const response = await fetch(`${API_BASE_URL}/lead.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          })

          if (!response.ok) {
            remainingQueue.push(item)
          }
        } catch {
          remainingQueue.push(item)
        }
      }

      saveOfflineQueue(remainingQueue)
      setIsSyncing(false)
    }

    syncQueue()
  }, [])

  const syncToBackend = async (leadData: any): Promise<{ success: boolean; id?: number }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/lead.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return { success: true, id: result.id }
    } catch (error) {
      console.error('Failed to sync lead to backend:', error)
      return { success: false }
    }
  }

  const captureLead = useCallback(async (
    email: string,
    options: {
      profile?: string
      irp?: number
      gdprConsent: boolean
      marketingConsent: boolean
    }
  ): Promise<Lead> => {
    const newLead: Lead = {
      id: crypto.randomUUID(),
      email,
      profile: options.profile,
      irp: options.irp,
      score: 10,
      gdprConsent: options.gdprConsent,
      marketingConsent: options.marketingConsent,
      createdAt: new Date(),
      events: [
        {
          type: 'assessment_complete',
          timestamp: new Date(),
          score: 10,
          data: { irp: options.irp, profile: options.profile },
        },
      ],
      synced: false,
    }

    const updated = [...leads, newLead]
    setLeads(updated)
    saveLeads(updated)

    // Prepare backend payload
    const backendPayload = {
      email,
      name: null,
      organization: null,
      profile: options.profile,
      score: 10,
      gdpr_consent: options.gdprConsent,
      marketing_consent: options.marketingConsent,
      events: [
        {
          type: 'assessment_complete',
          data: { irp: options.irp, profile: options.profile },
        },
      ],
    }

    // Attempt to sync to backend
    const syncResult = await syncToBackend(backendPayload)

    if (syncResult.success && syncResult.id) {
      newLead.synced = true
      newLead.backendId = syncResult.id
      
      const syncedLeads = updated.map(l => 
        l.id === newLead.id ? { ...newLead } : l
      )
      setLeads(syncedLeads)
      saveLeads(syncedLeads)
      
      // Store backend lead_id in sessionStorage for current session
      sessionStorage.setItem('pulso-h-lead-id', String(syncResult.id))
      sessionStorage.setItem('pulso-h-lead-email', email)
    } else {
      // Add to offline queue for retry
      const queue = getOfflineQueue()
      queue.push(backendPayload)
      saveOfflineQueue(queue)
    }

    return newLead
  }, [leads])

  const syncLeadEvents = useCallback(async (leadId: string, events: Omit<LeadEvent, 'timestamp'>[]) => {
    const lead = leads.find(l => l.id === leadId)
    if (!lead || !lead.backendId) return

    const backendEvents = events.map(event => ({
      type: event.type,
      data: event.data || {},
    }))

    const payload = {
      email: lead.email,
      events: backendEvents,
    }

    const syncResult = await syncToBackend(payload)

    if (syncResult.success) {
      const updatedLeads = leads.map(l => {
        if (l.id !== leadId) return l
        
        const newEvents = events.map(event => ({
          ...event,
          timestamp: new Date(),
        }))
        
        const additionalScore = events.reduce((sum, e) => sum + e.score, 0)
        
        return {
          ...l,
          score: l.score + additionalScore,
          events: [...l.events, ...newEvents],
        }
      })
      
      setLeads(updatedLeads)
      saveLeads(updatedLeads)
    }
  }, [leads])

  const addEvent = useCallback((leadId: string, event: Omit<LeadEvent, 'timestamp'>) => {
    const updated = leads.map((lead) => {
      if (lead.id !== leadId) return lead
      
      const newEvent: LeadEvent = {
        ...event,
        timestamp: new Date(),
      }
      
      return {
        ...lead,
        score: lead.score + event.score,
        events: [...lead.events, newEvent],
      }
    })

    setLeads(updated)
    saveLeads(updated)

    // Also sync to backend if lead has backendId
    const lead = leads.find(l => l.id === leadId)
    if (lead?.backendId) {
      syncLeadEvents(leadId, [event]).catch(console.error)
    }
  }, [leads, syncLeadEvents])

  const getLeadByEmail = useCallback((email: string): Lead | undefined => {
    return leads.find((l) => l.email.toLowerCase() === email.toLowerCase())
  }, [leads])

  const getHotLeads = useCallback((): Lead[] => {
    const sorted = [...leads].sort((a, b) => b.score - a.score)
    const top20Percent = Math.ceil(sorted.length * 0.2)
    return sorted.slice(0, Math.max(1, top20Percent))
  }, [leads])

  return {
    leads,
    captureLead,
    addEvent,
    syncLeadEvents,
    getLeadByEmail,
    getHotLeads,
    isSyncing,
  }
}

export default useLeadCapture
