import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, MoreHorizontal, RefreshCw, Shield } from "lucide-react"

interface Domain {
  name: string
  environment: string
  sslStatus: string
  sslExpiry: string
  dns: string
  created: string
}

interface DomainsListProps {
  domains: Domain[]
}

export function DomainsList({ domains }: DomainsListProps) {
  return (
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
        {domains.map((domain) => (
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
              >
                {domain.sslStatus}
              </Badge>
            </TableCell>
            <TableCell>{domain.sslExpiry}</TableCell>
            <TableCell>
              <Badge variant={domain.dns === "Verified" ? "default" : "outline"}>{domain.dns}</Badge>
            </TableCell>
            <TableCell>{domain.created}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" title="Renew SSL">
                  <Shield className="h-4 w-4" />
                  <span className="sr-only">Renew SSL</span>
                </Button>
                <Button variant="ghost" size="icon" title="Verify DNS">
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Verify DNS</span>
                </Button>
                <Button variant="ghost" size="icon" title="More">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
