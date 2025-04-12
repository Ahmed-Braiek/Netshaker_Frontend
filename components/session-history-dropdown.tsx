"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown } from "lucide-react"

interface SessionHistoryDropdownProps {
  patientName: string
  sessions: {
    id: string
    title: string
    date: string
  }[]
  selectedSessionId: string
  onSessionSelect: (sessionId: string) => void
}

export function SessionHistoryDropdown({
  patientName,
  sessions,
  selectedSessionId,
  onSessionSelect,
}: SessionHistoryDropdownProps) {
  const selectedSession = sessions.find((session) => session.id === selectedSessionId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{selectedSession?.title || "Select Session"}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuLabel>{patientName}'s Sessions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sessions.map((session) => (
          <DropdownMenuItem
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            className={session.id === selectedSessionId ? "bg-accent" : ""}
          >
            <div className="flex flex-col">
              <span>{session.title}</span>
              <span className="text-xs text-muted-foreground">{session.date}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
