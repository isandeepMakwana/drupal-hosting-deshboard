"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, GitBranch, Globe, RefreshCw, Server, Shield, Clock, Search, Filter, User, Cloud } from "lucide-react"
import type { ActivityLog } from "@/contexts/dashboard-context"

interface RecentActivityProps {
  activities: ActivityLog[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  // Filter activities based on search query and filters
  const filteredActivities = activities.filter((activity) => {
    // Search filter
    const matchesSearch =
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter

    // Time filter
    let matchesTime = true
    if (timeFilter === "today") {
      matchesTime = activity.time.includes("today") || activity.time.includes("Just now")
    } else if (timeFilter === "yesterday") {
      matchesTime = activity.time.includes("Yesterday")
    } else if (timeFilter === "week") {
      matchesTime = !activity.time.includes("month") && !activity.time.includes("year")
    }

    return matchesSearch && matchesCategory && matchesTime
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "deployment":
        return <GitBranch className="h-4 w-4 text-blue-500" />
      case "backup":
        return <Database className="h-4 w-4 text-green-500" />
      case "update":
        return <RefreshCw className="h-4 w-4 text-purple-500" />
      case "domain":
        return <Globe className="h-4 w-4 text-orange-500" />
      case "environment":
        return <Server className="h-4 w-4 text-indigo-500" />
      case "user":
        return <Shield className="h-4 w-4 text-red-500" />
      case "cache":
        return <Cloud className="h-4 w-4 text-cyan-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "deployment":
        return "bg-blue-100 text-blue-800"
      case "backup":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-purple-100 text-purple-800"
      case "domain":
        return "bg-orange-100 text-orange-800"
      case "environment":
        return "bg-indigo-100 text-indigo-800"
      case "user":
        return "bg-red-100 text-red-800"
      case "cache":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            className="pl-9 w-full sm:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="deployment">Deployments</SelectItem>
              <SelectItem value="backup">Backups</SelectItem>
              <SelectItem value="update">Updates</SelectItem>
              <SelectItem value="domain">Domains</SelectItem>
              <SelectItem value="environment">Environments</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="cache">Cache</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activities match your filters. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Card
                  key={activity.id}
                  className={`p-4 transition-all cursor-pointer hover:shadow-md ${
                    expandedActivity === activity.id ? "border-blue-300" : ""
                  }`}
                  onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback className="bg-primary-foreground text-primary">
                        {activity.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="font-medium">{activity.action}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(activity.category)}>
                            <span className="flex items-center gap-1">
                              {getCategoryIcon(activity.category)}
                              {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                            </span>
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        <span>{activity.user.name}</span>
                      </div>

                      {expandedActivity === activity.id && activity.details && (
                        <div className="mt-3 pt-3 border-t text-sm">
                          <p className="font-medium mb-1">Details:</p>
                          <p className="text-muted-foreground">{activity.details}</p>
                          {activity.relatedLinks && (
                            <div className="mt-2">
                              <p className="font-medium mb-1">Related:</p>
                              <div className="flex flex-wrap gap-2">
                                {activity.relatedLinks.map((link, index) => (
                                  <Button key={index} variant="outline" size="sm" className="h-7 text-xs">
                                    {link.icon}
                                    {link.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="mt-4 relative">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activities match your filters. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-gray-200 ml-4">
              {filteredActivities.map((activity, index) => (
                <div key={activity.id} className="mb-6 relative">
                  <div
                    className={`absolute -left-[25px] p-1.5 rounded-full border-4 border-background ${
                      activity.category === "deployment"
                        ? "bg-blue-500"
                        : activity.category === "backup"
                          ? "bg-green-500"
                          : activity.category === "update"
                            ? "bg-purple-500"
                            : activity.category === "domain"
                              ? "bg-orange-500"
                              : activity.category === "environment"
                                ? "bg-indigo-500"
                                : activity.category === "user"
                                  ? "bg-red-500"
                                  : activity.category === "cache"
                                    ? "bg-cyan-500"
                                    : "bg-gray-500"
                    }`}
                  >
                    {getCategoryIcon(activity.category)}
                  </div>
                  <div className="ml-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">{activity.time}</span>
                        <Badge className={getCategoryColor(activity.category)}>
                          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                        </Badge>
                      </div>
                      <p className="font-medium">{activity.action}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px]">{activity.user.initials}</AvatarFallback>
                        </Avatar>
                        <span>{activity.user.name}</span>
                      </div>

                      {activity.details && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start px-0 text-xs mt-1 h-6"
                          onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                        >
                          {expandedActivity === activity.id ? "Hide details" : "View details"}
                        </Button>
                      )}

                      {expandedActivity === activity.id && activity.details && (
                        <div className="mt-2 text-sm bg-muted/50 p-2 rounded-md">
                          <p className="text-muted-foreground">{activity.details}</p>
                          {activity.relatedLinks && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {activity.relatedLinks.map((link, index) => (
                                <Button key={index} variant="outline" size="sm" className="h-6 text-xs">
                                  {link.icon}
                                  {link.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
