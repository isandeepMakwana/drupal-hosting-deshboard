"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EnvironmentCard } from "@/components/environment-card"
import { CreateEnvironmentDialog } from "@/components/create-environment-dialog"
import { useToast } from "@/hooks/use-toast"

export default function EnvironmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const [environments, setEnvironments] = useState([
    {
      name: "main-website-prod",
      status: "healthy",
      type: "production",
      url: "https://www.fredonia.edu",
      lastDeployed: "2 days ago",
      drupalVersion: "10.1.2",
    },
    {
      name: "admissions-prod",
      status: "healthy",
      type: "production",
      url: "https://admissions.fredonia.edu",
      lastDeployed: "5 days ago",
      drupalVersion: "10.1.0",
    },
    {
      name: "alumni-prod",
      status: "warning",
      type: "production",
      url: "https://alumni.fredonia.edu",
      lastDeployed: "14 days ago",
      drupalVersion: "10.0.9",
    },
    {
      name: "main-website-staging",
      status: "healthy",
      type: "staging",
      url: "https://staging.fredonia.edu",
      lastDeployed: "1 day ago",
      drupalVersion: "10.1.2",
    },
    {
      name: "admissions-staging",
      status: "healthy",
      type: "staging",
      url: "https://admissions-staging.fredonia.edu",
      lastDeployed: "3 days ago",
      drupalVersion: "10.1.0",
    },
    {
      name: "alumni-staging",
      status: "error",
      type: "staging",
      url: "https://alumni-staging.fredonia.edu",
      lastDeployed: "2 days ago",
      drupalVersion: "10.1.2",
    },
    {
      name: "main-website-dev",
      status: "healthy",
      type: "development",
      url: "https://dev.fredonia.edu",
      lastDeployed: "12 hours ago",
      drupalVersion: "10.1.2",
    },
    {
      name: "admissions-dev",
      status: "healthy",
      type: "development",
      url: "https://admissions-dev.fredonia.edu",
      lastDeployed: "1 day ago",
      drupalVersion: "10.1.0",
    },
    {
      name: "alumni-dev",
      status: "healthy",
      type: "development",
      url: "https://alumni-dev.fredonia.edu",
      lastDeployed: "6 hours ago",
      drupalVersion: "10.1.2",
    },
  ])

  const handleCreateEnvironment = (environmentData: any) => {
    // Create a new environment
    const newEnvironment = {
      name: `${environmentData.site}-${environmentData.type}`,
      status: "initializing",
      type: environmentData.type,
      url: `https://${environmentData.site}-${environmentData.type}.fredonia.edu`,
      lastDeployed: "Just now",
      drupalVersion: environmentData.drupalVersion,
    }

    setEnvironments([...environments, newEnvironment])

    // Simulate environment initialization
    toast({
      title: "Environment creation started",
      description: `Creating ${newEnvironment.name}...`,
    })

    // Update status after 3 seconds
    setTimeout(() => {
      setEnvironments((prevEnvironments) =>
        prevEnvironments.map((env) => (env.name === newEnvironment.name ? { ...env, status: "healthy" } : env)),
      )

      toast({
        title: "Environment created",
        description: `${newEnvironment.name} is now ready`,
      })
    }, 3000)
  }

  const handleDeleteEnvironment = (name: string) => {
    // Show confirmation toast
    toast({
      title: "Deleting environment",
      description: `Deleting ${name}...`,
    })

    // Remove environment after 2 seconds
    setTimeout(() => {
      setEnvironments(environments.filter((env) => env.name !== name))

      toast({
        title: "Environment deleted",
        description: `${name} has been deleted`,
      })
    }, 2000)
  }

  // Filter environments by type
  const productionEnvironments = environments.filter((env) => env.type === "production")
  const stagingEnvironments = environments.filter((env) => env.type === "staging")
  const developmentEnvironments = environments.filter((env) => env.type === "development")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Environments"
        description="Manage your development, staging, and production environments."
      >
        <Button onClick={() => setIsDialogOpen(true)}>Create Environment</Button>
      </DashboardHeader>
      <Tabs defaultValue="production" className="space-y-4">
        <TabsList>
          <TabsTrigger value="production">Production ({productionEnvironments.length})</TabsTrigger>
          <TabsTrigger value="staging">Staging ({stagingEnvironments.length})</TabsTrigger>
          <TabsTrigger value="development">Development ({developmentEnvironments.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="production" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productionEnvironments.map((env) => (
              <EnvironmentCard
                key={env.name}
                name={env.name}
                status={env.status}
                type={env.type}
                url={env.url}
                lastDeployed={env.lastDeployed}
                drupalVersion={env.drupalVersion}
                onDelete={() => handleDeleteEnvironment(env.name)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="staging" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stagingEnvironments.map((env) => (
              <EnvironmentCard
                key={env.name}
                name={env.name}
                status={env.status}
                type={env.type}
                url={env.url}
                lastDeployed={env.lastDeployed}
                drupalVersion={env.drupalVersion}
                onDelete={() => handleDeleteEnvironment(env.name)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="development" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {developmentEnvironments.map((env) => (
              <EnvironmentCard
                key={env.name}
                name={env.name}
                status={env.status}
                type={env.type}
                url={env.url}
                lastDeployed={env.lastDeployed}
                drupalVersion={env.drupalVersion}
                onDelete={() => handleDeleteEnvironment(env.name)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateEnvironmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateEnvironment={handleCreateEnvironment}
      />
    </DashboardShell>
  )
}
