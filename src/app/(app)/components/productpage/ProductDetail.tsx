"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductDetailType } from "@/src/actions/products";
import { Star, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui";
import { Timer } from "../homepage/Timer";

interface ProductDetailClientProps {
  product: ProductDetailType;
  discountAmount: number;
  campaignEndDate: string;
}
const LOW_STOCK_THRESHOLD = 50;
export const ProductDetail = ({
  product,
  discountAmount,
  campaignEndDate
}: ProductDetailClientProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.product_sizes[0]?.sizes.id || null
  ); 
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.product_colors[0]?.colors.id || null
  );
  const [quantity, setQuantity] = useState(1);

  const {
    name,
    rating,
    reviews,
    price,
    discount_percentage,
    product_sizes,
    product_colors,
    product_inventory,
  } = product;

  const currentVariant = product_inventory.find(
    (variant) =>
      variant.size_id === selectedSize && variant.color_id === selectedColor
  );
  const currentStock = currentVariant?.stock_quantity || 0;
  const initialStock =
    currentStock > LOW_STOCK_THRESHOLD ? currentStock : LOW_STOCK_THRESHOLD;
  const lowStockPercent = (currentStock / initialStock) * 100;

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
        <h1 className="text-lg sm:text-xl md:text-2xl lg:pt-2 font-serif">
          {name}
        </h1>

        <div className="flex items-center space-x-2 pt-1">
          <div className="flex items-center text-black">
            {Array(Math.floor(rating))
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-2 h-2 md:w-3 md:h-3 fill-black" />
              ))}
          </div>
          <span className="text-xs text-gray-500 pt-0.5">({reviews})</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 font-sans">
        <span className="text-lg lg:text-xl font-semibold text-gray-800">
          ${(price - discountAmount).toFixed(2)}
        </span>
        {discount_percentage && (
          <>
            <span className="text-sm line-through text-gray-400">
              ${price.toFixed(2)}
            </span>
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-[8px] py-0.5 px-1 pb-0.5">
              SAVE {discount_percentage}%
            </Badge>
          </>
        )}
      </div>

      <div>
        {discount_percentage > 0 && (
          <div className="flex justify-between items-center bg-red-50/70 border border-red-100 rounded-md p-2.5 text-red-400 mt-5 lg:mt-8">
            <span className="font-thin font-serif tracking-wide text-xs lg:text-sm">
              Hurry up! Sale ends in:
            </span>
            <Timer endDateString={campaignEndDate} type="ProductPage" />
          </div>
        ) }
      </div>

      <div className="mt-5 lg:mt-8">
        {currentStock <= LOW_STOCK_THRESHOLD && (
          <div className="text-xs">
            <p className="text-gray-600 mb-1">
              Only{" "}
              <span className="font-bold text-red-600">{currentStock}</span>{" "}
              item(s) left in stock!
            </p>

            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-red-500 h-1 rounded-full transition-all duration-500"
                style={{
                  width: `${lowStockPercent}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 font-serif">
        <p className="text-xs md:text-sm font-medium mb-2">
          Size:{" "}
          <span className="pl-1">
            {product_sizes.find((s) => s.sizes.id === selectedSize)?.sizes
              .symbol || "N/A"}
          </span>
        </p>
        <div className="flex space-x-2">
          {product_sizes.map(({ sizes }) => (
            <button
              key={sizes.id}
              onClick={() => setSelectedSize(sizes.id)}
              className={`
                w-6 h-6 rounded-sm border text-xs transition-all lg:w-7 lg:h-7 lg:text-sm
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
        <p className="text-xs md:text-sm font-medium mb-2">
          Color:{" "}
          <span className="pl-1">
            {product_colors.find((c) => c.colors.id === selectedColor)?.colors
              .name || "None"}
          </span>
        </p>
        <div className="flex space-x-2">
          {product_colors.map(({ colors }) => (
            <div
              key={colors.id}
              onClick={() => setSelectedColor(colors.id)}
              className={`
                w-5 h-5 lg:w-6 lg:h-6 rounded-full cursor-pointer border lg:border-2 transition-transform
                ${
                  selectedColor === colors.id
                    ? "scale-110 border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                    : `border-gray-200 hover:border-gray-300`
                }
              `}
              style={{
                backgroundColor: colors.code
              }}
              title={colors.code}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4 pt-2 lg:pt-6">
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-4"
            disabled={quantity <= 1}
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
            className="w-12 text-center border-y-0 border-x rounded-none h-4 p-0 pl-1 lg:pl-2 shadow-none"
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-4"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= currentStock}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="sm"
          className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor || currentStock === 0}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};
