"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export interface Patient {
  id: string
  name: string
  avatarUrl?: string
  initials: string
}

interface PatientSidebarProps {
  patients: Patient[]
  selectedPatientId: string
  onPatientSelect: (patientId: string) => void
}

export function PatientSidebar({ patients, selectedPatientId, onPatientSelect }: PatientSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Sidebar variant="floating" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-sm font-medium">Patients</h2>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </div>
        <div className="px-2 pb-2">
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <SidebarMenuItem key={patient.id}>
                <SidebarMenuButton
                  isActive={patient.id === selectedPatientId}
                  onClick={() => onPatientSelect(patient.id)}
                  className="w-full justify-start"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback>{patient.initials}</AvatarFallback>
                  </Avatar>
                  <span>{patient.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">No patients found</div>
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
