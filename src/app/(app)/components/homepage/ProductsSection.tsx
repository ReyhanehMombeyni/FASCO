"use client";

import { useEffect, useReducer, useTransition } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui";
import { getProductsByCategory } from "@/src/services/products";
import { ProductsSectionProps } from "@/src/types/products";
import { useRouter } from "next/navigation";
import { Category } from "@/src/types/core";
import { productsReducer, initialProductsState } from "@/src/utils/productReducer";

export const ProductsSection = ({
  categories,
  initialCategory,
  initialProducts,
  initialTotal,
  hasParam
}: ProductsSectionProps) => {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [state, dispatch] = useReducer(productsReducer, {initialCategory, initialProducts, initialTotal}, initialProductsState);
const { products, currentCategory, offset, total, isLoadingMore } = state;

  useEffect(() => {
    if (hasParam) {
      const element = document.getElementById('new-arrivals');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hasParam]);

  const handleCategoryChange = (cat: Category) => {
    if (cat.id === currentCategory.id || isPending) return;

    startTransition(async () => {
      const { products: newProducts, totalCount } = await getProductsByCategory(
        cat.id,
        6,
        0
      );
      dispatch({
        type: "CHANGE_CATEGORY",
        category: cat,
        products: newProducts,
        total: totalCount,
      });
      router.push('/', { scroll: false });
    });
  };

  const loadMore = async () => {
    if (isLoadingMore) return;
    
    dispatch({ type: "LOAD_MORE_START" });
    try {
      const { products: moreProducts } = await getProductsByCategory(
        currentCategory.id,
        6,
        offset
      );
      dispatch({ type: "LOAD_MORE_SUCCESS", products: moreProducts });
    } finally {
      dispatch({ type: "LOAD_MORE_FINAL" });
    }
  };

  // const router = useRouter()
  // const searchParams = useSearchParams();
  // const categoryParam = searchParams.get('category');

  // const handleCategoryChange = (cat: Category) => {
  //   setInitialCategory(cat);
  //   router.push('/', { scroll: false });
  // };

  // const { filteredProducts, isLoading, loadMore, hasMore } = useFilteredProducts(initialCategory.id);

  // useEffect(() => {
  //   const activeCategory = categories.find(c => (categoryParam === "discount-deals" ? c.name === "Discount Deals" : c.name === categoryParam)) || categories[1];
  //   if (categoryParam) {
  //     const timer = setTimeout(() => {
  //       setInitialCategory(activeCategory);
  //       const element = document.getElementById('new-arrivals-section');
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //       }
  //     }, 150);
  //     return () => clearTimeout(timer);
  //   }
  // }, [categoryParam, categories]);

  return (
    <div id="new-arrivals" className="scroll-mt-24">
      <div
        className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mb-12"
      >
        {categories.map(({ name, id }) => (
          <Button
            key={id}
            onClick={() => handleCategoryChange({ name, id })}
            disabled={isPending}
            variant={name === currentCategory.name ? "default" : "outline"}
            className={`text-[8px] sm:text-xs md:text-sm rounded-lg sm:py-4 md:py-5 border-none transition-colors 
                ${
                  name === currentCategory.name
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                }`}
            style={
              name === currentCategory.name
                ? { boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }
                : {}
            }
          >
            {name}
          </Button>
        ))}
      </div>

      <div
        className={`${
          isPending ? "opacity-40 grayscale-50" : "opacity-100"
        } grid grid-cols-2 gap-3 sm:gap-5 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10`}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {isPending && (
        <p className="text-center text-xs text-gray-400 mt-2 animate-pulse">
          Updating collection...
        </p>
      )}

      {products.length < total && (
        <div className="my-10 lg:mt-15 text-center">
          <Button
            onClick={loadMore}
            disabled={isLoadingMore || isPending}
            className="text-xs py-3 px-6 lg:py-5 lg:px-10 lg:text-base hadow-2xl"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {products.length === 0 && !isPending && (
        <p className="col-span-3 text-center text-gray-500 text-xs md:text-sm">
          No products are currently available in this category :(
        </p>
      )}
    </div>
  );

};
