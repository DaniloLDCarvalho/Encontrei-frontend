import {useEffect, useMemo, useState} from "react";

export function useProductsFilter(initialProducts = []) {

    const FAVORITES_KEY = "buyer_favorites_products";

    const [searchTerm, setSearchTerm] = useState("");

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem(FAVORITES_KEY);
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);


    const [filters, setFilters] = useState({
        categories: [],
        sizes: [],
        colors: [],
        priceRange: [0, 1000],
        onlyFavorites: false
    });

    const availableOptions = useMemo(() => {
        const options = {
            favorites: new Set(),
            categories: new Set(),
            sizes: new Set(),
            colors: new Set(),
            maxPrice: 0
        };

        initialProducts.forEach(product => {
            if (product.category) options.categories.add(product.category);
            if (product.sizes) {
                product.sizes.split(",").forEach(size => options.sizes.add(size.trim()));
            }
            if (product.colors) {
                product.colors.split(",").forEach(color => options.colors.add(color.trim()));
            }
            if (product.price && product.price > options.maxPrice) {
                options.maxPrice = product.price;
            }
        });

        return {
            categories: Array.from(options.categories).sort(),
            sizes: Array.from(options.sizes),
            colors: Array.from(options.colors).sort(),
            maxPrice: Math.ceil(options.maxPrice)
        }
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        if (!initialProducts) return [];

        const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedSearchTerm = normalize(searchTerm);

        return initialProducts.filter(product => {
            const matchesSearch = !searchTerm ||
                normalize(product.name).includes(normalizedSearchTerm) ||
                normalize(product.category).includes(normalizedSearchTerm);

            const matchesCategory = filters.categories.length === 0 ||
                filters.categories.includes(product.category);

            const productSizes = product.sizes ? product.sizes.split(",").map(s => s.trim()) : [];
            const matchesSize = filters.sizes.length === 0 ||
                productSizes.some(size => filters.sizes.includes(size));

            const productColors = product.colors ? product.colors.split(",").map(c => c.trim()) : [];
            const matchesColor = filters.colors.length === 0 ||
                productColors.some(color => filters.colors.includes(color));

            const matchesPrice = product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1];

            const matchesFavorites = !filters.onlyFavorites ||
                favorites.includes(product.id);

            return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice && matchesFavorites;
        });
    }, [initialProducts, searchTerm, filters]);

    const toggleFilter = (type, value) => {
        if (typeof value === "boolean") {
            setFilters(prevFilters => ({
                ...prevFilters,
                [type]: value
            }));
        } else {
            setFilters(prevFilters => {
                const updatedValues = prevFilters[type].includes(value)
                    ? prevFilters[type].filter(v => v !== value)
                    : [...prevFilters[type], value];

                return {
                    ...prevFilters,
                    [type]: updatedValues
                };
            });
        }
    }

    const setPriceRange = (range) => setFilters(
        prevFilters => ({ ...prevFilters, priceRange: range })
    );

    const clearFilters = () => {
        setFilters({
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, availableOptions.maxPrice || 1000],
        });
        setSearchTerm("");
    };

    return {
        searchTerm, setSearchTerm,
        filters, toggleFilter, setPriceRange, clearFilters,
        filteredProducts,
        totalResults: filteredProducts.length,
        hasNoResults: filteredProducts.length === 0,
        favorites, setFavorites,
        availableOptions
    }
}