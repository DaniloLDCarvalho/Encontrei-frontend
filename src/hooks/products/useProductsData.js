import {useQuery} from "@tanstack/react-query";
import {productService} from "@/services/productService";
import {productsDataMock} from "@/hooks/products/productsDataMock";
import {useMemo} from "react";

export const useProductsData = () => {

    const isDev = typeof import.meta !== 'undefined' ? import.meta.env && import.meta.env.MODE === 'development' : true

    const productsQuery = useQuery({
        queryKey : ['products'],
        queryFn : productService.getAllProducts,
    });

    const productsData = useMemo(() => {
        const products = (isDev && (!productsQuery.data || productsQuery.data.length !== 0))
            ? [...productsDataMock]
            : (productsQuery.data ?? []);

        const lowInStockProducts = products.filter(product => product.stock <= 5 && product.stock > 0);
        const outOfStockProducts = products.filter(product => product.stock === 0);

        const categories = [...new Set(products.map(product => product.category))];

        const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

        return {
            products,
            productsCount: products.length,
            lowInStockProducts,
            outOfStockProducts,
            categories,
            totalStockValue
        }
    }, [productsQuery.data] );

    return {
        isLoading: productsQuery.isLoading,
        isError: productsQuery.isError,
        refetch: () => {
            productsQuery.refetch().then(r => r.data)
        },
        data: productsData
    }
}