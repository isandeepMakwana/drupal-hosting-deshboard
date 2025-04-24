"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { Database, GitBranch, Globe, RefreshCw, Server, Shield, Cloud } from "lucide-react"

// Define types for our data models
export interface Environment {
  name: string
  status: "healthy" | "warning" | "error" | "initializing"
  type: "production" | "staging" | "development"
  url: string
  lastDeployed: string
  drupalVersion: string
}

export interface Deployment {
  id: string
  environment: string
  branch: string
  commit: string
  deployedBy: string
  deployedAt: string
  status: "Success" | "Failed" | "In Progress"
  cacheOptions?: {
    drupalCache: boolean
    cdnCache: boolean
    redisCache: boolean
  }
}

export interface Backup {
  id: string
  environment: string
  type: string
  size: string
  created: string
  status: string
}

export interface Domain {
  name: string
  environment: string
  sslStatus: string
  sslExpiry: string
  dns: string
  created: string
}

export interface Update {
  id: string
  name: string
  type: string
  currentVersion: string
  newVersion: string
  affectedSites: string
  security: boolean
  status: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

export interface Cache {
  id: string
  name: string
  size: string
  items: string
  lastCleared: string
  status: string
  type?: "drupal" | "cdn" | "redis"
}

export interface ActivityLog {
  id: string
  action: string
  time: string
  timestamp: number // Unix timestamp for sorting and time calculations
  user: {
    name: string
    initials: string
  }
  category: "deployment" | "backup" | "update" | "domain" | "environment" | "user" | "cache"
  details?: string
  relatedLinks?: Array<{
    label: string
    url?: string
    icon?: React.ReactNode
  }>
}

interface DashboardContextType {
  // Data
  environments: Environment[]
  deployments: Deployment[]
  backups: Backup[]
  domains: Domain[]
  updates: Update[]
  users: User[]
  caches: Cache[]
  activityLogs: ActivityLog[]

  // Environment actions
  createEnvironment: (environmentData: any) => void
  deleteEnvironment: (name: string) => void

  // Deployment actions
  createDeployment: (deploymentData: any) => void

  // Backup actions
  createBackup: (backupData: any) => void

  // Domain actions
  addDomain: (domainData: any) => void

  // Update actions
  checkForUpdates: () => void
  applyUpdate: (updateId: string) => void
  scheduleUpdate: (updateId: string) => void

  // User actions
  addUser: (userData: any) => void
  updateUserStatus: (userId: string, newStatus: string) => void
  deleteUser: (userId: string) => void

