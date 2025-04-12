"use client"

import { useState } from "react"
import { Calendar, Clock, Download, Edit, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface SessionNotesProps {
  sessionTitle?: string
  sessionDate?: string
  sessionTime?: string
  aiSummary?: string
  aiInsights?: {
    id: string
    text: string
    category: "important" | "action" | "observation"
  }[]
  isLoading?: boolean
}

export function SessionNotes({
  sessionTitle = "Therapy Session #12",
  sessionDate = "April 10, 2025",
  sessionTime = "2:00 PM - 3:00 PM",
  aiSummary = "Patient discussed ongoing challenges with work-related stress and anxiety. They reported improved sleep patterns since our last session, but still experiencing occasional insomnia. We explored new coping mechanisms and breathing techniques. Patient showed positive engagement and willingness to practice mindfulness exercises daily.",
  aiInsights = [
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
  isLoading = false,
}: SessionNotesProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "important":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "action":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "observation":
        return "bg-sky-100 text-sky-800 hover:bg-sky-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div>
            <CardTitle className="text-xl font-semibold">{sessionTitle}</CardTitle>
            <CardDescription className="flex items-center mt-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {sessionDate}
              <span className="mx-2">•</span>
              <Clock className="h-3.5 w-3.5 mr-1" />
              {sessionTime}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
              AI Generated
            </Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-3">
                <Skeleton className="h-4 w-32" />
              </div>
              <Card>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <Skeleton className="h-4 w-32" />
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* AI Summary Section */}
            <div className="flex-1">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">AI Summary</h3>
              </div>
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed">{aiSummary}</p>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights Section */}
            <div className="flex-1">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">AI Insights</h3>
              </div>
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    {aiInsights?.map((insight) => (
                      <li key={insight.id} className="flex items-start gap-2">
                        <Badge
                          variant="secondary"
                          className={`mt-0.5 whitespace-nowrap ${getCategoryColor(insight.category)}`}
                        >
                          {insight.category}
                        </Badge>
                        <span className="text-sm">{insight.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-slate-50 px-6 py-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit Notes
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Manual Note
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </CardFooter>
    </Card>
  )
}
