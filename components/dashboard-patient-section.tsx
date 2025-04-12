"use client"

import { useState, useEffect } from "react"
import { SessionNotes } from "@/components/session-notes"
import { PatientList, type Patient } from "@/components/patient-list"
import { SessionHistoryDropdown } from "@/components/session-history-dropdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock patient data
const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    initials: "JD",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 10, 2025",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 12, 2025",
    status: "scheduled",
  },
  {
    id: "3",
    name: "Michael Brown",
    initials: "MB",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 11, 2025",
    status: "completed",
  },
  {
    id: "4",
    name: "Emily Davis",
    initials: "ED",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 9, 2025",
    status: "active",
  },
  {
    id: "5",
    name: "Robert Wilson",
    initials: "RW",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 13, 2025",
    status: "scheduled",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    initials: "JT",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 8, 2025",
    status: "completed",
  },
  {
    id: "7",
    name: "David Martinez",
    initials: "DM",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    lastSessionDate: "April 7, 2025",
    status: "active",
  },
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
        aiSummary:
          "Patient discussed ongoing challenges with work-related stress and anxiety. They reported improved sleep patterns since our last session, but still experiencing occasional insomnia. We explored new coping mechanisms and breathing techniques. Patient showed positive engagement and willingness to practice mindfulness exercises daily.",
        aiInsights: [
          {
            id: "1",
            text: "Patient shows significant improvement in sleep patterns compared to previous sessions",
            category: "important",
          },
          {
            id: "2",
            text: "Follow up on mindfulness exercise compliance at next session",
            category: "action",
          },
          {
            id: "3",
            text: "Consider introducing progressive muscle relaxation techniques",
            category: "action",
          },
          {
            id: "4",
            text: "Patient mentioned increased conflict with coworker - monitor for workplace stress triggers",
            category: "observation",
          },
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
        aiSummary:
          "Follow-up session focused on implementing stress management techniques. Patient reported partial success with daily mindfulness practice, completing exercises on 4 out of 7 days.",
        aiInsights: [
          {
            id: "1",
            text: "Patient reported using breathing techniques successfully during stressful meeting",
            category: "important",
          },
          {
            id: "2",
            text: "Partial compliance with mindfulness practice - explore barriers",
            category: "action",
          },
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
        aiSummary:
          "Patient discussed progress with anxiety management techniques. Reported consistent use of breathing exercises with positive results.",
        aiInsights: [
          {
            id: "1",
            text: "Consistent application of breathing techniques shows patient commitment",
            category: "important",
          },
          {
            id: "2",
            text: "Consider introducing guided meditation resources next session",
            category: "action",
          },
        ],
      },
    },
  ],
  // Add data for other patients as needed
}

export function DashboardPatientSection() {
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Session Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Patient List Section */}
          <div className="lg:col-span-1 h-full border rounded-md overflow-hidden">
            <PatientList
              patients={patients}
              selectedPatientId={selectedPatientId}
              onPatientSelect={handlePatientSelect}
            />
          </div>

          {/* Session Details Section */}
          <div className="lg:col-span-3 h-full overflow-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <h2 className="text-lg font-semibold">Session Notes</h2>
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
        </div>
      </CardContent>
    </Card>
  )
}
