"use client"

import Card from "../ui/card"

const demoProducts = [
  { id: 1, title: "Bolsa de Couro", price: "R$ 89,90", img: "https://source.unsplash.com/collection/190727/300x300?sig=1" },
  { id: 2, title: "Brincos Artesanais", price: "R$ 29,50", img: "https://source.unsplash.com/collection/190727/300x300?sig=2" },
  { id: 3, title: "Camiseta Casual", price: "R$ 49,90", img: "https://source.unsplash.com/collection/190727/300x300?sig=3" },
  { id: 4, title: "Shorts Jeans", price: "R$ 69,00", img: "https://source.unsplash.com/collection/190727/300x300?sig=4" },
]

export default function ProductsCarousel() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Meus Produtos</h3>
        <a className="text-sm text-[#5F469C] font-medium" href="#">Ver Todos</a>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-2">
        <div className="flex gap-4 snap-x snap-mandatory">
          {demoProducts.map((p) => (
            <div key={p.id} className="min-w-[220px] snap-start">
              <Card className="p-3">
                <div className="flex gap-3 items-center">
                  <img src={p.img} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-800 hover:text-[#5F469C] hover:underline cursor-pointer transition-colors">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{p.price}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
