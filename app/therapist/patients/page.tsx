import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const patients = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    condition: "Anxiety & Depression",
    concerns: ["Anxiety", "Depression", "Stress Management"],
    lastVisit: "May 10, 2025",
    status: "Active",
    notes:
      "Sarah has been making good progress with her anxiety management techniques. She reports improved sleep patterns and reduced stress at work.",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    condition: "Post-Traumatic Stress",
    concerns: ["Trauma", "Relationship Issues", "Self-Esteem"],
    lastVisit: "May 5, 2025",
    status: "Active",
    notes:
      "Michael continues to work through trauma-related issues. He's shown improvement in applying coping strategies during triggering situations.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    condition: "Work-Related Stress",
    concerns: ["Anxiety", "Stress", "Work-Life Balance"],
    lastVisit: "April 28, 2025",
    status: "Inactive",
    notes:
      "Emily has been practicing mindfulness techniques to manage workplace stress. She reports better boundaries between work and personal life.",
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=80&width=80",
    condition: "Life Transition",
    concerns: ["Career Challenges", "Life Transitions", "Goal Setting"],
    lastVisit: "May 12, 2025",
    status: "Active",
    notes:
      "James is navigating a career change and has been working on clarifying his goals and values. He's made progress in developing an action plan.",
  },
]

export default function PatientsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Patient List</h1>
        <p className="text-muted-foreground">Manage and view your current patients</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3 lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
              <CardDescription>Find patients by name or condition</CardDescription>
            </CardHeader>
            <CardContent>
              <Input placeholder="Search patients..." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
              <CardDescription>Refine your search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Conditions</h3>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anxiety" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="anxiety" className="text-sm">
                      Anxiety
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="depression" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="depression" className="text-sm">
                      Depression
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="trauma" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="trauma" className="text-sm">
                      Trauma
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="relationships" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="relationships" className="text-sm">
                      Relationships
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="stress" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="stress" className="text-sm">
                      Stress
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status</h3>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="active" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="active" className="text-sm">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="inactive" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="inactive" className="text-sm">
                      Inactive
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="new" className="text-sm">
                      New
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Patients</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="recent">Recent Visits</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">Showing {patients.length} patients</div>
            </div>

            <TabsContent value="all" className="space-y-6">
              {patients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-2">
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <Badge className="mt-2" variant={patient.status === "Active" ? "default" : "secondary"}>
                          {patient.status}
                        </Badge>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Last Visit:</span> {patient.lastVisit}
                        </p>
                      </div>

                      <div className="md:w-3/4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Treatment Notes</h4>
                          <p className="text-sm">{patient.notes}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Primary Concerns</h4>
                          <div className="flex flex-wrap gap-2">
                            {patient.concerns.map((item) => (
                              <Badge key={item} variant="outline">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/patient/records/${patient.id}`}>View Records</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/patient/notes/${patient.id}`}>Treatment Notes</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-6">
              {patients
                .filter((p) => p.status === "Active")
                .map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex flex-col items-center text-center">
                          <Avatar className="h-24 w-24 mb-2">
                            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          <Badge className="mt-2">Active</Badge>
                          <p className="text-sm mt-2">
                            <span className="font-medium">Last Visit:</span> {patient.lastVisit}
                          </p>
                        </div>

                        <div className="md:w-3/4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Treatment Notes</h4>
                            <p className="text-sm">{patient.notes}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Primary Concerns</h4>
                            <div className="flex flex-wrap gap-2">
                              {patient.concerns.map((item) => (
                                <Badge key={item} variant="outline">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/patient/records/${patient.id}`}>View Records</Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/patient/notes/${patient.id}`}>Treatment Notes</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              {patients
                .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
                .slice(0, 2)
                .map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 flex flex-col items-center text-center">
                          <Avatar className="h-24 w-24 mb-2">
                            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          <Badge className="mt-2" variant={patient.status === "Active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                          <p className="text-sm mt-2">
                            <span className="font-medium">Last Visit:</span> {patient.lastVisit}
                          </p>
                        </div>

                        <div className="md:w-3/4 space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Treatment Notes</h4>
                            <p className="text-sm">{patient.notes}</p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Primary Concerns</h4>
                            <div className="flex flex-wrap gap-2">
                              {patient.concerns.map((item) => (
                                <Badge key={item} variant="outline">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/patient/records/${patient.id}`}>View Records</Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/patient/notes/${patient.id}`}>Treatment Notes</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
