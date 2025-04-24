"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UpdatesList } from "@/components/updates-list"
import { useDashboard } from "@/contexts/dashboard-context"

export default function UpdatesPage() {
  const { updates, checkForUpdates, applyUpdate, scheduleUpdate } = useDashboard()

  // Count updates by status
  const availableUpdates = updates.filter((u) => u.status === "available").length
  const securityUpdates = updates.filter((u) => u.security && u.status === "available").length
  const scheduledUpdates = updates.filter((u) => u.status === "scheduled").length
  const completedUpdates = updates.filter((u) => u.status === "completed").length

  return (
    <DashboardShell>
      <DashboardHeader heading="Drupal Updates" description="Manage Drupal core and module updates for your sites.">
        <Button onClick={checkForUpdates}>Check for Updates</Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableUpdates}</div>
            <p className="text-xs text-muted-foreground">{securityUpdates} security updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Up-to-date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9/12</div>
            <p className="text-xs text-muted-foreground">75% of sites current</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days ago</div>
            <p className="text-xs text-muted-foreground">main-website-prod (core update)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledUpdates}</div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow, 2:00 AM</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Available Updates</CardTitle>
          <CardDescription>Review and apply updates to your Drupal sites</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdatesList updates={updates} onUpdateNow={applyUpdate} onScheduleUpdate={scheduleUpdate} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
