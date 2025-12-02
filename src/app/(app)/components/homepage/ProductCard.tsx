
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/src/constants";

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.status === 'Sold Out';

  return (
    <Card className="p-5 rounded-lg border-none" style={{boxShadow: "0 10px 25px rgba(0,0,0,0.1)"}}>
      <div className="relative w-full aspect-video">
        <Image
          src={product.imageUrl}
          alt={product.name}
            fill
          className="object-cover rounded-lg"
        />
      </div>

      <CardContent className="p-0 m-0">
        <div className="flex justify-between gap-5 items-center">
            <h3 className="text-gray-700 text-2xl font-medium tracking-tighter">{product.name}</h3>
            <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
            </div> 
        </div>
        <p className="text-[9px] text-gray-400">Al Karam</p>
        <p className="pt-4 text-xs text-gray-600">({product.reviews}) Customer Reviews</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-0 pb-3">
        <p className="text-2xl font-medium text-gray-800">${product.price.toFixed(2)}</p>
        <p className={`text-xs pt-2 font-medium ${isSoldOut ? 'text-red-500' : 'text-red-500'}`}>
          {product.status}
        </p>
      </CardFooter>
    </Card>
  );
}