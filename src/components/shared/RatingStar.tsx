import { Star } from "lucide-react"

export const RatingStar = ({rating}: {rating: number}) => {
  return (
    <div className="flex items-center text-yellow-500">
        {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-2 h-2 sm:w-3 sm:h-3 xl:h-3.5 xl:w-3.5 2xl:w-4 2xl:h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
    </div>
  )
}
