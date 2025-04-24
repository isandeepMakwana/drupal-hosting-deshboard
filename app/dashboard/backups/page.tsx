"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BackupsList } from "@/components/backups-list"
import { useDashboard } from "@/contexts/dashboard-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function BackupsPage() {
  const { backups, environments, createBackup } = useDashboard()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState("")
  const [backupType, setBackupType] = useState("Manual")
  const [includeDatabase, setIncludeDatabase] = useState(true)
  const [includeFiles, setIncludeFiles] = useState(true)
  const [includeConfig, setIncludeConfig] = useState(true)

  const handleCreateBackup = () => {
    if (!selectedEnvironment) return

    createBackup({
      environment: selectedEnvironment,
      type: backupType,
      options: {
        includeDatabase,
        includeFiles,
        includeConfig,
      },
    })

    setIsCreateDialogOpen(false)
    // Reset form
    setSelectedEnvironment("")
    setBackupType("Manual")
    setIncludeDatabase(true)
    setIncludeFiles(true)
    setIncludeConfig(true)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Backups & Restores"
        description="Manage backups and restore points for your Drupal sites."
      >
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create Backup</Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backups.length}</div>
            <p className="text-xs text-muted-foreground">
              Using {Math.round(backups.reduce((acc, backup) => acc + Number.parseFloat(backup.size), 0))} GB storage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backups[0]?.created || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {backups[0]?.environment} ({backups[0]?.type})
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 hours</div>
            <p className="text-xs text-muted-foreground">alumni-prod (scheduled)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>View and manage your backup history</CardDescription>
        </CardHeader>
        <CardContent>
          <BackupsList backups={backups} />
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Backup</DialogTitle>
            <DialogDescription>Configure backup options for your Drupal environment.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="environment" className="text-right">
                Environment
              </Label>
              <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((env) => (
                    <SelectItem key={env.name} value={env.name}>
                      {env.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Backup Type
              </Label>
              <Select value={backupType} onValueChange={setBackupType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select backup type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Pre-deployment">Pre-deployment</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Full">Full System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Include</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-database"
                    checked={includeDatabase}
                    onCheckedChange={(checked) => setIncludeDatabase(!!checked)}
                  />
                  <Label htmlFor="include-database">Database</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-files"
                    checked={includeFiles}
                    onCheckedChange={(checked) => setIncludeFiles(!!checked)}
                  />
                  <Label htmlFor="include-files">Files</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-config"
                    checked={includeConfig}
                    onCheckedChange={(checked) => setIncludeConfig(!!checked)}
                  />
                  <Label htmlFor="include-config">Configuration</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBackup} disabled={!selectedEnvironment}>
              Create Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
