"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Patient {
  id: string
  name: string
  avatarUrl?: string
  initials: string
  lastSessionDate?: string
  status?: "active" | "scheduled" | "completed"
}

interface PatientListProps {
  patients: Patient[]
  selectedPatientId: string
  onPatientSelect: (patientId: string) => void
}

export function PatientList({ patients, selectedPatientId, onPatientSelect }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-amber-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-base font-medium mb-3">Patients</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="w-full pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {filteredPatients.length > 0 ? (
          <div className="grid gap-1">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors hover:bg-accent/50",
                  patient.id === selectedPatientId ? "bg-accent border-primary/20" : "",
                )}
                onClick={() => onPatientSelect(patient.id)}
              >
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback>{patient.initials}</AvatarFallback>
                  </Avatar>
                  {patient.status && (
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                        getStatusColor(patient.status),
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{patient.name}</p>
                  {patient.lastSessionDate && (
                    <p className="text-xs text-muted-foreground">Last: {patient.lastSessionDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">No patients found</p>
          </div>
        )}
      </div>
    </div>
  )
}
