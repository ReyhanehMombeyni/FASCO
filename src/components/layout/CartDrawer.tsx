"use client";

import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Separator,
  SheetDescription,
} from "@/components/ui";
import Link from "next/link";
import { useState } from "react";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, getItemCount } =
    useCartStore();
  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 200;
  const remainingForFreeShipping = freeShippingThreshold - totalPrice;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-black" />
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-in zoom-in">
              {getItemCount()}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[450px] flex flex-col p-0">
        <SheetHeader className="p-6 pb-2 border-b">
          <SheetTitle className="text-2xl font-serif">Shopping Cart</SheetTitle>
          <SheetDescription className="sr-only">
            Review the items in your cart before checkout.
          </SheetDescription>
          {totalPrice > 0 && (
            <div className="text-xs text-gray-500 mt-2">
              {remainingForFreeShipping > 0 ? (
                <p>
                  Buy{" "}
                  <span className="font-bold text-red-700">{`$${remainingForFreeShipping.toFixed(
                    2
                  )}`}</span>{" "}
                  More And Get{" "}
                  <span className="font-bold text-red-700">Free Shipping</span>
                </p>
              ) : (
                <p className="">
                  Congratulations! You ve got{" "}
                  <span className="font-bold text-red-700"> Free Shipping</span>
                </p>
              )}
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map(({ id, image, title, color, size, price, quantity }) => (
              <div key={id} className="flex gap-4 group border-b pb-3">
                <div className="relative h-28 w-24 bg-gray-50 shrink-0">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {title}
                    </h3>
                    <button
                      onClick={() => removeItem(id)}
                      className="text-gray-400 hover:text-black"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                    <span>Color: </span>
                    <div
                      className="w-3 h-3 rounded-full cursor-pointer"
                      style={{
                        backgroundColor: color?.code,
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Size:{" "}
                    <span className="text-gray-900 font-semibold">
                      {size?.symbol || "Standard"}
                    </span>
                  </p>
                  <p className="font-medium mt-1">${price}</p>

                  <div className="flex items-center border w-fit mt-auto bg-gray-50">
                    <button
                      onClick={() => updateQuantity(id, "decrease")}
                      className="p-1 px-2 hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(id, "increase")}
                      className="p-1 px-2 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wrap"
                name="gift_wrap"
                className="rounded border-gray-300 accent-black"
              />
              <label
                htmlFor="wrap"
                className="text-xs text-gray-600 cursor-pointer"
              >
                For <span className="font-bold">$10.00</span> Please Wrap The
                Product
              </label>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-base font-medium">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-1">
              <Button
                variant="link"
                className="w-full bg-black text-white rounded-none h-8 uppercase tracking-widest text-xs"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button
                variant="link"
                className="w-full text-black underline text-xs"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
