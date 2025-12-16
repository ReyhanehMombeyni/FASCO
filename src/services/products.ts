'use server'
import { createClient as createServerSupabaseClient } from "@/src/supabase/server";
import { Product, ProductDetailType } from "../types/products";
import { PaginatedData } from "../types/shop";

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
  categoryId: string,
  limit: number,
  offset: number
): Promise<PaginatedData> {
  const supabase = await createServerSupabaseClient();

  const {
    data: productsData,
    error: productsError,
    count,
  } = await supabase
    .from("products")
    .select(`*, brands(name), stock_summary:product_stock_summary (
            total_stock
        )`, { count: "exact" })
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (productsError) {
    console.error("Error fetching paginated products:", productsError);
    return { products: [], totalCount: 0 };
  }

  return {
    products: productsData || [],
    totalCount: count || 0,
  };
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

export async function getProductDetails(
  productId: string
): Promise<ProductDetailType | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(`*, product_sizes(
      sizes (
      id,
      name,
      symbol
    )
      ), product_colors(
      colors (
      id,
      name,
      code
    )
      ), 
      product_inventory (
          size_id, 
          color_id, 
          stock_quantity
      )
          `)
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Supabase Error fetching product details:", error);
    return null;
  }

  return data as ProductDetailType;
}
