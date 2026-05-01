"use client"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import Link from "next/link"
 
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const rawTitle = pathname.split("/")[1] || "documents"
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)
 
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TooltipProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="px-4 lg:px-6">
            <h1 className="text-base font-medium">
              {" "}
              {title !== "Dashboard" ? (
                <>
                  <Link href="/dashboard">Dashboard</Link> &gt; {title}
                </>
              ) : (
                ""
              )}
            </h1>
          </div>
 
          {children}
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}