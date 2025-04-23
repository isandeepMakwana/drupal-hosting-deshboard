"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UsersList } from "@/components/users-list"
import { AddUserDialog } from "@/components/add-user-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AccessControlPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@fredonia.edu",
      role: "Administrator",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@fredonia.edu",
      role: "Developer",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: "3",
      name: "John Doe",
      email: "john.doe@fredonia.edu",
      role: "Content Editor",
      status: "Active",
      lastLogin: "3 days ago",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah.johnson@fredonia.edu",
      role: "Developer",
      status: "Active",
      lastLogin: "5 days ago",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@fredonia.edu",
      role: "Content Editor",
      status: "Inactive",
      lastLogin: "2 months ago",
    },
  ])

  const handleAddUser = (userData: any) => {
    // Generate a random ID
    const id = `${users.length + 1}`

    // Add new user to the list
    const newUser = {
      id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "Active",
      lastLogin: "Never",
    }

    setUsers([...users, newUser])

    toast({
      title: "User added",
      description: `${userData.name} has been added as a ${userData.role}`,
    })
  }

  const handleUpdateUserStatus = (userId: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

    const user = users.find((u) => u.id === userId)

    toast({
      title: `User ${newStatus.toLowerCase()}`,
      description: `${user?.name} has been ${newStatus.toLowerCase()}`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId)

    setUsers(users.filter((user) => user.id !== userId))

    toast({
      title: "User deleted",
      description: `${user?.name} has been removed`,
    })
  }

  // Count users by role
  const adminCount = users.filter((u) => u.role === "Administrator").length
  const developerCount = users.filter((u) => u.role === "Developer").length
  const editorCount = users.filter((u) => u.role === "Content Editor").length
  const activeCount = users.filter((u) => u.status === "Active").length

  return (
    <DashboardShell>
      <DashboardHeader heading="Access Control" description="Manage user access and permissions for your Drupal sites.">
        <Button onClick={() => setIsDialogOpen(true)}>Add User</Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">{activeCount} active users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">Full system access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Developers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{developerCount}</div>
            <p className="text-xs text-muted-foreground">Code & configuration access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Editors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{editorCount}</div>
            <p className="text-xs text-muted-foreground">Content management access</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersList users={users} onUpdateStatus={handleUpdateUserStatus} onDelete={handleDeleteUser} />
        </CardContent>
      </Card>

      <AddUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddUser={handleAddUser} />
    </DashboardShell>
  )
}
