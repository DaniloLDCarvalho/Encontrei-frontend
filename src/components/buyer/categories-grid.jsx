"use client"

export function CategoriesGrid() {
  const categories = ["Camisas", "Shorts", "Vestidos", "Moda Praia", "Acessórios", "Calçados"]

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">Compre por Categoria</h2>
        <a href="#" className="text-[#5F469C] font-semibold text-sm">
          Ver Todos
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-6">
        {categories.map((category) => (
          <button
            key={category}
            style={{ backgroundColor: 'rgb(132,85,191)' }}
            className="w-full text-white py-2 px-2 rounded-2xl font-semibold hover:opacity-90 transition-colors flex items-center justify-center text-lg sm:text-2xl min-h-[64px] sm:min-h-[100px]"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
