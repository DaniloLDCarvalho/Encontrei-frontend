"use client"

import Card from "../ui/card"

const demoOrders = [
  { id: 1, title: "Pedido #1023", summary: "1 item — R$ 89,90" },
  { id: 2, title: "Pedido #1022", summary: "2 itens — R$ 119,40" },
  { id: 3, title: "Pedido #1021", summary: "3 itens — R$ 200,00" },
]

export default function RecentOrdersCarousel() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Últimos Pedidos</h3>
        <a className="text-sm text-[#5F469C] font-medium" href="#">Ver Todos</a>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-2">
        <div className="flex gap-3 snap-x snap-mandatory">
          {demoOrders.map((o) => (
            <div key={o.id} className="min-w-[260px] snap-start">
              <Card className="p-4">
                <div className="font-semibold text-sm text-gray-800 hover:text-[#5F469C] hover:underline cursor-pointer transition-colors">{o.title}</div>
                <div className="text-xs text-gray-500 mt-2">{o.summary}</div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
