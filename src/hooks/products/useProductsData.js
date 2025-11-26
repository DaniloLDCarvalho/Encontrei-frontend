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
        const apiData = productsQuery.data;
        const hasApiData = apiData && apiData.length > 0;

        const productsSource = hasApiData ? apiData : (isDev ? productsDataMock : []);

        const products = [...productsSource]

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