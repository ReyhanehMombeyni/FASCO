"use server";

import { createClient as createServerSupabaseClient } from "@/src/supabase/server";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image_url: string;
  status: "In Stock" | "Almost Sold Out" | "Sold Out";
}

export interface CategoryDetails {
  name: string;
}

export interface ProductWithCategory extends Product {
  category: CategoryDetails;
}

interface ProductFilters {
  brand?: string;
  size?: string;
  minPrice?: number;
}

export async function getCategories() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("categories").select("id, name");

  if (error) {
    console.error("Supabase Error fetching categories:", error);
    return [];
  }

  return data;
}

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductWithCategory[]> {
  const supabase = await createServerSupabaseClient();

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select(
      `
            id,
            name,
            description,
            price,
            rating,
            reviews,
            image_url,
            status,
            category:category_id (name) 
        `
    )
    .eq("category_id", categoryId);

  if (productsError) {
    console.error("Supabase Error fetching products:", productsError);
    return [];
  }

  return productsData as unknown as ProductWithCategory[];
}

export async function getAllProducts(): Promise<Product[]> {
  // const supabase = await createServerSupabaseClient();
  // const data = await supabase.from('products').select('*');
  // if (filters.brand) {
  //     query = query.eq('brand', filters.brand);
  // }
  // if (filters.minPrice) {
  //     query = query.gte('price', filters.minPrice);
  // }

  // const { data } = await query;

  // return data as Product[];

  const supabase = await createServerSupabaseClient();

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*");

  if (productsError) {
    console.error("Supabase Error fetching products:", productsError);
    return [];
  }

  return productsData as unknown as Product[];
}
