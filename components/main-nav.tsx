import Link from "next/link"
import { Server } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Server className="h-6 w-6 text-blue-600" />
        <span className="font-bold inline-block">Drupal Cloud</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link
          href="/dashboard/environments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Environments
        </Link>
        <Link
          href="/dashboard/deployments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Deployments
        </Link>
      </nav>
    </div>
  )
}
