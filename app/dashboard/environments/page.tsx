"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EnvironmentCard } from "@/components/environment-card"
import { CreateEnvironmentDialog } from "@/components/create-environment-dialog"
import { useDashboard } from "@/contexts/dashboard-context"

export default function EnvironmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { environments, createEnvironment, deleteEnvironment } = useDashboard()

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
                onDelete={() => deleteEnvironment(env.name)}
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
                onDelete={() => deleteEnvironment(env.name)}
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
                onDelete={() => deleteEnvironment(env.name)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateEnvironmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateEnvironment={createEnvironment}
      />
    </DashboardShell>
  )
}
