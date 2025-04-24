"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DomainsList } from "@/components/domains-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboard } from "@/contexts/dashboard-context"
import { AddDomainDialog } from "@/components/add-domain-dialog"

export default function DomainsPage() {
  const { domains, environments } = useDashboard()
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("all")

  // Filter domains by environment
  const filteredDomains =
    selectedEnvironment === "all" ? domains : domains.filter((domain) => domain.environment === selectedEnvironment)

  // Count domains by SSL status
  const validSSLCount = domains.filter((domain) => domain.sslStatus === "Valid").length
  const expiringSSLCount = domains.filter((domain) => domain.sslStatus === "Expiring Soon").length
  const invalidSSLCount = domains.filter(
    (domain) => domain.sslStatus === "Invalid" || domain.sslStatus === "Expired",
  ).length

  return (
    <DashboardShell>
      <DashboardHeader heading="SSL & Domains" description="Manage your domain names and SSL certificates.">
        <AddDomainDialog />
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.length}</div>
            <p className="text-xs text-muted-foreground">Across all environments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid SSL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validSSLCount}</div>
            <p className="text-xs text-muted-foreground">Secure certificates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringSSLCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invalid SSL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invalidSSLCount}</div>
            <p className="text-xs text-muted-foreground">Need immediate action</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all" className="space-y-4 mt-4" onValueChange={setSelectedEnvironment}>
        <TabsList>
          <TabsTrigger value="all">All Environments</TabsTrigger>
          {environments.map((env) => (
            <TabsTrigger key={env.name} value={env.name}>
              {env.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedEnvironment} className="space-y-4">
          <DomainsList domains={filteredDomains} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
