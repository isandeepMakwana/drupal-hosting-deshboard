"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpCircle, CheckCircle, Clock, Loader2 } from "lucide-react"

interface Update {
  id: string
  name: string
  type: string
  currentVersion: string
  newVersion: string
  affectedSites: string
  security: boolean
  status: string
}

interface UpdatesListProps {
  updates: Update[]
  onUpdateNow: (id: string) => void
  onScheduleUpdate: (id: string) => void
}

export function UpdatesList({ updates, onUpdateNow, onScheduleUpdate }: UpdatesListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Update</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Current Version</TableHead>
          <TableHead>New Version</TableHead>
          <TableHead>Affected Sites</TableHead>
          <TableHead>Security</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {updates.map((update) => (
          <TableRow key={update.id}>
            <TableCell className="font-medium">{update.name}</TableCell>
            <TableCell>{update.type}</TableCell>
            <TableCell>{update.currentVersion}</TableCell>
            <TableCell>{update.newVersion}</TableCell>
            <TableCell>{update.affectedSites}</TableCell>
            <TableCell>
              {update.security ? (
                <Badge variant="destructive">Security</Badge>
              ) : (
                <Badge variant="outline">Feature</Badge>
              )}
            </TableCell>
            <TableCell>
              {update.status === "available" ? (
                <Badge variant="outline">Available</Badge>
              ) : update.status === "in-progress" ? (
                <Badge variant="secondary">In Progress</Badge>
              ) : update.status === "scheduled" ? (
                <Badge variant="secondary">Scheduled</Badge>
              ) : (
                <Badge variant="default">Completed</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {update.status === "available" && (
                  <>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => onScheduleUpdate(update.id)}>
                      <Clock className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button size="sm" className="h-8" onClick={() => onUpdateNow(update.id)}>
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Update Now
                    </Button>
                  </>
                )}

                {update.status === "in-progress" && (
                  <Button size="sm" className="h-8" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </Button>
                )}

                {update.status === "scheduled" && (
                  <Button variant="outline" size="sm" className="h-8" disabled>
                    <Clock className="mr-2 h-4 w-4" />
                    Scheduled
                  </Button>
                )}

                {update.status === "completed" && (
                  <Button variant="outline" size="sm" className="h-8" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
