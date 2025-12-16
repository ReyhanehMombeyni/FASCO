'use client'
import { SizeColorSectionProps } from "@/src/types/products"

export const SizeColorSection = ({sizes, size, sizeHandler, colors, color, colorHandler}: SizeColorSectionProps) => {
  return (
    <>
    <div className="pt-2 font-serif">
        <p className="text-xs md:text-sm font-medium mb-2">
          Size:{" "}
          <span className="pl-1">
            {sizes.find((s) => s.sizes.id === size)?.sizes
              .symbol || "N/A"}
          </span>
        </p>
        <div className="flex space-x-2">
          {sizes.map((item) => (
            <button
              key={item.sizes.id}
              onClick={() => sizeHandler(item.sizes.id)}
              className={`
                w-6 h-6 rounded-sm border text-xs transition-all lg:w-7 lg:h-7 lg:text-sm
                ${
                  size === item.sizes.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-800 hover:border-gray-900"
                }
              `}
            >
              {item.sizes.symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 font-serif">
        <p className="text-xs md:text-sm font-medium mb-2">
          Color:{" "}
          <span className="pl-1">
            {colors.find((c) => c.colors.id === color)?.colors
              .name || "None"}
          </span>
        </p>
        <div className="flex space-x-2">
          {colors.map((item) => (
            <div
              key={item.colors.id}
              onClick={() => colorHandler(item.colors.id)}
              className={`
                w-5 h-5 lg:w-6 lg:h-6 rounded-full cursor-pointer border lg:border-2 transition-transform
                ${
                  color === item.colors.id
                    ? "scale-110 border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                    : `border-gray-200 hover:border-gray-300`
                }
              `}
              style={{
                backgroundColor: item.colors.code,
              }}
              title={item.colors.code}
            />
          ))}
        </div>
      </div>
    </>
  )
}
