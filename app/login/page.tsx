"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Use this to ensure we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true)

    // Check if user is already logged in
    if (typeof window !== "undefined") {
      try {
        const user = localStorage.getItem("user")
        if (user) {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)

      // Simple validation
      if (email === "admin@fredonia.edu" && password === "admin") {
        try {
          // Store user info in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              email,
              name: "Admin User",
              role: "admin",
            }),
          )
          toast({
            title: "Login successful",
            description: "Welcome back, Admin User!",
          })
          router.push("/dashboard")
        } catch (error) {
          console.error("Error storing user data:", error)
          toast({
            title: "Login error",
            description: "There was an error logging in. Please try again.",
            variant: "destructive",
          })
        }
      } else if (email === "user@fredonia.edu" && password === "user") {
        try {
          // Store user info in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              email,
              name: "Regular User",
              role: "user",
            }),
          )
          toast({
            title: "Login successful",
            description: "Welcome back, Regular User!",
          })
          router.push("/dashboard")
        } catch (error) {
          console.error("Error storing user data:", error)
          toast({
            title: "Login error",
            description: "There was an error logging in. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try admin@fredonia.edu/admin or user@fredonia.edu/user",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex items-center gap-2 mb-6">
        <Server className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold">Drupal Cloud</span>
        <span className="text-sm text-muted-foreground">by Consultadd</span>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fredonia.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Admin: admin@fredonia.edu / admin</p>
              <p>User: user@fredonia.edu / user</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
