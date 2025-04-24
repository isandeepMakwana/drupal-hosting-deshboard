"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { GitBranch, MoreHorizontal, RefreshCw, Server, Trash, ExternalLink, Database } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"
import { Progress } from "@/components/ui/progress"

interface EnvironmentCardProps {
  name: string
  status: string
  type: string
  url: string
  lastDeployed: string
  drupalVersion: string
  onDelete: () => void
}

export function EnvironmentCard({
  name,
  status,
  type,
  url,
  lastDeployed,
  drupalVersion,
  onDelete,
}: EnvironmentCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const { createDeployment, createBackup } = useDashboard()
  const [isRestarting, setIsRestarting] = useState(false)
  const [restartProgress, setRestartProgress] = useState(0)

  const handleDeploy = () => {
    createDeployment({
      environment: name,
      branch: "main",
      commit: "a1b2c3d4e5f6g7h8i9j0",
    })
  }

  const handleBackup = () => {
    createBackup({
      environment: name,
      type: "Manual",
    })
  }

  const handleRestart = () => {
    setIsRestarting(true)
    setRestartProgress(0)

    // Simulate restart progress
    const interval = setInterval(() => {
      setRestartProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsRestarting(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
      case "initializing":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "error":
      case "initializing":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return ""
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "production":
        return "bg-blue-100 text-blue-800"
      case "staging":
        return "bg-purple-100 text-purple-800"
      case "development":
        return "bg-gray-100 text-gray-800"
      default:
        return ""
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2 bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg truncate max-w-[80%]">{name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => window.open(url, "_blank")}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Site
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Server className="mr-2 h-4 w-4" />
                SSH Access
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDeploy}>
                <GitBranch className="mr-2 h-4 w-4" />
                Deploy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBackup}>
                <Database className="mr-2 h-4 w-4" />
                Create Backup
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRestart} disabled={isRestarting}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {isRestarting ? "Restarting..." : "Restart"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clone Environment</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteAlert(true)} className="text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                Delete Environment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Badge variant="default" className={getStatusBadgeVariant(status)}>
            <div className={`h-2 w-2 rounded-full mr-1 ${getStatusColor(status)}`} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <Badge variant="outline" className={getTypeColor(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="space-y-3">
          <div className="flex items-start sm:items-center justify-between text-sm">
            <span className="text-muted-foreground whitespace-nowrap mr-2">URL:</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate max-w-[70%] text-right"
              title={url}
            >
              {url}
            </a>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Drupal Version:</span>
            <span className="font-medium">{drupalVersion}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Deployed:</span>
            <span>{lastDeployed}</span>
          </div>

          {isRestarting && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Restarting environment...</span>
                <span>{restartProgress}%</span>
              </div>
              <Progress value={restartProgress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 bg-gray-50 border-t mt-auto p-2">
        <div className="grid grid-cols-3 gap-1 w-full">
          <Button variant="outline" size="sm" onClick={() => window.open(url, "_blank")} className="h-8 px-2">
            <ExternalLink className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Visit</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDeploy} className="h-8 px-2">
            <GitBranch className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Deploy</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleBackup} className="h-8 px-2">
            <Database className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Backup</span>
          </Button>
        </div>
      </CardFooter>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the environment <strong>{name}</strong> and all its data. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
