import { notFound } from "next/navigation";
import { getProductDetails } from "@/src/services/products";
import { getActiveCampaignEndDate } from "@/src/services/deals";
import { ProductDetail } from "./ProductDetail"
import { ParamsId } from "@/src/types/products";

export const ProductContent = async ({params}: ParamsId) => {
    const { id } = await params;

  if (!id) {
    console.error("Missing required product ID in parameters.");
    return notFound();
  }
  const product = await getProductDetails(id);
  
  if (!product) {
    notFound();
  }

  const campaignDetail = await getActiveCampaignEndDate();
  const campaignEndDate = campaignDetail?.end_date;

  let discountAmount = 0;
  if (product.discount_percentage) {
    discountAmount = product.price * (product.discount_percentage / 100);
  }
  return (
    <section className="p-5 pb-10 md:px-20 lg:px-30 md:pb-15">
        <p className="text-xs text-gray-500 mb-2 hidden sm:block">
          FASCO &rsaquo; {product.name}
        </p>

        <div>
          <ProductDetail
            product={product}
            discountAmount={discountAmount}
            campaignEndDate={campaignEndDate}
          />
        </div>
      </section>
  )
}
