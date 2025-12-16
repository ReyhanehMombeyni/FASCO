'use server'
import { DiscountedProduct } from '@/src/types/products';
import { createClient } from '@/src/supabase/server';


export const getActiveCampaignEndDate = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('discount_campaigns').select('name, end_date').eq('is_active', true)
   .gte('end_date', new Date().toISOString())
  .limit(1); 

  if (error) {
    console.error("Error fetching campaign:", error);
    return null;
  }
  
  return data;
}

export const getDiscountedProducts = async (): Promise<DiscountedProduct[]> => { 
  const supabase = await createClient();
  
  const { data: products, error } = await supabase.from('products').select('id, name,image_url, discount_percentage')
    .eq('is_on_sale', true) 
    .limit(4);

  if (error) {
    console.error("Error fetching discounted products:", error);
    return [];
  }
  
  return products;
}