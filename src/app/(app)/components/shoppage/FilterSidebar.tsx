import { Button } from "@/components/ui";
import { ChevronUp } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#800080", "#ffc0cb", "#7fffd4", "#90ee90", "#add8e6", "#dda0dd", "#808080", "#000000"];
const brands = ["Minimog", "Australia", "Brook", "Leorts", "Vagabond", "Abby"];
const tags = ["Fashion", "Hats", "Sandal", "Belt", "Bags", "Sneaker", "Denim", "Minimog", "Vagabond", "Sunglasses", "Beachwear"];
const priceRanges = ["$0-$50", "$50-$100", "$100-$150", "$150-$200", "$200-$300", "$300-$400"];

const FilterSection = ({ title, children, open = true }: { title: string, children: React.ReactNode, open?: boolean }) => (
  <div className="mb-5 pb-2 lg:pb-5">
    <div className="flex justify-between items-center text-sm md:text-base lg:text-lg xl:text-xl mb-3">
      <h3 className="sm:tracking-wider">{title}</h3>
      <ChevronUp className={`w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 transition-transform ${open ? 'rotate-0' : 'rotate-180'}`} />
    </div>
    {children}
  </div>
);

export function FilterSidebar() {
  return (
    <div className="space-y-4 font-serif">
      <h2 className="text-md md:text-lg md:tracking-wide lg:text-xl xl:text-2xl mb-5">Filters</h2>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1 md:gap-2 2xl:gap-3">
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              className={`w-5 h-5 p-2.5 text-[8px] sm:text-[10px] sm:p-3.5 md:text-xs md:p-4 2xl:text-sm 2xl:p-5 rounded-sm border ${size === 'M' ? 'bg-black text-white hover:bg-black/90' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {size}
            </Button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-1 lg:gap-1.5 2xl:gap-2.5">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 rounded-full cursor-pointer border border-gray-200 transition-all ${color === '#000000' ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
              style={{ backgroundColor: color }}
              title={color}
            ></div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Prices">
        <div>
          {priceRanges.map((range) => (
            <div key={range} className={`text-[10px] pt-1 sm:text-xs sm:py-1 md:text-sm lg:text-base 2xl:text-lg cursor-pointer ${range === '$100-$150' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>
              {range}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brands">
        <div>
          {brands.map((brand) => (
            <div key={brand} className="text-[10px] pt-1 sm:text-xs sm:py-1 md:text-sm lg:text-base 2xl:text-lg text-gray-600 hover:text-black cursor-pointer">
              {brand}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Collections" open={false}>
        <div>
          {["All products", "Best sellers", "New arrivals", "Accessories"].map((collection) => (
            <div key={collection} className={`text-[10px] pt-1 sm:text-xs sm:py-1 md:text-sm lg:text-base 2xl:text-lg cursor-pointer ${collection === 'All products' ? 'text-black font-medium' : 'text-gray-600 hover:text-black'}`}>
              {collection}
            </div>
          ))}
        </div>
      </FilterSection>
      
      <FilterSection title="Tags" open={false}>
        <div className="flex flex-wrap gap-1 md:gap-2 2xl:gap-2.5">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] pt-1 px-1 sm:text-xs sm:py-1 sm:px-3 2xl:text-sm 2xl:py-1.5 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}