import { Button } from "@/components/ui/button";
import { ChevronDown, List, Grid3X3, Grid2X2 } from "lucide-react";
import { FilterSidebar, ProductGrid } from "../components/shoppage";
import { InstagramFeed, ProductShowcase } from "../components/homepage";
// import { getFilteredProducts } from "@/src/actions/products";

const page = async () => {

//   { 
//     searchParams 
// }: { 
//     searchParams: { 
//         brand?: string, 
//         size?: string, 
//         minPrice?: string 
//     } 

//   const filters = {
//         brand: searchParams.brand,
//         size: searchParams.size,
//         minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
//     };

//     const products = await getFilteredProducts(filters);

  return (
    <main>
      <section className="px-5 md:px-20 lg:px-30 pt-5 pb-15">
        <div className="text-center mb-8">
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Home &rsaquo; Shopping</p>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl lg:tracking-wider lg:font-medium xl:text-4xl font-serif mt-1 lg:pt-2">Fashion</h1>
        </div>

        <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 lg:gap-8">
          <div className="col-span-1">
            <FilterSidebar />
          </div>

          <div className="col-span-3 xl:col-span-4">
            <Toolbar />
            <ProductGrid /> 
            {/* products={products} */}
          </div>
        </div>
      </section>
        <ProductShowcase />
        <InstagramFeed />
    </main>
  );
}

const Toolbar = () => (
  <div className="flex justify-between items-center pb-4">
    <div className="flex items-center space-x-2">
      <span className="text-[10px] md:text-xs lg:text-sm text-gray-700">Best selling</span>
      <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-gray-500" />
    </div>
    <div className="flex space-x-0.5">
      <Button variant="ghost" size="icon" className="w-5 h-5 md:h-8 md:w-8 text-gray-500 hover:text-black">
        <List className="h-2.5 w-2.5 md:h-4 md:w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="w-5 h-5 md:h-8 md:w-8 text-gray-500 hover:text-black">
        <Grid2X2 className="h-2.5 w-2.5 md:h-4 md:w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="w-5 h-5 md:h-8 md:w-8 bg-gray-100 text-black">
        <Grid3X3 className="h-2.5 w-2.5 md:h-4 md:w-4" />
      </Button>
    </div>
  </div>
);

export default page;