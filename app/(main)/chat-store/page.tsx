"use client"

import { createContext, useContext, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  image?: string | null
}

type Chat = {
  id: string
  title: string
  messages: Message[]
}

type ChatContextType = {
  chats: Chat[]
  activeChatId: string | null
  setActiveChatId: (id: string) => void
  createNewChat: () => string
  addMessage: (msg: Message) => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const createNewChat = () => {
    const id = crypto.randomUUID()

    const newChat: Chat = {
      id,
      title: "New chat",
      messages: [],
    }

    setChats((prev) => [newChat, ...prev])
    setActiveChatId(id)

    return id
  }

  const addMessage = (msg: Message) => {
    if (!activeChatId) return 

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat

        const updatedMessages = [...chat.messages, msg]

        return {
          ...chat,
          title:
            chat.messages.length === 0 && msg.role === "user"
              ? msg.content.slice(0, 28)
              : chat.title,
          messages: updatedMessages,
        }
      })
    )
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        setActiveChatId,
        createNewChat,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error("useChat must be inside ChatProvider")
  return ctx
}
