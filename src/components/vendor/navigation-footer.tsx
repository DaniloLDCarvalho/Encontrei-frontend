"use client"

import { Home, Package, FileText, User } from "lucide-react"

interface NavigationFooterProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export default function NavigationFooter({ activeNav, setActiveNav }: NavigationFooterProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: FileText },
    { id: "profile", label: "Perfil", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4 flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 gap-1.5 transition ${
                isActive ? "text-purple-600 border-t-2 border-purple-600" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon size={item.id === 'home' ? (isActive ? 28 : 26) : 24} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
