"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export function PerformanceMetrics() {
  return (
    <Tabs defaultValue="cpu" className="space-y-4">
      <TabsList>
        <TabsTrigger value="cpu">CPU Usage</TabsTrigger>
        <TabsTrigger value="memory">Memory Usage</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
        <TabsTrigger value="response">Response Time</TabsTrigger>
      </TabsList>
      <TabsContent value="cpu" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cpuData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="usage" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="memory" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={memoryData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="usage" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="requests" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={requestsData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="response" className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={responseTimeData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="time" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}

const cpuData = [
  { time: "00:00", usage: 25 },
  { time: "02:00", usage: 30 },
  { time: "04:00", usage: 22 },
  { time: "06:00", usage: 18 },
  { time: "08:00", usage: 35 },
  { time: "10:00", usage: 45 },
  { time: "12:00", usage: 62 },
  { time: "14:00", usage: 58 },
  { time: "16:00", usage: 70 },
  { time: "18:00", usage: 55 },
  { time: "20:00", usage: 40 },
  { time: "22:00", usage: 32 },
]

const memoryData = [
  { time: "00:00", usage: 45 },
  { time: "02:00", usage: 46 },
  { time: "04:00", usage: 45 },
  { time: "06:00", usage: 44 },
  { time: "08:00", usage: 48 },
  { time: "10:00", usage: 55 },
  { time: "12:00", usage: 65 },
  { time: "14:00", usage: 70 },
  { time: "16:00", usage: 75 },
  { time: "18:00", usage: 68 },
  { time: "20:00", usage: 60 },
  { time: "22:00", usage: 50 },
]

const requestsData = [
  { time: "00:00", count: 120 },
  { time: "02:00", count: 80 },
  { time: "04:00", count: 60 },
  { time: "06:00", count: 100 },
  { time: "08:00", count: 250 },
  { time: "10:00", count: 380 },
  { time: "12:00", count: 420 },
  { time: "14:00", count: 450 },
  { time: "16:00", count: 400 },
  { time: "18:00", count: 320 },
  { time: "20:00", count: 240 },
  { time: "22:00", count: 180 },
]

const responseTimeData = [
  { time: "00:00", time: 180 },
  { time: "02:00", time: 170 },
  { time: "04:00", time: 160 },
  { time: "06:00", time: 185 },
  { time: "08:00", time: 210 },
  { time: "10:00", time: 260 },
  { time: "12:00", time: 290 },
  { time: "14:00", time: 310 },
  { time: "16:00", time: 285 },
  { time: "18:00", time: 250 },
  { time: "20:00", time: 220 },
  { time: "22:00", time: 190 },
]
