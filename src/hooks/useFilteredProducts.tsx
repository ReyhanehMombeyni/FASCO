'use client';

import { useState, useEffect } from 'react';
import { getProductsByCategory, Product } from '@/src/actions/products';

export const useFilteredProducts = (initialCategory: string) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!initialCategory) return;

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory(initialCategory);
                setFilteredProducts(data);
            } catch (error) {
                console.error("error in fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [initialCategory]);

    return { filteredProducts, isLoading };
};