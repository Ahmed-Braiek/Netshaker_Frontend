"use client"

import { useState, useEffect } from "react"
import { SessionNotes } from "@/components/session-notes"
import { PatientSidebar, type Patient } from "@/components/patient-sidebar"
import { SessionHistoryDropdown } from "@/components/session-history-dropdown"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

// Mock patient data
const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    initials: "JD",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  },
  // ... other patients from previous example
]

// Mock session history for each patient
const patientSessionsHistory = {
  "1": [
    {
      id: "1-1",
      title: "Session #12",
      date: "April 10, 2025",
      data: {
        sessionTitle: "Therapy Session #12 - John Doe",
        sessionDate: "April 10, 2025",
        sessionTime: "2:00 PM - 3:00 PM",
        aiSummary: "Patient discussed ongoing challenges with work-related stress and anxiety...",
        aiInsights: [
          {
            id: "1",
            text: "Patient shows significant improvement in sleep patterns compared to previous sessions",
            category: "important",
          },
          // ... other insights
        ],
      },
    },
    {
      id: "1-2",
      title: "Session #11",
      date: "April 3, 2025",
      data: {
        sessionTitle: "Therapy Session #11 - John Doe",
        sessionDate: "April 3, 2025",
        sessionTime: "2:00 PM - 3:00 PM",
        aiSummary: "Follow-up session focused on implementing stress management techniques...",
        aiInsights: [
          {
            id: "1",
            text: "Patient reported using breathing techniques successfully during stressful meeting",
            category: "important",
          },
          // ... other insights
        ],
      },
    },
    {
      id: "1-3",
      title: "Session #10",
      date: "March 27, 2025",
      data: {
        sessionTitle: "Therapy Session #10 - John Doe",
        sessionDate: "March 27, 2025",
        sessionTime: "2:00 PM - 3:00 PM",
        aiSummary: "Session focused on workplace stressors and communication strategies...",
        aiInsights: [
          {
            id: "1",
            text: "Patient identified specific triggers for workplace anxiety",
            category: "important",
          },
          // ... other insights
        ],
      },
    },
  ],
  "2": [
    {
      id: "2-1",
      title: "Session #8",
      date: "April 12, 2025",
      data: {
        sessionTitle: "Therapy Session #8 - Sarah Johnson",
        sessionDate: "April 12, 2025",
        sessionTime: "10:00 AM - 11:00 AM",
        aiSummary: "Patient discussed progress with anxiety management techniques...",
        aiInsights: [
          {
            id: "1",
            text: "Consistent application of breathing techniques shows patient commitment",
            category: "important",
          },
          // ... other insights
        ],
      },
    },
    // ... other sessions
  ],
  // ... other patients' session histories
}

export default function SessionNotesPageWithHistory() {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id)
  const [selectedSessionId, setSelectedSessionId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState<any>(null)

  // Get the selected patient's sessions
  const patientSessions = patientSessionsHistory[selectedPatientId as keyof typeof patientSessionsHistory] || []

  // Set the first session as selected when patient changes
  useEffect(() => {
    if (patientSessions.length > 0) {
      setIsLoading(true)
      // Simulate loading delay
      setTimeout(() => {
        setSelectedSessionId(patientSessions[0].id)
        setSessionData(patientSessions[0].data)
        setIsLoading(false)
      }, 500)
    }
  }, [selectedPatientId])

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId)
  }

  const handleSessionSelect = (sessionId: string) => {
    setIsLoading(true)
    // Find the selected session
    const session = patientSessions.find((s) => s.id === sessionId)

    // Simulate loading delay
    setTimeout(() => {
      if (session) {
        setSelectedSessionId(sessionId)
        setSessionData(session.data)
      }
      setIsLoading(false)
    }, 500)
  }

  // Get the selected patient's name
  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <PatientSidebar
          patients={patients}
          selectedPatientId={selectedPatientId}
          onPatientSelect={handlePatientSelect}
        />
        <SidebarInset className="bg-background">
          <div className="container mx-auto py-6 px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold">Session Notes</h1>
              {patientSessions.length > 0 && (
                <SessionHistoryDropdown
                  patientName={selectedPatient?.name || ""}
                  sessions={patientSessions}
                  selectedSessionId={selectedSessionId}
                  onSessionSelect={handleSessionSelect}
                />
              )}
            </div>

            {sessionData && <SessionNotes {...sessionData} isLoading={isLoading} />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
