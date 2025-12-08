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

// interface ProductFilters {
//   brand?: string;
//   size?: string;
//   minPrice?: number;
// }

// export interface ColorOption {
//     name: string;
//     hex: string;
// }

export interface ProductDetailType {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image_url: string;
    // oldPrice: number; 
    // reviewCount: number; 
    // availableSizes: string[];
    // availableColors: ColorOption[]; 
    // stock: number;
    // sku: string;
    reviews: number;
  status: "In Stock" | "Almost Sold Out" | "Sold Out";
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


export async function getProductDetails(productId: string): Promise<ProductDetailType | null> {
    const supabase = await createServerSupabaseClient(); 

    const { data, error } = await supabase
        .from('products')
        .select("*")
        .eq('id', productId)
        .single();

    if (error) {
        console.error("Supabase Error fetching product details:", error);
        return null;
    }

    // اگر دیتابیس شما آرایه تصاویر یا رنگ‌ها را به صورت JSON ذخیره کرده باشد، ممکن است نیاز به پارس کردن باشد.
    return data as ProductDetailType; 
}
