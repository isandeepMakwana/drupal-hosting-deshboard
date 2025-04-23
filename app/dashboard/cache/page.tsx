"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CacheList } from "@/components/cache-list"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CacheManagementPage() {
  const { toast } = useToast()
  const [isClearing, setIsClearing] = useState(false)
  const [lastCleared, setLastCleared] = useState("3 hours ago")

  const [cacheTypes, setCacheTypes] = useState([
    {
      id: "1",
      name: "Page Cache",
      size: "245 MB",
      items: "1,245",
      lastCleared: "3 hours ago",
      status: "enabled",
    },
    {
      id: "2",
      name: "Block Cache",
      size: "56 MB",
      items: "324",
      lastCleared: "3 hours ago",
      status: "enabled",
    },
    {
      id: "3",
      name: "Entity Cache",
      size: "189 MB",
      items: "2,567",
      lastCleared: "3 hours ago",
      status: "enabled",
    },
    {
      id: "4",
      name: "Menu Cache",
      size: "12 MB",
      items: "45",
      lastCleared: "3 hours ago",
      status: "enabled",
    },
    {
      id: "5",
      name: "Render Cache",
      size: "78 MB",
      items: "890",
      lastCleared: "3 hours ago",
      status: "enabled",
    },
  ])

  const handleClearAllCache = () => {
    setIsClearing(true)

    toast({
      title: "Clearing all caches",
      description: "This may take a few moments...",
    })

    // Simulate API call
    setTimeout(() => {
      setIsClearing(false)

      // Update all cache types
      const now = "Just now"
      setCacheTypes(
        cacheTypes.map((cache) => ({
          ...cache,
          size: "0 MB",
          items: "0",
          lastCleared: now,
        })),
      )

      setLastCleared(now)

      toast({
        title: "All caches cleared",
        description: "Cache has been successfully cleared across all environments",
      })
    }, 2000)
  }

  const handleClearSpecificCache = (cacheId: string) => {
    // Find the cache to clear
    const cacheToUpdate = cacheTypes.find((c) => c.id === cacheId)

    if (!cacheToUpdate) return

    toast({
      title: `Clearing ${cacheToUpdate.name}`,
      description: "This may take a moment...",
    })

    // Simulate API call
    setTimeout(() => {
      // Update specific cache type
      const now = "Just now"
      setCacheTypes(
        cacheTypes.map((cache) =>
          cache.id === cacheId
            ? {
                ...cache,
                size: "0 MB",
                items: "0",
                lastCleared: now,
              }
            : cache,
        ),
      )

      toast({
        title: `${cacheToUpdate.name} cleared`,
        description: "Cache has been successfully cleared",
      })
    }, 1000)
  }

  const handleToggleCacheStatus = (cacheId: string) => {
    // Find the cache to toggle
    const cacheToUpdate = cacheTypes.find((c) => c.id === cacheId)

    if (!cacheToUpdate) return

    const newStatus = cacheToUpdate.status === "enabled" ? "disabled" : "enabled"

    // Update cache status
    setCacheTypes(
      cacheTypes.map((cache) =>
        cache.id === cacheId
          ? {
              ...cache,
              status: newStatus,
            }
          : cache,
      ),
    )

    toast({
      title: `${cacheToUpdate.name} ${newStatus}`,
      description: `Cache has been ${newStatus}`,
    })
  }

  // Calculate total cache size
  const totalCacheSize = cacheTypes.reduce((total, cache) => {
    const sizeInMB = Number.parseInt(cache.size.split(" ")[0]) || 0
    return total + sizeInMB
  }, 0)

  // Count enabled caches
  const enabledCaches = cacheTypes.filter((c) => c.status === "enabled").length

  return (
    <DashboardShell>
      <DashboardHeader heading="Cache Management" description="Manage Drupal and CDN caches for optimal performance.">
        <Button onClick={handleClearAllCache} disabled={isClearing}>
          {isClearing ? "Clearing..." : "Clear All Caches"}
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cache Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCacheSize} MB</div>
            <p className="text-xs text-muted-foreground">Across all environments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cacheTypes.length}</div>
            <p className="text-xs text-muted-foreground">{enabledCaches} enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Cleared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastCleared}</div>
            <p className="text-xs text-muted-foreground">All caches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drupal" className="mt-4">
        <TabsList>
          <TabsTrigger value="drupal">Drupal Cache</TabsTrigger>
          <TabsTrigger value="cdn">CDN Cache</TabsTrigger>
          <TabsTrigger value="redis">Redis Cache</TabsTrigger>
        </TabsList>
        <TabsContent value="drupal">
          <Card>
            <CardHeader>
              <CardTitle>Drupal Cache Management</CardTitle>
              <CardDescription>Manage internal Drupal caches</CardDescription>
            </CardHeader>
            <CardContent>
              <CacheList
                caches={cacheTypes}
                onClearCache={handleClearSpecificCache}
                onToggleStatus={handleToggleCacheStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cdn">
          <Card>
            <CardHeader>
              <CardTitle>CDN Cache Management</CardTitle>
              <CardDescription>Manage CloudFront CDN caches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">CDN cache management coming soon</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="redis">
          <Card>
            <CardHeader>
              <CardTitle>Redis Cache Management</CardTitle>
              <CardDescription>Manage Redis object cache</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">Redis cache management coming soon</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
