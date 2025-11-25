"use client"

import { Heart, ShoppingCart, Store } from "lucide-react"
import { Input } from "@/components/ui/input.jsx"

export function BuyerHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white">
      <div className="max-w-md mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: Menu + Store name aligned like vendor header */}
        <div className="flex items-center gap-2 ml-7">
          <div className="flex items-center gap-2">
            <Store size={28} />
            <span className="text-2xl">Encontrei!</span>
          </div>
        </div>

        {/* Right: Heart + Cart */}
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition">
            <Heart size={18} />
          </button>
          <button className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition">
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
          </button>
        </div>

      </div>

      {/* search bar intentionally removed from header; placed in page content */}
    </header>
  )
}
