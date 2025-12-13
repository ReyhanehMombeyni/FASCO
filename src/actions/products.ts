"use server";

import { createClient as createServerSupabaseClient } from "@/src/supabase/server";
import { Color } from "./shop";

interface ColorsProduct {
  colors: Color;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image_url: string;
  status: "In Stock" | "Almost Sold Out" | "Sold Out";
  product_colors: ColorsProduct[] | [];
}

export interface CategoryDetails {
  name: string;
}

export interface ProductWithCategory extends Product {
  category: CategoryDetails;
}

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

interface PaginatedData {
  products: ProductWithCategory[];
  totalCount: number;
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
    .select("*", { count: "exact" })
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
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Supabase Error fetching product details:", error);
    return null;
  }

  return data as ProductDetailType;
}
