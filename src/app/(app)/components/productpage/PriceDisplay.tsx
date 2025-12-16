import { Badge } from "@/components/ui"
import { PriceDisplayProps } from "@/src/types/products"

export const PriceDisplay = ({discountedPrice, discount_percentage, price}: PriceDisplayProps) => {
  return (
    <div className="flex items-center space-x-3 font-sans">
        <span className="text-lg lg:text-xl font-semibold text-gray-800">
          ${discountedPrice}
        </span>
        {discount_percentage && (
          <>
            <span className="text-sm line-through text-gray-400">
              ${price.toFixed(2)}
            </span>
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-[8px] py-0.5 px-1 pb-0.5">
              SAVE {discount_percentage}%
            </Badge>
          </>
        )}
      </div>
  )
}
