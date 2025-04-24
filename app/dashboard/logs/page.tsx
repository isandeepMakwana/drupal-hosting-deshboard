"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LogsList } from "@/components/logs-list"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { AlertsConfig } from "@/components/alerts-config"

export default function LogsPage() {
  const [isAlertsDialogOpen, setIsAlertsDialogOpen] = useState(false)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Logs & Metrics"
        description="Monitor performance and troubleshoot issues with logs and metrics."
      >
        <Button onClick={() => setIsAlertsDialogOpen(true)}>Configure Alerts</Button>
      </DashboardHeader>
      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="realtime">Realtime Logs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="logs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Log Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.8%</div>
                <p className="text-xs text-muted-foreground">-0.2% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View and filter system logs across all environments</CardDescription>
            </CardHeader>
            <CardContent>
              <LogsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Monitor server and application performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceMetrics />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Realtime Log Viewer</CardTitle>
              <CardDescription>View logs in real-time as they are generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-[400px] overflow-auto">
                <div className="space-y-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-500 mr-2">[{new Date().toISOString()}]</span>
                      <span className={i % 10 === 0 ? "text-red-400" : i % 5 === 0 ? "text-yellow-400" : ""}>
                        {i % 10 === 0
                          ? "ERROR: Failed to connect to database: Connection timed out"
                          : i % 5 === 0
                            ? "WARNING: High memory usage detected: 85% of allocated memory"
                            : i % 3 === 0
                              ? "INFO: User admin logged in from 192.168.1.1"
                              : "INFO: Page request: /node/123 - 200 OK - 245ms"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline">Pause Stream</Button>
                <div className="flex gap-2">
                  <Button variant="outline">Download Logs</Button>
                  <Button variant="outline">Clear View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Configure alerts for various metrics and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Error Rate Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: Error rate &gt; 5%</p>
                        <p>Status: Active</p>
                        <p>Notification: Email, Slack</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Server Load Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: CPU usage &gt; 90%</p>
                        <p>Status: Active</p>
                        <p>Notification: Email, SMS</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Memory Usage Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: Memory usage &gt; 85%</p>
                        <p>Status: Active</p>
                        <p>Notification: Email</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Disk Space Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: Disk usage &gt; 90%</p>
                        <p>Status: Active</p>
                        <p>Notification: Email, Slack</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Response Time Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: TTFB &gt; 500ms</p>
                        <p>Status: Active</p>
                        <p>Notification: Email</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Database Connection Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Trigger: Connection failures</p>
                        <p>Status: Active</p>
                        <p>Notification: Email, SMS, Slack</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsAlertsDialogOpen(true)}>Manage Alerts</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertsConfig open={isAlertsDialogOpen} onOpenChange={setIsAlertsDialogOpen} />
    </DashboardShell>
  )
}
