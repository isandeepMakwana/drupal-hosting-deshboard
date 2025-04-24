"use client"

import { useState } from "react"

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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface CreateEnvironmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateEnvironment: (data: any) => void
}

export function CreateEnvironmentDialog({ open, onOpenChange, onCreateEnvironment }: CreateEnvironmentDialogProps) {
  const [site, setSite] = useState("")
  const [type, setType] = useState("")
  const [drupalVersion, setDrupalVersion] = useState("10.1.2")
  const [creationMethod, setCreationMethod] = useState("blank")
  const [sourceEnvironment, setSourceEnvironment] = useState("")
  const [includeContent, setIncludeContent] = useState(true)
  const [includeFiles, setIncludeFiles] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleCreate = () => {
    if (!site || !type) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Pass environment data to parent component
      onCreateEnvironment({
        site,
        type,
        drupalVersion,
        creationMethod,
        sourceEnvironment,
        includeContent,
        includeFiles,
      })

      // Close dialog
      onOpenChange(false)

      // Reset form
      setSite("")
      setType("")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Environment</DialogTitle>
          <DialogDescription>
            Create a new Drupal environment for development, staging, or production.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="site" className="text-right">
              Site
            </Label>
            <Select value={site} onValueChange={setSite}>
              <SelectTrigger id="site" className="col-span-3">
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-website">Main Website</SelectItem>
                <SelectItem value="admissions">Admissions</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="library">Library</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Environment Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type" className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="drupal-version" className="text-right">
              Drupal Version
            </Label>
            <Select value={drupalVersion} onValueChange={setDrupalVersion}>
              <SelectTrigger id="drupal-version" className="col-span-3">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="11.0.0">Drupal 11.0.0 (Latest)</SelectItem>
                <SelectItem value="10.2.0">Drupal 10.2.0</SelectItem>
                <SelectItem value="10.1.2">Drupal 10.1.2</SelectItem>
                <SelectItem value="10.1.0">Drupal 10.1.0</SelectItem>
                <SelectItem value="10.0.9">Drupal 10.0.9</SelectItem>
                <SelectItem value="9.5.11">Drupal 9.5.11</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4 pt-2">
            <Label className="text-right pt-2">Creation Method</Label>
            <RadioGroup value={creationMethod} onValueChange={setCreationMethod} className="col-span-3 space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blank" id="blank" />
                <Label htmlFor="blank" className="font-normal">
                  Blank Environment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clone" id="clone" />
                <Label htmlFor="clone" className="font-normal">
                  Clone from Existing Environment
                </Label>
              </div>
            </RadioGroup>
          </div>

          {creationMethod === "clone" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">
                  Source Environment
                </Label>
                <Select value={sourceEnvironment} onValueChange={setSourceEnvironment}>
                  <SelectTrigger id="source" className="col-span-3">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-website-prod">main-website-prod</SelectItem>
                    <SelectItem value="main-website-staging">main-website-staging</SelectItem>
                    <SelectItem value="admissions-prod">admissions-prod</SelectItem>
                    <SelectItem value="alumni-prod">alumni-prod</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Clone Options</Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="content" checked={includeContent} onCheckedChange={setIncludeContent} />
                    <Label htmlFor="content" className="font-normal">
                      Include database content
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="files" checked={includeFiles} onCheckedChange={setIncludeFiles} />
                    <Label htmlFor="files" className="font-normal">
                      Include uploaded files
                    </Label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Environment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
