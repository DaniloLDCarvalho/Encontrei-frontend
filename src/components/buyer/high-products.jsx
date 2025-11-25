"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HighProducts() {
  const products = [
    {
      id: 1,
      name: "Vestido Verde",
      price: "R$ 189.90",
      // Demo image from Unsplash — remove for production
      image: "https://images.unsplash.com/photo-1520975911209-6d0f3f8c9b6b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=de8f8a2e8f6b4b6c0b1c",
    },
    {
      id: 2,
      name: "Bolsa Marrom",
      price: "R$ 149.90",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b1f3e8a4f1d6c8e9b2a",
    },
    {
      id: 3,
      name: "Tênis Branco",
      price: "R$ 229.90",
      image: "https://images.unsplash.com/photo-1526178613157-6a5f8264b1b3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b9a1c2d4f5e6a7b8c9d",
    },
    {
      id: 4,
      name: "Camisa Listrada",
      price: "R$ 89.90",
      image: "https://images.unsplash.com/photo-1520975911209-6d0f3f8c9b6b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=de8f8a2e8f6b4b6c0b1c",
    },
  ]

  const sliderRef = useRef(null)

  function handlePrev() {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: "smooth" })
  }

  function handleNext() {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: "smooth" })
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Produtos em Alta</h2>
        <a href="#" className="text-purple-600 font-semibold text-sm">
          Navegar em Tudo
        </a>
      </div>

      <div className="relative">
        {/* Arrows */}
        <button
          aria-label="Anterior"
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center flex-shrink-0 w-1/2 bg-purple-100 rounded-lg overflow-hidden"
            >
                <div className="relative bg-purple-100 h-56 flex items-center justify-center">
                  {/* Demo badge: remove when replacing images for production */}
                  <div className="absolute left-2 top-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full z-20">demo</div>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name + " (imagem demo)"}
                    className="w-full h-full object-cover"
                  />
                </div>
              <div className="p-3">
                <p className="text-purple-700 font-bold text-lg">{product.price}</p>
                <p className="text-sm text-gray-700 mt-1">{product.name}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Próximo"
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
