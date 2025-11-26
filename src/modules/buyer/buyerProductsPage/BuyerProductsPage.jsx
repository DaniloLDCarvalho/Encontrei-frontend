import React, {useEffect, useState} from 'react';
import { ArrowLeft, Heart, LayoutGrid, List, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductListItem } from "@/components/shared/ProductListItem";
import { useNavigate } from "react-router-dom";
import { useProductsData } from "@/hooks/products/useProductsData";
import { Input } from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useProductsFilter} from "@/hooks/products/useProductsFilter";
import {ProductFiltersSheet} from "@/components/buyer/ProductFiltersSheet";

const BuyerProductsPage = () => {
    const navigate = useNavigate();
    const { isLoading, isError, data } = useProductsData();

    const [viewMode, setViewMode] = useState("grid");

    const {
        searchTerm, setSearchTerm,
        filters, toggleFilter, setPriceRange, clearFilters,
        filteredProducts, totalResults,hasNoResults, availableOptions,
        favorites, setFavorites
    } = useProductsFilter(data ? data.products : [])

    const toggleFav = (id) => {
        setFavorites((prevFavs) =>
            prevFavs.includes(id)
                ? prevFavs.filter((favId) => favId !== id)
                : [...prevFavs, id]
        );
    }

    if (isLoading) return <div className="p-8 text-center">Carregando produtos...</div>;
    if (isError || !data) return <div className="p-8 text-center text-red-500">Erro ao carregar.</div>;

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

                        <ProductFiltersSheet
                            availableOptions={availableOptions}
                            filters={filters}
                            toggleFilter={toggleFilter}
                            setPriceRange={setPriceRange}
                            clearFilters={clearFilters}
                            totalResults={totalResults}
                        />
                    </div>

                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            placeholder="Buscar produtos..."
                            className="pl-10 pr-10 bg-white text-gray-800 border-0 rounded-xl h-11 focus-visible:ring-purple-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* Botão X para limpar busca (Visual) */}
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <main className="p-4 space-y-4 w-full max-w-3xl mx-auto">
                <div className="pt-16 flex items-center justify-between relative z-10">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                        {totalResults} Resultados
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
                {hasNoResults ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 text-purple-300" />
                        </div>
                        <h3 className="text-gray-800 font-semibold text-lg">Nenhum produto encontrado</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-4">
                            Tente ajustar seus filtros ou buscar por outro termo.
                        </p>
                        <Button variant="outline" onClick={clearFilters} className="text-purple-600 border-purple-200 hover:bg-purple-50">
                            Limpar Filtros e Busca
                        </Button>
                    </div>
                ) : (
                    <div className={cn(
                        viewMode === 'grid'
                            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                            : "flex flex-col gap-3"
                    )}>
                        {filteredProducts.map((product) => {
                            const isFav = favorites.includes(product.id);
                            return (
                                <ProductListItem
                                    key={product.id}
                                    product={product}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    layout={viewMode}
                                    extraInfo={`Tamanhos: ${product.sizes || 'P, M, G'}`}
                                    actions={
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFav(product.id);
                                            }}
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
                )}
            </main>
        </div>
    );
};

export default BuyerProductsPage;