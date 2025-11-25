"use client"

import { User, Package } from "lucide-react"
import Card from "../ui/card"
import Button  from "../ui/button"

export default function MainCards() {
  return (
    <div className="space-y-4">
      {/* My Profile Card */}
      <Card className="border-l-4 border-l-purple-600 bg-gradient-to-br from-purple-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="text-purple-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Meu Perfil</h3>
            <p className="text-sm text-gray-600 mb-4">
              Acesso ao perfil do vendedor (informações pessoais, endereço, dados da loja)
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ver Perfil</Button>
          </div>
        </div>
      </Card>

      {/* Products Card */}
      <Card className="border-l-4 border-l-purple-600 bg-gradient-to-br from-purple-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="text-purple-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Produtos</h3>
            <p className="text-sm text-gray-600 mb-4">Ver lista de produtos cadastrados</p>
            <div className="space-y-2">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ver Produtos</Button>
              <Button className="w-full border border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100">
                + Cadastrar novo produto
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
