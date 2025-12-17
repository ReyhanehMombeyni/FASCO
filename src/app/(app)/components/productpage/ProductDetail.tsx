"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { createClient } from "@/src/supabase/client";
import { ProductDetailProps } from "@/src/types/products";
import { Counter } from "./Counter";
import { SizeColorSection } from "./SizeColorSection";
import { ProductHeader } from "./ProductHeader";
import { PriceDisplay } from "./PriceDisplay";
import { StockAlert } from "./StockAlert";
import { PresenceTracker } from "./PresenceTracker";
import { TimerDisplay } from "./TimerDisplay";
import { calculateDiscountedPrice } from "@/src/utils/price";

const LOW_STOCK_THRESHOLD = 50;

export const ProductDetail = ({
  product,
  discountAmount,
  campaignEndDate,
}: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.product_sizes[0]?.sizes.id || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.product_colors[0]?.colors.id || null
  );
  const [viewerCount, setViewerCount] = useState(0);

  const supabase = createClient();

  const {
    id,
    name,
    rating,
    reviews,
    price,
    discount_percentage,
    product_sizes,
    product_colors,
    product_inventory,
  } = product;

  const currentVariant = useMemo(() => {
    return product_inventory.find(
      (variant) =>
        variant.size_id === selectedSize && variant.color_id === selectedColor
    );
  }, [product_inventory, selectedSize, selectedColor]);
  const currentStock = currentVariant?.stock_quantity || 0;
  const discountedPrice = calculateDiscountedPrice(price, discountAmount);

  const sizeHandler = (id: string) => setSelectedSize(id);
  const colorHandler = (id: string) => setSelectedColor(id);

  useEffect(() => {
    const setupPresence = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user || null;

      const uniqueId =
        user?.id ||
        localStorage.getItem("guest_session_id") ||
        crypto.randomUUID();
      if (!user && !localStorage.getItem("guest_session_id")) {
        localStorage.setItem("guest_session_id", uniqueId);
      }

      const productChannel = supabase.channel(`product-${id}`, {
        config: {
          presence: {
            key: uniqueId,
          },
        },
      });

      productChannel
        .on("presence", { event: "sync" }, () => {
          const presenceState = productChannel.presenceState();
          const count = Object.keys(presenceState).length;
          setViewerCount(count);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await productChannel.track({
              user: uniqueId,
              time: new Date().toISOString(),
            });
          }
        });

      return () => {
        productChannel.unsubscribe();
      };
    };

    setupPresence();
  }, [id, supabase]);

  return (
    <div className="space-y-3 md:space-y-5">
      <ProductHeader id={id} name={name} rating={rating} reviews={reviews} />
      <PriceDisplay
        price={price}
        discountedPrice={discountedPrice}
        discount_percentage={discount_percentage}
      />

      <div className="mt-5 lg:mt-8">
        <PresenceTracker viewerCount={viewerCount} productId={id} />

        {discount_percentage > 0 && (
          <TimerDisplay campaignEndDate={campaignEndDate} />
        )}
      </div>

      <StockAlert
        currentStock={currentStock}
        LOW_STOCK_THRESHOLD={LOW_STOCK_THRESHOLD}
      />
      <SizeColorSection
        sizes={product_sizes}
        size={selectedSize}
        sizeHandler={sizeHandler}
        colors={product_colors}
        color={selectedColor}
        colorHandler={colorHandler}
      />

      <div className="flex space-x-4 pt-2 lg:pt-6">
        <Counter currentStock={currentStock} />
        <Button
          size="sm"
          className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
          disabled={!selectedSize || !selectedColor || currentStock === 0}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};
