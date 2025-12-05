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
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10">
        {isLoading ? (
          <p className="col-span-3 text-center text-xl text-gray-500">
            Loading products...
          </p>
        ) : (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <p className="col-span-3 text-center text-gray-500">
            No products are currently available in this category.
          </p>
        )}
      </div>
    </>
  );
};
