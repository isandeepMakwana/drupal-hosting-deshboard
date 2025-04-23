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

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

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
                variant={
                  user.role === "Administrator" ? "default" : user.role === "Developer" ? "secondary" : "outline"
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
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
