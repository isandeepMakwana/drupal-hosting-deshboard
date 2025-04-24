import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { DashboardProvider } from "@/contexts/dashboard-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Drupal Cloud for SUNY Fredonia",
  description: "Enterprise Drupal hosting solution for SUNY Fredonia",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DashboardProvider>
            {children}
            <Toaster />
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
