'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProductsByCategory } from '@/src/services/products';
import { Product } from '../types/products';

const ITEMS_PER_PAGE = 6;

export const useFilteredProducts = (initialCategory: string) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const hasMore = filteredProducts.length < totalCount;

    const fetchAndSetProducts = useCallback(async (
        categoryId: string, 
        currentOffset: number, 
        isInitialLoad: boolean
    ) => {
        setIsLoading(true);
        try {
            const { products, totalCount } = await getProductsByCategory(
                categoryId, 
                ITEMS_PER_PAGE, 
                currentOffset
            );

            if (isInitialLoad) {
                setFilteredProducts(products);
                setTotalCount(totalCount);
                setOffset(products.length);
            } else {
                setFilteredProducts(prev => [...prev, ...products]);
                setOffset(prev => prev + products.length);
            }
        } catch (error) {
            console.error("error in fetching data", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialCategory) return;
        fetchAndSetProducts(initialCategory, 0, true);
    }, [initialCategory, fetchAndSetProducts]);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchAndSetProducts(initialCategory, offset, false);
        }
    }, [isLoading, hasMore, initialCategory, offset, fetchAndSetProducts]);

    return { 
        filteredProducts, 
        isLoading,
        loadMore, 
        hasMore 
    };
};
