"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { ShopProduct } from "@/src/types/products";

const ProductCard = ({ product }: { product: ShopProduct }) => {
  const availableColors = product.product_colors;

  let discountAmount = 0;
  if (product.discount_percentage) {
    discountAmount = product.price * (product.discount_percentage / 100);
  }

  return (
    <Card className="rounded-none border-none shadow-none p-0 m-0">
      <CardContent className="p-0 m-0">
        <div className="relative h-35 sm:h-50 md:h-60 lg:h-70 xl:h-85 2xl:h-100 w-full bg-gray-300 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 30vw, 400px"
          />
        </div>

        <div className="pl-1 py-1 sm:pb-3 xl:pb-5 m-0">
          <h1 className="text-[8px] font-medium tracking-tighter sm:text-[10px] sm:tracking-normal sm:py-1 md:text-xs md:tracking-tighte lg:text-sm xl:text-lg xl:tracking-normal xl:py-2 2xl:text-xl hover:text-gray-500 transition-colors cursor-pointer">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h1>
          <div className="text-[7px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base text-gray-800 flex items-center gap-2">
            <span>${(product.price - discountAmount).toFixed(2)}</span>
            {product.discount_percentage && (
              <span className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs xl:text-sm line-through text-gray-400">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="lg:pt-2 flex items-center gap-0.5">
            {availableColors &&
              availableColors?.map(({ colors }) => (
                <div
                  key={colors.id}
                  className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 rounded-full cursor-pointer border border-gray-200 transition-all`}
                  style={{ backgroundColor: colors.code }}
                ></div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function ProductGrid({ products }: { products: ShopProduct[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-3 lg:gap-x-5 lg:gap-y-7 xl:gap-x-10 xl:gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
