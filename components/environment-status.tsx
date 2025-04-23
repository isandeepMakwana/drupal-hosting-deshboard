import { Badge } from "@/components/ui/badge"

export function EnvironmentStatus() {
  return (
    <div className="space-y-4">
      {environments.map((env) => (
        <div key={env.name} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`h-2 w-2 rounded-full ${getStatusColor(env.status)}`} />
            <div>
              <p className="text-sm font-medium">{env.name}</p>
              <p className="text-xs text-muted-foreground">{env.url}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(env.status)}>{env.status}</Badge>
        </div>
      ))}
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "Healthy":
      return "bg-green-500"
    case "Warning":
      return "bg-yellow-500"
    case "Error":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Healthy":
      return "default"
    case "Warning":
      return "secondary"
    case "Error":
      return "destructive"
    default:
      return "outline"
  }
}

const environments = [
  {
    name: "main-website-prod",
    url: "www.fredonia.edu",
    status: "Healthy",
  },
  {
    name: "admissions-prod",
    url: "admissions.fredonia.edu",
    status: "Healthy",
  },
  {
    name: "alumni-prod",
    url: "alumni.fredonia.edu",
    status: "Warning",
  },
  {
    name: "main-website-staging",
    url: "staging.fredonia.edu",
    status: "Healthy",
  },
  {
    name: "admissions-staging",
    url: "admissions-staging.fredonia.edu",
    status: "Healthy",
  },
  {
    name: "alumni-staging",
    url: "alumni-staging.fredonia.edu",
    status: "Error",
  },
]
