"use client";

import { Button } from "@/components/ui";
import { useFilteredProducts } from "@/src/hooks/useFilteredProducts";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

interface Category {
  id: string;
  name: string;
}

interface ProductsSectionProps {
  categories: Category[];
}

export const ProductsSection = ({ categories }: ProductsSectionProps) => {
  const [initialCategory, setInitialCategory] = useState(categories[1]);
  const { filteredProducts, isLoading } = useFilteredProducts(
    initialCategory.id
  );

  return (
    <>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mb-12">
        {categories.map(({ name, id }) => (
          <Button
            key={id}
            onClick={() => setInitialCategory({ name, id })}
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
        <p className="col-span-3 text-center text-xl text-gray-500">
          Loading products...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <div className="my-10 lg:mt-15 text-center">
          <Button className="text-xs py-3 px-6 lg:py-6 lg:px-15 lg:text-base hadow-2xl">click more</Button>

          </div>
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
