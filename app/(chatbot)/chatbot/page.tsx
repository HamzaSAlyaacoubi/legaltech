"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@/app/(main)/chat-store/page"
import { ChatInput } from "@/components/chat-input"
import { ChatMessage } from "@/components/chat-message"

export default function ChatbotPage() {
  const { chats, activeChatId, createNewChat, addMessage } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find((c) => c.id === activeChatId)

  useEffect(() => {
    if (!activeChatId) {
      createNewChat()
    }
  }, [activeChatId, createNewChat])

  const handleSend = (text: string, image?: string | null) => {
    if ((!text.trim() && !image) || !activeChatId) return

    addMessage({
      role: "user" as const,
      content: text || "(image)",
      image,
    })

    setTimeout(() => {
      addMessage({
        role: "assistant" as const,
        content: "This is a preview response.",
      })
    }, 200)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages])

  const isEmpty = !activeChat || activeChat.messages.length === 0

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-start pt-32">
            <h1 className="mb-16 font-heading text-3xl text-foreground">
              Ready when you are.
            </h1>
            <div className="w-full max-w-[720px] px-4">
              <ChatInput onSend={handleSend} variant="center" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[768px] space-y-10 px-4 pt-16 pb-32">
                {activeChat?.messages.map((m, i) => (
                  <ChatMessage
                    key={i}
                    role={m.role}
                    content={m.content}
                    image={m.image}
                  />
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="border-t border-gray-200 bg-white py-4">
              <div className="mx-auto max-w-[768px] px-4">
                <ChatInput onSend={handleSend} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
