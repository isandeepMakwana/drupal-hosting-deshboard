import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function LogsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log, index) => (
          <TableRow key={index}>
            <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
            <TableCell>{log.environment}</TableCell>
            <TableCell>
              <Badge
                className={
                  log.level === "ERROR"
                    ? "bg-red-100 text-red-800"
                    : log.level === "WARNING"
                      ? "bg-yellow-100 text-yellow-800"
                      : log.level === "INFO"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                }
              >
                {log.level}
              </Badge>
            </TableCell>
            <TableCell className="max-w-md truncate">{log.message}</TableCell>
            <TableCell>{log.source}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const logs = [
  {
    timestamp: "2023-06-15 14:32:45",
    environment: "alumni-staging",
    level: "ERROR",
    message: "Failed to connect to database: Connection timed out",
    source: "Drupal/Database",
  },
  {
    timestamp: "2023-06-15 14:30:12",
    environment: "main-website-prod",
    level: "INFO",
    message: "Cache cleared successfully",
    source: "Drupal/Cache",
  },
  {
    timestamp: "2023-06-15 14:28:55",
    environment: "admissions-prod",
    level: "WARNING",
    message: "High memory usage detected: 85% of allocated memory",
    source: "System/Memory",
  },
  {
    timestamp: "2023-06-15 14:25:33",
    environment: "main-website-dev",
    level: "INFO",
    message: "Deployment completed successfully",
    source: "Deployment/Git",
  },
  {
    timestamp: "2023-06-15 14:22:18",
    environment: "alumni-prod",
    level: "WARNING",
    message: "Slow database query detected: SELECT * FROM node WHERE type = 'event' ORDER BY created DESC",
    source: "Drupal/Database",
  },
  {
    timestamp: "2023-06-15 14:20:01",
    environment: "admissions-staging",
    level: "INFO",
    message: "User admin logged in",
    source: "Drupal/User",
  },
  {
    timestamp: "2023-06-15 14:15:45",
    environment: "main-website-prod",
    level: "ERROR",
    message: "PHP Fatal error: Allowed memory size of 134217728 bytes exhausted",
    source: "PHP/Memory",
  },
  {
    timestamp: "2023-06-15 14:10:22",
    environment: "events-prod",
    level: "INFO",
    message: "Cron job completed successfully",
    source: "Drupal/Cron",
  },
]
