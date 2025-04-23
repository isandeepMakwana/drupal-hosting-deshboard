"use client"

import { useState } from "react"
import { GitBranch, GitCommit } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface NewDeploymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeploy: (data: any) => void
}

export function NewDeploymentDialog({ open, onOpenChange, onDeploy }: NewDeploymentDialogProps) {
  const [environment, setEnvironment] = useState("")
  const [repository, setRepository] = useState("main-website")
  const [branch, setBranch] = useState("main")
  const [commit, setCommit] = useState("a1b2c3d4e5f6g7h8i9j0")
  const [deploymentType, setDeploymentType] = useState("standard")
  const [runDrush, setRunDrush] = useState(true)
  const [clearCache, setClearCache] = useState(true)
  const [backupBeforeDeploy, setBackupBeforeDeploy] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleDeploy = () => {
    if (!environment) {
      toast({
        title: "Missing information",
        description: "Please select a target environment",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Pass deployment data to parent component
      onDeploy({
        environment,
        repository,
        branch,
        commit,
        deploymentType,
        runDrush,
        clearCache,
        backupBeforeDeploy,
      })

      // Show success message
      toast({
        title: "Deployment initiated",
        description: `Deploying ${branch} to ${environment}`,
      })

      // Close dialog
      onOpenChange(false)

      // Reset form
      setEnvironment("")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>New Deployment</DialogTitle>
          <DialogDescription>Deploy code from your Git repository to a Drupal environment.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="repository" className="text-right">
              Repository
            </Label>
            <Select value={repository} onValueChange={setRepository}>
              <SelectTrigger id="repository" className="col-span-3">
                <SelectValue placeholder="Select repository" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-website">main-website</SelectItem>
                <SelectItem value="admissions">admissions</SelectItem>
                <SelectItem value="alumni">alumni</SelectItem>
                <SelectItem value="events">events</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="environment" className="text-right">
              Target Environment
            </Label>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger id="environment" className="col-span-3">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-website-dev">Development (main-website)</SelectItem>
                <SelectItem value="main-website-staging">Staging (main-website)</SelectItem>
                <SelectItem value="main-website-prod">Production (main-website)</SelectItem>
                <SelectItem value="admissions-dev">Development (admissions)</SelectItem>
                <SelectItem value="admissions-staging">Staging (admissions)</SelectItem>
                <SelectItem value="alumni-dev">Development (alumni)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branch" className="text-right">
              Branch
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger id="branch" className="flex-1">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="develop">develop</SelectItem>
                  <SelectItem value="feature/homepage">feature/homepage</SelectItem>
                  <SelectItem value="feature/events">feature/events</SelectItem>
                  <SelectItem value="hotfix/security-patch">hotfix/security-patch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="commit" className="text-right">
              Commit
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-muted-foreground" />
              <Input
                id="commit"
                value={commit}
                onChange={(e) => setCommit(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4 pt-2">
            <Label className="text-right pt-2">Deployment Type</Label>
            <RadioGroup value={deploymentType} onValueChange={setDeploymentType} className="col-span-3 space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal">
                  Standard Deployment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blue-green" id="blue-green" />
                <Label htmlFor="blue-green" className="font-normal">
                  Blue-Green Deployment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="canary" id="canary" />
                <Label htmlFor="canary" className="font-normal">
                  Canary Deployment (10% traffic)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-4 items-start gap-4 pt-2">
            <Label className="text-right pt-2">Options</Label>
            <div className="col-span-3 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="backup" checked={backupBeforeDeploy} onCheckedChange={setBackupBeforeDeploy} />
                <Label htmlFor="backup" className="font-normal">
                  Create backup before deployment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="drush" checked={runDrush} onCheckedChange={setRunDrush} />
                <Label htmlFor="drush" className="font-normal">
                  Run database updates (drush updb)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cache" checked={clearCache} onCheckedChange={setClearCache} />
                <Label htmlFor="cache" className="font-normal">
                  Clear cache after deployment
                </Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeploy} disabled={isLoading}>
            {isLoading ? "Deploying..." : "Deploy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
