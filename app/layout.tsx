"use client"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const rawTitle = pathname.split("/")[1] || "documents"
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
                <AppSidebar />
                <SidebarInset>
                  <SiteHeader />
                  <div className="px-4 lg:px-6">
                    <p className="font-sm text-sm text-muted-foreground">
                      {" "}
                      {title !== "Dashboard" ? (
                        <>
                          <Link href="/dashboard" className="pr-2">Dashboard</Link> &gt; <span className="text-foreground pl-2">{title}</span>
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>

                  {children}
                </SidebarInset>
            </SidebarProvider>
            </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
