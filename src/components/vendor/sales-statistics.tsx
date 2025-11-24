"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import  Button  from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

const salesData = [
  { day: "Seg", sales: 12 },
  { day: "Ter", sales: 15 },
  { day: "Qua", sales: 18 },
  { day: "Qui", sales: 16 },
  { day: "Sex", sales: 28 },
  { day: "Sab", sales: 25 },
  { day: "Dom", sales: 22 },
]

function SalesStatistics() {
  return (
    <Card className="border-l-4 border-l-purple-600 bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <TrendingUp className="text-purple-600" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">Estatísticas de vendas</h3>
          <p className="text-sm text-gray-600">Gráficos simples (vendas do mês, produtos mais vistos)</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#999" style={{ fontSize: "12px" }} />
            <YAxis stroke="#999" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="sales" fill="#5F469C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestion */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-purple-700">
          <span className="font-semibold">💡 Sugestão da IA:</span> Seus produtos mais vistos estão com estoque baixo.
          Considere reabastecer para não perder vendas!
        </p>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ver Estatísticas Completas</Button>
    </Card>
  )
}

export default SalesStatistics
