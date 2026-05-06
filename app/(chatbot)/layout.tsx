"use client"
import { ChatbotSidebar } from "@/components/chatbot-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
export default function ChatbotLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider>
        <ChatbotSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-40   px-6 py-4">
            <SidebarTrigger className="text-primary hover:bg-primary/10" />
          </header>
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
