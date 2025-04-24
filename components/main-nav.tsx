import Link from "next/link"
import { Server } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Server className="h-6 w-6 text-blue-600" />
        <span className="font-bold inline-block">Drupal Cloud</span>
      </Link>
    </div>
  )
}
