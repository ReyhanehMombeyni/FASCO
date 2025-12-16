
export const PresenceTracker = ({viewerCount, productId}: {viewerCount: number;
    productId: string;
}) => {
  return (
    <div className="flex items-center text-gray-500 text-sm mt-4">
            <span role="img" aria-label="eye" className="mr-1">
              👁️
            </span>
            <span className="text-xs lg:text-[13px] text-gray-500">
              {viewerCount} people are viewing this right now
            </span>
          </div>
  )
}
