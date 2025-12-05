'use server';

import { createClient as createServerSupabaseClient } from '@/src/supabase/server';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image_url: string;
  status: 'In Stock' | 'Almost Sold Out' | 'Sold Out';
}

export async function getCategories() { 
    const supabase = await createServerSupabaseClient(); 

    const { data, error } = await supabase.from('categories').select('id, name');

    if (error) {
        console.error("Supabase Error fetching categories:", error);
        return []; 
    }
    
    return data;
}


export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    
    const supabase = await createServerSupabaseClient(); 

    const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
            id,
            name,
            description,
            price,
            rating,
            reviews,
            image_url,
            status,
            category:category_id (name) 
        `)
        .eq('category_id', categoryId); 

    if (productsError) {
        console.error("Supabase Error fetching products:", productsError);
        return [];
    }

    return productsData;
}
