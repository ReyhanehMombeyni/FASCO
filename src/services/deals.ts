"use server";
import { DiscountedProduct } from "@/src/types/products";
import { Comment } from "../types/homepage";
import { unstable_cache } from "next/cache";
import { createClientForCache } from "../supabase/server";

export interface CampaignEndDate {
  name: string;
  end_date: string;
}

export const getActiveCampaignEndDate = unstable_cache(
  async (): Promise<CampaignEndDate> => {
    const supabase = await createClientForCache();

    const { data, error } = await supabase
      .from("discount_campaigns")
      .select("name, end_date")
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString())
      .single();
    if (error) {
      console.error("Error fetching campaign:", error);
      return { name: "", end_date: "" };
    }

    return data;
  },
  ["active-campaign-timer"],
  {
    revalidate: 300,
    tags: ["campaign"],
  }
);

export const getDiscountedProducts = unstable_cache(
  async (): Promise<DiscountedProduct[]> => {
    const supabase = await createClientForCache();

    const { data: products, error } = await supabase
      .from("products")
      .select("id, name, image_url, discount_percentage")
      .eq("is_on_sale", true)
      .limit(4);

    if (error) {
      console.error("Error fetching discounted products:", error);
      return [];
    }

    return products as DiscountedProduct[];
  },
  ["discounted-products-cache-key"],
  {
    revalidate: 3600,
    tags: ["products", "discounts"],
  }
);

export const getFeaturedComments = unstable_cache(
  async () => {
    const supabase = await createClientForCache();
    const { data, error } = await supabase
      .from("site_testimonials")
      .select(`
        id, rating, quote, created_at,
        user:user_display_info(username)
      `)
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as unknown as Comment[];
  },
  ["site-testimonials"],
  { revalidate: 3600 * 24, tags: ["testimonials"] }
);
