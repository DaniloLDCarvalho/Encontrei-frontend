import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductListItem } from "@/components/shared/ProductListItem";
import { useNavigate } from "react-router-dom";
import { useProductsData } from "@/hooks/products/useProductsData";
import { Input } from "@/components/ui/input";
import {cn} from "@/lib/utils";

const FAVORITES_KEY = "buyer_favorites_products";

const BuyerProductsPage = () => {
    const navigate = useNavigate();
    const { isLoading, isError, data } = useProductsData();

    const [viewMode, setViewMode] = useState("grid");

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem(FAVORITES_KEY);
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFav = (id) => {
        setFavorites((prevFavs) =>
            prevFavs.includes(id)
                ? prevFavs.filter((favId) => favId !== id)
                : [...prevFavs, id]
        );
    }

    if (isLoading) return <div className="p-8 text-center">Carregando produtos...</div>;
    if (isError || !data) return <div className="p-8 text-center text-red-500">Erro ao carregar.</div>;

    const products = data.products || [];

    return (
        <div className="min-h-screen bg-[#f6f7fb] pb-24 font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white shadow-md rounded-b-3xl">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20 rounded-full -ml-2"
                                onClick={() => navigate("/")}
                            >
                                <ArrowLeft className="w-6 h-6"/>
                            </Button>
                            <h1 className="text-xl font-bold tracking-tight">Explorar</h1>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                            <SlidersHorizontal className="w-6 h-6"/>
                        </Button>
                    </div>

                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            placeholder="Buscar produtos..."
                            className="pl-10 bg-white text-gray-800 border-0 rounded-xl h-11 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-300"
                        />
                    </div>
                </div>
            </header>

            <main className="p-4 space-y-4 w-full max-w-3xl mx-auto">

                <div className="pt-16 flex items-center justify-between relative z-10">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                        {products.length} Resultados
                    </h2>

                    <div className="bg-white p-1 rounded-lg border border-gray-100 shadow-sm flex gap-1">
                    <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === "grid"
                                    ? "bg-purple-100 text-purple-600 shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === "list"
                                    ? "bg-purple-100 text-purple-600 shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                <div className={cn(
                    viewMode === 'grid'
                        ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                        : "flex flex-col gap-3"
                )}>
                    {products.map((product) => {
                        const isFav = favorites.includes(product.id);
                        return (
                            <ProductListItem
                                key={product.id}
                                product={product}
                                onClick={() => navigate(`/product/${product.id}`)}
                                layout={viewMode}
                                extraInfo={`Tamanhos: ${product.sizes || 'P, M, G'}`} // Fallback se sizes for null
                                actions={
                                    <button
                                        onClick={() => toggleFav(product.id)}
                                        className={`
                                            flex items-center justify-center rounded-full transition-colors
                                            ${viewMode === 'grid'
                                            ? "h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white text-gray-400 hover:text-red-500"
                                            : "h-10 w-10 hover:bg-gray-50 text-gray-400"
                                        }
                                        `}
                                    >
                                        <Heart
                                            className={`transition-colors ${isFav ? "fill-red-500 text-red-500" : "currentColor"} ${viewMode === 'grid' ? "w-4 h-4" : "w-6 h-6"}`}
                                        />
                                    </button>
                                }
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default BuyerProductsPage;