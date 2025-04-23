"use client"

import { useState } from "react"
import { Globe } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddDomainDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (data: any) => void
}

export function AddDomainDialog({ open, onOpenChange, onAdd }: AddDomainDialogProps) {
  const [domainName, setDomainName] = useState("")
  const [environment, setEnvironment] = useState("")
  const [autoSSL, setAutoSSL] = useState(true)
  const [primaryDomain, setPrimaryDomain] = useState(false)
  const [redirectWww, setRedirectWww] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleAdd = () => {
    if (!domainName || !environment) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simple domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    if (!domainRegex.test(domainName)) {
      toast({
        title: "Invalid domain",
        description: "Please enter a valid domain name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Pass domain data to parent component
      onAdd({
        domainName,
        environment,
        autoSSL,
        primaryDomain,
        redirectWww,
      })

      // Show success message
      toast({
        title: "Domain added",
        description: `${domainName} has been added and is being configured`,
      })

      // Close dialog
      onOpenChange(false)

      // Reset form
      setDomainName("")
      setEnvironment("")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
          <DialogDescription>Add a new domain to your Drupal environment and configure SSL.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="add-domain" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-domain">Add Domain</TabsTrigger>
            <TabsTrigger value="import-domain">Import Domain</TabsTrigger>
          </TabsList>
          <TabsContent value="add-domain">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="domain-name" className="text-right">
                  Domain Name
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="domain-name"
                    placeholder="example.fredonia.edu"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="environment" className="text-right">
                  Environment
                </Label>
                <Select value={environment} onValueChange={setEnvironment}>
                  <SelectTrigger id="environment" className="col-span-3">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-website-prod">Production (main-website)</SelectItem>
                    <SelectItem value="main-website-staging">Staging (main-website)</SelectItem>
                    <SelectItem value="main-website-dev">Development (main-website)</SelectItem>
                    <SelectItem value="admissions-prod">Production (admissions)</SelectItem>
                    <SelectItem value="alumni-prod">Production (alumni)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-start gap-4 pt-2">
                <Label className="text-right pt-2">Options</Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-ssl" checked={autoSSL} onCheckedChange={setAutoSSL} />
                    <Label htmlFor="auto-ssl" className="font-normal">
                      Automatically provision SSL certificate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="primary" checked={primaryDomain} onCheckedChange={setPrimaryDomain} />
                    <Label htmlFor="primary" className="font-normal">
                      Set as primary domain for this environment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="redirect" checked={redirectWww} onCheckedChange={setRedirectWww} />
                    <Label htmlFor="redirect" className="font-normal">
                      {domainName.startsWith("www.")
                        ? "Redirect non-www to www version"
                        : "Redirect www to non-www version"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-start gap-4 pt-2">
                <Label className="text-right pt-2">DNS Configuration</Label>
                <div className="col-span-3 bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium mb-2">Add these DNS records to your domain:</p>
                  <div className="space-y-2 font-mono text-xs">
                    <p>A Record: @ → 192.168.1.100</p>
                    <p>CNAME Record: www → fredonia-hosting.com</p>
                    <p>TXT Record: _drupal-verify → drupal-verify=abc123</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="import-domain">
            <div className="py-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Import a domain that's already configured with your DNS provider.
              </p>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="import-domain" className="text-right">
                  Domain Name
                </Label>
                <Input id="import-domain" placeholder="example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="import-environment" className="text-right">
                  Environment
                </Label>
                <Select>
                  <SelectTrigger id="import-environment" className="col-span-3">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-website-prod">Production (main-website)</SelectItem>
                    <SelectItem value="main-website-staging">Staging (main-website)</SelectItem>
                    <SelectItem value="main-website-dev">Development (main-website)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Domain"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
