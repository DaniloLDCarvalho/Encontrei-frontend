import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCategoryIcon } from "@/lib/productCategoryIconMapper";
import { formatCurrency } from "@/lib/formatCurrency";
import './ProductListItem.css'

export const ProductListItem = ({
                                    product,
                                    onClick,
                                    actions,
                                    extraInfo,
                                    layout = "list"
                                }) => {

    const IconComponent = getCategoryIcon(product.category);
    const isGrid = layout === "grid";

    return (
        <Card
            onClick={onClick}
            className={cn(
                // Classes Base
                "bg-white border-0 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden relative",
                onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",

                isGrid
                    ? "flex flex-col items-start p-3 h-full gap-3"
                    : "flex flex-row items-center p-3 gap-4 mb-3 w-full text-left"
            )}
        >
            {/* Container da Imagem */}
            <div className={cn(
                "shrink-0 bg-purple-100 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-purple-200",
                // No Grid, queremos que a imagem ocupe a largura total do card e seja quadrada
                isGrid ? "w-full aspect-square mb-1 rounded-xl" : "h-16 w-16 min-w-[4rem]"
            )}>
                <IconComponent className={cn("text-purple-600", isGrid ? "w-12 h-12" : "w-8 h-8")} />
            </div>

            {/* Container do Texto */}
            <div className={cn("flex-1 min-w-0", isGrid ? "w-full" : "pr-2")}>
                {extraInfo && (
                    <p className="text-xs text-purple-600 font-semibold mb-0.5 truncate">
                        {extraInfo}
                    </p>
                )}

                <h3 className={cn("font-semibold text-gray-800 leading-tight truncate", isGrid ? "text-sm" : "text-base")}>
                    {product.name}
                </h3>

                <p className="text-gray-900 font-bold mt-1 text-base">
                    {formatCurrency(product.price)}
                </p>
            </div>

            {/* Container de Ações */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    // No Grid, o botão flutua no canto superior direito (absolute)
                    // Na Lista, ele fica alinhado no fluxo normal à direita
                    isGrid
                        ? "absolute top-2 right-2 flex flex-col gap-2"
                        : "flex items-center gap-1 shrink-0"
                )}
            >
                {actions}
            </div>
        </Card>
    );
};