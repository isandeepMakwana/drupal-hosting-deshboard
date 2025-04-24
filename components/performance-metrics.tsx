"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDashboard } from "@/contexts/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceMetrics() {
  const { environments } = useDashboard()
  const [selectedEnvironment, setSelectedEnvironment] = useState("all")

  // Sample data for performance metrics
  const cpuData = [
    { time: "00:00", all: 25, "main-website-prod": 30, "admissions-prod": 22, "alumni-prod": 18 },
    { time: "02:00", all: 30, "main-website-prod": 35, "admissions-prod": 28, "alumni-prod": 25 },
    { time: "04:00", all: 22, "main-website-prod": 25, "admissions-prod": 20, "alumni-prod": 18 },
    { time: "06:00", all: 18, "main-website-prod": 20, "admissions-prod": 15, "alumni-prod": 12 },
    { time: "08:00", all: 35, "main-website-prod": 40, "admissions-prod": 32, "alumni-prod": 30 },
    { time: "10:00", all: 45, "main-website-prod": 50, "admissions-prod": 42, "alumni-prod": 40 },
    { time: "12:00", all: 62, "main-website-prod": 68, "admissions-prod": 60, "alumni-prod": 58 },
    { time: "14:00", all: 58, "main-website-prod": 62, "admissions-prod": 55, "alumni-prod": 52 },
    { time: "16:00", all: 70, "main-website-prod": 75, "admissions-prod": 68, "alumni-prod": 65 },
    { time: "18:00", all: 55, "main-website-prod": 60, "admissions-prod": 52, "alumni-prod": 50 },
    { time: "20:00", all: 40, "main-website-prod": 45, "admissions-prod": 38, "alumni-prod": 35 },
    { time: "22:00", all: 32, "main-website-prod": 35, "admissions-prod": 30, "alumni-prod": 28 },
  ]

  const memoryData = [
    { time: "00:00", all: 45, "main-website-prod": 50, "admissions-prod": 42, "alumni-prod": 40 },
    { time: "02:00", all: 46, "main-website-prod": 52, "admissions-prod": 44, "alumni-prod": 42 },
    { time: "04:00", all: 45, "main-website-prod": 50, "admissions-prod": 42, "alumni-prod": 40 },
    { time: "06:00", all: 44, "main-website-prod": 48, "admissions-prod": 40, "alumni-prod": 38 },
    { time: "08:00", all: 48, "main-website-prod": 52, "admissions-prod": 45, "alumni-prod": 42 },
    { time: "10:00", all: 55, "main-website-prod": 60, "admissions-prod": 52, "alumni-prod": 50 },
    { time: "12:00", all: 65, "main-website-prod": 70, "admissions-prod": 62, "alumni-prod": 60 },
    { time: "14:00", all: 70, "main-website-prod": 75, "admissions-prod": 68, "alumni-prod": 65 },
    { time: "16:00", all: 75, "main-website-prod": 80, "admissions-prod": 72, "alumni-prod": 70 },
    { time: "18:00", all: 68, "main-website-prod": 72, "admissions-prod": 65, "alumni-prod": 62 },
    { time: "20:00", all: 60, "main-website-prod": 65, "admissions-prod": 58, "alumni-prod": 55 },
    { time: "22:00", all: 50, "main-website-prod": 55, "admissions-prod": 48, "alumni-prod": 45 },
  ]

  const requestsData = [
    { time: "00:00", all: 120, "main-website-prod": 150, "admissions-prod": 100, "alumni-prod": 80 },
    { time: "02:00", all: 80, "main-website-prod": 100, "admissions-prod": 70, "alumni-prod": 60 },
    { time: "04:00", all: 60, "main-website-prod": 80, "admissions-prod": 50, "alumni-prod": 40 },
    { time: "06:00", all: 100, "main-website-prod": 120, "admissions-prod": 90, "alumni-prod": 70 },
    { time: "08:00", all: 250, "main-website-prod": 300, "admissions-prod": 220, "alumni-prod": 200 },
    { time: "10:00", all: 380, "main-website-prod": 420, "admissions-prod": 350, "alumni-prod": 320 },
    { time: "12:00", all: 420, "main-website-prod": 480, "admissions-prod": 400, "alumni-prod": 380 },
    { time: "14:00", all: 450, "main-website-prod": 500, "admissions-prod": 420, "alumni-prod": 400 },
    { time: "16:00", all: 400, "main-website-prod": 450, "admissions-prod": 380, "alumni-prod": 350 },
    { time: "18:00", all: 320, "main-website-prod": 380, "admissions-prod": 300, "alumni-prod": 280 },
    { time: "20:00", all: 240, "main-website-prod": 280, "admissions-prod": 220, "alumni-prod": 200 },
    { time: "22:00", all: 180, "main-website-prod": 220, "admissions-prod": 160, "alumni-prod": 140 },
  ]

  const responseTimeData = [
    { time: "00:00", all: 180, "main-website-prod": 200, "admissions-prod": 170, "alumni-prod": 160 },
    { time: "02:00", all: 170, "main-website-prod": 190, "admissions-prod": 160, "alumni-prod": 150 },
    { time: "04:00", all: 160, "main-website-prod": 180, "admissions-prod": 150, "alumni-prod": 140 },
    { time: "06:00", all: 185, "main-website-prod": 205, "admissions-prod": 175, "alumni-prod": 165 },
    { time: "08:00", all: 210, "main-website-prod": 230, "admissions-prod": 200, "alumni-prod": 190 },
    { time: "10:00", all: 260, "main-website-prod": 280, "admissions-prod": 250, "alumni-prod": 240 },
    { time: "12:00", all: 290, "main-website-prod": 310, "admissions-prod": 280, "alumni-prod": 270 },
    { time: "14:00", all: 310, "main-website-prod": 330, "admissions-prod": 300, "alumni-prod": 290 },
    { time: "16:00", all: 285, "main-website-prod": 305, "admissions-prod": 275, "alumni-prod": 265 },
    { time: "18:00", all: 250, "main-website-prod": 270, "admissions-prod": 240, "alumni-prod": 230 },
    { time: "20:00", all: 220, "main-website-prod": 240, "admissions-prod": 210, "alumni-prod": 200 },
    { time: "22:00", all: 190, "main-website-prod": 210, "admissions-prod": 180, "alumni-prod": 170 },
  ]

  // Get environment options for the dropdown
  const environmentOptions = [
    { value: "all", label: "All Environments" },
    ...environments.map((env) => ({ value: env.name, label: env.name })),
  ]

  // Function to get the appropriate data based on selected environment
  const getDataForEnvironment = (data) => {
    if (selectedEnvironment === "all") {
      return data
    }

    // Create a filtered dataset that only includes the time and selected environment
    return data.map((item) => ({
      time: item.time,
      [selectedEnvironment]: item[selectedEnvironment] || 0,
    }))
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>System resource utilization over the last 24 hours</CardDescription>
          </div>
          <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              {environmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cpu">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="cpu">CPU</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="response">Response Time</TabsTrigger>
          </TabsList>
          <TabsContent value="cpu" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getDataForEnvironment(cpuData)}
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
                  {selectedEnvironment === "all" ? (
                    <>
                      <Area
                        type="monotone"
                        dataKey="all"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        name="Average"
                      />
                      <Area
                        type="monotone"
                        dataKey="main-website-prod"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Main Website"
                      />
                      <Area
                        type="monotone"
                        dataKey="admissions-prod"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.3}
                        name="Admissions"
                      />
                      <Area
                        type="monotone"
                        dataKey="alumni-prod"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        name="Alumni"
                      />
                    </>
                  ) : (
                    <Area
                      type="monotone"
                      dataKey={selectedEnvironment}
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name={selectedEnvironment}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="memory" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getDataForEnvironment(memoryData)}
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
                  {selectedEnvironment === "all" ? (
                    <>
                      <Area
                        type="monotone"
                        dataKey="all"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Average"
                      />
                      <Area
                        type="monotone"
                        dataKey="main-website-prod"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        name="Main Website"
                      />
                      <Area
                        type="monotone"
                        dataKey="admissions-prod"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.3}
                        name="Admissions"
                      />
                      <Area
                        type="monotone"
                        dataKey="alumni-prod"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        name="Alumni"
                      />
                    </>
                  ) : (
                    <Area
                      type="monotone"
                      dataKey={selectedEnvironment}
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name={selectedEnvironment}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="requests" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getDataForEnvironment(requestsData)}
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
                  {selectedEnvironment === "all" ? (
                    <>
                      <Line type="monotone" dataKey="all" stroke="#8b5cf6" strokeWidth={2} name="Average" />
                      <Line
                        type="monotone"
                        dataKey="main-website-prod"
                        stroke="#2563eb"
                        strokeWidth={1}
                        name="Main Website"
                      />
                      <Line
                        type="monotone"
                        dataKey="admissions-prod"
                        stroke="#f59e0b"
                        strokeWidth={1}
                        name="Admissions"
                      />
                      <Line type="monotone" dataKey="alumni-prod" stroke="#10b981" strokeWidth={1} name="Alumni" />
                    </>
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={selectedEnvironment}
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name={selectedEnvironment}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="response" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getDataForEnvironment(responseTimeData)}
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
                  {selectedEnvironment === "all" ? (
                    <>
                      <Line type="monotone" dataKey="all" stroke="#f59e0b" strokeWidth={2} name="Average" />
                      <Line
                        type="monotone"
                        dataKey="main-website-prod"
                        stroke="#2563eb"
                        strokeWidth={1}
                        name="Main Website"
                      />
                      <Line
                        type="monotone"
                        dataKey="admissions-prod"
                        stroke="#8b5cf6"
                        strokeWidth={1}
                        name="Admissions"
                      />
                      <Line type="monotone" dataKey="alumni-prod" stroke="#10b981" strokeWidth={1} name="Alumni" />
                    </>
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={selectedEnvironment}
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name={selectedEnvironment}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 p-3 bg-green-50 rounded-md text-sm text-green-800">
          <p className="font-medium">System Uptime: 99.99%</p>
          <p className="text-xs mt-1">Last 30 days: 43,178 minutes of 43,200 minutes</p>
        </div>
      </CardContent>
    </Card>
  )
}
