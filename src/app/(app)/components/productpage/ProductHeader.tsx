'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui"
import { ProductHeaderProps } from "@/src/types/products"
import { Star } from "lucide-react"
import { AddReview } from "./AddReview"

export const ProductHeader = ({id, name, rating, reviews}: ProductHeaderProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:pt-2 font-serif">
          {name}
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Star className="w-5 h-5 text-gray-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90%] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-serif font-light text-xl border-b pb-4">Write a Review</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <AddReview productId={id} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

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
