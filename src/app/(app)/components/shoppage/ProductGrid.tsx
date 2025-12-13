"use client";
import { Card, CardContent } from "@/components/ui";
import { Product } from "@/src/actions/products";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
const availableColors = product.product_colors;

  return (
    <Card className="rounded-none border-none shadow-none p-0 m-0">
      <CardContent className="p-0 m-0">
        <div className="relative h-35 sm:h-50 md:h-60 lg:h-70 xl:h-85 2xl:h-100 w-full bg-yellow-900 overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="pl-1 py-1 sm:pb-3 xl:pb-5 m-0">
          <h1 className="text-[8px] font-medium tracking-tighter sm:text-[10px] sm:tracking-normal sm:py-1 md:text-xs md:tracking-tighte lg:text-sm xl:text-lg xl:tracking-normal xl:py-2 2xl:text-xl hover:text-gray-500 transition-colors cursor-pointer">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h1>
          <p className="text-[7px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base 2xl:text-base">
            {/* {product.oldPrice && (
            <span className="line-through text-gray-400 mr-2">
              ${product.oldPrice.toFixed(2)}
            </span>
          )} */}
            <span className="text-gray-800">${product.price.toFixed(2)}</span>
          </p>
            
            <div className="pt-2 flex items-center gap-0.5">
              {availableColors && (
                availableColors?.map(({colors}) => (
                <div
                  key={colors.id}
                  className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 rounded-full cursor-pointer border border-gray-200 transition-all`}
                  style={{ backgroundColor: colors.code }}
                ></div>
              ))
              )}
            </div>

          {/* {product.sizes && product.sizes.map((size) => (
              <span 
                key={size} 
                className="text-xs text-gray-500"
              >
                {size}
              </span>
            ))} */}
          {/* </div>
        ) : (<div>nothing</div>)} */}
        </div>
      </CardContent>
    </Card>
  );
};

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-3 lg:gap-x-5 lg:gap-y-7 xl:gap-x-10 xl:gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
