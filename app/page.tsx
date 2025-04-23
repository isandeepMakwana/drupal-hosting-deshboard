import Link from "next/link"
import { ArrowRight, CheckCircle, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Drupal Cloud</span>
            <span className="text-sm text-muted-foreground">By Consultadd</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" passHref>
              <Button>Dashboard Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Enterprise Drupal Hosting By Consultadd
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A complete hosting solution for your Drupal 10 websites with powerful management tools, automated
                  workflows, and enterprise-grade security.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard" passHref>
                    <Button size="lg" className="gap-1">
                      Access Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features" passHref>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 lg:flex-1">
                <img
                  src="/placeholder.svg?height=550&width=700"
                  alt="Dashboard Preview"
                  className="rounded-lg object-cover border shadow-lg"
                  width={700}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Complete Hosting Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your Drupal websites in one place
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href={feature.link} passHref>
                      <Button variant="ghost" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.featured ? "border-blue-500 shadow-lg" : ""}`}>
                  {plan.featured && (
                    <div className="bg-blue-500 text-white text-center py-2 font-medium">Recommended</div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant={plan.featured ? "default" : "outline"} className="w-full">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Contact</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact our team to learn more about our Drupal hosting solutions for SUNY Fredonia
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-lg mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <input id="first-name" className="w-full rounded-md border border-gray-300 p-2" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <input id="last-name" className="w-full rounded-md border border-gray-300 p-2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input id="email" type="email" className="w-full rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
                      ></textarea>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-bold">Drupal Cloud</span>
            </div>
            <p className="text-sm text-muted-foreground">Enterprise Drupal hosting solution by Consultadd</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground border-t">
          &copy; {new Date().getFullYear()} Drupal Cloud. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Environment Management",
    description: "Manage development, staging, and production environments",
    icon: Server,
    benefits: [
      "One-click environment creation",
      "Environment cloning",
      "Isolated development sandboxes",
      "Automated environment sync",
    ],
    link: "/dashboard/environments",
  },
  {
    title: "Logs & Metrics",
    description: "Monitor performance and troubleshoot issues",
    icon: Server,
    benefits: [
      "Real-time log streaming",
      "Performance metrics dashboard",
      "Anomaly detection",
      "Custom alert configurations",
    ],
    link: "/dashboard/logs",
  },
  {
    title: "Backups & Restores",
    description: "Protect your data with automated backups",
    icon: Server,
    benefits: ["Scheduled automated backups", "One-click restore", "Point-in-time recovery", "Secure off-site storage"],
    link: "/dashboard/backups",
  },
  {
    title: "Drupal Updates",
    description: "Keep your Drupal sites secure and up-to-date",
    icon: Server,
    benefits: [
      "One-click core updates",
      "Module update management",
      "Security patch automation",
      "Update testing in staging",
    ],
    link: "/dashboard/updates",
  },
  {
    title: "Git Deployments",
    description: "Streamline your development workflow",
    icon: Server,
    benefits: ["Git-based deployments", "Branch-specific environments", "Automated testing", "Deployment rollbacks"],
    link: "/dashboard/deployments",
  },
  {
    title: "SSL & Domains",
    description: "Manage domains and SSL certificates",
    icon: Server,
    benefits: ["Automated SSL provisioning", "Custom domain management", "DNS management", "Redirect configuration"],
    link: "/dashboard/domains",
  },
]

const pricingPlans = [
  {
    name: "Basic",
    description: "For small departmental sites",
    price: 99,
    features: [
      "1 Production Environment",
      "1 Staging Environment",
      "Daily Backups",
      "Basic Monitoring",
      "Email Support",
    ],
    featured: false,
  },
  {
    name: "Professional",
    description: "For mission-critical websites",
    price: 299,
    features: [
      "3 Production Environments",
      "3 Staging Environments",
      "Hourly Backups",
      "Advanced Monitoring",
      "Priority Support",
      "Custom Domains",
      "CDN Integration",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For complex multi-site deployments",
    price: 599,
    features: [
      "Unlimited Environments",
      "Continuous Backups",
      "Enterprise SLA",
      "24/7 Phone Support",
      "Custom Integrations",
      "Advanced Security",
      "Dedicated Resources",
    ],
    featured: false,
  },
]
