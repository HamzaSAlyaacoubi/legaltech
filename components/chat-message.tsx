"use client"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={`w-full py-6 ${!isUser ? "bg-muted/40" : ""}`}>
      <div className="max-w-2xl mx-auto px-4">
        
        <div className={`flex  ${isUser ? "justify-end" : "justify-start"}`}>
          
          <div
            className={`max-w-[75%]  px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "bg-white border border-gray-200 rounded-4xl text-[#b82c2c]"
                : "text-foreground"
            }`}
          >
            {content}
          </div>

        </div>

      </div>
    </div>
  )
}