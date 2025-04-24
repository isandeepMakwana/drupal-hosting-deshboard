"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentActivity } from "@/components/recent-activity"
import { SitesList } from "@/components/sites-list"
import { useDashboard } from "@/contexts/dashboard-context"
import { SitePerformanceGraph } from "@/components/site-performance-graph"
import { EnvironmentSpecs } from "@/components/environment-specs"

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)
  const { environments, activityLogs, backups } = useDashboard()

  // Use this to ensure we only render client-specific code after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Dashboard" description="Loading dashboard data..." />
        <div className="h-[400px] flex items-center justify-center">
          <p>Loading dashboard...</p>
        </div>
      </DashboardShell>
    )
  }

  // Count environments by type
  const productionCount = environments.filter((env) => env.type === "production").length
  const stagingCount = environments.filter((env) => env.type === "staging").length
  const developmentCount = environments.filter((env) => env.type === "development").length

  // Count healthy environments
  const healthyCount = environments.filter((env) => env.status === "healthy").length

  // Get total backups count
  const totalBackups = backups.length

  // Get most recent backup time
  const mostRecentBackup = backups.length > 0 ? backups[0].created : "N/A"

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" description="Overview of your Drupal hosting environments and sites." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{environments.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{environments.length}</div>
            <p className="text-xs text-muted-foreground">
              {productionCount} production, {stagingCount} staging, {developmentCount} development
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBackups}</div>
            <p className="text-xs text-muted-foreground">Last successful: {mostRecentBackup}</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4 mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Site Performance</CardTitle>
                <CardDescription>Average response time across all production sites (ms)</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SitePerformanceGraph />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Environment Status</CardTitle>
                <CardDescription>Current status of your environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {environments.slice(0, 6).map((env) => (
                    <div key={env.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            env.status === "healthy"
                              ? "bg-green-500"
                              : env.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">{env.name}</p>
                          <p className="text-xs text-muted-foreground">{env.url}</p>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          env.status === "healthy"
                            ? "bg-green-100 text-green-800"
                            : env.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Sites</CardTitle>
              <CardDescription>Manage all your Drupal sites</CardDescription>
            </CardHeader>
            <CardContent>
              <SitesList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity activities={activityLogs} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="space-y-4">
          <EnvironmentSpecs />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
