"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, ToggleLeft, ToggleRight } from "lucide-react"
import type { Cache } from "@/contexts/dashboard-context"

interface CacheListProps {
  caches: Cache[]
  onClearCache: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function CacheList({ caches, onClearCache, onToggleStatus }: CacheListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cache Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Last Cleared</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {caches.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No cache data available
            </TableCell>
          </TableRow>
        ) : (
          caches.map((cache) => (
            <TableRow key={cache.id}>
              <TableCell className="font-medium">{cache.name}</TableCell>
              <TableCell>{cache.size}</TableCell>
              <TableCell>{cache.items}</TableCell>
              <TableCell>{cache.lastCleared}</TableCell>
              <TableCell>
                <Badge
                  variant={cache.status === "enabled" ? "default" : "secondary"}
                  className={cache.status === "enabled" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {cache.status.charAt(0).toUpperCase() + cache.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onClearCache(cache.id)}
                    disabled={cache.items === "0"}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onToggleStatus(cache.id)}>
                    {cache.status === "enabled" ? (
                      <>
                        <ToggleRight className="mr-2 h-4 w-4" />
                        Disable
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="mr-2 h-4 w-4" />
                        Enable
                      </>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
