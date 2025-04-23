import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

export function SitesList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Site Name</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Drupal Version</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell className="font-medium">{site.name}</TableCell>
            <TableCell>{site.environment}</TableCell>
            <TableCell>
              <Badge variant={site.status === "Online" ? "default" : "destructive"}>{site.status}</Badge>
            </TableCell>
            <TableCell>{site.drupalVersion}</TableCell>
            <TableCell>{site.lastUpdated}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const sites = [
  {
    id: "1",
    name: "Main Website",
    environment: "Production",
    status: "Online",
    drupalVersion: "10.1.2",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    name: "Admissions",
    environment: "Production",
    status: "Online",
    drupalVersion: "10.1.0",
    lastUpdated: "5 days ago",
  },
  {
    id: "3",
    name: "Alumni",
    environment: "Production",
    status: "Online",
    drupalVersion: "10.0.9",
    lastUpdated: "14 days ago",
  },
  {
    id: "4",
    name: "Main Website",
    environment: "Staging",
    status: "Online",
    drupalVersion: "10.1.2",
    lastUpdated: "1 day ago",
  },
  {
    id: "5",
    name: "Admissions",
    environment: "Staging",
    status: "Online",
    drupalVersion: "10.1.0",
    lastUpdated: "3 days ago",
  },
  {
    id: "6",
    name: "Alumni",
    environment: "Staging",
    status: "Offline",
    drupalVersion: "10.1.2",
    lastUpdated: "2 days ago",
  },
]
