"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CacheList } from "@/components/cache-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboard } from "@/contexts/dashboard-context"

export default function CacheManagementPage() {
  const { caches, clearAllCaches, clearCache, toggleCacheStatus } = useDashboard()

  // Filter caches by type
  const memcacheCaches = caches.filter((cache) => cache.type === "memcache" || !cache.type)
  const cdnCaches = caches.filter((cache) => cache.type === "cdn")
  const redisCaches = caches.filter((cache) => cache.type === "redis")

  // Calculate total cache size
  const totalCacheSize = caches.reduce((total, cache) => {
    const sizeInMB = Number.parseInt(cache.size.split(" ")[0]) || 0
    return total + sizeInMB
  }, 0)

  // Count enabled caches
  const enabledCaches = caches.filter((c) => c.status === "enabled").length

  return (
    <DashboardShell>
      <DashboardHeader heading="Cache Management" description="Manage Drupal and CDN caches for optimal performance.">
        <Button onClick={clearAllCaches}>Clear All Caches</Button>
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
            <div className="text-2xl font-bold">{caches.length}</div>
            <p className="text-xs text-muted-foreground">{enabledCaches} enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Cleared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caches[0]?.lastCleared || "N/A"}</div>
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

      <Tabs defaultValue="memcache" className="mt-4">
        <TabsList>
          <TabsTrigger value="memcache">Memcache ({memcacheCaches.length})</TabsTrigger>
          <TabsTrigger value="cdn">CDN Cache ({cdnCaches.length})</TabsTrigger>
          <TabsTrigger value="redis">Redis Cache ({redisCaches.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="memcache">
          <Card>
            <CardHeader>
              <CardTitle>Memcache Management</CardTitle>
              <CardDescription>Manage Memcache for optimal performance</CardDescription>
            </CardHeader>
            <CardContent>
              <CacheList caches={memcacheCaches} onClearCache={clearCache} onToggleStatus={toggleCacheStatus} />
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
              {cdnCaches.length > 0 ? (
                <CacheList caches={cdnCaches} onClearCache={clearCache} onToggleStatus={toggleCacheStatus} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No CDN caches configured. Enable CDN caching in your deployment settings.
                </div>
              )}
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
              {redisCaches.length > 0 ? (
                <CacheList caches={redisCaches} onClearCache={clearCache} onToggleStatus={toggleCacheStatus} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No Redis caches configured. Enable Redis caching in your deployment settings.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
