"use client"

import { BuyerHeader } from "@/components/buyer/header.jsx"
import { CategoriesGrid } from "@/components/buyer/categories-grid.jsx"
import { ExclusiveOffers } from "@/components/buyer/exclusive-offers.jsx"
import { HighProducts } from "@/components/buyer/high-products.jsx"
import { BuyerNavigation } from "@/components/buyer/navigation-footer.jsx"
import { Input } from "@/components/ui/input.jsx"

export default function BuyerHome() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <BuyerHeader />

      <main className="flex-1 overflow-y-auto pb-20 pt-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Search bar placed below the fixed header */}
          <div className="mb-4 mt-6">
            <div className="flex items-center bg-white rounded-lg px-3 py-3 shadow-md ring-1 ring-gray-200">
              <Input
                type="text"
                placeholder="Buscar itens"
                className="border-0 focus:ring-0 focus:outline-none bg-transparent"
              />
              <div className="text-gray-400">📷</div>
            </div>
          </div>

          {/* Categories immediately below the search */}
          <CategoriesGrid />

          <div className="mt-4">
            <ExclusiveOffers />
          </div>

          <div className="mt-4">
            <HighProducts />
          </div>
        </div>
      </main>

      <BuyerNavigation />
    </div>
  )
}
