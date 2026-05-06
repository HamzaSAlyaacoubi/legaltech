"use client"

export function ChatMessage({ role, content, image }: { role: "user" | "assistant"; content: string; image?: string | null }) {
  const isUser = role === "user"
  const isShortText = content.length < 60 && !content.includes("\n")
  const roundedClass = isShortText ? "rounded-full" : "rounded-lg"

  return (
    <div className="w-full">
      <div className="flex gap-4 items-start">


        <div className="flex-1">
          {isUser ? (
            <div className="flex justify-end">
              <div className="space-y-2 max-w-[55%]">
                <div className={`bg-[#bb1c1c] text-white px-4 py-3 ${roundedClass} text-sm break-words`}>
                  {content}
                </div>
                {image && (
                  <div className="flex justify-end">
                    <img src={image} alt="uploaded" className="max-w-full rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-w-[55%]">
              <div className="text-sm leading-7 text-gray-900 whitespace-pre-wrap break-words">
                {content}
              </div>
              {image && (
                <img src={image} alt="response" className="max-w-full rounded-lg" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}