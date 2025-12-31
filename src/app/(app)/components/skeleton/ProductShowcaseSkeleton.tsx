export const ProductShowcaseSkeleton = () => {
  return (
    <section className="w-full">
      <div className="flex bg-gray-100 h-90 lg:h-110 xl:h-120 animate-pulse">
        <div className="hidden lg:block lg:w-[50%] bg-gray-200" />

        <div className="p-5 pr-15 flex flex-col justify-center items-start md:pr-10 md:py-15 md:pl-20 w-full lg:w-[50%]">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-5 lg:h-16" />
          <div className="h-4 w-20 bg-gray-200 rounded mb-4" />
          <div className="space-y-2 mb-6 w-full">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-32 bg-gray-300 rounded mb-8" />
          <div className="h-12 w-40 bg-black/10 rounded" />
        </div>
      </div>

      <div className="px-5 md:px-20 lg:px-30 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 py-8 md:py-12 bg-white">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 md:gap-4 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-2 w-24 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};