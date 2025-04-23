import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GitBranch, MoreHorizontal, RotateCcw } from "lucide-react"

interface Deployment {
  id: string
  environment: string
  branch: string
  commit: string
  deployedBy: string
  deployedAt: string
  status: string
}

interface DeploymentsListProps {
  deployments: Deployment[]
}

export function DeploymentsList({ deployments }: DeploymentsListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment ID</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Commit</TableHead>
          <TableHead>Deployed By</TableHead>
          <TableHead>Deployed At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell className="font-medium">{deployment.id}</TableCell>
            <TableCell>{deployment.environment}</TableCell>
            <TableCell className="flex items-center gap-1">
              <GitBranch className="h-4 w-4" />
              {deployment.branch}
            </TableCell>
            <TableCell className="font-mono text-xs">{deployment.commit}</TableCell>
            <TableCell>{deployment.deployedBy}</TableCell>
            <TableCell>{deployment.deployedAt}</TableCell>
            <TableCell>
              <Badge
                variant={
                  deployment.status === "Success"
                    ? "default"
                    : deployment.status === "In Progress"
                      ? "secondary"
                      : "destructive"
                }
              >
                {deployment.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" title="Rollback">
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Rollback</span>
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
