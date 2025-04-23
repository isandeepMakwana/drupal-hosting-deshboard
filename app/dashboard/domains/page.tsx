"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DomainsList } from "@/components/domains-list"
import { AddDomainDialog } from "@/components/add-domain-dialog"

export default function DomainsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [domains, setDomains] = useState([
    {
      name: "www.fredonia.edu",
      environment: "main-website-prod",
      sslStatus: "Valid",
      sslExpiry: "11 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "admissions.fredonia.edu",
      environment: "admissions-prod",
      sslStatus: "Valid",
      sslExpiry: "9 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "alumni.fredonia.edu",
      environment: "alumni-prod",
      sslStatus: "Expiring Soon",
      sslExpiry: "1 month",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "events.fredonia.edu",
      environment: "events-prod",
      sslStatus: "Expiring Soon",
      sslExpiry: "1 month",
      dns: "Verified",
      created: "6 months ago",
    },
    {
      name: "staging.fredonia.edu",
      environment: "main-website-staging",
      sslStatus: "Valid",
      sslExpiry: "10 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "dev.fredonia.edu",
      environment: "main-website-dev",
      sslStatus: "Valid",
      sslExpiry: "10 months",
      dns: "Verified",
      created: "1 year ago",
    },
  ])

  const handleAddDomain = (domainData: any) => {
    // Add new domain to the list
    const newDomain = {
      name: domainData.domainName,
      environment: domainData.environment,
      sslStatus: "Pending",
      sslExpiry: "Not issued",
      dns: "Pending",
      created: "Just now",
    }

    setDomains([...domains, newDomain])

    // Simulate DNS verification after 2 seconds
    setTimeout(() => {
      setDomains((prevDomains) =>
        prevDomains.map((domain) => (domain.name === domainData.domainName ? { ...domain, dns: "Verified" } : domain)),
      )

      // Simulate SSL issuance after 4 seconds
      setTimeout(() => {
        setDomains((prevDomains) =>
          prevDomains.map((domain) =>
            domain.name === domainData.domainName
              ? {
                  ...domain,
                  sslStatus: "Valid",
                  sslExpiry: "12 months",
                }
              : domain,
          ),
        )
      }, 2000)
    }, 2000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="SSL & Domains" description="Manage domains, SSL certificates, and DNS settings.">
        <Button onClick={() => setIsDialogOpen(true)}>Add Domain</Button>
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
            <CardTitle className="text-sm font-medium">SSL Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {domains.filter((d) => d.sslStatus === "Valid").length}/{domains.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((domains.filter((d) => d.sslStatus === "Valid").length / domains.length) * 100)}% domains
              secured
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.filter((d) => d.sslStatus === "Expiring Soon").length}</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DNS Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.length * 4}</div>
            <p className="text-xs text-muted-foreground">Across all domains</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Domain Management</CardTitle>
          <CardDescription>Manage your domains and SSL certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <DomainsList domains={domains} />
        </CardContent>
      </Card>

      <AddDomainDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAdd={handleAddDomain} />
    </DashboardShell>
  )
}
