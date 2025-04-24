"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AlertsConfigProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertsConfig({ open, onOpenChange }: AlertsConfigProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [emailRecipients, setEmailRecipients] = useState("admin@fredonia.edu")
  const [slackWebhook, setSlackWebhook] = useState(
    "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
  )
  const [smsNumber, setSmsNumber] = useState("+1234567890")

  // Alert thresholds
  const [errorRateThreshold, setErrorRateThreshold] = useState("5")
  const [cpuThreshold, setCpuThreshold] = useState("90")
  const [memoryThreshold, setMemoryThreshold] = useState("85")
  const [diskThreshold, setDiskThreshold] = useState("90")
  const [responseTimeThreshold, setResponseTimeThreshold] = useState("500")

  // Notification channels
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [slackEnabled, setSlackEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)

  // Alert types
  const [errorAlerts, setErrorAlerts] = useState(true)
  const [performanceAlerts, setPerformanceAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [deploymentAlerts, setDeploymentAlerts] = useState(true)
  const [backupAlerts, setBackupAlerts] = useState(true)

  const handleSave = () => {
    toast({
      title: "Alert configuration saved",
      description: "Your alert settings have been updated successfully.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Alerts</DialogTitle>
          <DialogDescription>Set up alerts and notifications for your Drupal hosting environments.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Alert Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="error-alerts"
                      checked={errorAlerts}
                      onCheckedChange={(checked) => setErrorAlerts(!!checked)}
                    />
                    <Label htmlFor="error-alerts">Error Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="performance-alerts"
                      checked={performanceAlerts}
                      onCheckedChange={(checked) => setPerformanceAlerts(!!checked)}
                    />
                    <Label htmlFor="performance-alerts">Performance Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="security-alerts"
                      checked={securityAlerts}
                      onCheckedChange={(checked) => setSecurityAlerts(!!checked)}
                    />
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="deployment-alerts"
                      checked={deploymentAlerts}
                      onCheckedChange={(checked) => setDeploymentAlerts(!!checked)}
                    />
                    <Label htmlFor="deployment-alerts">Deployment Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="backup-alerts"
                      checked={backupAlerts}
                      onCheckedChange={(checked) => setBackupAlerts(!!checked)}
                    />
                    <Label htmlFor="backup-alerts">Backup Alerts</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Alert Severity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="critical-threshold">Critical Threshold</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger id="critical-threshold">
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="warning-threshold">Warning Threshold</Label>
                    <Select defaultValue="30min">
                      <SelectTrigger id="warning-threshold">
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="error-rate">Error Rate (%)</Label>
                <Input
                  id="error-rate"
                  type="number"
                  value={errorRateThreshold}
                  onChange={(e) => setErrorRateThreshold(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="cpu-usage">CPU Usage (%)</Label>
                <Input
                  id="cpu-usage"
                  type="number"
                  value={cpuThreshold}
                  onChange={(e) => setCpuThreshold(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="memory-usage">Memory Usage (%)</Label>
                <Input
                  id="memory-usage"
                  type="number"
                  value={memoryThreshold}
                  onChange={(e) => setMemoryThreshold(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="disk-usage">Disk Usage (%)</Label>
                <Input
                  id="disk-usage"
                  type="number"
                  value={diskThreshold}
                  onChange={(e) => setDiskThreshold(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="response-time">Response Time (ms)</Label>
                <Input
                  id="response-time"
                  type="number"
                  value={responseTimeThreshold}
                  onChange={(e) => setResponseTimeThreshold(e.target.value)}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="alert-frequency">Alert Frequency</Label>
                <Select defaultValue="15min">
                  <SelectTrigger id="alert-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="email-enabled"
                    checked={emailEnabled}
                    onCheckedChange={(checked) => setEmailEnabled(!!checked)}
                  />
                  <Label htmlFor="email-enabled" className="font-medium">
                    Email Notifications
                  </Label>
                </div>
                <Label htmlFor="email-recipients">Recipients (comma separated)</Label>
                <Input
                  id="email-recipients"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  disabled={!emailEnabled}
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="slack-enabled"
                    checked={slackEnabled}
                    onCheckedChange={(checked) => setSlackEnabled(!!checked)}
                  />
                  <Label htmlFor="slack-enabled" className="font-medium">
                    Slack Notifications
                  </Label>
                </div>
                <Label htmlFor="slack-webhook">Webhook URL</Label>
                <Input
                  id="slack-webhook"
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  disabled={!slackEnabled}
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="sms-enabled"
                    checked={smsEnabled}
                    onCheckedChange={(checked) => setSmsEnabled(!!checked)}
                  />
                  <Label htmlFor="sms-enabled" className="font-medium">
                    SMS Notifications
                  </Label>
                </div>
                <Label htmlFor="sms-number">Phone Number</Label>
                <Input
                  id="sms-number"
                  value={smsNumber}
                  onChange={(e) => setSmsNumber(e.target.value)}
                  disabled={!smsEnabled}
                />
              </div>

              <div>
                <Label htmlFor="notification-schedule">Notification Schedule</Label>
                <Select defaultValue="always">
                  <SelectTrigger id="notification-schedule">
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always (24/7)</SelectItem>
                    <SelectItem value="business">Business Hours Only</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
