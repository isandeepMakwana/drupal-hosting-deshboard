"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeploymentsList } from "@/components/deployments-list"
import { NewDeploymentDialog } from "@/components/new-deployment-dialog"
import { useDashboard } from "@/contexts/dashboard-context"

export default function DeploymentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deployments, createDeployment } = useDashboard()

  return (
    <DashboardShell>
      <DashboardHeader heading="Git Deployments" description="Manage Git-based deployments for your Drupal sites.">
        <Button onClick={() => setIsDialogOpen(true)}>New Deployment</Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.length}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((deployments.filter((d) => d.status === "Success").length / deployments.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter((d) => d.status !== "Success").length} failed deployments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments[0]?.deployedAt || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {deployments[0]?.environment} ({deployments[0]?.branch})
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(deployments.map((d) => d.branch)).size}</div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(deployments.map((d) => d.environment.split("-")[0])).size} repositories
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>View and manage your deployment history</CardDescription>
        </CardHeader>
        <CardContent>
          <DeploymentsList deployments={deployments} />
        </CardContent>
      </Card>

      <NewDeploymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onDeploy={createDeployment} />
    </DashboardShell>
  )
}
