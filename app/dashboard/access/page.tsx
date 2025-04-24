"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UsersList } from "@/components/users-list"
import { AddUserDialog } from "@/components/add-user-dialog"
import { useDashboard } from "@/contexts/dashboard-context"

export default function AccessControlPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { users, addUser, updateUserStatus, deleteUser } = useDashboard()

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
          <UsersList users={users} onUpdateStatus={updateUserStatus} onDelete={deleteUser} />
        </CardContent>
      </Card>

      <AddUserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddUser={addUser} />
    </DashboardShell>
  )
}
