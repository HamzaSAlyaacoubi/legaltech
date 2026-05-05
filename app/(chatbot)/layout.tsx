"use client"
import { ChatbotSidebar } from "@/components/chatbot-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
export default function ChatbotLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 to-gray-50">
      <SidebarProvider>
        <ChatbotSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <SidebarTrigger className="text-[#610000] hover:bg-red-50 m-4" />
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
