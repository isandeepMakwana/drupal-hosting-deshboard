"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  AlertCircle,
  FileText,
  Filter,
  HelpCircle,
  MessageSquare,
  MoreVertical,
  PlusCircle,
  RefreshCcw,
  Search,
  Server,
  ShieldAlert,
  Tag,
  Wrench,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SupportPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")
  const [tickets, setTickets] = useState(supportTickets)

  const handleSubmitTicket = () => {
    if (!category || !subject || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      // Create new ticket
      const newTicket = {
        id: `TICKET-${Math.floor(1000 + Math.random() * 9000)}`,
        subject,
        category: getCategoryLabel(category),
        status: "Open",
        priority: priority || "Medium",
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
        description,
        environment: "All environments",
        assignee: "Support Team",
        comments: [],
      }

      // Add to tickets
      setTickets([newTicket, ...tickets])

      toast({
        title: "Support ticket submitted",
        description: `Ticket ${newTicket.id} has been created successfully.`,
      })

      // Reset form
      setCategory("")
      setPriority("")
      setSubject("")
      setDescription("")
    }, 1000)
  }

  const getCategoryLabel = (value: string) => {
    const categories: Record<string, string> = {
      technical: "Technical Issue",
      billing: "Billing & Account",
      security: "Security",
      performance: "Performance",
      feature: "Feature Request",
    }
    return categories[value] || value
  }

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: newStatus,
              updated: new Date().toLocaleString(),
            }
          : ticket,
      ),
    )

    toast({
      title: "Ticket updated",
      description: `Ticket ${ticketId} status changed to ${newStatus}`,
    })
  }

  const handleAddComment = (ticketId: string) => {
    if (!newComment.trim()) return

    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              updated: new Date().toLocaleString(),
              comments: [
                ...ticket.comments,
                {
                  id: Date.now().toString(),
                  author: "You",
                  avatar: "/avatar.png",
                  text: newComment,
                  timestamp: new Date().toLocaleString(),
                },
              ],
            }
          : ticket,
      ),
    )

    setNewComment("")

    toast({
      title: "Comment added",
      description: `Your comment has been added to ticket ${ticketId}`,
    })
  }

  const filteredTickets = tickets.filter((ticket) => {
    // Apply search filter
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-blue-100 text-blue-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical Issue":
        return <Wrench className="h-4 w-4 text-blue-500" />
      case "Billing & Account":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "Security":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      case "Performance":
        return <Server className="h-4 w-4 text-green-500" />
      case "Feature Request":
        return <PlusCircle className="h-4 w-4 text-orange-500" />
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Live Support"
        description="Get real-time help with your Drupal hosting platform and manage your support tickets."
      />

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger id="new-ticket-tab" value="new">
            Create Ticket
          </TabsTrigger>
          {selectedTicket && <TabsTrigger value="details">Ticket Details</TabsTrigger>}
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>View and manage your support tickets</CardDescription>
              <div className="flex flex-col sm:flex-row gap-2 mt-2 justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSearchQuery("")
                      setStatusFilter("all")
                    }}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No tickets found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => {
                          setSelectedTicket(ticket.id)
                          document.getElementById("details-tab")?.click()
                        }}
                      >
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <span className="truncate max-w-[200px]">{ticket.subject}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{ticket.category}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge className={getPriorityBadgeClass(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(ticket.status)}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{ticket.updated}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedTicket(ticket.id)
                                  document.getElementById("details-tab")?.click()
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(ticket.id, "In Progress")
                                }}
                                disabled={ticket.status === "In Progress" || ticket.status === "Closed"}
                              >
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(ticket.id, "Resolved")
                                }}
                                disabled={ticket.status === "Resolved" || ticket.status === "Closed"}
                              >
                                Mark as Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(ticket.id, "Closed")
                                }}
                                disabled={ticket.status === "Closed"}
                              >
                                Close Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(ticket.id, "Open")
                                }}
                                disabled={ticket.status === "Open"}
                              >
                                Reopen Ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit a New Support Ticket</CardTitle>
              <CardDescription>Provide details about your issue to get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Account</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <Input id="attachments" type="file" multiple />
                <p className="text-xs text-muted-foreground">
                  You can upload screenshots, logs, or other relevant files (max 10MB per file)
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitTicket} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent id="details-tab" value="details" className="space-y-4">
          {selectedTicket && tickets.find((t) => t.id === selectedTicket) && (
            <>
              {(() => {
                const ticket = tickets.find((t) => t.id === selectedTicket)!
                return (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getStatusBadgeClass(ticket.status)}>{ticket.status}</Badge>
                            <Badge className={getPriorityBadgeClass(ticket.priority)}>{ticket.priority}</Badge>
                          </div>
                          <CardTitle className="flex items-center gap-2">
                            {getCategoryIcon(ticket.category)}
                            {ticket.subject}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {ticket.id} • Created: {ticket.created} • Last updated: {ticket.updated}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(ticket.id, "In Progress")}
                              disabled={ticket.status === "In Progress" || ticket.status === "Closed"}
                            >
                              Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(ticket.id, "Resolved")}
                              disabled={ticket.status === "Resolved" || ticket.status === "Closed"}
                            >
                              Mark as Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(ticket.id, "Closed")}
                              disabled={ticket.status === "Closed"}
                            >
                              Close Ticket
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(ticket.id, "Open")}
                              disabled={ticket.status === "Open"}
                            >
                              Reopen Ticket
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download as PDF</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Tag className="h-4 w-4" />
                            <span>Details</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Category</p>
                              <p className="text-sm">{ticket.category}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Environment</p>
                              <p className="text-sm">{ticket.environment}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Assignee</p>
                              <p className="text-sm">{ticket.assignee}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <p className="text-sm">{ticket.status}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <AlertCircle className="h-4 w-4" />
                            <span>Issue Description</span>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm whitespace-pre-line">{ticket.description}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>Conversation</span>
                          </div>

                          <div className="space-y-4">
                            {ticket.comments && ticket.comments.length > 0 ? (
                              ticket.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                    <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <p className="text-sm font-medium">{comment.author}</p>
                                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                    </div>
                                    <p className="text-sm mt-1">{comment.text}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 bg-muted/50 rounded-lg text-center text-muted-foreground">
                                <p className="text-sm">No comments yet</p>
                              </div>
                            )}

                            <div className="flex gap-2 mt-4">
                              <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px]"
                              />
                            </div>
                            <div className="flex justify-end">
                              <Button onClick={() => handleAddComment(ticket.id)}>Add Comment</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}
            </>
          )}
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Common support requests and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {supportArticles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {article.category === "Technical" && <Wrench className="h-5 w-5 text-blue-500 mt-0.5" />}
                      {article.category === "Security" && <ShieldAlert className="h-5 w-5 text-red-500 mt-0.5" />}
                      {article.category === "Performance" && <Server className="h-5 w-5 text-green-500 mt-0.5" />}
                      {article.category === "General" && <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5" />}

                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Category: {article.category} • Last updated: {article.updated}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Issue:</p>
                          <p className="text-sm">{article.issue}</p>
                          <p className="text-sm font-medium mt-3">Resolution:</p>
                          <p className="text-sm">{article.resolution}</p>

                          {article.steps && (
                            <>
                              <p className="text-sm font-medium mt-3">Steps to resolve:</p>
                              <ol className="list-decimal list-inside text-sm space-y-1">
                                {article.steps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

const supportTickets = [
  {
    id: "TICKET-1234",
    subject: "Unable to deploy to production environment",
    category: "Technical Issue",
    priority: "High",
    status: "Open",
    created: "2023-06-15 14:32:45",
    updated: "2023-06-15 14:32:45",
    description:
      "I'm trying to deploy our latest changes to the production environment, but the deployment keeps failing with a 'Permission denied' error. I've checked that my SSH keys are correctly set up and I have the necessary permissions in the dashboard.",
    environment: "main-website-prod",
    assignee: "Support Team",
    comments: [
      {
        id: "1",
        author: "Support Agent",
        avatar: "/placeholder2.jpeg?height=32&width=32",
        text: "Thank you for reporting this issue. Could you please provide the exact error message you're seeing and the steps you're taking to deploy?",
        timestamp: "2023-06-15 15:10:22",
      },
    ],
  },
  {
    id: "TICKET-1233",
    subject: "SSL certificate expired for alumni.fredonia.edu",
    category: "Security",
    priority: "Critical",
    status: "In Progress",
    created: "2023-06-14 10:15:22",
    updated: "2023-06-15 09:45:12",
    description:
      "The SSL certificate for our alumni site (alumni.fredonia.edu) has expired. Users are getting security warnings when trying to access the site. We need this fixed urgently as we have an alumni event this weekend.",
    environment: "alumni-prod",
    assignee: "Security Team",
    comments: [
      {
        id: "1",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "We've identified the issue and are working on renewing the certificate. We'll have this resolved within the next hour.",
        timestamp: "2023-06-14 11:30:15",
      },
      {
        id: "2",
        author: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Thank you for the quick response. Please let me know once it's resolved.",
        timestamp: "2023-06-14 11:45:33",
      },
    ],
  },
  {
    id: "TICKET-1232",
    subject: "Need to increase storage quota for main website",
    category: "Billing & Account",
    priority: "Medium",
    status: "Resolved",
    created: "2023-06-12 16:08:33",
    updated: "2023-06-13 11:22:45",
    description:
      "We're running low on storage space for our main website. We currently have 10GB and would like to upgrade to 25GB. Please let us know the cost and process for upgrading.",
    environment: "main-website-prod",
    assignee: "Billing Team",
    comments: [
      {
        id: "1",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "I've checked your account and can confirm that upgrading to 25GB would cost an additional $15/month. Would you like me to process this upgrade for you?",
        timestamp: "2023-06-12 17:22:10",
      },
      {
        id: "2",
        author: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Yes, please proceed with the upgrade.",
        timestamp: "2023-06-13 09:15:27",
      },
      {
        id: "3",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "The upgrade has been completed. Your storage quota is now 25GB. The additional charge will appear on your next invoice.",
        timestamp: "2023-06-13 11:22:45",
      },
    ],
  },
  {
    id: "TICKET-1231",
    subject: "Slow page load times on admissions site",
    category: "Performance",
    priority: "Medium",
    status: "Closed",
    created: "2023-06-10 08:45:19",
    updated: "2023-06-11 15:30:27",
    description:
      "Our admissions site has been loading very slowly for the past few days. Pages are taking 5-10 seconds to load, which is much longer than usual. This is affecting user experience, especially for prospective students.",
    environment: "admissions-prod",
    assignee: "Performance Team",
    comments: [
      {
        id: "1",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "We've identified a database query that's causing the slowdown. We'll optimize it and deploy a fix.",
        timestamp: "2023-06-10 10:30:15",
      },
      {
        id: "2",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "The fix has been deployed. Page load times should now be back to normal (under 2 seconds). Please let us know if you continue to experience slowness.",
        timestamp: "2023-06-11 14:15:33",
      },
      {
        id: "3",
        author: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "The site is much faster now. Thank you for the quick resolution!",
        timestamp: "2023-06-11 15:30:27",
      },
    ],
  },
  {
    id: "TICKET-1230",
    subject: "Request for additional development environment",
    category: "Feature Request",
    priority: "Low",
    status: "Resolved",
    created: "2023-06-08 13:22:51",
    updated: "2023-06-09 10:15:33",
    description:
      "We need an additional development environment for our new team members to work on a redesign project. We'd like this environment to be a clone of our current staging environment.",
    environment: "All environments",
    assignee: "Provisioning Team",
    comments: [
      {
        id: "1",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "We can set up an additional development environment for you. There will be an additional charge of $20/month for this environment. Would you like to proceed?",
        timestamp: "2023-06-08 14:45:10",
      },
      {
        id: "2",
        author: "You",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "Yes, please proceed with setting up the new environment.",
        timestamp: "2023-06-08 15:30:27",
      },
      {
        id: "3",
        author: "Support Agent",
        avatar: "/placeholder.svg?height=32&width=32",
        text: "The new development environment has been created. You can access it at redesign-dev.fredonia.edu. The environment has been cloned from your staging environment as requested.",
        timestamp: "2023-06-09 10:15:33",
      },
    ],
  },
]

const supportArticles = [
  {
    id: 1,
    title: "Resolving Database Connection Issues",
    category: "Technical",
    issue: "Database connection errors or timeouts when accessing Drupal sites",
    resolution:
      "This is typically caused by incorrect database credentials, network issues, or database server overload.",
    steps: [
      "Verify database credentials in settings.php file",
      "Check if the database server is running and accessible",
      "Ensure the database user has proper permissions",
      "Check for database connection limits or throttling",
      "Restart the web server and database service if needed",
    ],
    updated: "2023-06-10",
  },
  {
    id: 2,
    title: "Fixing SSL Certificate Issues",
    category: "Security",
    issue: "SSL certificate errors, expiration warnings, or insecure connection alerts",
    resolution:
      "SSL certificates need to be properly configured and renewed before expiration to maintain secure connections.",
    steps: [
      "Check the SSL certificate expiration date in the Domains section",
      "Verify DNS configuration is correct",
      "Ensure the SSL certificate is properly installed",
      "Renew the certificate if it's expired or close to expiration",
      "Configure proper redirects from HTTP to HTTPS",
    ],
    updated: "2023-06-12",
  },
  {
    id: 3,
    title: "Optimizing Drupal Performance",
    category: "Performance",
    issue: "Slow page load times, high server resource usage, or timeout errors",
    resolution:
      "Performance issues can be addressed through proper caching, code optimization, and server configuration.",
    steps: [
      "Enable Drupal, Redis, and CDN caching in the Cache Management section",
      "Optimize database queries and indexes",
      "Implement image optimization and lazy loading",
      "Use a content delivery network (CDN) for static assets",
      "Upgrade server resources if necessary",
    ],
    updated: "2023-06-15",
  },
  {
    id: 4,
    title: "Managing Drupal Updates Safely",
    category: "General",
    issue: "Concerns about applying Drupal core or module updates without breaking the site",
    resolution: "A systematic approach to updates can minimize risks and ensure smooth upgrades.",
    steps: [
      "Always create a backup before applying updates",
      "Test updates in a staging environment first",
      "Schedule updates during low-traffic periods",
      "Use the Update Manager in the dashboard to apply updates",
      "Monitor the site after updates for any issues",
    ],
    updated: "2023-06-08",
  },
  {
    id: 5,
    title: "Troubleshooting Failed Deployments",
    category: "Technical",
    issue: "Deployment failures, code not updating, or deployment errors",
    resolution: "Deployment issues are often related to code conflicts, permission problems, or server constraints.",
    steps: [
      "Check the deployment logs for specific error messages",
      "Verify that your Git repository is accessible",
      "Ensure the codebase is compatible with your Drupal version",
      "Check for file permission issues on the server",
      "Verify that all required dependencies are available",
    ],
    updated: "2023-06-14",
  },
]
