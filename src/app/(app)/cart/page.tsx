"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import { Button, Separator } from "@/components/ui";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <main className="py-10 px-5 md:px-20 xl:px-30">
      <div className="text-center mb-8 xl:mb-15 space-y-2">
        <h1 className="text-xl xl:text-4xl font-serif">Shopping Cart</h1>
        <nav className="text-xs text-gray-500 flex justify-center gap-2 italic">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-900">Your Shopping Cart</span>
        </nav>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-4 font-serif text-xl">Your cart is currently empty.</p>
          <Button asChild className="bg-black text-white px-8 rounded-none">
            <Link href="/shop">Return To Shop</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-5 xl:space-y-6">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs xl:text-sm xl:font-medium text-gray-900">
                  <th className="py-2 font-serif text-base xl:text-lg">Product</th>
                  <th className="py-2 font-serif text-base xl:text-lg text-center hidden sm:block">Price</th>
                  <th className="py-2 font-serif text-base xl:text-lg text-center">Quantity</th>
                  <th className="py-2 font-serif text-base xl:text-lg text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map(({id, title, image, color, size, price, quantity}) => (
                  <tr key={id} className="group">
                    <td className="py-3">
                      <div className="flex gap-3 xl:gap-6 items-center">
                        <div className="relative h-28 w-20 sm:h-32 sm:w-28 xl:h-38 xl:w-30 bg-gray-50 shrink-0">
                          <Image src={image} alt={title} fill className="object-cover" sizes="120px" />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5 xl:space-y-2">
                          <h3 className="font-serif text-sm sm:text-base md::text-lg xl:text-xl xl:font-semibold leading-tight">{title}</h3>
                          <p className="text-[10px] sm:text-xs xl:text-sm text-gray-500 italic">Color : {color?.name || "Default"}</p>
                          <p className="text-[10px] sm:text-xs xl:text-sm text-gray-500 italic">Size : {size?.name || "Default"}</p>
                          <p className="text-[10px] sm:text-xs xl:text-sm text-gray-900 sm:hidden">${price.toFixed(2)}</p>
                          <button 
                            onClick={() => removeItem(id)}
                            className="text-[10px] sm:text-xs text-gray-400 hover:text-red-600 underline transition-colors pt-1 sm:pt-2 xl:pt-8 block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="sm:py-18 text-sm xl:text-base text-gray-900 hidden sm:block">${price.toFixed(2)}</td>
                    <td className="py-6">
                      <div className="flex items-center border w-fit mx-auto bg-white">
                        <button 
                          onClick={() => updateQuantity(id, 'decrease')}
                          className="p-1 py-0.5 sm:p-2 sm:py-1 xl:p-2 hover:bg-gray-100 transition-colors border-r"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="p-1 py-0.5 sm:p-2 sm:py-1 text-xs xl:text-base font-medium">{quantity.toString().padStart(2, '0')}</span>
                        <button 
                          onClick={() => updateQuantity(id, 'increase')}
                          className="p-1 py-0.5 sm:p-2 sm:py-1 xl:p-2 hover:bg-gray-100 transition-colors border-l"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-6 text-right text-sm xl:text-base text-gray-900">
                      ${(price * quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end pt-4 xl:pt-8 space-y-3 xl:space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <input 
                type="checkbox" 
                id="page-wrap" 
                className="w-3 h-3 xl:w-4 xl:h-4 border-gray-300 rounded accent-black cursor-pointer" 
              />
              <label htmlFor="page-wrap" className="text-xs md:text-sm text-gray-500 cursor-pointer">
                For <span className="font-bold text-gray-900">$10.00</span> Please Wrap The Product
              </label>
            </div>

            <Separator className="w-full max-w-md" />

            <div className="w-full max-w-md space-y-4">
              <div className="flex justify-between items-center text-lg xl:text-xl">
                <span className="font-serif italic text-gray-600">Subtotal</span>
                <span className="xl:font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-none h-8 lg:h-10 xl:h-12 uppercase tracking-[0.2em] text-xs xl:text-sm lg:font-bold transition-all shadow-lg hover:shadow-xl" asChild>
                <Link href="/checkout">
                Checkout
                </Link>
              </Button>
              
              <div className="text-center">
                <Link href="/shop" className="text-xs text-gray-500 underline hover:text-black transition-colors uppercase tracking-widest">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}