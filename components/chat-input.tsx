"use client"


import { ArrowBigUp } from "lucide-react"

import { Plus } from "lucide-react"

export function ChatInput() {
  return (
    <div className="border-t bg-background/80 backdrop-blur-md p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border">

          {/* Left icon */}
          <Plus className="text-gray-400" size={18} />

          {/* Input */}
          <textarea
            placeholder="Message your legal advisor..."
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-sm"
          />

          {/* Send */}
          <button className="bg-[#610000] hover:bg-[#7a0000] text-white p-2 rounded-full">
            <ArrowBigUp size={18} />
          </button>

        </div>
      </div>
    </div>
  )
}