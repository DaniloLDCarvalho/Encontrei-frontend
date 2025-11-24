"use client"

import { Bell, Store } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white">
      <div className="max-w-md mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: Store Name aligned with content start of cards */}
        <div className="flex items-center gap-2 ml-7">
          <Store size={28} />
          <span className="text-2xl">Encontrei!</span>
        </div>

        {/* Right: Notification Icon */}
        <button className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
