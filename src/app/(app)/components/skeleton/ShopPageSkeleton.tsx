import { ShopProductCardSkeleton } from "./ShopProductCardSkeleton";
import { ShopSidebarSkeleton } from "./ShopSidebarSkeleton";

export const ShopPageSkeleton = () => {
  return (
    <section className="px-5 md:px-20 lg:px-30 pt-5 pb-15">
      <div className="flex flex-col items-center mb-8">
        <div className="h-3 bg-gray-100 rounded w-24 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-32" />
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 lg:gap-8">
        <div className="col-span-1">
          <ShopSidebarSkeleton />
        </div>

        <div className="col-span-3 xl:col-span-4">
          {/* <div className="flex justify-between items-center pb-6">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-100 rounded" />
              <div className="h-8 w-8 bg-gray-100 rounded" />
            </div>
          </div> */}

          <div className="grid grid-cols-3 gap-x-2 gap-y-3 lg:gap-x-5 lg:gap-y-7 xl:gap-x-10 xl:gap-y-12">
            {[...Array(6)].map((_, i) => (
              <ShopProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};