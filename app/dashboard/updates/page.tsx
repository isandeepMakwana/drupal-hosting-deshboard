"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UpdatesList } from "@/components/updates-list"
import { useToast } from "@/hooks/use-toast"

export default function UpdatesPage() {
  const { toast } = useToast()
  const [isChecking, setIsChecking] = useState(false)
  const [updates, setUpdates] = useState([
    {
      id: "1",
      name: "Drupal Core",
      type: "Core",
      currentVersion: "10.1.0",
      newVersion: "10.1.2",
      affectedSites: "3",
      security: true,
      status: "available",
    },
    {
      id: "2",
      name: "Pathauto",
      type: "Module",
      currentVersion: "1.10.0",
      newVersion: "1.11.0",
      affectedSites: "5",
      security: false,
      status: "available",
    },
    {
      id: "3",
      name: "Views",
      type: "Module",
      currentVersion: "2.0.0",
      newVersion: "2.0.1",
      affectedSites: "8",
      security: true,
      status: "available",
    },
    {
      id: "4",
      name: "Media Library",
      type: "Module",
      currentVersion: "1.5.0",
      newVersion: "1.6.0",
      affectedSites: "4",
      security: false,
      status: "available",
    },
    {
      id: "5",
      name: "Webform",
      type: "Module",
      currentVersion: "6.1.3",
      newVersion: "6.1.4",
      affectedSites: "6",
      security: true,
      status: "available",
    },
  ])

  const handleCheckForUpdates = () => {
    setIsChecking(true)

    toast({
      title: "Checking for updates",
      description: "Scanning all environments for available updates...",
    })

    // Simulate API call
    setTimeout(() => {
      setIsChecking(false)

      // Add a new update to the list
      const newUpdate = {
        id: "6",
        name: "Token",
        type: "Module",
        currentVersion: "1.9.0",
        newVersion: "1.10.0",
        affectedSites: "4",
        security: false,
        status: "available",
      }

      setUpdates([...updates, newUpdate])

      toast({
        title: "Update check complete",
        description: "Found 1 new update available",
      })
    }, 2000)
  }

  const handleUpdateNow = (updateId: string) => {
    // Mark update as in progress
    setUpdates(updates.map((update) => (update.id === updateId ? { ...update, status: "in-progress" } : update)))

    toast({
      title: "Update started",
      description: `Updating ${updates.find((u) => u.id === updateId)?.name}...`,
    })

    // Simulate update completion
    setTimeout(() => {
      setUpdates(
        updates.map((update) =>
          update.id === updateId
            ? {
                ...update,
                status: "completed",
                currentVersion: update.newVersion,
              }
            : update,
        ),
      )

      toast({
        title: "Update complete",
        description: `${updates.find((u) => u.id === updateId)?.name} has been updated successfully`,
      })
    }, 3000)
  }

  const handleScheduleUpdate = (updateId: string) => {
    // Mark update as scheduled
    setUpdates(updates.map((update) => (update.id === updateId ? { ...update, status: "scheduled" } : update)))

    toast({
      title: "Update scheduled",
      description: `${updates.find((u) => u.id === updateId)?.name} will be updated during the next maintenance window`,
    })
  }

  // Count updates by status
  const availableUpdates = updates.filter((u) => u.status === "available").length
  const securityUpdates = updates.filter((u) => u.security && u.status === "available").length
  const scheduledUpdates = updates.filter((u) => u.status === "scheduled").length
  const completedUpdates = updates.filter((u) => u.status === "completed").length

  return (
    <DashboardShell>
      <DashboardHeader heading="Drupal Updates" description="Manage Drupal core and module updates for your sites.">
        <Button onClick={handleCheckForUpdates} disabled={isChecking}>
          {isChecking ? "Checking..." : "Check for Updates"}
        </Button>
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
          <UpdatesList updates={updates} onUpdateNow={handleUpdateNow} onScheduleUpdate={handleScheduleUpdate} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
