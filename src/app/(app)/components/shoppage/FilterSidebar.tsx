'use client'
import { Button } from "@/components/ui";
import { ItemsFilter } from "@/src/actions/shop";
import { useFilterUpdater } from "@/src/hooks/useFilterUpdater";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

const priceRanges = ["$0-$50", "$50-$100", "$100-$150", "$150-$200", "$200-$300", "$300-$400"];

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
  
  const [isOpen, setIsOpen] = useState(false); 

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

  return (<div className="mb-2 pb-2 lg:pb-5">
    <div className="flex justify-between items-center text-xs md:text-sm lg:text-base xl:text-lg mb-1 cursor-pointer hover:text-gray-800"
    onClick={toggleOpen}>
      <h3 className="sm:tracking-wider">{title}</h3>
      <ChevronUp className={`w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
    </div>
    {isOpen && <div>{children}</div>}
  </div>
);
}

export function FilterSidebar({itemsFilter}: {
    itemsFilter: ItemsFilter;
}) {

  const { updateFilter, isFilterActive } = useFilterUpdater();
  const { sizes, collections, brands, colors, tags } = itemsFilter;

  return (
    <div className="space-y-0 font-serif">
      <h2 className="text-sm md:text-lg md:tracking-wide lg:text-xl xl:text-2xl mb-2">Filters</h2>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1 md:gap-2 2xl:gap-3">
          {sizes.map(({id, name, symbol}) => {
            const isActive = isFilterActive('size', id);
            return (
            <Button
              key={name}
              variant="outline"
              onClick={() => updateFilter('size', isActive ? null : id)}
              className={`w-3 h-3 p-1.5 text-[6px] sm:text-[8px] sm:p-2 md:text-[10px] md:p-2.5 xl:text-xs xl:p-3 rounded-[2px] md:rounded-xs xl:rounded-sm border ${isActive ? 'bg-black text-white hover:bg-black/90' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {symbol}
            </Button>
          )})}
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-0.5 lg:gap-1 2xl:gap-2">
          {colors.map(({id, name, code}) => {
            const isActive = isFilterActive('color', id);
            return (<div
              key={code}
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 rounded-full cursor-pointer border border-gray-200 transition-all ${isActive ? 'border border-gray-600 shadow-2xs' : ''}`}
              onClick={() => updateFilter('color', isActive ? null : id)}
              style={{ backgroundColor: code }}
              title={name}
            ></div>
          )})}
        </div>
      </FilterSection>

      <FilterSection title="Prices">
        <div>
          {priceRanges.map((range) => (
            <div key={range} className={`text-[8px] sm:text-[10px] md:text-xs sm:py-0.5 lg:py-1 lg:text-sm 2xl:text-base cursor-pointer ${range === '$100-$150' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>
              {range}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brands">
        <div>
          {brands.map(({id, name}) => {
            const isActive = isFilterActive('brand', id);
            return (<div key={name} 
            onClick={() => updateFilter('brand', isActive ? null : id)}
            className={`${isActive && "text-gray-950 font-black"}text-[8px] sm:text-[10px] md:text-xs sm:py-0.5 lg:py-1 lg:text-sm 2xl:text-base text-gray-600 hover:text-black cursor-pointer`}>
              {name}
            </div>
          )})}
        </div>
      </FilterSection>

      <FilterSection title="Collections">
        <div>
          {collections.map(({id, name}) => {
            const isActive = isFilterActive('collection', id);

            return (<div key={name} 
            onClick={() => updateFilter('collection', isActive ? null : id)}
            className={`text-[8px] sm:text-[10px] md:text-xs sm:py-0.5 lg:py-1 lg:text-sm 2xl:text-base cursor-pointer ${isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'}`}>
              {name}
            </div>
          )})}
        </div>
      </FilterSection>
      
      <FilterSection title="Tags">
        <div className="flex flex-wrap gap-1 md:gap-2 2xl:gap-2.5">
          {tags.map(({id, name}) => {
            const isActive = isFilterActive('tag', id);
            return (<span 
              key={name} 
              onClick={() => updateFilter('tag', isActive ? null : id)}
              className={`${isActive && "text-gray-950 font-black"}text-[8px] px-1 sm:text-[10px] xl:text-[11px] md:py-1 md:px-2 2xl:px-3 2xl:text-xs 2xl:py-1.5 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200`}
            >
              {name}
            </span>
          )})}
        </div>
      </FilterSection>
    </div>
  );
}