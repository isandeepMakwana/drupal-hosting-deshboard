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
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const { toast } = useToast()

  // General settings
  const [projectName, setProjectName] = useState("SUNY Fredonia Drupal Hosting")
  const [defaultEnvironment, setDefaultEnvironment] = useState("main-website-prod")
  const [autoBackups, setAutoBackups] = useState(true)
  const [autoUpdates, setAutoUpdates] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [backupRetention, setBackupRetention] = useState("30")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [slackWebhook, setSlackWebhook] = useState("")
  const [deploymentNotifications, setDeploymentNotifications] = useState(true)
  const [backupNotifications, setBackupNotifications] = useState(true)
  const [errorNotifications, setErrorNotifications] = useState(true)
  const [notificationEmails, setNotificationEmails] = useState("admin@fredonia.edu")

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [ipRestriction, setIpRestriction] = useState(false)
  const [allowedIps, setAllowedIps] = useState("")
  const [passwordPolicy, setPasswordPolicy] = useState("strong")
  const [autoLogout, setAutoLogout] = useState(true)

  // API settings
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••")
  const [showApiKey, setShowApiKey] = useState(false)
  const [readAccess, setReadAccess] = useState(true)
  const [writeAccess, setWriteAccess] = useState(true)
  const [adminAccess, setAdminAccess] = useState(false)
  const [apiRateLimit, setApiRateLimit] = useState("100")

  // Performance settings
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [cdnEnabled, setCdnEnabled] = useState(true)
  const [redisEnabled, setRedisEnabled] = useState(true)
  const [minifyAssets, setMinifyAssets] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)

  // Save status
  const [saveStatus, setSaveStatus] = useState<null | "success" | "error">(null)

  const handleSaveGeneral = () => {
    setSaveStatus("success")
    toast({
      title: "Settings saved",
      description: "General settings have been updated",
    })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleSaveNotifications = () => {
    setSaveStatus("success")
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated",
    })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleSaveSecurity = () => {
    setSaveStatus("success")
    toast({
      title: "Settings saved",
      description: "Security settings have been updated",
    })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleSaveApi = () => {
    setSaveStatus("success")
    toast({
      title: "Settings saved",
      description: "API settings have been updated",
    })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleSavePerformance = () => {
    setSaveStatus("success")
    toast({
      title: "Settings saved",
      description: "Performance settings have been updated",
    })

    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleRegenerateApiKey = () => {
    setApiKey("new_" + Math.random().toString(36).substring(2, 15))
    toast({
      title: "API Key regenerated",
      description: "A new API key has been generated. Make sure to update your applications.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" description="Manage your Drupal hosting platform settings." />

      {saveStatus === "success" && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was a problem saving your settings. Please try again.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
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

              {autoBackups && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Select value={backupRetention} onValueChange={setBackupRetention}>
                      <SelectTrigger id="backup-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

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

              {emailNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="notification-emails">Notification Email Addresses</Label>
                  <Input
                    id="notification-emails"
                    value={notificationEmails}
                    onChange={(e) => setNotificationEmails(e.target.value)}
                    placeholder="Enter comma-separated email addresses"
                  />
                  <p className="text-xs text-muted-foreground">Enter comma-separated email addresses</p>
                </div>
              )}

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
                <Label htmlFor="auto-logout">Auto Logout on Inactivity</Label>
                <Switch id="auto-logout" checked={autoLogout} onCheckedChange={setAutoLogout} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
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
                  <Textarea
                    id="allowed-ips"
                    value={allowedIps}
                    onChange={(e) => setAllowedIps(e.target.value)}
                    placeholder="192.168.1.1, 10.0.0.1"
                    rows={3}
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
                    <Input id="api-key" value={apiKey} readOnly type={showApiKey ? "text" : "password"} />
                    <Button variant="outline" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                    <Button variant="outline" onClick={handleRegenerateApiKey}>
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                  <Select value={apiRateLimit} onValueChange={setApiRateLimit}>
                    <SelectTrigger id="api-rate-limit">
                      <SelectValue placeholder="Select rate limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 requests/minute</SelectItem>
                      <SelectItem value="100">100 requests/minute</SelectItem>
                      <SelectItem value="300">300 requests/minute</SelectItem>
                      <SelectItem value="600">600 requests/minute</SelectItem>
                      <SelectItem value="1000">1000 requests/minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <h3 className="mb-3 text-sm font-medium">API Access</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="read-access">Read Access</Label>
                      <Switch id="read-access" checked={readAccess} onCheckedChange={setReadAccess} />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="write-access">Write Access</Label>
                      <Switch id="write-access" checked={writeAccess} onCheckedChange={setWriteAccess} />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <Label htmlFor="admin-access">Admin Access</Label>
                      <Switch id="admin-access" checked={adminAccess} onCheckedChange={setAdminAccess} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveApi}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
