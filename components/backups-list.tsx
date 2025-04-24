"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, MoreHorizontal, RefreshCw, Trash, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import type { Backup } from "@/contexts/dashboard-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useDashboard } from "@/contexts/dashboard-context"
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

interface BackupsListProps {
  backups: Backup[]
}

export function BackupsList({ backups }: BackupsListProps) {
  const { toast } = useToast()
  const { createBackup } = useDashboard()
  const [restoring, setRestoring] = useState<string | null>(null)
  const [backupToDelete, setBackupToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleRestore = (backupId: string, environment: string) => {
    setRestoring(backupId)

    toast({
      title: "Restore initiated",
      description: `Restoring ${environment} from backup ${backupId}...`,
    })

    // Simulate restore process
    setTimeout(() => {
      toast({
        title: "Restore completed",
        description: `Successfully restored ${environment} from backup`,
      })
      setRestoring(null)
    }, 2000)
  }

  const handleDownload = (backupId: string) => {
    toast({
      title: "Download started",
      description: `Downloading backup ${backupId}...`,
    })

    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Download completed",
        description: `Backup ${backupId} has been downloaded`,
      })
    }, 1500)
  }

  const handleDeleteClick = (backupId: string) => {
    setBackupToDelete(backupId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!backupToDelete) return

    toast({
      title: "Backup deleted",
      description: `Backup ${backupToDelete} has been permanently deleted`,
    })

    setIsDeleteDialogOpen(false)
    setBackupToDelete(null)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
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
      case "Completed":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
      case "In Progress":
        return <Clock className="h-4 w-4 mr-1 text-blue-600 animate-spin" />
      case "Failed":
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
      default:
        return null
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Backup ID</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {backups.map((backup) => (
            <TableRow key={backup.id}>
              <TableCell className="font-medium">{backup.id}</TableCell>
              <TableCell>{backup.environment}</TableCell>
              <TableCell>{backup.type}</TableCell>
              <TableCell>{backup.size}</TableCell>
              <TableCell>{backup.created}</TableCell>
              <TableCell>
                <Badge
                  variant={backup.status === "Completed" ? "default" : "secondary"}
                  className={getStatusBadgeClass(backup.status)}
                >
                  {getStatusIcon(backup.status)}
                  {backup.status}
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
                    <DropdownMenuItem onClick={() => handleDownload(backup.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRestore(backup.id, backup.environment)}
                      disabled={backup.status !== "Completed" || restoring === backup.id}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {restoring === backup.id ? "Restoring..." : "Restore"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(backup.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Backup
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this backup?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the backup and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
