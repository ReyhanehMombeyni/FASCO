"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { DiscountedDetail } from "@/src/types/homepage";
import { DiscountedProduct } from "@/src/types/products";

const RightSideItem = memo(({ product }: { product: DiscountedProduct }) => (
  <div className="relative min-w-[60%] overflow-hidden shadow-sm">
    <Image
      src={product.image_url}
      alt={product.id}
      className="object-cover ml-1 sm:ml-4"
      fill
      sizes="(max-width: 768px) 30vw, 25vw"
      loading="lazy"
    />
  </div>
));
RightSideItem.displayName = "RightSideItem";

export function DealSlider({ nameCompain, discountedProducts }: DiscountedDetail) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = discountedProducts.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
  }, [itemsCount]);

  useEffect(() => {
    if (itemsCount <= 1) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, itemsCount]);

  const { currentItem, rightSideItems } = useMemo(() => {
    const current = discountedProducts[currentIndex];
    const others = [
      ...discountedProducts.slice(currentIndex + 1),
      ...discountedProducts.slice(0, currentIndex),
    ];
    return { currentItem: current, rightSideItems: others };
  }, [currentIndex, discountedProducts]);

  if (!itemsCount) return null;

  return (
    <div className="relative w-full h-60 sm:h-70 md:h-80 lg:h-[420px] overflow-hidden grid grid-cols-5">
      <div className="col-span-2 w-full relative shadow-lg overflow-hidden group">
      <div key={currentItem.id} className="relative w-full h-full animate-in fade-in duration-500 ease-in-out">
        <Image
          src={currentItem.image_url}
          alt={currentItem.name}
          className="transition-opacity duration-500 object-cover"
          fill
          priority
          sizes="(max-width: 768px) 40vw, 35vw"
        />
        <div className="absolute bottom-2 md:bottom-10 py-2 px-1 w-full text-center bg-white/90 backdrop-blur-sm"> 
          <div className="text-[6px] sm:text-xs lg:text-sm font-medium">
            {currentItem.name} — {nameCompain}
          </div>
          <div className="text-[8px] sm:text-sm lg:text-lg font-bold text-red-600">
            {currentItem.discount_percentage}% OFF
          </div>
        </div>
      </div>
      </div>

      <div className="col-span-3 grid grid-rows-6 ml-2 sm:ml-4">
        <div className="row-span-5 flex gap-2">
          {rightSideItems.map((product) => (
            <RightSideItem key={product.id} product={product} />
          ))}
        </div>

        <div className="row-span-1 ml-1 sm:ml-4 mt-5">
          <div className="flex space-x-2">
            {discountedProducts.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-gray-500 w-6" : "bg-gray-300 w-2"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
