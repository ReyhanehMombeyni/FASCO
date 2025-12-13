"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductDetailType } from "@/src/actions/products";
import { Star, Minus, Plus } from "lucide-react";
// import { Badge } from '@/components/ui/badge';

interface ProductDetailClientProps {
  product: ProductDetailType;
  discountAmount: number;
}

export const ProductDetail = ({ product, discountAmount }: ProductDetailClientProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.product_sizes[0]?.sizes.id || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.product_colors[0]?.colors.id || null
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // if (!selectedSize || !selectedColor) {
    //     alert("Please select both size and color.");
    //     return;
    // }
    // console.log({
    //     action: 'Add to Cart',
    //     product: product.name,
    //     size: selectedSize,
    //     color: selectedColor,
    //     qty: quantity
    // });
  };

  return (
    <div className="space-y-3 md:space-y-5">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:pt-2 font-serif">
          {product.name}
        </h1>

        <div className="flex items-center space-x-2 pt-1">
          <div className="flex items-center text-black">
            {Array(Math.floor(product.rating))
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-black" />
              ))}
          </div>
          <span className="text-xs text-gray-500 pt-0.5">
            ({product.reviews})
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-2 font-sans">
        <span className="text-xl lg:text-2xl font-semibold text-gray-800">
          ${(product.price - discountAmount).toFixed(2)}
        </span>
        {product.discount_percentage && (
                    <>
                        <span className="text-base line-through text-gray-400">${product.price.toFixed(2)}</span>
                        <span></span>
                        {/* {discountPercent > 0 && (  <div>SAVE {discountPercent}%</div>
                            // <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                            //     SAVE {discountPercent}%
                            // </Badge>
                        )} */}
                    </>
                )}
      </div>

      <div className="lg:py-4">
        <p className="text-sm md:text-base text-red-500">
          Only n item(s) left in stock!
        </p>
        {/* {product.stock} */}
        <div className="hidden lg:block lg:h-1 w-full">for nemodar</div>
      </div>

      <div className="pt-2 font-serif">
        <p className="text-sm md:text-base font-medium mb-2">
          Size:{" "}
          <span className="pl-1">
            {product.product_sizes.find((s) => s.sizes.id === selectedSize)
              ?.sizes.symbol || "N/A"}
          </span>
        </p>
        <div className="flex space-x-2">
          {product.product_sizes.map(({ sizes }) => (
            <button
              key={sizes.id}
              onClick={() => setSelectedSize(sizes.id)}
              className={`
                px-3 py-1 text-sm border rounded-sm font-medium transition-all
                ${
                  selectedSize === sizes.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-800 hover:border-gray-900"
                }
              `}
            >
              {sizes.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 font-serif">
        <p className="text-sm md:text-base font-medium mb-2">
          Color:{" "}
          <span className="pl-1">
            {product.product_colors.find((c) => c.colors.id === selectedColor)
              ?.colors.name || "None"}
          </span>
        </p>
        <div className="flex space-x-2">
          {product.product_colors.map(({ colors }) => (
            <div
              key={colors.id}
              onClick={() => setSelectedColor(colors.id)}
              className={`
                w-7 h-7 rounded-full cursor-pointer border-2 transition-transform
                ${
                  selectedColor === colors.id
                    ? "scale-110 border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                    : `border-gray-200 hover:border-gray-300`
                }
              `}
              style={{
                backgroundColor: colors.code,
                borderColor:
                  selectedColor === colors.id ? "border-gray-900" : colors.code,
              }}
              title={colors.code}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4 pt-4 lg:pt-8">
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-12 text-center border-y-0 border-x rounded-none h-8 p-0"
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setQuantity((q) => q + 1)}
            // disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="lg"
          className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor} //product.stock === 0 ||
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};
