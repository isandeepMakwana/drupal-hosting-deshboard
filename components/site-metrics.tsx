"use client"

export function SiteMetrics() {
  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p>Site performance metrics visualization</p>
        <p className="text-sm mt-2">Average response time: 240ms</p>
      </div>
    </div>
  )
}
