"use client";

import { useCartStore } from "@/src/store/useCartStore";
import { Button, Separator, Input } from "@/components/ui";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = 40.0; 
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <header className="py-8 border-b text-center">
        <h1 className="text-3xl font-serif">FASCO Demo Checkout</h1>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-7 space-y-12">
            
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-serif">Contact</h2>
                <p className="text-xs text-gray-500">
                  Have an account? <span className="text-blue-600 cursor-pointer">Create Account</span>
                </p>
              </div>
              <Input placeholder="Email Address" className="h-14 rounded-none border-gray-300" />
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-serif">Delivery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="First Name" className="h-14 rounded-none" />
                <Input placeholder="Last Name" className="h-14 rounded-none" />
              </div>
              <Input placeholder="Address" className="h-14 rounded-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="City" className="h-14 rounded-none" />
                <Input placeholder="Postal Code" className="h-14 rounded-none" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="save-info" className="w-4 h-4 accent-black" />
                <label htmlFor="save-info" className="text-sm text-gray-500">Save This Info For Future</label>
              </div>
            </section>

            <section className="space-y-6 bg-gray-50 p-6 border">
              <h2 className="text-3xl font-serif">Payment</h2>
              <div className="space-y-4">
                <div className="border p-4 bg-white flex justify-between items-center">
                  <span className="text-sm">Credit Card</span>
                  <div className="flex gap-1 italic font-bold text-blue-800">VISA / MC</div>
                </div>
                <div className="p-6 border border-t-0 bg-white space-y-4">
                  <Input placeholder="Card Number" className="h-12 rounded-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Expiration Date" className="h-12 rounded-none" />
                    <Input placeholder="Security Code" className="h-12 rounded-none" />
                  </div>
                  <Input placeholder="Card Holder Name" className="h-12 rounded-none" />
                </div>
              </div>
              <Button className="w-full bg-black text-white h-14 rounded-none uppercase tracking-widest mt-4">
                Pay Now
              </Button>
            </section>
          </div>

          <div className="lg:col-span-5 border-l pl-0 lg:pl-16">
            <div className="sticky top-8 space-y-8">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative h-20 w-16 bg-gray-100 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.color?.name}</p>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input placeholder="Discount code" className="h-12 rounded-none" />
                <Button className="bg-black text-white px-8 rounded-none">Apply</Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-black font-medium">${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <footer className="py-8 text-center text-[10px] text-gray-400">
        Copyright © 2025 FASCO. All Rights Reserved.
      </footer>
    </div>
  );
}