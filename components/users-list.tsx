"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserCog, UserX } from "lucide-react"
import type { User } from "@/contexts/dashboard-context"

interface UsersListProps {
  users: User[]
  onUpdateStatus: (id: string, status: string) => void
  onDelete: (id: string) => void
}

export function UsersList({ users, onUpdateStatus, onDelete }: UsersListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                className={
                  user.role === "Administrator"
                    ? "bg-red-100 text-red-800"
                    : user.role === "Developer"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.lastLogin}</TableCell>
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
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user.status === "Active" ? (
                    <DropdownMenuItem onClick={() => onUpdateStatus(user.id, "Inactive")}>
                      Deactivate User
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => onUpdateStatus(user.id, "Active")}>Activate User</DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-red-600">
                    <UserX className="mr-2 h-4 w-4" />
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
