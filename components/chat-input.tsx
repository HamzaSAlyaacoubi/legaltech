"use client"

import { useState, useRef } from "react"
import { ArrowUp, Plus, Image as ImageIcon, Paperclip } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ChatInput({ onSend, variant = "bottom" }: any) {
  const [value, setValue] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  const send = () => {
    if (!value.trim() && !image) return
    onSend(value || "", image)
    setValue("")
    setImage(null)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  return (
    <div className="w-full">

      {image && (
        <div className="mb-2 relative inline-block">
          <img src={image} className="h-20 rounded-lg" />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-[#f1f1f1] rounded-full px-4 py-3 border border-gray-300">

        {/* PLUS DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-200 transition text-gray-600">
              <Plus size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              <ImageIcon size={16} className="mr-2" />
              <span>Upload image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input type="file" hidden ref={fileInputRef} onChange={handleImage} accept="image/*" />

        {/* INPUT */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-transparent outline-none text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") send()
          }}
        />

        {/* RIGHT */}
        <button onClick={send} className="bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition">
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  )
}