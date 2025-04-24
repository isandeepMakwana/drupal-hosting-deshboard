"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Globe,
  MoreHorizontal,
  RefreshCw,
  Shield,
  ExternalLink,
  Trash,
  AlertTriangle,
  CheckCircle,
  Star,
  Lock,
  Copy,
} from "lucide-react"
import type { Domain } from "@/contexts/dashboard-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

interface DomainsListProps {
  domains: Domain[]
}

export function DomainsList({ domains }: DomainsListProps) {
  const { toast } = useToast()
  const [verifying, setVerifying] = useState<string | null>(null)
  const [renewing, setRenewing] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDomains = domains.filter(
    (domain) =>
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.environment.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleVerifyDNS = (domainName: string) => {
    setVerifying(domainName)

    toast({
      title: "Verifying DNS",
      description: `Checking DNS records for ${domainName}...`,
    })

    // Simulate verification process
    setTimeout(() => {
      toast({
        title: "DNS Verified",
        description: `DNS records for ${domainName} have been verified`,
      })
      setVerifying(null)
    }, 2000)
  }

  const handleRenewSSL = (domainName: string) => {
    setRenewing(domainName)

    toast({
      title: "SSL Renewal Started",
      description: `Renewing SSL certificate for ${domainName}...`,
    })

    // Simulate renewal process
    setTimeout(() => {
      toast({
        title: "SSL Renewed",
        description: `SSL certificate for ${domainName} has been renewed`,
      })
      setRenewing(null)
    }, 2500)
  }

  const handleCopyDNS = (domainName: string) => {
    // Simulate copying DNS information to clipboard
    navigator.clipboard
      .writeText(`
      ${domainName}. 3600 IN A 123.45.67.89
      ${domainName}. 3600 IN AAAA 2001:0db8:85a3:0000:0000:8a2e:0370:7334
      ${domainName}. 3600 IN TXT "v=spf1 include:_spf.drupal.com ~all"
    `)
      .then(() => {
        toast({
          title: "DNS Records Copied",
          description: "DNS records have been copied to clipboard",
        })
      })
  }

  const handleSetPrimary = (domainName: string) => {
    toast({
      title: "Primary Domain Set",
      description: `${domainName} is now the primary domain for its environment`,
    })
  }

  const getSSLStatusClass = (status: string) => {
    switch (status) {
      case "Valid":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Expired":
      case "Invalid":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "Pending":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return ""
    }
  }

  const getSSLStatusIcon = (status: string) => {
    switch (status) {
      case "Valid":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
      case "Expiring Soon":
        return <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
      case "Expired":
      case "Invalid":
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-full max-w-sm">
          <Input placeholder="Search domains..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredDomains.length} {filteredDomains.length === 1 ? "domain" : "domains"}
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>SSL Status</TableHead>
              <TableHead>SSL Expiry</TableHead>
              <TableHead>DNS</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No domains found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDomains.map((domain) => (
                <TableRow key={domain.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {domain.name}
                    </div>
                  </TableCell>
                  <TableCell>{domain.environment}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        domain.sslStatus === "Valid"
                          ? "default"
                          : domain.sslStatus === "Expiring Soon"
                            ? "secondary"
                            : domain.sslStatus === "Pending"
                              ? "outline"
                              : "destructive"
                      }
                      className={getSSLStatusClass(domain.sslStatus)}
                    >
                      {getSSLStatusIcon(domain.sslStatus)}
                      {domain.sslStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{domain.sslExpiry}</TableCell>
                  <TableCell>
                    <Badge
                      variant={domain.dns === "Verified" ? "default" : "outline"}
                      className={domain.dns === "Verified" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                    >
                      {domain.dns}
                    </Badge>
                  </TableCell>
                  <TableCell>{domain.created}</TableCell>
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
                        <DropdownMenuItem onClick={() => window.open(`https://${domain.name}`, "_blank")}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Domain
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleRenewSSL(domain.name)}
                          disabled={renewing === domain.name}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          {renewing === domain.name ? "Renewing SSL..." : "Renew SSL"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleVerifyDNS(domain.name)}
                          disabled={verifying === domain.name}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          {verifying === domain.name ? "Verifying DNS..." : "Verify DNS"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyDNS(domain.name)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy DNS Records
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSetPrimary(domain.name)}>
                          <Star className="mr-2 h-4 w-4" />
                          Set as Primary
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Lock className="mr-2 h-4 w-4" />
                          Force HTTPS
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Remove Domain
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
