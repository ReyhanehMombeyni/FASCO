import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui";
import { Product } from "@/src/types/products";
import { RatingStar } from "@/src/components/shared";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const {
    id,
    name,
    price,
    rating,
    reviews,
    discount_percentage,
    image_url,
    brands,
    stock_summary,
  } = product;
  const isSoldOut = !!(product.stock_summary.length === 0);

  let discountAmount = 0;
  if (product.discount_percentage) {
    discountAmount = product.price * (product.discount_percentage / 100);
  }

  return (
    <Card
      className="px-2 pt-2 sm:p-4 rounded-lg border-none"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
    >
      <div className="overflow-y-hidden relative w-full aspect-3/2">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      <CardContent className="p-0 m-0">
        <div className="flex justify-between gap-1 items-center">
          <h3 className="text-gray-700 text-xs tracking-tighter sm:tracking-normal sm:text-base sm:font-medium md:text-lg lg:text-base lg:tracking-normal 2xl:text-lg">
            <Link href={`/product/${id}`}>{name}</Link>
          </h3>
          <RatingStar rating={rating} />
        </div>
        <p className="text-[8px] sm:text-[10px] xl:text-xs 2xl:text-sm text-gray-400">
          {brands?.name}
        </p>
        <p className="pt-1 text-[9px] sm:text-xs 2xl:text-sm text-gray-600 xl:py-2">
          ({reviews}) Customer Reviews
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-0 -my-2 sm:mb-1 xl:mb-3 2xl:mb-6">
        <div className="text-xs xl:text-base text-gray-700 2xl:text-lg flex items-center space-x-3">
          <span>${(price - discountAmount).toFixed(2)}</span>
          {discount_percentage && (
            <span className="text-[10px] md:text-xs xl:text-base line-through text-gray-400">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        <p
          className={`text-[8px] sm:text-xs xl:text-sm xl:pt-1 2xl:text-lg ${
            isSoldOut ? "text-red-500" : "text-red-900"
          }`}
        >
          {isSoldOut
            ? "Sold Out"
            : stock_summary?.[0]?.total_stock <= 10
            ? "Almost Sold Out"
            : "In Stock"}
        </p>

      </CardFooter>
    </Card>
  );
}
