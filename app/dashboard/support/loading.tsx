import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"

export default function SupportLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Live Support" description="Get real-time help with your Drupal hosting platform.">
        <Skeleton className="h-10 w-[120px]" />
      </DashboardHeader>
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px] ml-1" />
          <Skeleton className="h-10 w-[100px] ml-1" />
        </TabsList>
        <TabsContent value="tickets">
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[350px] mt-2" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[180px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
