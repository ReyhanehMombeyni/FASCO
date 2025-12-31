export const InstagramSkeleton = () => {
  return (
    <section className="pt-10 md:pt-15 pb-20 bg-white">
      <div className="text-center mb-12 mx-auto px-5 md:px-20 lg:px-30">
        <div className="h-8 md:h-10 w-64 bg-gray-200 animate-pulse mx-auto mb-4 rounded-lg" />
        <div className="space-y-2">
          <div className="h-3 w-full max-w-md bg-gray-100 animate-pulse mx-auto rounded" />
          <div className="h-3 w-3/4 max-w-sm bg-gray-100 animate-pulse mx-auto rounded" />
        </div>
      </div>

      <div className="relative lg:py-15 flex gap-0 overflow-hidden">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="basis-1/3 sm:basis-1/5 lg:basis-1/7 px-0 flex items-center shrink-0"
          >
            <div
              className={`${
                index % 2 ? "h-[300px] lg:h-[350px]" : "h-[250px] lg:h-[300px]"
              } w-full bg-gray-200 animate-pulse border-x border-white`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};