  // Cache actions
  clearAllCaches: () => void
  clearCache: (cacheId: string) => void
  toggleCacheStatus: (cacheId: string) => void
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

// Helper function to format relative time
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now()
  const diffInSeconds = Math.floor((now - timestamp) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  } else if (diffInSeconds < 172800) {
    return "Yesterday"
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} ${days === 1 ? "day" : "days"} ago`
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  } else {
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }
}

// Create a provider component
export function DashboardProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()

  // Initialize state for all data models
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      name: "main-website-prod",
      status: "healthy",
      type: "production",
      url: "https://www.example.com",
      lastDeployed: "2 days ago",
      drupalVersion: "11.0.0",
    },
    {
      name: "admissions-prod",
      status: "healthy",
      type: "production",
      url: "https://admissions.example.com",
      lastDeployed: "5 days ago",
      drupalVersion: "10.2.0",
    },
    {
      name: "alumni-prod",
      status: "warning",
      type: "production",
      url: "https://alumni.example.com",
      lastDeployed: "14 days ago",
      drupalVersion: "10.1.2",
    },
    {
      name: "main-website-staging",
      status: "healthy",
      type: "staging",
      url: "https://staging.example.com",
      lastDeployed: "1 day ago",
      drupalVersion: "11.0.0",
    },
    {
      name: "admissions-staging",
      status: "healthy",
      type: "staging",
      url: "https://admissions-staging.example.com",
      lastDeployed: "3 days ago",
      drupalVersion: "10.2.0",
    },
    {
      name: "alumni-staging",
      status: "error",
      type: "staging",
      url: "https://alumni-staging.example.com",
      lastDeployed: "2 days ago",
      drupalVersion: "11.0.0",
    },
    {
      name: "main-website-dev",
      status: "healthy",
      type: "development",
      url: "https://dev.example.com",
      lastDeployed: "12 hours ago",
      drupalVersion: "11.0.0",
    },
    {
      name: "admissions-dev",
      status: "healthy",
      type: "development",
      url: "https://admissions-dev.example.com",
      lastDeployed: "1 day ago",
      drupalVersion: "10.2.0",
    },
    {
      name: "alumni-dev",
      status: "healthy",
      type: "development",
      url: "https://alumni-dev.example.com",
      lastDeployed: "6 hours ago",
      drupalVersion: "11.0.0",
    },
  ])

  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: "dep_12345",
      environment: "main-website-dev",
      branch: "feature/homepage",
      commit: "a1b2c3d",
      deployedBy: "Admin User",
      deployedAt: "6 hours ago",
      status: "Success",
      cacheOptions: {
        drupalCache: true,
        cdnCache: true,
        redisCache: false,
      },
    },
    {
      id: "dep_12344",
      environment: "admissions-staging",
      branch: "feature/application-form",
      commit: "e4f5g6h",
      deployedBy: "Jane Smith",
      deployedAt: "1 day ago",
      status: "Success",
      cacheOptions: {
        drupalCache: true,
        cdnCache: false,
        redisCache: true,
      },
    },
    {
      id: "dep_12343",
      environment: "main-website-prod",
      branch: "main",
      commit: "i7j8k9l",
      deployedBy: "Admin User",
      deployedAt: "2 days ago",
      status: "Success",
      cacheOptions: {
        drupalCache: true,
        cdnCache: true,
        redisCache: true,
      },
    },
    {
      id: "dep_12342",
      environment: "alumni-dev",
      branch: "feature/events",
      commit: "m1n2o3p",
      deployedBy: "John Doe",
      deployedAt: "3 days ago",
      status: "Failed",
    },
    {
      id: "dep_12341",
      environment: "admissions-prod",
      branch: "main",
      commit: "q4r5s6t",
      deployedBy: "Admin User",
      deployedAt: "5 days ago",
      status: "Success",
      cacheOptions: {
        drupalCache: true,
        cdnCache: true,
        redisCache: false,
      },
    },
  ])

  const [backups, setBackups] = useState<Backup[]>([
    {
      id: "bkp_12345",
      environment: "main-website-prod",
      type: "Automated",
      size: "2.4 GB",
      created: "2 hours ago",
      status: "Completed",
    },
    {
      id: "bkp_12344",
      environment: "admissions-prod",
      type: "Automated",
      size: "1.8 GB",
      created: "6 hours ago",
      status: "Completed",
    },
    {
      id: "bkp_12343",
      environment: "alumni-prod",
      type: "Manual",
      size: "1.2 GB",
      created: "1 day ago",
      status: "Completed",
    },
    {
      id: "bkp_12342",
      environment: "main-website-staging",
      type: "Pre-deployment",
      size: "2.3 GB",
      created: "1 day ago",
      status: "Completed",
    },
    {
      id: "bkp_12341",
      environment: "admissions-staging",
      type: "Automated",
      size: "1.7 GB",
      created: "2 days ago",
      status: "Completed",
    },
    {
      id: "bkp_12340",
      environment: "alumni-staging",
      type: "Manual",
      size: "1.1 GB",
      created: "3 days ago",
      status: "Completed",
    },
  ])

  const [domains, setDomains] = useState<Domain[]>([
    {
      name: "www.example.com",
      environment: "main-website-prod",
      sslStatus: "Valid",
      sslExpiry: "11 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "admissions.example.com",
      environment: "admissions-prod",
      sslStatus: "Valid",
      sslExpiry: "9 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "alumni.example.com",
      environment: "alumni-prod",
      sslStatus: "Expiring Soon",
      sslExpiry: "1 month",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "events.example.com",
      environment: "events-prod",
      sslStatus: "Expiring Soon",
      sslExpiry: "1 month",
      dns: "Verified",
      created: "6 months ago",
    },
    {
      name: "staging.example.com",
      environment: "main-website-staging",
      sslStatus: "Valid",
      sslExpiry: "10 months",
      dns: "Verified",
      created: "1 year ago",
    },
    {
      name: "dev.example.com",
      environment: "main-website-dev",
      sslStatus: "Valid",
      sslExpiry: "10 months",
      dns: "Verified",
      created: "1 year ago",
    },
  ])

  const [updates, setUpdates] = useState<Update[]>([
    {
      id: "1",
      name: "Drupal Core",
      type: "Core",
      currentVersion: "10.1.0",
      newVersion: "11.0.0",
      affectedSites: "3",
      security: true,
      status: "available",
    },
    {
      id: "2",
      name: "Pathauto",
      type: "Module",
      currentVersion: "1.10.0",
      newVersion: "1.11.0",
      affectedSites: "5",
      security: false,
      status: "available",
    },
    {
      id: "3",
      name: "Views",
      type: "Module",
      currentVersion: "2.0.0",
      newVersion: "2.0.1",
      affectedSites: "8",
      security: true,
      status: "available",
    },
    {
      id: "4",
      name: "Media Library",
      type: "Module",
      currentVersion: "1.5.0",
      newVersion: "1.6.0",
      affectedSites: "4",
      security: false,
      status: "available",
    },
    {
      id: "5",
      name: "Webform",
      type: "Module",
      currentVersion: "6.1.3",
      newVersion: "6.1.4",
      affectedSites: "6",
      security: true,
      status: "available",
    },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Developer",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: "3",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Content Editor",
      status: "Active",
      lastLogin: "3 days ago",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Developer",
      status: "Active",
      lastLogin: "5 days ago",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Content Editor",
      status: "Inactive",
      lastLogin: "2 months ago",
    },
  ])

  const [caches, setCaches] = useState<Cache[]>([
    {
      id: "1",
      name: "Page Cache",
      size: "245 MB",
      items: "1,245",
      lastCleared: "3 hours ago",
      status: "enabled",
      type: "drupal",
    },
    {
      id: "2",
      name: "Block Cache",
      size: "56 MB",
      items: "324",
      lastCleared: "3 hours ago",
      status: "enabled",
      type: "drupal",
    },
    {
      id: "3",
      name: "Entity Cache",
      size: "189 MB",
      items: "2,567",
      lastCleared: "3 hours ago",
      status: "enabled",
      type: "drupal",
    },
    {
      id: "4",
      name: "Menu Cache",
      size: "12 MB",
      items: "45",
      lastCleared: "3 hours ago",
      status: "enabled",
      type: "drupal",
    },
    {
      id: "5",
      name: "Render Cache",
      size: "78 MB",
      items: "890",
      lastCleared: "3 hours ago",
      status: "enabled",
      type: "drupal",
    },
    {
      id: "6",
      name: "CloudFront Assets",
      size: "1,245 MB",
      items: "3,567",
      lastCleared: "1 day ago",
      status: "enabled",
      type: "cdn",
    },
    {
      id: "7",
      name: "CloudFront Images",
      size: "890 MB",
      items: "1,234",
      lastCleared: "1 day ago",
      status: "enabled",
      type: "cdn",
    },
    {
      id: "8",
      name: "Redis Object Cache",
      size: "345 MB",
      items: "5,678",
      lastCleared: "6 hours ago",
      status: "enabled",
      type: "redis",
    },
    {
      id: "9",
      name: "Redis Session Cache",
      size: "78 MB",
      items: "456",
      lastCleared: "6 hours ago",
      status: "enabled",
      type: "redis",
    },
    {
      id: "10",
      name: "Varnish Cache",
      size: "1,890 MB",
      items: "12,456",
      lastCleared: "12 hours ago",
      status: "enabled",
      type: "cdn",
    },
  ])

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "act_1",
      action: "Deployed main-website-prod from branch main",
      time: "2 hours ago",
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      user: {
        name: "Admin User",
        initials: "AU",
      },
      category: "deployment",
      details:
        "Successfully deployed commit i7j8k9l to main-website-prod environment. All post-deployment tests passed successfully. Deployment included 23 file changes across 8 modules.",
      relatedLinks: [
        {
          label: "View Deployment",
          icon: <GitBranch className="h-3.5 w-3.5 mr-1" />,
        },
        {
          label: "View Site",
          icon: <Globe className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_2",
      action: "Created backup of alumni-prod",
      time: "4 hours ago",
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      user: {
        name: "System",
        initials: "SY",
      },
      category: "backup",
      details:
        "Automated backup created for alumni-prod environment. Backup size: 1.2 GB. Backup includes database, files, and configuration.",
      relatedLinks: [
        {
          label: "Download Backup",
          icon: <Database className="h-3.5 w-3.5 mr-1" />,
        },
        {
          label: "Restore",
          icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_3",
      action: "Updated Drupal core on main-website-staging to 11.0.0",
      time: "Yesterday at 3:45 PM",
      timestamp: Date.now() - 28 * 60 * 60 * 1000,
      user: {
        name: "Jane Smith",
        initials: "JS",
      },
      category: "update",
      details:
        "Successfully updated Drupal core from 10.1.2 to 11.0.0 on main-website-staging environment. Update included security patches and new features. All post-update tests passed.",
      relatedLinks: [
        {
          label: "View Changes",
          icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_4",
      action: "Added new domain events.example.com",
      time: "Yesterday at 11:30 AM",
      timestamp: Date.now() - 36 * 60 * 60 * 1000,
      user: {
        name: "Admin User",
        initials: "AU",
      },
      category: "domain",
      details:
        "Added new domain events.example.com to events-prod environment. SSL certificate provisioned automatically. DNS verification completed successfully.",
      relatedLinks: [
        {
          label: "View Domain",
          icon: <Globe className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_5",
      action: "Restored alumni-staging from backup",
      time: "2 days ago",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      user: {
        name: "John Doe",
        initials: "JD",
      },
      category: "backup",
      details:
        "Restored alumni-staging environment from backup bkp_12340. Restoration included database, files, and configuration. Restoration completed successfully in 8 minutes.",
      relatedLinks: [
        {
          label: "View Environment",
          icon: <Server className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_6",
      action: "Added new user Sarah Johnson",
      time: "3 days ago",
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
      user: {
        name: "Admin User",
        initials: "AU",
      },
      category: "user",
      details:
        "Added new user Sarah Johnson (sarah.johnson@example.com) with Developer role. User has access to all development and staging environments.",
      relatedLinks: [
        {
          label: "View User",
          icon: <Shield className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_7",
      action: "Cleared all caches for main-website-prod",
      time: "3 days ago",
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000,
      user: {
        name: "Jane Smith",
        initials: "JS",
      },
      category: "cache",
      details:
        "Cleared all caches for main-website-prod environment, including Drupal, Redis, and Varnish caches. Total cache size cleared: 2.1 GB.",
      relatedLinks: [
        {
          label: "View Cache",
          icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
    {
      id: "act_8",
      action: "Created new development environment feature-homepage",
      time: "4 days ago",
      timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
      user: {
        name: "John Doe",
        initials: "JD",
      },
      category: "environment",
      details:
        "Created new development environment feature-homepage based on main-website-dev. Environment created with Drupal 11.0.0 and includes all modules and configurations from source environment.",
      relatedLinks: [
        {
          label: "View Environment",
          icon: <Server className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    },
  ])

  // Update activity log times periodically
  useEffect(() => {
    const updateActivityTimes = () => {
      setActivityLogs((prevLogs) =>
        prevLogs.map((log) => ({
          ...log,
          time: formatRelativeTime(log.timestamp),
        })),
      )
    }

    // Update times immediately
    updateActivityTimes()

    // Then update every minute
    const interval = setInterval(updateActivityTimes, 60000)

    return () => clearInterval(interval)
  }, [])

  // Helper function to add activity log
  const addActivityLog = (
    action: string,
    category: ActivityLog["category"],
    userName = "Admin User",
    details?: string,
    relatedLinks?: ActivityLog["relatedLinks"],
  ) => {
    const initials = userName
      .split(" ")
      .map((name) => name[0])
      .join("")

    const timestamp = Date.now()

    const newActivity: ActivityLog = {
      id: `act_${timestamp}`,
      action,
      time: "Just now",
      timestamp,
      user: {
        name: userName,
        initials,
      },
      category,
      details,
      relatedLinks,
    }

    setActivityLogs((prev) => [newActivity, ...prev])
    return newActivity
  }

  // Environment actions
  const createEnvironment = (environmentData: any) => {
    // Create a new environment
    const newEnvironment: Environment = {
      name: `${environmentData.site}-${environmentData.type}`,
      status: "initializing",
      type: environmentData.type as "production" | "staging" | "development",
      url: `https://${environmentData.site}-${environmentData.type}.example.com`,
      lastDeployed: "Just now",
      drupalVersion: environmentData.drupalVersion,
    }

