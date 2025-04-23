import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, MoreHorizontal, RefreshCw } from "lucide-react"

export function BackupsList() {
  return (
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
              <Badge variant={backup.status === "Completed" ? "default" : "secondary"}>{backup.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" title="Download">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="icon" title="Restore">
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Restore</span>
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

const backups = [
  {
    id: "bkp_12345",
    environment: "main-website-prod",
    type: "Automated",
    size: "2.4 GB",
    created: "2 hours ago",
    status: "Completed",
  },
  {
    id: "bkp_12344",
    environment: "admissions-prod",
    type: "Automated",
    size: "1.8 GB",
    created: "6 hours ago",
    status: "Completed",
  },
  {
    id: "bkp_12343",
    environment: "alumni-prod",
    type: "Manual",
    size: "1.2 GB",
    created: "1 day ago",
    status: "Completed",
  },
  {
    id: "bkp_12342",
    environment: "main-website-staging",
    type: "Pre-deployment",
    size: "2.3 GB",
    created: "1 day ago",
    status: "Completed",
  },
  {
    id: "bkp_12341",
    environment: "admissions-staging",
    type: "Automated",
    size: "1.7 GB",
    created: "2 days ago",
    status: "Completed",
  },
  {
    id: "bkp_12340",
    environment: "alumni-staging",
    type: "Manual",
    size: "1.1 GB",
    created: "3 days ago",
    status: "Completed",
  },
]
