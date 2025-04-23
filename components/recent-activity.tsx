import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start">
          <Avatar className="h-9 w-9 mr-4">
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.action}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const activities = [
  {
    action: "Deployed main-website-prod from branch main",
    time: "2 hours ago",
    user: {
      name: "Admin User",
      initials: "AU",
    },
  },
  {
    action: "Created backup of alumni-prod",
    time: "4 hours ago",
    user: {
      name: "System",
      initials: "SY",
    },
  },
  {
    action: "Updated Drupal core on main-website-staging to 10.1.2",
    time: "Yesterday at 3:45 PM",
    user: {
      name: "Jane Smith",
      initials: "JS",
    },
  },
  {
    action: "Added new domain events.fredonia.edu",
    time: "Yesterday at 11:30 AM",
    user: {
      name: "Admin User",
      initials: "AU",
    },
  },
  {
    action: "Restored alumni-staging from backup",
    time: "2 days ago",
    user: {
      name: "John Doe",
      initials: "JD",
    },
  },
]
