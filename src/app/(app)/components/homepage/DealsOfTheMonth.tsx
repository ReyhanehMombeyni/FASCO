import { createClient } from '@/src/supabase/server';
import { Button } from "@/components/ui";
import { Timer } from "./Timer"; 
import { DealSlider } from "./DealSlider"; 

export interface DiscountedProduct {
    id: string;
    name: string;
    image_url: string;
    discount_percentage: number;
};

export async function getActiveCampaignEndDate() {
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

async function getDiscountedProducts(): Promise<DiscountedProduct[]> { 
  const supabase = await createClient();
  
  const { data: products, error } = await supabase.from('products').select('id, name,image_url, discount_percentage')
    .eq('is_on_sale', true) 
    // .order('created_at', { ascending: false }) 
    .limit(4);

  if (error) {
    console.error("Error fetching discounted products:", error);
    return [];
  }
  
  return products;
}

export async function DealsOfTheMonth() {

  const campaignDetail = await getActiveCampaignEndDate();
  const discountedProducts = await getDiscountedProducts();
  const nameCompain: string = campaignDetail?.[0]?.name;
  const campaignEndDate= campaignDetail?.[0]?.end_date;
  
  return (
    <div className="bg-[#fcfcfc] py-10 md:py-15 lg:py-30 pl-5 md:pl-20 lg:pl-30 grid grid-cols-5 gap-2 md:gap-10 items-start rounded-xl">
        
        <div className="space-y-3 lg:space-y-8 pt-2 col-span-2">
          <h2 className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-medium text-gray-700 font-serif tracking-wide">
            Deals Of The Month
          </h2>
          <p className="text-[8px] md:text-xs text-muted-foreground lg:text-sm max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <Button className="text-[10px] py-4 sm:px-5 sm:text-xs md:px-8 md:py-5 md:text-sm lg:px-10 lg:py-7 lg:text-lg">
            Buy Now
          </Button>

          <div className="pt-4 sm:pt-10 space-y-4">
            <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-xl lg:font-medium text-gray-700">
              Hurry, Before It is Too Late!
            </h3>
            <Timer endDateString={campaignEndDate} type="DealsOfTheMonth" />
          </div>
        </div>

        <div className="relative w-full col-span-3">
          <DealSlider nameCompain={nameCompain} discountedProducts={discountedProducts} />
        </div>
    </div>
  );
}