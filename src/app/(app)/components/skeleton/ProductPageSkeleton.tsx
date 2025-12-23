export const ProductPageSkeleton = () => {
  return (
    <section className="p-5 pb-10 md:px-20 lg:px-30 md:pb-15 animate-pulse">
      <div className="h-3 bg-gray-100 rounded w-32 mb-6 hidden sm:block" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15">
        <div className="flex flex-col sm:flex-row-reverse sm:h-120 gap-2 lg:gap-5">
          <div className="w-full relative h-115 sm:min-h-full bg-gray-200 rounded-lg" />
          <div className="flex gap-2 overflow-x-hidden sm:flex-col sm:w-1/4 md:w-1/5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 min-w-20 min-h-20 sm:min-w-25 sm:min-h-25 md:h-30 rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-16" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-50 rounded-sm" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-16" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-100" />
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="h-12 bg-gray-200 rounded-md w-1/3" />
            <div className="h-12 bg-gray-300 rounded-md w-2/3" />
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="flex justify-center gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
