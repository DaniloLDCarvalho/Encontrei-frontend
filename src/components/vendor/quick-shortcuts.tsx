"use client"

import { Plus, ShoppingBag, Headphones } from "lucide-react"

export default function QuickShortcuts() {
  const shortcuts = [
    {
      icon: Plus,
      label: "Adicionar\nproduto",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: ShoppingBag,
      label: "Pedidos\nrecebidos",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Headphones,
      label: "Suporte",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Atalhos Rápidos</p>
      <div className="grid grid-cols-3 gap-4">
        {shortcuts.map((shortcut, index) => {
          const Icon = shortcut.icon
          return (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition"
            >
              <div className={`w-12 h-12 ${shortcut.color} rounded-lg flex items-center justify-center`}>
                <Icon className={`${shortcut.iconColor}`} size={24} />
              </div>
              <p className="text-xs text-center text-gray-700 leading-tight font-medium">{shortcut.label}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
