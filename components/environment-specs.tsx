"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, HardDrive, Server, Cpu, Globe } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export function EnvironmentSpecs() {
  const { environments } = useDashboard()
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  // Group environments by type for better organization
  const productionEnvs = environments.filter((env) => env.type === "production")
  const stagingEnvs = environments.filter((env) => env.type === "staging")
  const developmentEnvs = environments.filter((env) => env.type === "development")

  // Set default selected site if not set
  if (!selectedSite && environments.length > 0) {
    setSelectedSite(environments[0].name)
  }

  // Get environment details for the selected site
  const getEnvironmentDetails = (envName: string) => {
    const env = environments.find((e) => e.name === envName)
    if (!env) return null

    // Determine site category based on name or other criteria
    let siteCategory = "tertiary"
    if (env.name.includes("main-website")) {
      siteCategory = "primary"
    } else if (env.name.includes("admissions")) {
      siteCategory = "secondary"
    }

    // Generate mock data based on site category
    const specs = {
      primary: {
        traffic: {
          visits: "5 million",
          visitors: "1.5 million",
          pageviews: "20+ million",
          badge: "High Volume",
        },
        database: {
          allocated: "10GB / 10GB+",
          used: "8.2GB",
          percentage: 82,
        },
        filesystem: {
          allocated: "50GB / 50GB+",
          used: "32.5GB",
          percentage: 65,
        },
        performance: {
          cpu: "42%",
          memory: "3.8GB",
          cacheHit: "94.2%",
          response: "320ms",
        },
      },
      secondary: {
        traffic: {
          visits: "480 thousand",
          visitors: "240 thousand",
          pageviews: "1.2 million",
          badge: "Medium Volume",
        },
        database: {
          allocated: "1GB / 1GB+",
          used: "450MB",
          percentage: 45,
        },
        filesystem: {
          allocated: "1GB / 1GB+",
          used: "380MB",
          percentage: 38,
        },
        performance: {
          cpu: "28%",
          memory: "1.2GB",
          cacheHit: "92.5%",
          response: "380ms",
        },
      },
      tertiary: {
        traffic: {
          visits: "42 thousand",
          visitors: "21 thousand",
          pageviews: "12 million",
          badge: "Standard Volume",
        },
        database: {
          allocated: "1GB / 1GB+",
          used: "720MB",
          percentage: 72,
        },
        filesystem: {
          allocated: "5GB / 5GB+",
          used: "2.9GB",
          percentage: 58,
        },
        performance: {
          cpu: "18%",
          memory: "950MB",
          cacheHit: "90.1%",
          response: "410ms",
        },
      },
    }

    return {
      env,
      specs: specs[siteCategory as keyof typeof specs],
    }
  }

  const selectedEnvDetails = selectedSite ? getEnvironmentDetails(selectedSite) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Specifications</CardTitle>
        <CardDescription>Technical specifications and resource allocation for your websites</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedSite || ""} onValueChange={setSelectedSite} className="space-y-4">
          {/* Improved responsive tab list without horizontal scrolling */}
          <div className="w-full">
            <TabsList className="w-full flex flex-col gap-2 h-auto p-2 bg-muted/50">
              {/* Production environments */}
              {productionEnvs.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="px-3 py-1.5 text-sm font-medium bg-green-100 text-green-800 rounded-md mb-1.5">
                    Production
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pl-2">
                    {productionEnvs.map((env) => (
                      <TabsTrigger
                        key={env.name}
                        value={env.name}
                        className="text-xs py-1.5 px-3 border border-green-200 data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-green-300"
                      >
                        {env.name}
                      </TabsTrigger>
                    ))}
                  </div>
                </div>
              )}

              {/* Staging environments */}
              {stagingEnvs.length > 0 && (
                <div className="flex flex-col w-full mt-1">
                  <div className="px-3 py-1.5 text-sm font-medium bg-amber-100 text-amber-800 rounded-md mb-1.5">
                    Staging
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pl-2">
                    {stagingEnvs.map((env) => (
                      <TabsTrigger
                        key={env.name}
                        value={env.name}
                        className="text-xs py-1.5 px-3 border border-amber-200 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 data-[state=active]:border-amber-300"
                      >
                        {env.name}
                      </TabsTrigger>
                    ))}
                  </div>
                </div>
              )}

              {/* Development environments */}
              {developmentEnvs.length > 0 && (
                <div className="flex flex-col w-full mt-1">
                  <div className="px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-md mb-1.5">
                    Development
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pl-2">
                    {developmentEnvs.map((env) => (
                      <TabsTrigger
                        key={env.name}
                        value={env.name}
                        className="text-xs py-1.5 px-3 border border-blue-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:border-blue-300"
                      >
                        {env.name}
                      </TabsTrigger>
                    ))}
                  </div>
                </div>
              )}
            </TabsList>
          </div>

          {environments.map((env) => (
            <TabsContent key={env.name} value={env.name} className="space-y-4">
              {selectedEnvDetails && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Traffic Capacity</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">{selectedEnvDetails.specs.traffic.badge}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Annual Visits</span>
                          <span className="font-medium">{selectedEnvDetails.specs.traffic.visits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unique Visitors</span>
                          <span className="font-medium">{selectedEnvDetails.specs.traffic.visitors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pageviews</span>
                          <span className="font-medium">{selectedEnvDetails.specs.traffic.pageviews}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">Server Configuration</span>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          {env.type === "production" ? "Enterprise" : "Standard"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>PHP Version</span>
                          <span className="font-medium">8.2+ FPM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Drupal Support</span>
                          <span className="font-medium">10-11+</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TTFB</span>
                          <span className="font-medium">&lt;500ms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Database Storage</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Allocated</span>
                          <span>{selectedEnvDetails.specs.database.allocated}</span>
                        </div>
                        <Progress value={selectedEnvDetails.specs.database.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Used: {selectedEnvDetails.specs.database.used}</span>
                          <span>{selectedEnvDetails.specs.database.percentage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">Filesystem Storage</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Allocated</span>
                          <span>{selectedEnvDetails.specs.filesystem.allocated}</span>
                        </div>
                        <Progress value={selectedEnvDetails.specs.filesystem.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Used: {selectedEnvDetails.specs.filesystem.used}</span>
                          <span>{selectedEnvDetails.specs.filesystem.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Performance Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted rounded-md p-3">
                        <div className="text-xs text-muted-foreground">Avg. CPU Usage</div>
                        <div className="text-lg font-medium">{selectedEnvDetails.specs.performance.cpu}</div>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <div className="text-xs text-muted-foreground">Avg. Memory</div>
                        <div className="text-lg font-medium">{selectedEnvDetails.specs.performance.memory}</div>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <div className="text-xs text-muted-foreground">Cache Hit Ratio</div>
                        <div className="text-lg font-medium">{selectedEnvDetails.specs.performance.cacheHit}</div>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <div className="text-xs text-muted-foreground">Avg. Response</div>
                        <div className="text-lg font-medium">{selectedEnvDetails.specs.performance.response}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
