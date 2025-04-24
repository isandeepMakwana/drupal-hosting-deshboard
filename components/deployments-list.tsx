"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  GitBranch,
  MoreHorizontal,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Copy,
  Database,
} from "lucide-react"
import type { Deployment } from "@/contexts/dashboard-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboard } from "@/contexts/dashboard-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface DeploymentsListProps {
  deployments: Deployment[]
}

export function DeploymentsList({ deployments }: DeploymentsListProps) {
  const { createBackup } = useDashboard()
  const { toast } = useToast()
  const [rollingBack, setRollingBack] = useState<string | null>(null)

  const handleRollback = (deploymentId: string, environment: string) => {
    setRollingBack(deploymentId)

    toast({
      title: "Rollback initiated",
      description: `Rolling back deployment ${deploymentId}...`,
    })

    // Simulate rollback process
    setTimeout(() => {
      toast({
        title: "Rollback completed",
        description: `Successfully rolled back deployment ${deploymentId}`,
      })
      setRollingBack(null)
    }, 2000)
  }

  const handleBackupBeforeRollback = (environment: string) => {
    createBackup({
      environment,
      type: "Pre-rollback",
    })
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Failed":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
      case "In Progress":
        return <GitBranch className="h-4 w-4 mr-1 text-blue-600" />
      case "Failed":
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment ID</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Commit</TableHead>
          <TableHead>Deployed By</TableHead>
          <TableHead>Deployed At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell className="font-medium">{deployment.id}</TableCell>
            <TableCell>{deployment.environment}</TableCell>
            <TableCell className="flex items-center gap-1">
              <GitBranch className="h-4 w-4" />
              {deployment.branch}
            </TableCell>
            <TableCell className="font-mono text-xs">{deployment.commit}</TableCell>
            <TableCell>{deployment.deployedBy}</TableCell>
            <TableCell>{deployment.deployedAt}</TableCell>
            <TableCell>
              <Badge
                variant={
                  deployment.status === "Success"
                    ? "default"
                    : deployment.status === "In Progress"
                      ? "secondary"
                      : "destructive"
                }
                className={getStatusBadgeClass(deployment.status)}
              >
                {getStatusIcon(deployment.status)}
                {deployment.status}
              </Badge>
            </TableCell>
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
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Commit ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBackupBeforeRollback(deployment.environment)}>
                    <Database className="mr-2 h-4 w-4" />
                    Backup Before Rollback
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRollback(deployment.id, deployment.environment)}
                    disabled={deployment.status === "In Progress" || rollingBack === deployment.id}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {rollingBack === deployment.id ? "Rolling Back..." : "Rollback"}
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
