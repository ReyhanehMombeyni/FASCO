'use client'
import { ProductHeaderProps } from "@/src/types/products"
import { Star } from "lucide-react"

export const ProductHeader = ({name, rating, reviews}: ProductHeaderProps) => {
  return (
    <div>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:pt-2 font-serif">
          {name}
        </h1>

        <div className="flex items-center space-x-2 pt-1">
          <div className="flex items-center text-black">
            {Array(Math.floor(rating))
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="w-2 h-2 md:w-3 md:h-3 fill-black" />
              ))}
          </div>
          <span className="text-xs text-gray-500 pt-0.5">({reviews})</span>
        </div>
      </div>
  )
}
