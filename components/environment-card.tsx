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
import { GitBranch, MoreHorizontal, RefreshCw, Server, Trash } from "lucide-react"

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

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Restart Environment</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clone Environment</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteAlert(true)} className="text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                Delete Environment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status === "healthy" ? "default" : status === "warning" ? "secondary" : "destructive"}>
            {status}
          </Badge>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">URL:</span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {url}
            </a>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Drupal Version:</span>
            <span>{drupalVersion}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Deployed:</span>
            <span>{lastDeployed}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Server className="mr-2 h-4 w-4" />
          SSH
        </Button>
        <Button variant="outline" size="sm">
          <GitBranch className="mr-2 h-4 w-4" />
          Deploy
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Restart
        </Button>
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
