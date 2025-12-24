"use client";

import { Button } from "@/components/ui";
import { useEffect, useState } from "react";
import { useFilteredProducts } from "@/src/hooks/useFilteredProducts";
import { ProductCard } from "./ProductCard";
import { Category } from "@/src/types/core";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductsSectionProps } from "@/src/types/products";

export const ProductsSection = ( { categories, initialCategoryFromUrl }: ProductsSectionProps) => {
  const [initialCategory, setInitialCategory] = useState(initialCategoryFromUrl || {id: '', name: ''});

  const router = useRouter()
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const handleCategoryChange = (cat: Category) => {
    setInitialCategory(cat);
    router.push('/', { scroll: false });
  };

  const { filteredProducts, isLoading, loadMore, hasMore } = useFilteredProducts(initialCategory.id);

  useEffect(() => {
    const activeCategory = categories.find(c => (categoryParam === "discount-deals" ? c.name === "Discount Deals" : c.name === categoryParam)) || categories[1];
    if (categoryParam) {
      const timer = setTimeout(() => {
        setInitialCategory(activeCategory);
        const element = document.getElementById('new-arrivals-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [categoryParam, categories]);
  
  return (
    <>
      <div id="new-arrivals-section" className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mb-12">
        {categories.map(({ name, id }) => (
          <Button
            key={id}
            onClick={() => handleCategoryChange({ name, id })}
            variant={name === initialCategory.name ? "default" : "outline"}
            className={`text-[8px] sm:text-xs md:text-sm rounded-lg sm:py-4 md:py-5 border-none transition-colors 
                ${
                  name === initialCategory.name
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                }`}
            style={
              name === initialCategory.name
                ? { boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }
                : {}
            }
          >
            {name}
          </Button>
        ))}
      </div>
      {isLoading ? (
        <p className="col-span-3 text-center text-gray-500 text-xs md:text-sm 2xl:text-base">
          Loading products...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          {hasMore && (
                <div className="my-10 lg:mt-15 text-center">
                    <Button 
                        onClick={loadMore} 
                        disabled={isLoading} 
                        className="text-xs py-3 px-6 lg:py-6 lg:px-15 lg:text-base hadow-2xl"
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </>
      )}

      {filteredProducts.length === 0 && !isLoading && (
        <p className="col-span-3 text-center text-gray-500 text-xs md:text-sm lg:text-base">
          No products are currently available in this category :(
        </p>
      )}
    </>
  );
};
