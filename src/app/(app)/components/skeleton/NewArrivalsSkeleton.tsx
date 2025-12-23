import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const NewArrivalsSkeleton = () => {
  return (
    <section className="py-5 sm:py-8 md:py-12 lg:py-20 px-5 md:px-20 lg:px-30">
      <div className="flex flex-col items-center mb-10">
        <div className="h-8 md:h-10 bg-gray-200 rounded-md w-48 mb-4" />
        <div className="h-3 bg-gray-100 rounded w-full max-w-lg mb-2" />
        <div className="h-3 bg-gray-100 rounded w-2/3 max-w-xs" />
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 mb-12">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 md:h-12 bg-gray-50 rounded-lg w-full animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};