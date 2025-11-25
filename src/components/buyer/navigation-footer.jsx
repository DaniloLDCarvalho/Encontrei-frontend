"use client"

import { Home, Layers, Bell, Package, User } from "lucide-react"

export function BuyerNavigation() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Layers, label: "Categorias", active: false },
    { icon: Bell, label: "Notificações", active: false, badge: 1 },
    { icon: Package, label: "Pedidos", active: false },
    { icon: User, label: "Perfil", active: false },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 relative ${item.active ? "text-purple-600" : "text-gray-400"}`}
            style={item.active ? { color: "#5F469C" } : undefined}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
            {item.badge && (
              <div className="absolute top-0 right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {item.badge}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
