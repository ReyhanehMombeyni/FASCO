const SidebarSectionSkeleton = () => (
  <div className="mb-6">
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
    <div className="space-y-2">
      <div className="h-2 bg-gray-100 rounded w-full" />
      <div className="h-2 bg-gray-100 rounded w-4/5" />
    </div>
  </div>
);

export const ShopSidebarSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-8" />
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-100 rounded-sm" />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-100" />
          ))}
        </div>
      </div>

      <SidebarSectionSkeleton />
      <SidebarSectionSkeleton />
      <SidebarSectionSkeleton />
    </div>
  );
};