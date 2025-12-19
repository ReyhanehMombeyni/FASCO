"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import { Button, Separator } from "@/components/ui";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl font-serif">Shopping Cart</h1>
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
        <div className="space-y-8">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm font-medium text-gray-900">
                  <th className="py-4 font-serif text-lg">Product</th>
                  <th className="py-4 font-serif text-lg">Price</th>
                  <th className="py-4 font-serif text-lg text-center">Quantity</th>
                  <th className="py-4 font-serif text-lg text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map(({id, title, image, color, size, price, quantity}) => (
                  <tr key={id} className="group">
                    <td className="py-6">
                      <div className="flex gap-6 items-center">
                        <div className="relative h-32 w-28 bg-gray-50 shrink-0">
                          <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-lg leading-tight">{title}</h3>
                          <p className="text-xs text-gray-500 italic">Color : {color?.name || "Default"}</p>
                          <p className="text-xs text-gray-500 italic">Size : {size?.name || "Default"}</p>
                          <button 
                            onClick={() => removeItem(id)}
                            className="text-xs text-gray-400 hover:text-red-600 underline transition-colors pt-2 block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 font-medium text-gray-900">${price.toFixed(2)}</td>
                    <td className="py-6">
                      <div className="flex items-center border w-fit mx-auto bg-white">
                        <button 
                          onClick={() => updateQuantity(id, 'decrease')}
                          className="p-2 px-3 hover:bg-gray-100 transition-colors border-r"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-5 text-sm font-medium">{quantity.toString().padStart(2, '0')}</span>
                        <button 
                          onClick={() => updateQuantity(id, 'increase')}
                          className="p-2 px-3 hover:bg-gray-100 transition-colors border-l"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-6 text-right font-medium text-gray-900">
                      ${(price * quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end pt-8 space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <input 
                type="checkbox" 
                id="page-wrap" 
                className="w-4 h-4 border-gray-300 rounded accent-black cursor-pointer" 
              />
              <label htmlFor="page-wrap" className="text-sm text-gray-500 cursor-pointer">
                For <span className="font-bold text-gray-900">$10.00</span> Please Wrap The Product
              </label>
            </div>

            <Separator className="w-full max-w-md" />

            <div className="w-full max-w-md space-y-4">
              <div className="flex justify-between items-center text-xl">
                <span className="font-serif italic text-gray-600">Subtotal</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-none h-14 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-lg hover:shadow-xl" asChild>
                <Link href="/checkout">
                Checkout
                </Link>
              </Button>
              
              <div className="text-center pt-2">
                <Link href="/shop" className="text-xs text-gray-500 underline hover:text-black transition-colors uppercase tracking-widest">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}