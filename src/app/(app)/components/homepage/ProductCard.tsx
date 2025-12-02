
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/src/constants";

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.status === 'Sold Out';

  return (
    <Card className="px-2 pt-2 sm:p-4 rounded-lg border-none" style={{boxShadow: "0 10px 25px rgba(0,0,0,0.1)"}}>
      <div className="relative w-full aspect-video">
        <Image
          src={product.imageUrl}
          alt={product.name}
            fill
          className="object-cover rounded-lg"
        />
      </div>

      <CardContent className="p-0 m-0">
        <div className="flex justify-between gap-1 items-center">
            <h3 className="text-gray-700 text-sm sm:text-xl sm:font-medium md:text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl">{product.name}</h3>
            <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                key={i}
                className={`w-2 h-2 sm:w-3 sm:h-3 xl:h-4 xl:w-4 2xl:w-5 2xl:h-5 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
            </div> 
        </div>
        <p className="text-[8px] sm:text-[10px] xl:text-xs 2xl:text-sm text-gray-400">Al Karam</p>
        <p className="pt-2 text-[9px] sm:text-xs xl:text-sm text-gray-600 xl:py-5 2xl:text-lg">({product.reviews}) Customer Reviews</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-0 -my-2 sm:mb-1 xl:mb-3 2xl:mb-6">
        <p className="text-md sm:text-lg xl:text-2xl font-medium text-gray-800 2xl:text-3xl">${product.price.toFixed(2)}</p>
        <p className={`text-[8px] sm:text-xs xl:text-sm xl:pt-1 2xl:text-lg ${isSoldOut ? 'text-red-500' : 'text-red-500'}`}>
          {product.status}
        </p>
      </CardFooter>
    </Card>
  );
}