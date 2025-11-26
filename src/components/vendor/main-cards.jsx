"use client"

import { Package, ShoppingBag, Store } from "lucide-react"
import Card from "../ui/card"
import Button  from "../ui/button"
import ProductsCarousel from "./products-carousel"

function StatPill({ label, value, Icon }) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-1 flex flex-col items-center text-center min-w-0 transform transition-transform duration-150 hover:-translate-y-1 hover:shadow-md cursor-pointer">
      <div className="w-9 h-9 bg-purple-50 rounded-md flex items-center justify-center mb-1">
        <Icon className="text-[#5F469C]" size={18} />
      </div>
      <div className="text-[11px] text-gray-500 leading-tight">{label}</div>
      <div className="font-semibold text-lg text-gray-800 mt-1">{value}</div>
    </div>
  )
}

export default function MainCards() {
  return (
    <div className="space-y-4">
      {/* Sales / Stats row (replaces Meu Perfil) */}
      <div className="grid grid-cols-3 gap-2 items-stretch">
        <StatPill Icon={ShoppingBag} label="Vendas Hoje" value="R$ 450,00" />
        <StatPill Icon={Package} label="Total de Pedidos" value="12" />
        <StatPill Icon={Store} label="Produtos Ativos" value="28" />
      </div>

      {/* Products carousel */}
      <div className="mt-3">
        <ProductsCarousel />
      </div>
    </div>
  )
}
