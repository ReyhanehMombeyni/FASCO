import { getProductDetails } from "@/src/actions/products";
import { notFound } from "next/navigation";
import { ProductDetail } from '../../components/productpage/ProductDetail';
import Image from "next/image";
import { DealsOfTheMonth, ProductShowcase } from "../../components/homepage";
// import { Badge } from '@/components/ui/badge';

const axKocholo= ["inyki", "onyhi", "hamin", "hamon", "invari", "onvari", "irako", "orako"];

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    console.error("Missing required product ID in parameters.");
    return notFound();
  }
  const product = await getProductDetails(id);
  if (!product) {
      notFound();
  }

  // const discountPercent = product.oldPrice
  //     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
  //     : 0;

  return (
    <main>
      <section className="p-5 pb-10 md:px-20 lg:px-30 md:pb-20">
        <p className="text-xs text-gray-500 mb-2 hidden sm:block">
            FASCO &rsaquo; {product.name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15">

            <div className="flex flex-col sm:flex-row-reverse sm:h-120 gap-2 lg:gap-5">
                <div className="w-full relative h-115 sm:min-h-full bg-gray-50">
                    <Image src={product.image_url} alt={product.name} fill className="object-contain lg:object-cover xl:object-contain" />
                </div>
                <div className="flex gap-0.5 overflow-x-scroll sm:flex-col sm:overflow-y-scroll sm:overflow-x-none sm:w-1/4 md:w-1/5 no-scrollbar"> 
                  {/* lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-scroll lg:overflow-y-auto max-h-screen */}
                    {
                      axKocholo.map((ax) => <div key={ax} className="bg-indigo-500 min-w-20 min-h-20 sm:min-w-25 sm:min-h-25 md:h-30 lg:min-w-15 lg:min-h-20 text-sm">
                         {ax}
                      </div>
                    )
                  }
                </div>
            </div>

            <ProductDetail product={product} />

        </div>
      </section>
      <ProductShowcase />
      <DealsOfTheMonth />
    </main>
  );
}
