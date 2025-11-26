"use client"

import { Plus } from "lucide-react"

export default function FloatingAddButton() {
  return (
    <div className="fixed right-5 bottom-20 z-50 flex items-center">
      <button
        aria-label="Adicionar novo produto"
        className="w-16 h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-xl flex flex-col items-center justify-center"
      >
        <Plus size={20} />
        <span className="text-[11px] mt-1 font-medium">Novo</span>
      </button>
    </div>
  )
}
