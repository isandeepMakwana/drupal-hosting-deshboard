"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useDashboard } from "@/contexts/dashboard-context"
import { useToast } from "@/hooks/use-toast"

export function AddDomainDialog() {
  const { environments, addDomain } = useDashboard()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [domainName, setDomainName] = useState("")
  const [environment, setEnvironment] = useState("")
  const [autoSSL, setAutoSSL] = useState(true)
  const [primaryDomain, setPrimaryDomain] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domainName || !environment) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Create domain data object
    const domainData = {
      domainName,
      environment,
      autoSSL,
      primaryDomain,
    }

    // Call the addDomain function from context
    addDomain(domainData)

    // Reset form and close dialog
    setDomainName("")
    setEnvironment("")
    setAutoSSL(true)
    setPrimaryDomain(false)
    setIsSubmitting(false)
    setOpen(false)

    toast({
      title: "Domain added",
      description: `${domainName} has been added to ${environment}`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Domain</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Domain</DialogTitle>
            <DialogDescription>
              Add a new domain to your Drupal environment. This will automatically provision SSL certificates.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain-name" className="text-right">
                Domain Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="domain-name"
                placeholder="example.com"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="environment" className="text-right">
                Environment <span className="text-red-500">*</span>
              </Label>
              <Select value={environment} onValueChange={setEnvironment} required>
                <SelectTrigger id="environment" className="col-span-3">
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
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="auto-ssl"
                  checked={autoSSL}
                  onCheckedChange={(checked) => setAutoSSL(checked as boolean)}
                />
                <Label htmlFor="auto-ssl" className="text-sm font-normal">
                  Automatically provision SSL certificate
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="primary-domain"
                  checked={primaryDomain}
                  onCheckedChange={(checked) => setPrimaryDomain(checked as boolean)}
                />
                <Label htmlFor="primary-domain" className="text-sm font-normal">
                  Set as primary domain for this environment
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Domain"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
