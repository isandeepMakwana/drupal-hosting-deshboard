"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { toast } = useToast()

  // General settings
  const [projectName, setProjectName] = useState("SUNY Fredonia Drupal Hosting")
  const [defaultEnvironment, setDefaultEnvironment] = useState("main-website-prod")
  const [autoBackups, setAutoBackups] = useState(true)
  const [autoUpdates, setAutoUpdates] = useState(true)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [slackWebhook, setSlackWebhook] = useState("")
  const [deploymentNotifications, setDeploymentNotifications] = useState(true)
  const [backupNotifications, setBackupNotifications] = useState(true)
  const [errorNotifications, setErrorNotifications] = useState(true)

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [ipRestriction, setIpRestriction] = useState(false)
  const [allowedIps, setAllowedIps] = useState("")

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated",
    })
  }

  const handleSaveSecurity = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" description="Manage your Drupal hosting platform settings." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-environment">Default Environment</Label>
                <Select value={defaultEnvironment} onValueChange={setDefaultEnvironment}>
                  <SelectTrigger id="default-environment">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main-website-prod">main-website-prod</SelectItem>
                    <SelectItem value="main-website-staging">main-website-staging</SelectItem>
                    <SelectItem value="main-website-dev">main-website-dev</SelectItem>
                    <SelectItem value="admissions-prod">admissions-prod</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="auto-backups">Automatic Backups</Label>
                <Switch id="auto-backups" checked={autoBackups} onCheckedChange={setAutoBackups} />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="auto-updates">Automatic Security Updates</Label>
                <Switch id="auto-updates" checked={autoUpdates} onCheckedChange={setAutoUpdates} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="slack-notifications">Slack Notifications</Label>
                <Switch id="slack-notifications" checked={slackNotifications} onCheckedChange={setSlackNotifications} />
              </div>

              {slackNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    value={slackWebhook}
                    onChange={(e) => setSlackWebhook(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>
              )}

              <div className="pt-4">
                <h3 className="mb-3 text-sm font-medium">Notification Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between space-y-0">
                    <Label htmlFor="deployment-notifications">Deployment Events</Label>
                    <Switch
                      id="deployment-notifications"
                      checked={deploymentNotifications}
                      onCheckedChange={setDeploymentNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between space-y-0">
                    <Label htmlFor="backup-notifications">Backup Events</Label>
                    <Switch
                      id="backup-notifications"
                      checked={backupNotifications}
                      onCheckedChange={setBackupNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between space-y-0">
                    <Label htmlFor="error-notifications">Error Alerts</Label>
                    <Switch
                      id="error-notifications"
                      checked={errorNotifications}
                      onCheckedChange={setErrorNotifications}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your hosting platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-y-0">
                <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                <Switch id="ip-restriction" checked={ipRestriction} onCheckedChange={setIpRestriction} />
              </div>

              {ipRestriction && (
                <div className="space-y-2">
                  <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                  <Input
                    id="allowed-ips"
                    value={allowedIps}
                    onChange={(e) => setAllowedIps(e.target.value)}
                    placeholder="192.168.1.1, 10.0.0.1"
                  />
                  <p className="text-xs text-muted-foreground">Enter comma-separated IP addresses or CIDR ranges</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecurity}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly type="password" />
                    <Button variant="outline">Show</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-3 text-sm font-medium">API Access</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="read-access">Read Access</Label>
                      <Switch id="read-access" checked={true} />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="write-access">Write Access</Label>
                      <Switch id="write-access" checked={true} />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="admin-access">Admin Access</Label>
                      <Switch id="admin-access" checked={false} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
