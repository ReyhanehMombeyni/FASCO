export const ProductCardSkeleton = () => {
  return (
    <div 
      className="px-2 pt-2 sm:p-4 rounded-lg bg-white animate-pulse"
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
    >
      <div className="w-full aspect-video bg-gray-200 rounded-lg mb-4" />

      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-1/4" />
        </div>

        <div className="h-2 bg-gray-100 rounded w-1/4" />
        <div className="h-2 bg-gray-50 rounded w-1/3" />

        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-100 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
};