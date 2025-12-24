import { getCategories } from "@/src/services/products";
import { ProductsSection } from "./ProductsSection";
import { SearchParamsProp } from "@/src/types/homepage";

export const NewArrivalsSection = async ( {
  searchParams
}: {
  searchParams: SearchParamsProp
}) => {
  const {category} = searchParams;
  const categories = await getCategories();

  const activeCategory = categories.find(c => (category === "discount-deals" ? c.name === "Discount Deals" : c.name === category)
  ) || categories[1];
  

  return (
    <section className="py-5 sm:py-8 md:py-12 lg:py-20 px-5 md:px-20 lg:px-30">
      <h2 className="text-lg md:text-xl lg:text-4xl font-serif text-gray-600 lg:font-medium text-center tracking-wide mb-4">
        New Arrivals
      </h2>
      <p className="text-center text-[10px] md:text-xs lg:text-sm text-gray-400 mb-10 max-w-lg mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices solliciitudin sem. scelerisque duid uitrices solicitudin.
      </p>
      <ProductsSection categories={categories} initialCategoryFromUrl={activeCategory} />
    </section>
  );
};
