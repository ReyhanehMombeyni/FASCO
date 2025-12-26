import { Suspense } from "react";
import { ParamsId } from "@/src/types/products";
import {
  DealsOfTheMonth,
  ProductShowcase
} from "@/src/app/(app)/components/homepage";
import { ReviewList } from "../../components/productpage/ReviewList";
import { ProductContent } from "../../components/productpage";
import { DealsOfTheMonthSkeleton, ProductPageSkeleton } from "../../components/skeleton";

export default async function page({ params }: ParamsId) {

  return (
    <main>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-50" />}>
        <ReviewList id={(await params).id} />
      </Suspense>
      <Suspense>
        <ProductShowcase />
      </Suspense>
      <Suspense fallback={<DealsOfTheMonthSkeleton />}>
        <DealsOfTheMonth />
      </Suspense>
    </main>
  );
}
