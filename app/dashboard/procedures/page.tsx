"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Bell, Calendar, Mail, MessageSquare, RefreshCw, Settings, Users } from "lucide-react"

export default function ProceduresPage() {
  const { toast } = useToast()
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null)

  // Upgrade settings
  const [upgradeType, setUpgradeType] = useState("automatic")
  const [upgradeSchedule, setUpgradeSchedule] = useState("weekly")
  const [upgradeDay, setUpgradeDay] = useState("sunday")
  const [upgradeTime, setUpgradeTime] = useState("02:00")
  const [securityOnly, setSecurityOnly] = useState(true)
  const [testInStaging, setTestInStaging] = useState(true)
  const [backupBeforeUpgrade, setBackupBeforeUpgrade] = useState(true)

  // Notification settings
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySlack, setNotifySlack] = useState(false)
  const [notifyInApp, setNotifyInApp] = useState(true)
  const [notifyBefore, setNotifyBefore] = useState(true)
  const [notifyDuring, setNotifyDuring] = useState(true)
  const [notifyAfter, setNotifyAfter] = useState(true)
  const [notifyOnlyErrors, setNotifyOnlyErrors] = useState(false)

  const handleSaveUpgradeSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your upgrade procedures have been updated",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Procedures & Notifications"
        description="Configure software upgrade procedures and notification preferences."
      />

      <Tabs defaultValue="upgrades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upgrades">Upgrade Procedures</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="upgrades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Software Upgrade Procedures</CardTitle>
              <CardDescription>
                Configure how and when software updates are applied to your environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Upgrade Type</h3>
                <RadioGroup value={upgradeType} onValueChange={setUpgradeType} className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="manual" id="manual" className="mt-1" />
                    <div>
                      <Label htmlFor="manual" className="font-medium">
                        Manual Upgrades
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        You'll be notified of available updates but must manually approve and apply them
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="automatic" id="automatic" className="mt-1" />
                    <div>
                      <Label htmlFor="automatic" className="font-medium">
                        Automatic Upgrades
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Updates will be automatically applied according to your schedule
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
                    <div>
                      <Label htmlFor="hybrid" className="font-medium">
                        Hybrid Approach
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Security updates applied automatically, feature updates require manual approval
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {(upgradeType === "automatic" || upgradeType === "hybrid") && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-sm font-medium">Upgrade Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="upgrade-frequency">Frequency</Label>
                      <Select value={upgradeSchedule} onValueChange={setUpgradeSchedule}>
                        <SelectTrigger id="upgrade-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {upgradeSchedule === "weekly" && (
                      <div className="space-y-2">
                        <Label htmlFor="upgrade-day">Day of Week</Label>
                        <Select value={upgradeDay} onValueChange={setUpgradeDay}>
                          <SelectTrigger id="upgrade-day">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sunday">Sunday</SelectItem>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {upgradeSchedule === "monthly" && (
                      <div className="space-y-2">
                        <Label htmlFor="upgrade-day-month">Day of Month</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="upgrade-day-month">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => (
                              <SelectItem key={i} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="upgrade-time">Time (24-hour)</Label>
                      <Select value={upgradeTime} onValueChange={setUpgradeTime}>
                        <SelectTrigger id="upgrade-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00:00">00:00 (Midnight)</SelectItem>
                          <SelectItem value="02:00">02:00 (2 AM)</SelectItem>
                          <SelectItem value="04:00">04:00 (4 AM)</SelectItem>
                          <SelectItem value="22:00">22:00 (10 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Upgrade Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="security-only" checked={securityOnly} onCheckedChange={setSecurityOnly} />
                    <Label htmlFor="security-only" className="font-normal">
                      Apply security updates only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="test-staging" checked={testInStaging} onCheckedChange={setTestInStaging} />
                    <Label htmlFor="test-staging" className="font-normal">
                      Test updates in staging before applying to production
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="backup-before"
                      checked={backupBeforeUpgrade}
                      onCheckedChange={setBackupBeforeUpgrade}
                    />
                    <Label htmlFor="backup-before" className="font-normal">
                      Create backup before applying updates
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Upgrade Path</h3>
                <div className="bg-blue-50 p-4 rounded-md text-sm">
                  <p className="font-medium text-blue-800 mb-2">Recommended Upgrade Path:</p>
                  <ol className="list-decimal list-inside text-blue-800 space-y-1">
                    <li>Apply updates to Development environment</li>
                    <li>Test functionality and performance</li>
                    <li>Apply updates to Staging environment</li>
                    <li>Perform UAT (User Acceptance Testing)</li>
                    <li>Schedule production deployment during maintenance window</li>
                    <li>Apply updates to Production environment</li>
                    <li>Verify functionality post-update</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveUpgradeSettings}>Save Upgrade Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications about updates and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-email" checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                    <Label htmlFor="notify-email" className="font-normal flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-slack" checked={notifySlack} onCheckedChange={setNotifySlack} />
                    <Label htmlFor="notify-slack" className="font-normal flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Slack notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-app" checked={notifyInApp} onCheckedChange={setNotifyInApp} />
                    <Label htmlFor="notify-app" className="font-normal flex items-center gap-2">
                      <Bell className="h-4 w-4" /> In-app notifications
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Notification Timing</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-before" checked={notifyBefore} onCheckedChange={setNotifyBefore} />
                    <Label htmlFor="notify-before" className="font-normal">
                      Before scheduled updates (24 hours in advance)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-during" checked={notifyDuring} onCheckedChange={setNotifyDuring} />
                    <Label htmlFor="notify-during" className="font-normal">
                      During update process (real-time status)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-after" checked={notifyAfter} onCheckedChange={setNotifyAfter} />
                    <Label htmlFor="notify-after" className="font-normal">
                      After updates are complete (success or failure)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Notification Content</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-errors" checked={notifyOnlyErrors} onCheckedChange={setNotifyOnlyErrors} />
                    <Label htmlFor="notify-errors" className="font-normal">
                      Only notify on errors or warnings
                    </Label>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Sample Pre-Update Notification</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Scheduled Maintenance: Drupal Core Update</p>
                      <p className="text-muted-foreground mt-1">
                        A Drupal core update (10.1.2 to 11.0.0) is scheduled for your production environment on Sunday,
                        June 18 at 02:00 UTC. This update includes security fixes and new features.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Sample Post-Update Notification</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="font-medium">Update Complete: Drupal Core Update</p>
                      <p className="text-muted-foreground mt-1">
                        The Drupal core update to version 11.0.0 has been successfully applied to your production
                        environment. No issues were detected during the update process.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Procedure Documentation</CardTitle>
              <CardDescription>Standard operating procedures for common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {procedures.map((procedure) => (
                    <div
                      key={procedure.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedProcedure === procedure.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedProcedure(procedure.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {procedure.icon}
                        <h3 className="font-medium">{procedure.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{procedure.description}</p>
                    </div>
                  ))}
                </div>

                {selectedProcedure && (
                  <div className="mt-6 border rounded-lg p-6">
                    {procedures
                      .filter((p) => p.id === selectedProcedure)
                      .map((procedure) => (
                        <div key={procedure.id}>
                          <div className="flex items-center gap-3 mb-4">
                            {procedure.icon}
                            <h2 className="text-xl font-bold">{procedure.title}</h2>
                          </div>
                          <p className="mb-4">{procedure.fullDescription}</p>

                          <h3 className="text-lg font-medium mt-6 mb-3">Procedure Steps</h3>
                          <ol className="list-decimal list-inside space-y-3">
                            {procedure.steps.map((step, index) => (
                              <li key={index} className="pl-2">
                                <span className="font-medium">{step.title}: </span>
                                {step.description}
                              </li>
                            ))}
                          </ol>

                          {procedure.notes && (
                            <>
                              <h3 className="text-lg font-medium mt-6 mb-3">Important Notes</h3>
                              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
                                <ul className="list-disc list-inside space-y-2">
                                  {procedure.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

const procedures = [
  {
    id: "drupal-core-update",
    title: "Drupal Core Update Procedure",
    description: "Step-by-step guide for updating Drupal core",
    icon: <RefreshCw className="h-5 w-5 text-blue-500" />,
    fullDescription: "This procedure outlines the recommended steps for safely updating Drupal core across your environments. Following this procedure minimizes downtime and reduces the risk of update-related issues.",
    steps: [
      {
        title: "Preparation",
        description: "Create a full backup of your database and codebase before proceeding with any updates."
      },
      {
        title: "Development Environment",
        description: "Apply the update to your development environment first and test thoroughly."
      },
      {
        title: "Staging Environment",
        description: "Once verified in development, apply the update to staging and perform user acceptance testing."
      },
      {
        title: "Schedule Maintenance Window",
        description: "Schedule a maintenance window for production updates, preferably during low-traffic periods."
      },
      {
        title: "Production Update",
        description: "Apply the update to production during the maintenance window, with monitoring in place."
      },
      {
        title: "Verification",
        description: "Verify all functionality is working correctly after the update is complete."
      },
      {
        title: "Documentation",
        description: "Document any issues encountered and their resolutions for future reference."
      }
    ],
    notes: [
      "Always check the release notes for breaking changes before updating.",
      "Consider using the Update Manager in the dashboard for a streamlined process.",
      "For major version upgrades (e.g., Drupal 10 to 11), additional testing and planning is required."
    ]
  },
  {
    id: "module-updates",
    title: "Module Update Procedure",
    description: "Process for safely updating Drupal modules",
    icon: <Settings className="h-5 w-5 text-green-500" />,
    fullDescription: "This procedure outlines the recommended steps for safely updating Drupal modules. Module updates can introduce new features, fix bugs, or address security vulnerabilities.",
    steps: [
      {
        title: "Review Updates",
        description: "Review available module updates and their release notes for breaking changes."
      },
      {
        title: "Prioritize Updates",
        description: "Prioritize security updates over feature updates."
      },
      {
        title: "Create Backup",
        description: "Create a full backup of your database and codebase."
      },
      {
        title: "Development Testing",
        description: "Apply updates to development environment and test thoroughly."
      },
      {
        title: "Staging Deployment",
        description: "Deploy to staging and perform user acceptance testing."
      },
      {
        title: "Production Deployment",
        description: "Schedule and deploy updates to production during a maintenance window."
      },
      {
        title: "Verification",
        description: "Verify functionality and monitor for any issues after deployment."
      }
    ],
    notes: [
      "Consider updating one module at a time for easier troubleshooting.",
      "Always check module dependencies before updating.",
      "Some modules may require database updates after code updates."
    ]
  },
  {
    id: "emergency-security",
    title: "Emergency Security Updates",
    description: "Procedure for critical security patches",
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    fullDescription: "This procedure outlines the steps to take when a critical security vulnerability is announced and requires immediate attention. Security updates should be prioritized over regular maintenance.",
    steps: [
      {
        title: "Assess Impact",
        description: "Determine if your site is vulnerable and the potential impact of the security issue."
      },
      {
        title: "Create Backup",
        description: "Create an immediate backup of all affected environments."
      },
      {
        title: "Apply Patch",
        description: "Apply the security patch to development environment first, if possible."
      },
      {
        title: "Expedited Testing",
        description: "Perform focused testing on the affected functionality."
      },
      {
        title: "Production Deployment",
        description: "Deploy the security patch to production as soon as testing is complete."
      },
      {
        title: "Monitor",
        description: "Closely monitor the site for any issues after the security patch is applied."
      },
      {
        title: "Documentation",
        description: "Document the security issue, the fix applied, and any lessons learned."
      }
    ],
    notes: [
      "For critical vulnerabilities, it may be necessary to bypass the normal testing process.",
      "Consider temporarily taking the site offline if the vulnerability is severe and being actively exploited.",
      "Communicate with stakeholders about the security issue and the steps being taken to address it."
    ]
  },
  {
    id: "scheduled-maintenance",
    title: "Scheduled Maintenance Procedure",
    description: "Planning and executing maintenance windows",
    icon: <Calendar className="h-5 w-5 text-purple-500" />,
    fullDescription: "This procedure outlines how to plan and execute scheduled maintenance windows for your Drupal sites. Proper planning minimizes disruption and ensures stakeholders are informed.",
    steps: [
      {
        title: "Identify Maintenance Needs",
        description: "Determine what maintenance tasks need to be performed (updates, server changes, etc.)."
      },
      {
        title: "Schedule Window",
        description: "Select a maintenance window during low-traffic periods, typically early morning or late evening."
      },
      {
        title: "Communicate",
        description: "Notify all stakeholders at least 48 hours in advance of the scheduled maintenance."
      },
      {
        title: "Prepare Maintenance Page",
        description: "Create a maintenance page that will be displayed during the downtime."
      },
      {
        title: "Create Backup",
        description: "Create a full backup before beginning maintenance activities."
      },
      {
        title: "Execute Maintenance",
        description: "Perform the planned maintenance tasks during the scheduled window."
      },
      {
        title: "Verify",
        description: "Test all functionality after maintenance is complete before bringing the site back online."
      },
      {
        title: "Post-Maintenance Communication",
        description: "Notify stakeholders that maintenance is complete and the site is back online."
      }
    ],
    notes: [
      "Always have a rollback plan in case maintenance activities don't go as planned.",
      "Consider setting up a status page for real-time updates during maintenance.",
      "Document all changes made during the maintenance window for future reference."
    ]
  },
  {
    id: "notification-management",
    title: "Notification Management",
    description: "Setting up and managing notifications",
    icon: <Bell className="h-5 w-5 text-yellow-500" />,
    fullDescription: "This procedure outlines how to set up and manage notifications for various events in your Drupal hosting platform. Proper notification management ensures that the right people receive the right information at the right time.",
    steps: [
      {
        title: "Identify Notification Types",
        description: "Determine what types of events should trigger notifications (updates, errors, etc.)."
      },
      {
        title: "Define Audience",
        description: "Identify who should receive each type of notification (admins, developers, content editors, etc.)."
      },
      {
        title: "Configure Channels",
        description: "Set up notification channels (email, Slack, in-app) in the Notification Settings."
      },
      {
        title: "Create Templates",
        description: "Create notification templates for different types of events."
      },
      {
        title: "Test Notifications",
        description: "Send test notifications to ensure they are being delivered correctly."
      },
      {
        title: "Implement Filtering",
        description: "Set up filtering to prevent notification fatigue (e.g., only critical errors during off-hours)."
      },
      {
        title: "Review and Adjust",
        description: "Regularly review notification effectiveness and adjust as needed."
      }
    ],
    notes: [
      "Balance between too many and too few notifications to avoid notification fatigue.",
      "Consider using different notification channels for different priority levels.",
      "Ensure notifications include actionable information when possible."
    ]
  },
  {
    id: "user-training",
    title: "User Training Procedure",
    description: "Onboarding new users to the platform",
    icon: <Users className="h-5 w-5 text-indigo-500" />,\
    fullDescription: "This procedure outlines how to onboard and train new users on the Drupal hosting platform. Proper training ensures users can effectively use the platform and understand best practices for managing Drupal sites.
    steps: [
      {
        title: "Identify Training Needs",
        description: "Determine what aspects of the platform the user needs to be trained on based on their role."
      },
      {
        title: "Prepare Materials",
        description: "Create or gather training materials, including documentation, videos, and hands-on exercises."
      },
      {
        title: "Schedule Training",
        description: "Schedule training sessions at a time convenient for the new user."
      },
      {
        title: "Platform Overview",
        description: "Provide an overview of the platform's features and capabilities."
      },
      {
        title: "Role-Specific Training",
        description: "Focus on the specific features and tasks relevant to the user's role."
      },
      {
        title: "Hands-On Practice",
        description: "Allow the user to practice using the platform in a safe, non-production environment."
      },
      {
        title: "Follow-Up",
        description: "Schedule a follow-up session to address any questions or issues that arise after initial use."
      }
    ],
    notes: [
      "Consider creating role-based training paths for different types of users.",
      "Maintain up-to-date documentation that users can reference after training.",
      "Collect feedback on the training process to continuously improve it."
    ]
  }
]