    setEnvironments((prev) => [...prev, newEnvironment])

    // Add activity log
    addActivityLog(
      `Created new environment ${newEnvironment.name} with Drupal ${environmentData.drupalVersion}`,
      "environment",
      "Admin User",
      `Created new ${environmentData.type} environment for ${environmentData.site} with Drupal ${environmentData.drupalVersion}. ${environmentData.creationMethod === "clone" ? `Cloned from ${environmentData.sourceEnvironment}.` : "Created as blank environment."}`,
      [
        {
          label: "View Environment",
          icon: <Server className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    // Simulate environment initialization
    toast({
      title: "Environment creation started",
      description: `Creating ${newEnvironment.name}...`,
    })

    // Update status after 3 seconds
    setTimeout(() => {
      setEnvironments((prevEnvironments) =>
        prevEnvironments.map((env) => (env.name === newEnvironment.name ? { ...env, status: "healthy" } : env)),
      )

      // Add activity log for completion
      addActivityLog(
        `Environment ${newEnvironment.name} is now ready`,
        "environment",
        "System",
        `Environment ${newEnvironment.name} has been successfully initialized and is now ready for use.`,
        [
          {
            label: "View Environment",
            icon: <Server className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: "Environment created",
        description: `${newEnvironment.name} is now ready`,
      })
    }, 3000)
  }

  const deleteEnvironment = (name: string) => {
    // Add activity log before removing
    addActivityLog(
      `Deleted environment ${name}`,
      "environment",
      "Admin User",
      `Permanently deleted environment ${name} and all associated data, including database, files, and configuration.`,
    )

    // Remove environment
    setEnvironments((prev) => prev.filter((env) => env.name !== name))

    toast({
      title: "Environment deleted",
      description: `${name} has been deleted`,
    })
  }

  // Deployment actions
  const createDeployment = (deploymentData: any) => {
    // Generate a random ID
    const id = `dep_${Math.floor(Math.random() * 10000)}`

    // Add new deployment to the list
    const newDeployment: Deployment = {
      id,
      environment: deploymentData.environment,
      branch: deploymentData.branch,
      commit: deploymentData.commit.substring(0, 7),
      deployedBy: "Admin User",
      deployedAt: "Just now",
      status: "In Progress",
      cacheOptions: deploymentData.cacheOptions || {
        drupalCache: true,
        cdnCache: true,
        redisCache: true,
      },
    }

    setDeployments((prev) => [newDeployment, ...prev])

    // Add activity log
    addActivityLog(
      `Started deployment to ${deploymentData.environment} from branch ${deploymentData.branch}`,
      "deployment",
      "Admin User",
      `Deploying commit ${deploymentData.commit.substring(0, 7)} from branch ${deploymentData.branch} to ${deploymentData.environment}. Deployment includes cache configuration settings.`,
      [
        {
          label: "View Deployment",
          icon: <GitBranch className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    // Simulate deployment completion after 3 seconds
    setTimeout(() => {
      setDeployments((prevDeployments) =>
        prevDeployments.map((dep) => (dep.id === id ? { ...dep, status: "Success" } : dep)),
      )

      // Update the environment's lastDeployed time
      setEnvironments((prevEnvironments) =>
        prevEnvironments.map((env) =>
          env.name === deploymentData.environment ? { ...env, lastDeployed: "Just now" } : env,
        ),
      )

      // Add activity log for completion
      addActivityLog(
        `Successfully deployed to ${deploymentData.environment} from branch ${deploymentData.branch}`,
        "deployment",
        "Admin User",
        `Successfully deployed commit ${deploymentData.commit.substring(0, 7)} to ${deploymentData.environment}. All post-deployment tests passed successfully.`,
        [
          {
            label: "View Deployment",
            icon: <GitBranch className="h-3.5 w-3.5 mr-1" />,
          },
          {
            label: "View Site",
            icon: <Globe className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      // Update cache settings based on deployment options
      if (deploymentData.cacheOptions) {
        // If cache options were specified, update the cache status
        if (!deploymentData.cacheOptions.drupalCache) {
          // Disable Drupal caches
          setCaches((prevCaches) =>
            prevCaches.map((cache) => (cache.type === "drupal" ? { ...cache, status: "disabled" } : cache)),
          )
          addActivityLog(`Disabled Drupal caches for ${deploymentData.environment}`, "cache", "System")
        }

        if (!deploymentData.cacheOptions.cdnCache) {
          // Disable CDN caches
          setCaches((prevCaches) =>
            prevCaches.map((cache) => (cache.type === "cdn" ? { ...cache, status: "disabled" } : cache)),
          )
          addActivityLog(`Disabled CDN caches for ${deploymentData.environment}`, "cache", "System")
        }

        if (!deploymentData.cacheOptions.redisCache) {
          // Disable Redis caches
          setCaches((prevCaches) =>
            prevCaches.map((cache) => (cache.type === "redis" ? { ...cache, status: "disabled" } : cache)),
          )
          addActivityLog(`Disabled Redis caches for ${deploymentData.environment}`, "cache", "System")
        }
      }

      toast({
        title: "Deployment successful",
        description: `Deployment to ${deploymentData.environment} completed successfully`,
      })
    }, 3000)
  }

  // Backup actions
  const createBackup = (backupData: any = {}) => {
    // If no specific data provided, create a backup for the first environment
    const environment = backupData.environment || environments[0].name

    // Generate a random ID
    const id = `bkp_${Math.floor(Math.random() * 10000)}`

    // Create new backup
    const newBackup: Backup = {
      id,
      environment,
      type: backupData.type || "Manual",
      size: "0 GB",
      created: "Just now",
      status: "In Progress",
    }

    setBackups((prev) => [newBackup, ...prev])

    // Add activity log
    addActivityLog(
      `Started backup of ${environment}`,
      "backup",
      "Admin User",
      `Creating ${backupData.type || "Manual"} backup of ${environment}. Backup includes database, files, and configuration.`,
      [
        {
          label: "View Backup",
          icon: <Database className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "Backup started",
      description: `Creating backup of ${environment}...`,
    })

    // Simulate backup completion after 2 seconds
    setTimeout(() => {
      // Update backup with completed status and size
      const backupSize = `${(Math.random() * 3 + 1).toFixed(1)} GB`
      setBackups((prevBackups) =>
        prevBackups.map((backup) =>
          backup.id === id
            ? {
                ...backup,
                status: "Completed",
                size: backupSize,
              }
            : backup,
        ),
      )

      // Add activity log for completion
      addActivityLog(
        `Completed backup of ${environment}`,
        "backup",
        "Admin User",
        `Successfully completed ${backupData.type || "Manual"} backup of ${environment}. Backup size: ${backupSize}.`,
        [
          {
            label: "Download Backup",
            icon: <Database className="h-3.5 w-3.5 mr-1" />,
          },
          {
            label: "Restore",
            icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: "Backup completed",
        description: `Backup of ${environment} completed successfully`,
      })
    }, 2000)
  }

  // Domain actions
  const addDomain = (domainData: any) => {
    // Add new domain to the list
    const newDomain: Domain = {
      name: domainData.domainName,
      environment: domainData.environment,
      sslStatus: "Pending",
      sslExpiry: "Not issued",
      dns: "Pending",
      created: "Just now",
    }

    setDomains((prev) => [...prev, newDomain])

    // Add activity log
    addActivityLog(
      `Added new domain ${domainData.domainName} to ${domainData.environment}`,
      "domain",
      "Admin User",
      `Added new domain ${domainData.domainName} to ${domainData.environment}. SSL certificate provisioning and DNS verification in progress.`,
      [
        {
          label: "View Domain",
          icon: <Globe className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "Domain added",
      description: `${domainData.domainName} has been added and is being configured`,
    })

    // Simulate DNS verification after 2 seconds
    setTimeout(() => {
      setDomains((prevDomains) =>
        prevDomains.map((domain) => (domain.name === domainData.domainName ? { ...domain, dns: "Verified" } : domain)),
      )

      // Add activity log for DNS verification
      addActivityLog(
        `DNS verified for ${domainData.domainName}`,
        "domain",
        "System",
        `DNS records for ${domainData.domainName} have been verified successfully.`,
        [
          {
            label: "View Domain",
            icon: <Globe className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      // Simulate SSL issuance after 2 more seconds
      setTimeout(() => {
        setDomains((prevDomains) =>
          prevDomains.map((domain) =>
            domain.name === domainData.domainName
              ? {
                  ...domain,
                  sslStatus: "Valid",
                  sslExpiry: "12 months",
                }
              : domain,
          ),
        )

        // Add activity log for SSL issuance
        addActivityLog(
          `SSL certificate issued for ${domainData.domainName}`,
          "domain",
          "System",
          `SSL certificate for ${domainData.domainName} has been issued successfully. Certificate is valid for 12 months.`,
          [
            {
              label: "View Domain",
              icon: <Globe className="h-3.5 w-3.5 mr-1" />,
            },
          ],
        )

        toast({
          title: "SSL certificate issued",
          description: `SSL certificate for ${domainData.domainName} has been issued`,
        })
      }, 2000)
    }, 2000)
  }

  // Update actions
  const checkForUpdates = () => {
    toast({
      title: "Checking for updates",
      description: "Scanning all environments for available updates...",
    })

    // Add activity log
    addActivityLog(
      "Started checking for Drupal updates",
      "update",
      "Admin User",
      "Checking for available Drupal core and module updates across all environments.",
      [
        {
          label: "View Updates",
          icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    // Simulate API call
    setTimeout(() => {
      // Add a new update to the list
      const newUpdate: Update = {
        id: `${updates.length + 1}`,
        name: "Token",
        type: "Module",
        currentVersion: "1.9.0",
        newVersion: "1.10.0",
        affectedSites: "4",
        security: false,
        status: "available",
      }

      setUpdates((prev) => [...prev, newUpdate])

      // Add activity log for completion
      addActivityLog(
        `Found new update available: ${newUpdate.name} ${newUpdate.newVersion}`,
        "update",
        "System",
        `Found new update available for ${newUpdate.name} module. Current version: ${newUpdate.currentVersion}, New version: ${newUpdate.newVersion}. Affected sites: ${newUpdate.affectedSites}.`,
        [
          {
            label: "View Update",
            icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: "Update check complete",
        description: "Found 1 new update available",
      })
    }, 2000)
  }

  const applyUpdate = (updateId: string) => {
    // Find the update
    const updateToApply = updates.find((u) => u.id === updateId)
    if (!updateToApply) return

    // Mark update as in progress
    setUpdates((prev) => prev.map((update) => (update.id === updateId ? { ...update, status: "in-progress" } : update)))

    // Add activity log
    addActivityLog(
      `Started applying update: ${updateToApply.name} ${updateToApply.newVersion}`,
      "update",
      "Admin User",
      `Applying update for ${updateToApply.name} from ${updateToApply.currentVersion} to ${updateToApply.newVersion}. Affected sites: ${updateToApply.affectedSites}.`,
      [
        {
          label: "View Update",
          icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "Update started",
      description: `Updating ${updateToApply.name}...`,
    })

    // Simulate update completion
    setTimeout(() => {
      // Update the update status
      setUpdates((prev) =>
        prev.map((update) =>
          update.id === updateId
            ? {
                ...update,
                status: "completed",
                currentVersion: update.newVersion,
              }
            : update,
        ),
      )

      // If it's a core update, update the Drupal version in affected environments
      if (updateToApply.type === "Core") {
        // Update Drupal version in affected environments
        setEnvironments((prev) =>
          prev.map((env) => {
            // Check if this environment needs the update
            if (env.drupalVersion === updateToApply.currentVersion) {
              return { ...env, drupalVersion: updateToApply.newVersion }
            }
            return env
          }),
        )
      }

      // Add activity log for completion
      addActivityLog(
        `Successfully applied update: ${updateToApply.name} ${updateToApply.newVersion}`,
        "update",
        "Admin User",
        `Successfully updated ${updateToApply.name} from ${updateToApply.currentVersion} to ${updateToApply.newVersion} on ${updateToApply.affectedSites} sites. All post-update tests passed.`,
        [
          {
            label: "View Update",
            icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: "Update complete",
        description: `${updateToApply.name} has been updated successfully`,
      })
    }, 3000)
  }

  const scheduleUpdate = (updateId: string) => {
    // Find the update
    const updateToSchedule = updates.find((u) => u.id === updateId)
    if (!updateToSchedule) return

    // Mark update as scheduled
    setUpdates((prev) => prev.map((update) => (update.id === updateId ? { ...update, status: "scheduled" } : update)))

    // Add activity log
    addActivityLog(
      `Scheduled update: ${updateToSchedule.name} ${updateToSchedule.newVersion}`,
      "update",
      "Admin User",
      `Scheduled update for ${updateToSchedule.name} from ${updateToSchedule.currentVersion} to ${updateToSchedule.newVersion}. Update will be applied during the next maintenance window.`,
      [
        {
          label: "View Update",
          icon: <RefreshCw className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "Update scheduled",
      description: `${updateToSchedule.name} will be updated during the next maintenance window`,
    })
  }

  // User actions
  const addUser = (userData: any) => {
    // Generate a random ID
    const id = `${users.length + 1}`

    // Add new user to the list
    const newUser: User = {
      id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "Active",
      lastLogin: "Never",
    }

    setUsers((prev) => [...prev, newUser])

    // Add activity log
    addActivityLog(
      `Added new user: ${userData.name} (${userData.role})`,
      "user",
      "Admin User",
      `Added new user ${userData.name} (${userData.email}) with ${userData.role} role. User has been activated and email invitation has been sent.`,
      [
        {
          label: "View User",
          icon: <Shield className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "User added",
      description: `${userData.name} has been added as a ${userData.role}`,
    })
  }

  const updateUserStatus = (userId: string, newStatus: string) => {
    // Find the user
    const userToUpdate = users.find((u) => u.id === userId)
    if (!userToUpdate) return

    // Update user status
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

    // Add activity log
    addActivityLog(
      `${newStatus === "Active" ? "Activated" : "Deactivated"} user: ${userToUpdate.name}`,
      "user",
      "Admin User",
      `${newStatus === "Active" ? "Activated" : "Deactivated"} user ${userToUpdate.name} (${userToUpdate.email}).`,
      [
        {
          label: "View User",
          icon: <Shield className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: `User ${newStatus.toLowerCase()}`,
      description: `${userToUpdate.name} has been ${newStatus.toLowerCase()}`,
    })
  }

  const deleteUser = (userId: string) => {
    // Find the user
    const userToDelete = users.find((u) => u.id === userId)
    if (!userToDelete) return

    // Remove user
    setUsers((prev) => prev.filter((user) => user.id !== userId))

    // Add activity log
    addActivityLog(
      `Deleted user: ${userToDelete.name}`,
      "user",
      "Admin User",
      `Permanently deleted user ${userToDelete.name} (${userToDelete.email}).`,
    )

    toast({
      title: "User deleted",
      description: `${userToDelete.name} has been removed`,
    })
  }

  // Cache actions
  const clearAllCaches = () => {
    // Add activity log
    addActivityLog(
      "Started clearing all caches",
      "cache",
      "Admin User",
      "Clearing all caches across all environments, including Drupal, Redis, Varnish, and CDN caches.",
      [
        {
          label: "View Caches",
          icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: "Clearing all caches",
      description: "This may take a few moments...",
    })

    // Simulate API call
    setTimeout(() => {
      // Update all cache types
      const now = "Just now"
      setCaches(
        caches.map((cache) => ({
          ...cache,
          size: "0 MB",
          items: "0",
          lastCleared: now,
        })),
      )

      // Add activity log for completion
      addActivityLog(
        "Successfully cleared all caches",
        "cache",
        "Admin User",
        "Successfully cleared all caches across all environments. Total cache size cleared: 4.1 GB.",
        [
          {
            label: "View Caches",
            icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: "All caches cleared",
        description: "Cache has been successfully cleared across all environments",
      })
    }, 2000)
  }

  const clearCache = (cacheId: string) => {
    // Find the cache to clear
    const cacheToUpdate = caches.find((c) => c.id === cacheId)
    if (!cacheToUpdate) return

    // Add activity log
    addActivityLog(
      `Started clearing ${cacheToUpdate.name}`,
      "cache",
      "Admin User",
      `Clearing ${cacheToUpdate.name} cache. Current size: ${cacheToUpdate.size}, Items: ${cacheToUpdate.items}.`,
      [
        {
          label: "View Cache",
          icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: `Clearing ${cacheToUpdate.name}`,
      description: "This may take a moment...",
    })

    // Simulate API call
    setTimeout(() => {
      // Update specific cache type
      const now = "Just now"
      setCaches(
        caches.map((cache) =>
          cache.id === cacheId
            ? {
                ...cache,
                size: "0 MB",
                items: "0",
                lastCleared: now,
              }
            : cache,
        ),
      )

      // Add activity log for completion
      addActivityLog(
        `Successfully cleared ${cacheToUpdate.name}`,
        "cache",
        "Admin User",
        `Successfully cleared ${cacheToUpdate.name} cache. Cache size cleared: ${cacheToUpdate.size}.`,
        [
          {
            label: "View Cache",
            icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
          },
        ],
      )

      toast({
        title: `${cacheToUpdate.name} cleared`,
        description: "Cache has been successfully cleared",
      })
    }, 1000)
  }

  const toggleCacheStatus = (cacheId: string) => {
    // Find the cache to toggle
    const cacheToUpdate = caches.find((c) => c.id === cacheId)
    if (!cacheToUpdate) return

    const newStatus = cacheToUpdate.status === "enabled" ? "disabled" : "enabled"

    // Update cache status
    setCaches(
      caches.map((cache) =>
        cache.id === cacheId
          ? {
              ...cache,
              status: newStatus,
            }
          : cache,
      ),
    )

    // Add activity log
    addActivityLog(
      `${newStatus === "enabled" ? "Enabled" : "Disabled"} ${cacheToUpdate.name}`,
      "cache",
      "Admin User",
      `${newStatus === "enabled" ? "Enabled" : "Disabled"} ${cacheToUpdate.name} cache.`,
      [
        {
          label: "View Cache",
          icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
        },
      ],
    )

    toast({
      title: `${cacheToUpdate.name} ${newStatus}`,
      description: `Cache has been ${newStatus}`,
    })
  }

  // Provide the context value
  const contextValue: DashboardContextType = {
    environments,
    deployments,
    backups,
    domains,
    updates,
    users,
    caches,
    activityLogs,
    createEnvironment,
    deleteEnvironment,
    createDeployment,
    createBackup,
    addDomain,
    checkForUpdates,
    applyUpdate,
    scheduleUpdate,
    addUser,
    updateUserStatus,
    deleteUser,
    clearAllCaches,
    clearCache,
    toggleCacheStatus,
  }

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
}

// Custom hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
