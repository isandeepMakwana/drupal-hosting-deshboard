"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeploymentsList } from "@/components/deployments-list"
import { NewDeploymentDialog } from "@/components/new-deployment-dialog"

export default function DeploymentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deployments, setDeployments] = useState([
    {
      id: "dep_12345",
      environment: "main-website-dev",
      branch: "feature/homepage",
      commit: "a1b2c3d",
      deployedBy: "Admin User",
      deployedAt: "6 hours ago",
      status: "Success",
    },
    {
      id: "dep_12344",
      environment: "admissions-staging",
      branch: "feature/application-form",
      commit: "e4f5g6h",
      deployedBy: "Jane Smith",
      deployedAt: "1 day ago",
      status: "Success",
    },
    {
      id: "dep_12343",
      environment: "main-website-prod",
      branch: "main",
      commit: "i7j8k9l",
      deployedBy: "Admin User",
      deployedAt: "2 days ago",
      status: "Success",
    },
    {
      id: "dep_12342",
      environment: "alumni-dev",
      branch: "feature/events",
      commit: "m1n2o3p",
      deployedBy: "John Doe",
      deployedAt: "3 days ago",
      status: "Failed",
    },
    {
      id: "dep_12341",
      environment: "admissions-prod",
      branch: "main",
      commit: "q4r5s6t",
      deployedBy: "Admin User",
      deployedAt: "5 days ago",
      status: "Success",
    },
  ])

  const handleNewDeployment = (deploymentData: any) => {
    // Generate a random ID
    const id = `dep_${Math.floor(Math.random() * 10000)}`

    // Add new deployment to the list
    const newDeployment = {
      id,
      environment: deploymentData.environment,
      branch: deploymentData.branch,
      commit: deploymentData.commit.substring(0, 7),
      deployedBy: "Admin User",
      deployedAt: "Just now",
      status: "In Progress",
    }

    setDeployments([newDeployment, ...deployments])

    // Simulate deployment completion after 3 seconds
    setTimeout(() => {
      setDeployments((prevDeployments) =>
        prevDeployments.map((dep) => (dep.id === id ? { ...dep, status: "Success" } : dep)),
      )
    }, 3000)
  }

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

      <NewDeploymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onDeploy={handleNewDeployment} />
    </DashboardShell>
  )
}
