"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample performance data for the sites
const performanceData = [
  {
    name: "Mon",
    "main-website-prod": 240,
    "admissions-prod": 320,
    "alumni-prod": 280,
    "events-prod": 190,
  },
  {
    name: "Tue",
    "main-website-prod": 230,
    "admissions-prod": 298,
    "alumni-prod": 290,
    "events-prod": 210,
  },
  {
    name: "Wed",
    "main-website-prod": 270,
    "admissions-prod": 310,
    "alumni-prod": 320,
    "events-prod": 220,
  },
  {
    name: "Thu",
    "main-website-prod": 250,
    "admissions-prod": 280,
    "alumni-prod": 300,
    "events-prod": 200,
  },
  {
    name: "Fri",
    "main-website-prod": 290,
    "admissions-prod": 330,
    "alumni-prod": 340,
    "events-prod": 230,
  },
  {
    name: "Sat",
    "main-website-prod": 220,
    "admissions-prod": 270,
    "alumni-prod": 260,
    "events-prod": 180,
  },
  {
    name: "Sun",
    "main-website-prod": 210,
    "admissions-prod": 250,
    "alumni-prod": 240,
    "events-prod": 170,
  },
]

export function SitePerformanceGraph() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={performanceData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="main-website-prod"
          name="Main Website"
          stroke="#2563eb"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="admissions-prod" name="Admissions" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="alumni-prod" name="Alumni" stroke="#f59e0b" strokeWidth={2} />
        <Line type="monotone" dataKey="events-prod" name="Events" stroke="#8b5cf6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
