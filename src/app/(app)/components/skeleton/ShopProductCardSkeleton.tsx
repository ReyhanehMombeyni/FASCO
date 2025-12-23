export const ShopProductCardSkeleton = () => {
  return (
    <div className="rounded-none border-none animate-pulse">
      <div className="relative h-35 sm:h-50 md:h-60 lg:h-70 xl:h-85 2xl:h-100 w-full bg-gray-200" />

      <div className="pl-1 py-1 sm:pb-3 xl:pb-5">
        <div className="h-3 sm:h-4 md:h-5 bg-gray-200 rounded w-3/4 mb-2 mt-2" />
        <div className="h-2 sm:h-3 bg-gray-100 rounded w-1/4 mb-3" />

        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
};