"use client"

import { Settings, ChevronUp, Plus, MessageSquare } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from "@/components/ui/button"
import Link from "next/link"


const chatHistory = [
  { id: 1, title: "Contract Law Basics" },
  { id: 2, title: "Understanding Consideration" },
  { id: 3, title: "Offer and Acceptance" },
  { id: 4, title: "Legal Document Templates" },
  { id: 5, title: "Contract Review Tips" },
]

export const ChatbotSidebar = () => {
  return (
    <Sidebar  className="bg-blue-500 border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 px-6 py-4">
        <Button className="w-full justify-start gap-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl font-medium">
          <Plus size={18} />
          <span>New Chat</span>
        </Button>
      </SidebarHeader>

      <SidebarContent className="text-gray-700 px-3">
        <SidebarGroup className="pt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 mb-3 px-2">Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {chatHistory.slice(0, 3).map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-red-50 hover:text-[#610000] text-gray-600 rounded-lg transition-colors "
                  >
                    <Link href={`#chat-${chat.id}`} className="flex items-center gap-3">
                      <MessageSquare size={16} className="shrink-0" />
                      <span className="truncate text-sm">{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
       
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 mb-3 px-2">Previous 7 Days</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {chatHistory.slice(3).map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-red-50 hover:text-[#610000] text-gray-600 rounded-lg transition-colors"
                  >
                    <Link href={`#chat-${chat.id}`} className="flex items-center gap-3">
                      <MessageSquare size={16} className="shrink-0" />
                      <span className="truncate text-sm">{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-gray-100 text-gray-600 rounded-lg mb-1 pt-3 pb-3">
              <Link href="#settings" className="flex items-center gap-3">
                <Settings size={18} />
                <span className="text-sm">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-gray-100 text-gray-700 rounded-lg pt-6 pb-6 ">
                  <div className="w-8 h-8 rounded-full bg-[#610000] flex items-center justify-center text-sm font-bold text-white shrink-0">
                    A
                  </div>
                  <div className="flex flex-col items-start text-sm min-w-0">
                    <span className="font-medium text-gray-900">Adam</span>
                    <span className="text-xs text-gray-500">Free Plan</span>
                  </div>
                  <ChevronUp className="ml-auto shrink-0" size={16} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuItem className="text-gray-700 cursor-pointer hover:bg-gray-50">
                  Profile
                </DropdownMenuItem>
            
                <DropdownMenuItem className="text-gray-700 cursor-pointer hover:bg-gray-50">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  )
}
