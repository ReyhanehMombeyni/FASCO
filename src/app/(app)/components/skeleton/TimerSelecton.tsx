const SkeletonBlock = ({ type }: { type: string }) => (
  <div className="flex flex-col items-center animate-pulse">
    <div className={`${
      type === "DealsOfTheMonth" 
        ? "w-8 h-8 sm:w-10 sm:h-8 lg:w-16 lg:h-12 rounded-md lg:rounded-lg bg-red-200" 
        : "w-6 h-6 bg-red-200 rounded"
    }`} />
    {type === "DealsOfTheMonth" && <div className="h-3 w-8 bg-red-100 mt-2 rounded" />}
  </div>
);

export const TimerSkeleton = ({ type }: { type: string }) => (
  <div className={`flex items-center ${type === "DealsOfTheMonth" ? "gap-2 lg:gap-4" : "gap-1"}`}>
    <SkeletonBlock type={type} />
    <SkeletonBlock type={type} />
    <SkeletonBlock type={type} />
    <SkeletonBlock type={type} />
  </div>
);