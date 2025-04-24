"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, GitBranch, Database, RefreshCw, ExternalLink } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export function SitesList() {
  const { environments, createDeployment, createBackup } = useDashboard()

  // Convert environments to site format for display
  const sites = environments.map((env) => ({
    id: env.name,
    name: env.name.split("-")[0],
    environment: env.type.charAt(0).toUpperCase() + env.type.slice(1),
    status: env.status === "healthy" ? "Online" : env.status === "warning" ? "Warning" : "Offline",
    drupalVersion: env.drupalVersion,
    lastUpdated: env.lastDeployed,
    url: env.url,
  }))

  const handleDeploy = (siteName: string, environment: string) => {
    const envName = `${siteName}-${environment.toLowerCase()}`
    createDeployment({
      environment: envName,
      branch: "main",
      commit: "a1b2c3d4e5f6g7h8i9j0",
    })
  }

  const handleBackup = (siteName: string, environment: string) => {
    const envName = `${siteName}-${environment.toLowerCase()}`
    createBackup({
      environment: envName,
      type: "Manual",
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Site Name</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Drupal Version</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell className="font-medium">{site.name}</TableCell>
            <TableCell>{site.environment}</TableCell>
            <TableCell>
              <Badge
                variant={site.status === "Online" ? "default" : site.status === "Warning" ? "secondary" : "destructive"}
                className={
                  site.status === "Online"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : site.status === "Warning"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {site.status}
              </Badge>
            </TableCell>
            <TableCell>{site.drupalVersion}</TableCell>
            <TableCell>{site.lastUpdated}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => window.open(site.url, "_blank")}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDeploy(site.name, site.environment)}>
                    <GitBranch className="mr-2 h-4 w-4" />
                    Deploy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBackup(site.name, site.environment)}>
                    <Database className="mr-2 h-4 w-4" />
                    Backup
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
