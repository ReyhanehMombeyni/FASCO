export const DealsOfTheMonthSkeleton = () => {
  return (
    <div className="bg-[#fcfcfc] py-10 md:py-15 lg:py-30 pl-5 md:pl-20 lg:pl-30 grid grid-cols-5 gap-2 md:gap-10 items-start rounded-xl animate-pulse animate-duration-[2000ms]">
      <div className="space-y-4 lg:space-y-8 pt-2 col-span-2">
        <div className="h-6 sm:h-8 md:h-10 lg:h-12 bg-gray-300 rounded-lg w-4/5" />
        <div className="space-y-2 py-2">
          <div className="h-2 sm:h-3 bg-gray-200 rounded w-full max-w-sm" />
          <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4 max-w-sm" />
        </div>

        <div className="h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-36 bg-gray-400 rounded-md mt-4 lg:mt-8" />

        <div className="pt-4 sm:pt-10 space-y-4">
          <div className="h-3 sm:h-4 md:h-6 bg-gray-300 rounded w-3/5" />
            <div className="flex gap-2 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-gray-200 rounded-lg border-2 border-gray-100"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full col-span-3 h-full">
        <div className="w-full aspect-4/3 md:aspect-video lg:aspect-21/9 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};