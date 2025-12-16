'use client';

import { useState, useEffect } from 'react';
import { getAllProducts, Product } from '@/src/services/products';

export const useGetAllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("error in fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, isLoading };
};