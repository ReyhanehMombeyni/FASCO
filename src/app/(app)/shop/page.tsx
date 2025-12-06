import { Button } from "@/components/ui/button";
import { ChevronDown, List, Grid3X3, Grid2X2 } from "lucide-react";
import { FilterSidebar, ProductGrid } from "../components/shoppage";
import { InstagramFeed, ProductShowcase } from "../components/homepage";

const dummyProducts = [
  { id: 1, name: "Rounded Red Hat", price: 8.00, imageUrl: "/path/to/image1.jpg", colors: ["#000000", "#FFD700"] },
  { id: 2, name: "Linen Blend Shirt", price: 57.00, imageUrl: "/path/to/image2.jpg", colors: ["#ADD8E6", "#FFC0CB"] },
  { id: 3, name: "Long-sleeve Coat", price: 108.00, imageUrl: "/path/to/image3.jpg", colors: ["#E0E0E0", "#90EE90"] },
  { id: 4, name: "Boxy Denim Hat", price: 25.00, imageUrl: "/path/to/image4.jpg", colors: ["#000080"] },
  { id: 5, name: "Linen Plain Top", price: 25.00, imageUrl: "/path/to/image5.jpg", sizes: ["S", "M"] },
  { id: 6, name: "Oversized T-shirt", price: 11.00, oldPrice: 14.00, imageUrl: "/path/to/image6.jpg", colors: ["#F08080", "#FFC0CB", "#DDA0DD"] },
];

export default function page() {
  return (
    <main>
      <section className="px-5 md:px-20 lg:px-30 py-5">
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
            <ProductGrid products={dummyProducts} />
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
      <span className="text-[10px] lg:text-sm text-gray-700">Best selling</span>
      <ChevronDown className="w-2.5 h-2.5 lg:w-4 lg:h-4 text-gray-500" />
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