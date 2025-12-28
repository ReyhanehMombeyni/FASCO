"use client";

import { useCartStore } from "@/src/store/useCartStore";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

export function CartStatCard() {
  const getItemCount = useCartStore((state) => state.getItemCount);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getItemCount());
  }, [getItemCount]);

  return (
    <Card className="hover:shadow-md transition-shadow border-orange-100 bg-orange-50/10 p-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-orange-900">Active Cart</CardTitle>
        <ShoppingCart className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-orange-950">{count} Items in Your Cart</div>
        
        <Link 
          href={count > 0 ? "/checkout" : "/shop"} 
          className="group mt-2 flex items-center text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
        >
          {count > 0 ? "Proceed to checkout" : "Browse products"}
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}