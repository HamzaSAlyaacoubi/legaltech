"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"

const mockMessages = [
  {
    role: "user" as const,
    content: "Hello! Can you help me understand contract law basics?",
  },
  {
    role: "assistant" as const,
    content:
      "Of course! Contract law is a fundamental area of legal practice. I can help explain the key elements of a valid contract, including offer, acceptance, consideration, and mutual intent to be bound. What specific aspect would you like to explore?",
  },
  {
    role: "user" as const,
    content: "What about consideration? Can you give me a real example?",
  },
  {
    role: "assistant" as const,
    content:
      "Great question! Consideration is the value exchanged between parties that makes a contract binding. For example, in a sales contract: You (buyer) provide money as consideration, and the seller provides goods as consideration. Both parties must give something of value. Even a small amount can be valid consideration—it doesn't have to be equal in value.",
  },
]


export default function ChatbotPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Scrollable messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full ">
          <div className="max-w-2xl mx-auto space-y-6">
            {mockMessages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Sticky input */}
      <div className="border-t bg-white ">
        <ChatInput />
      </div>

    </div>
  )
}
