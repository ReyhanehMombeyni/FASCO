import { Button } from "@/components/ui";
import { Timer } from "./Timer"; 
import { DealSlider } from "./DealSlider"; 

export function DealsOfTheMonth() {
  return (
    <div className="bg-[#fcfcfc] py-10 md:py-15 lg:py-30 pl-5 md:pl-20 lg:pl-30 grid grid-cols-5 gap-2 md:gap-10 items-start rounded-xl">
        
        <div className="space-y-3 lg:space-y-8 pt-2 col-span-2">
          <h2 className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-medium text-gray-700 font-serif tracking-wide">
            Deals Of The Month
          </h2>
          <p className="text-[8px] md:text-xs text-muted-foreground lg:text-sm max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <Button className="text-[8px] sm:px-4 sm:py-2 sm:text-xs lg:px-10 lg:py-5 lg:text-lg">
            Buy Now
          </Button>

          <div className="pt-4 sm:pt-10 space-y-4">
            <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-xl lg:font-medium text-gray-700">
              Hurry, Before It is Too Late!
            </h3>
            <Timer />
          </div>
        </div>

        <div className="relative w-full col-span-3">
          <DealSlider />
        </div>
    </div>
  );
}