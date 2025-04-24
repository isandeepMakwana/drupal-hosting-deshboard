"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Cloud,
  Database,
  GitBranch,
  Globe,
  Home,
  HelpCircle,
  RefreshCw,
  Server,
  Settings,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      <Link href="/dashboard">
        <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/dashboard/environments">
        <Button
          variant={pathname === "/dashboard/environments" ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Server className="mr-2 h-4 w-4" />
          Environments
        </Button>
      </Link>
      <Link href="/dashboard/logs">
        <Button variant={pathname === "/dashboard/logs" ? "secondary" : "ghost"} className="w-full justify-start">
          <BarChart className="mr-2 h-4 w-4" />
          Logs & Metrics
        </Button>
      </Link>
      <Link href="/dashboard/backups">
        <Button variant={pathname === "/dashboard/backups" ? "secondary" : "ghost"} className="w-full justify-start">
          <Database className="mr-2 h-4 w-4" />
          Backups & Restores
        </Button>
      </Link>
      <Link href="/dashboard/updates">
        <Button variant={pathname === "/dashboard/updates" ? "secondary" : "ghost"} className="w-full justify-start">
          <RefreshCw className="mr-2 h-4 w-4" />
          Drupal Updates
        </Button>
      </Link>
      <Link href="/dashboard/deployments">
        <Button
          variant={pathname === "/dashboard/deployments" ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <GitBranch className="mr-2 h-4 w-4" />
          Git Deployments
        </Button>
      </Link>
      <Link href="/dashboard/domains">
        <Button variant={pathname === "/dashboard/domains" ? "secondary" : "ghost"} className="w-full justify-start">
          <Globe className="mr-2 h-4 w-4" />
          SSL & Domains
        </Button>
      </Link>
      <Link href="/dashboard/access">
        <Button variant={pathname === "/dashboard/access" ? "secondary" : "ghost"} className="w-full justify-start">
          <Shield className="mr-2 h-4 w-4" />
          Access Control
        </Button>
      </Link>
      <Link href="/dashboard/cache">
        <Button variant={pathname === "/dashboard/cache" ? "secondary" : "ghost"} className="w-full justify-start">
          <Cloud className="mr-2 h-4 w-4" />
          Cache Management
        </Button>
      </Link>
      <Link href="/dashboard/support">
        <Button variant={pathname === "/dashboard/support" ? "secondary" : "ghost"} className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Live Support
        </Button>
      </Link>
      <Link href="/dashboard/settings">
        <Button variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"} className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  )
}
