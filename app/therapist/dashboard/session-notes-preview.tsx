import { SessionNotes } from "@/components/session-notes"

export function SessionNotesPreview() {
  // Example data for the dashboard preview
  const previewData = {
    sessionTitle: "Recent Session - Sarah Johnson",
    sessionDate: "April 12, 2025",
    sessionTime: "10:00 AM - 11:00 AM",
    aiSummary:
      "Patient discussed progress with anxiety management techniques. Reported consistent use of breathing exercises with positive results. Sleep quality has improved, though still experiencing occasional difficulty falling asleep. Patient expressed interest in exploring additional relaxation techniques.",
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
      {
        id: "3",
        text: "Sleep improvement correlates with anxiety reduction techniques",
        category: "observation",
      },
    ],
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Latest Session Notes</h2>
      <SessionNotes {...previewData} />
    </div>
  )
}
