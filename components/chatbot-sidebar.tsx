"use client"

import { useState } from "react"
import { Plus, Search, FolderPlus, Code } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"
import { useChat } from "@/app/(main)/chat-store/page"

export const ChatbotSidebar = () => {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    createNewChat,
  } = useChat()

  const [search, setSearch] = useState("")

  const filtered = chats.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleNewChat = () => {
    createNewChat()
  }

  return (
    <Sidebar className="bg-background w-[260px]">

      {/* LOGO & NAME */}
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <span className="text-primary text-2xl">⚖️</span>
        <h1 className="text-lg font-bold text-primary">LegalTech</h1>
      </div>

      {/* TOP */}
      <div className="p-3 space-y-2">

        <div
          onClick={handleNewChat}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-primary/10 cursor-pointer transition"
        >
          <Plus size={18} />
          New chat
        </div>

        {/* search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <SidebarItem icon={<FolderPlus size={18} />} label="Projects" />
        <SidebarItem icon={<Code size={18} />} label="Codex" />
      </div>

      {/* RECENTS */}
      <SidebarContent className="px-2 mt-2">
        <p className="text-xs text-gray-500 px-2 mb-2">Recents</p>

        <div className="space-y-1">
          {filtered.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`
                px-3 py-2 rounded-lg text-sm cursor-pointer truncate transition
                ${activeChatId === chat.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-gray-100"
                }
              `}
            >
              {chat.title} 
            </div>

          ))}
        </div>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 cursor-pointer">
    {icon}
    <span className="text-sm">{label}</span>
  </div>
)